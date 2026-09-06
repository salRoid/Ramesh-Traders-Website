#!/bin/bash
set -e

DROPLET_IP="165.22.216.48"
DROPLET_USER="root"
REMOTE_DIR="/opt/store"

LOCAL_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "📤 Syncing files to droplet..."
# --delete makes the droplet mirror the repo. Without it, files deleted here
# lingered on the server and Next kept building them: a scaffold-era
# src/app/favicon.ico survived that way and overrode the brand tab icon.
# Excluded paths (node_modules, .next, env files) are protected from deletion.
rsync -az --delete \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='package-lock.json' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='*.tar.gz' \
  --exclude='.DS_Store' \
  . "$DROPLET_USER@$DROPLET_IP:$REMOTE_DIR/"

echo "✅ Files synced to $DROPLET_IP:$REMOTE_DIR"
