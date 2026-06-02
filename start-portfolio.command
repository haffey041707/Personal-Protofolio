#!/bin/zsh
set -e

cd "$(dirname "$0")"
export PATH="$PWD/.tools/node-v22.16.0-darwin-arm64/bin:$PATH"

if lsof -nP -iTCP:3000 -sTCP:LISTEN >/dev/null 2>&1; then
  open "http://localhost:3000"
  echo "Portfolio is already running at http://localhost:3000"
  read -r "?Press Enter to close this window..."
  exit 0
fi

(sleep 4 && open "http://localhost:3000") &
npm run dev
