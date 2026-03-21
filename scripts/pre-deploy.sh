#!/bin/bash
# Pre-deploy checklist for LifeStats
# Run before merging staging → main

set -e

echo "📊 LifeStats Pre-Deploy Check"
echo "================================"

echo "📌 Last commit:"
git log --oneline -1

echo ""
echo "🔨 Building..."
npm run build

echo ""
echo "📘 TypeScript check..."
npx tsc --noEmit

echo ""
echo "✅ All checks passed. Safe to merge staging → main."
echo "📝 Update rollback-plan.md with current commit hash before deploying."
