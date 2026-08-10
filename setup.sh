#!/bin/bash
# SuretyResearch.com — one-click GitHub setup
# Run from inside the suretyresearch folder.

set -e

echo "=== SuretyResearch.com Setup ==="
echo ""

command -v git >/dev/null 2>&1 || { echo "Error: git is not installed."; exit 1; }
command -v gh >/dev/null 2>&1 || { echo "Error: GitHub CLI (gh) is not installed. Install from https://cli.github.com"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Error: Node.js is not installed."; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Error: Not logged into GitHub CLI. Run: gh auth login"; exit 1; }

echo "1. Installing dependencies..."
npm install

echo ""
echo "2. Testing build..."
npx astro build
echo "Build successful!"

echo ""
echo "3. Creating GitHub repository..."
git init
git add -A
git commit -m "Initial commit: SuretyResearch.com"
gh repo create CGABrew7/suretyresearch --public --source=. --push

echo ""
echo "=== Done! ==="
echo ""
echo "Your repo is live at: https://github.com/CGABrew7/suretyresearch"
echo ""
echo "Next step: Connect to Cloudflare Pages"
echo "  1. Go to https://dash.cloudflare.com → Pages → Create a project"
echo "  2. Connect to Git → select CGABrew7/suretyresearch"
echo "  3. Build settings:"
echo "     Framework preset: Astro"
echo "     Build command: npm run build"
echo "     Build output: dist"
echo "  4. Click Save and Deploy"
echo ""
echo "Then add your custom domain (suretyresearch.com) in the Cloudflare Pages settings."
