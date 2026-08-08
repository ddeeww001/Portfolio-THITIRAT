const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_dev_secret_key_change_in_production_32chars!';

// Validate JWT Secret strength in production
if (process.env.NODE_ENV === 'production' && JWT_SECRET.includes('fallback_dev')) {
    console.warn('SECURITY WARNING: Please set a strong JWT_SECRET environment variable in production!');
}

// 1. Security Headers Middleware (Helmet-equivalent)
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    next();
});

// 2. Strict CORS Security Middleware
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// 3. Simple In-Memory Rate Limiter Middleware
const requestCounts = new Map();
const rateLimiter = (maxRequests, windowMs) => (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const record = requestCounts.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + windowMs;
    } else {
        record.count += 1;
    }

    requestCounts.set(ip, record);

    if (record.count > maxRequests) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }
    next();
};

app.use(express.json({ limit: '10kb' })); // Limit JSON body size to prevent payload DOS
app.use(cookieParser());

// Global Rate Limit: 100 requests per 15 minutes
app.use(rateLimiter(100, 15 * 60 * 1000));

// Middleware to verify JWT and prevent 'None' algorithm attack
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden: Invalid or Expired Token' });
        req.user = user;
        next();
    });
};

// Login Route with strict rate limit (5 attempts per 15 mins)
app.post('/login', rateLimiter(5, 15 * 60 * 1000), (req, res) => {
    const { username } = req.body;

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid username format' });
    }

    const cleanUsername = username.trim().replace(/[&<>"']/g, '');
    const user = { name: cleanUsername };
    const token = jwt.sign(user, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'Strict',
        maxAge: 3600000 // 1 hour
    });

    res.json({ message: 'Logged in successfully', user: { name: cleanUsername } });
});

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Access Granted to Protected Endpoint', user: req.user });
});

// Production HTTPS Setup
if (process.env.NODE_ENV === 'production') {
    try {
        const options = {
            key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
        };
        https.createServer(options, app).listen(PORT, () => {
            console.log(`🔒 Secure HTTPS Production Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('HTTPS Certificate error, falling back to HTTP:', err.message);
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
} else {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

