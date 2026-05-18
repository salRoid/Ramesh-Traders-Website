#!/bin/bash
set -e

DROPLET_IP="165.22.216.48"
DROPLET_USER="root"
REMOTE_DIR="/opt/store"

echo "🏗️  Building and deploying website..."
ssh "$DROPLET_USER@$DROPLET_IP" "
  cd $REMOTE_DIR
  npm install
  npm run build
  pm2 restart store || pm2 start npm --name store -- start
"

echo "✅ Website deployed — live at https://store.salroid.me"
