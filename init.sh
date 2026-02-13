#!/bin/bash
set -e

echo "=================================================="
echo "  DashBoard Pro - Development Environment Setup"
echo "=================================================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js 18+ first."
    echo "  Download: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "ERROR: Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✓ Node.js $(node -v) detected"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed."
    exit 1
fi

echo "✓ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install
echo ""
echo "✓ Dependencies installed"
echo ""

# Build check (optional, for verifying no build errors)
echo "Running type check..."
npx tsc --noEmit 2>/dev/null || echo "⚠ TypeScript errors found (will be resolved during development)"
echo ""

# Start the development server
echo "=================================================="
echo "  Starting Next.js development server..."
echo "=================================================="
echo ""
echo "  App URL:     http://localhost:3000"
echo "  Login:       /login"
echo "  Dashboard:   /dashboard"
echo ""
echo "  Mock Credentials:"
echo "    Email:    admin@dashboardpro.com"
echo "    Password: password123"
echo ""
echo "  Press Ctrl+C to stop the server"
echo "=================================================="
echo ""

npm run dev
