#!/usr/bin/env sh

echo "Starting Portfolio..."
echo ""

echo "[1/2] Building frontend..."
npm run build

echo ""
echo "[2/2] Starting server (production)..."
node src/backend/server.cjs
