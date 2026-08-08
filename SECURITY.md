# Security & Deployment Policy

This document outlines the security architecture and deployment hardening measures implemented for the portfolio application.

## 🛡️ Key Security Features Implemented

### 1. HTTP Security Headers (OWASP Recommended)
- **Content-Security-Policy (CSP)**: Strict rules restricting script, object, and frame sources.
- **X-Frame-Options: DENY**: Prevents clickjacking attacks by forbidding embedding inside external `<iframe>` elements.
- **X-Content-Type-Options: nosniff**: Blocks MIME-type sniffing vulnerabilities.
- **Strict-Transport-Security (HSTS)**: Forces HTTPS transport in production (`max-age=31536000`).
- **Referrer-Policy**: Set to `strict-origin-when-cross-origin`.

### 2. Authentication & JWT Hardening
- **Strict HS256 Verification**: Explicitly prevents JWT `none` algorithm bypass attacks.
- **HttpOnly & SameSite=Strict Cookies**: Mitigates client-side XSS access to tokens and prevents Cross-Site Request Forgery (CSRF).
- **Short Token Lifespan**: Set to 1 hour expiration (`expiresIn: '1h'`).

### 3. Traffic & Denial of Service Protection
- **Global Rate Limiting**: Max 100 requests per 15 minutes per IP.
- **Login Endpoint Rate Limiting**: Max 5 attempts per 15 minutes to prevent brute-force attacks.
- **Payload Size Control**: JSON body payload restricted to `10kb`.

### 4. Input Sanitization & Anti-Spam
- **HTML Escaping**: All user inputs in the contact form are sanitized to escape `<script>`, quotes, and special characters.
- **Bot Trap Honeypot**: Hidden honeypot form field detects automated spam bots before submission.
- **External Link Hardening**: All outbound links enforce `rel="noopener noreferrer"`.

---

## 🚀 Production Deployment Checklist

1. **Environment Variables**:
   - Copy `.env.example` to `.env`.
   - Set a strong `JWT_SECRET` (at least 32 random characters).
   - Configure `ALLOWED_ORIGINS` to match your deployed production domain.

2. **SSL / HTTPS Configuration**:
   - Ensure an active SSL certificate (e.g. via Let's Encrypt / Cloudflare).
   - Place valid `key.pem` and `cert.pem` inside `src/backend/certs/` or let Nginx/Vercel manage SSL termination.

3. **Build & Verify**:
   ```bash
   npm run build
   ```
