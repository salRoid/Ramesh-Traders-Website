#!/bin/bash
# Traders Website – stop.sh
PROJECT="Traders Website"
PORT=6410

PID=$(lsof -ti:$PORT 2>/dev/null)
if [ -n "$PID" ]; then
  kill -9 $PID 2>/dev/null
  echo "$PROJECT stopped (PID $PID on :$PORT)"
else
  echo "$PROJECT not running on :$PORT"
fi
