#!/bin/zsh
set -e

cd "$(dirname "$0")"
export PATH="$PWD/.tools/node-v22.16.0-darwin-arm64/bin:$PATH"

npm run dev:backend
