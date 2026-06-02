#!/bin/bash
# Traders Website – start.sh
PROJECT="Traders Website"
PORT=6410
DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  $PROJECT"
echo "  ────────────────────────────────────"

PID=$(lsof -ti:$PORT 2>/dev/null)
if [ -n "$PID" ]; then
  echo "  Port :$PORT occupied by PID $PID — clearing..."
  kill -9 $PID 2>/dev/null
  sleep 0.4
  echo "  Port :$PORT cleared."
fi

echo "  Starting on :$PORT"
echo ""
cd "$DIR"
exec npm run dev
