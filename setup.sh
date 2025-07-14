#!/bin/sh
# Install Node.js dependencies for running tests

# Require Node.js and npm
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required but not installed. Aborting." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but not installed. Aborting." >&2
  exit 1
fi

# Verify minimum versions as documented in requirements.txt
NODE_MAJOR=$(node -v | cut -d. -f1 | tr -d 'v')
NPM_MAJOR=$(npm -v | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 16 ]; then
  echo "Node.js >=16 is required. You have $(node -v)." >&2
  exit 1
fi
if [ "$NPM_MAJOR" -lt 8 ]; then
  echo "npm >=8 is required. You have $(npm -v)." >&2
  exit 1
fi

# Install dependencies
npm install --no-audit --progress=false || {
  echo "Failed to install packages. Check network connectivity." >&2
  exit 1
}
