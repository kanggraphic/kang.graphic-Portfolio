#!/bin/bash
echo "🚀 Starting web server..."
echo ""
echo "📂 Your newspaper portfolio site is running at:"
echo "   http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
cd out && python3 -m http.server 8000
