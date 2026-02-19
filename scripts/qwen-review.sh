#!/usr/bin/env bash
# Qwen Code Review — Newsletter Reader
# Sends the latest git diff to Qwen 2.5 32B for automated code review.
# Usage: bash scripts/qwen-review.sh [HEAD~N HEAD~M]
#   Default: reviews HEAD~1..HEAD

set -euo pipefail

QWEN_HOST="http://192.168.68.64:11434"
QWEN_MODEL="qwen2.5:32b"
OUTFILE="/tmp/qwen-review-$(date +%Y%m%d-%H%M).txt"

# Change to repo root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

echo ""
echo "🤖 Qwen Code Review"
echo "   Model  : $QWEN_MODEL"
echo "   Host   : $QWEN_HOST"
echo "   Output : $OUTFILE"
echo ""

# ── 1. Get the diff ───────────────────────────────────────────────────────────
FROM="${1:-HEAD~1}"
TO="${2:-HEAD}"

echo "📄 Getting diff: $FROM → $TO"
DIFF=$(git diff "$FROM" "$TO" 2>/dev/null || true)

if [ -z "$DIFF" ]; then
  echo "⚠️  No diff found between $FROM and $TO."
  echo "   Trying git diff HEAD (unstaged changes)..."
  DIFF=$(git diff HEAD 2>/dev/null || true)
fi

if [ -z "$DIFF" ]; then
  echo "⚠️  No changes found. Showing last commit instead (git show HEAD)..."
  DIFF=$(git show HEAD --stat 2>/dev/null || echo "(no git history)")
fi

DIFF_LEN=${#DIFF}
echo "   Diff size: ${DIFF_LEN} characters"

# Truncate very large diffs to avoid Ollama timeouts
MAX_CHARS=12000
if [ "$DIFF_LEN" -gt "$MAX_CHARS" ]; then
  echo "   ⚠️  Diff truncated to ${MAX_CHARS} chars for Qwen context window"
  DIFF="${DIFF:0:$MAX_CHARS}"$'\n\n[...TRUNCATED...]'
fi

# ── 2. Build the prompt ───────────────────────────────────────────────────────
PROMPT="Review this code diff for the Newsletter Reader app (Next.js 16, TypeScript, Supabase, Stripe).

Identify and report on:
1. **Bugs** — logic errors, off-by-one, wrong conditions, data corruption
2. **Security issues** — XSS, injection, exposed secrets, insecure defaults, missing auth checks
3. **Data leaks** — PII exposure, over-fetching, missing field filtering
4. **Missing error handling** — uncaught exceptions, unhandled promise rejections, missing status checks
5. **Mock data that should be real data** — hardcoded test values, \`USE_MOCK_DATA\` paths leaking to prod, fake IDs

For each issue found, be specific: file:line and what the problem is.
If the diff is clean, say so clearly.

Here is the diff:
\`\`\`diff
${DIFF}
\`\`\`"

# ── 3. Check Ollama is reachable ─────────────────────────────────────────────
echo ""
echo "🔌 Checking Ollama at $QWEN_HOST..."
if ! curl -sf "$QWEN_HOST/api/tags" > /dev/null 2>&1; then
  echo "❌ Cannot reach Ollama at $QWEN_HOST"
  echo "   Make sure Ollama is running on the Mac Studio."
  exit 1
fi
echo "   ✓ Ollama is up"

# ── 4. Check model is available ──────────────────────────────────────────────
MODELS_JSON=$(curl -sf "$QWEN_HOST/api/tags" 2>/dev/null || echo '{}')
if echo "$MODELS_JSON" | grep -q "$QWEN_MODEL"; then
  echo "   ✓ Model $QWEN_MODEL is available"
else
  echo "   ⚠️  Model $QWEN_MODEL not found. Available models:"
  echo "$MODELS_JSON" | python3 -c "import sys, json; m = json.load(sys.stdin); [print('     -', x['name']) for x in m.get('models', [])]" 2>/dev/null || echo "$MODELS_JSON"
  # Try with qwen2.5 variants
  FALLBACK=$(echo "$MODELS_JSON" | python3 -c "import sys, json; m = json.load(sys.stdin); models = m.get('models', []); q = [x['name'] for x in models if 'qwen' in x['name'].lower()]; print(q[0] if q else '')" 2>/dev/null || true)
  if [ -n "$FALLBACK" ]; then
    echo "   ↳ Falling back to: $FALLBACK"
    QWEN_MODEL="$FALLBACK"
  else
    echo "   ❌ No Qwen model available. Cannot continue."
    exit 1
  fi
fi

# ── 5. Send to Qwen ──────────────────────────────────────────────────────────
echo ""
echo "🧠 Sending diff to $QWEN_MODEL for review..."
echo "   (This may take 30–90 seconds)"
echo ""

# Build JSON payload
PAYLOAD=$(python3 -c "
import json, sys
payload = {
    'model': sys.argv[1],
    'prompt': sys.argv[2],
    'stream': False,
    'options': {
        'temperature': 0.2,
        'num_predict': 2048
    }
}
print(json.dumps(payload))
" "$QWEN_MODEL" "$PROMPT" 2>/dev/null)

# Call Ollama
RESPONSE=$(curl -s \
  --max-time 180 \
  -X POST "$QWEN_HOST/api/generate" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" 2>/dev/null)

# Extract the response text
REVIEW=$(echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(data.get('response', '(no response from model)'))
" 2>/dev/null || echo "(failed to parse Qwen response)")

# ── 6. Output ─────────────────────────────────────────────────────────────────
HEADER="╔══════════════════════════════════════════════════════════════════╗
║  QWEN CODE REVIEW — Newsletter Reader                            ║
║  Model : $QWEN_MODEL
║  Diff  : $FROM → $TO
║  Date  : $(date)
╚══════════════════════════════════════════════════════════════════╝
"

echo "$HEADER"
echo "$REVIEW"
echo ""
echo "─────────────────────────────────────────────────────────────────"

# Save to file
{
  echo "$HEADER"
  echo "$REVIEW"
} > "$OUTFILE"

echo "💾 Review saved to: $OUTFILE"
echo ""
