#!/usr/bin/env node
/**
 * check-env-leaks.js — Scan built Next.js client bundle for leaked secrets
 * Usage: node scripts/check-env-leaks.js
 * Scans: /Users/neal/newsletter-reader/app/.next/static/chunks/*.js
 */

const fs   = require('fs');
const path = require('path');

const C = {
  reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m',
  yellow: '\x1b[33m', cyan: '\x1b[36m', bold: '\x1b[1m', dim: '\x1b[2m',
};

const CHUNKS_DIR = path.join('/Users/neal/lifestats/.next/static/chunks');

// Patterns to search for (regex, label, critical)
const PATTERNS = [
  { re: /sk-proj-[A-Za-z0-9\-_]{20,}/g,    label: 'OpenAI key (sk-proj-)',       critical: true  },
  { re: /(?<![A-Za-z])sk-[A-Za-z0-9]{20,}/g, label: 'OpenAI key (sk-)',          critical: true  },
  { re: /sbp_[A-Za-z0-9]{30,}/g,            label: 'Supabase mgmt token (sbp_)', critical: true  },
  { re: /whsec_[A-Za-z0-9]{20,}/g,          label: 'Stripe webhook secret',       critical: true  },
  { re: /stripe[_\-]?secret/gi,             label: 'stripe_secret reference',     critical: true  },
  { re: /service_role/g,                    label: 'Supabase service_role key',   critical: true  },
];

function getContext(content, index, contextLen = 80) {
  const start = Math.max(0, index - contextLen);
  const end   = Math.min(content.length, index + contextLen);
  return content.slice(start, end).replace(/\n/g, '\\n');
}

async function run() {
  console.log(`\n${C.bold}🔑 Client Bundle — Secret Leak Scan${C.reset}`);

  // Check .next exists
  if (!fs.existsSync(CHUNKS_DIR)) {
    console.log(`${C.yellow}⚠ .next/static/chunks not found at ${CHUNKS_DIR}${C.reset}`);
    console.log(`${C.dim}Run: cd /Users/neal/lifestats && npm run build${C.reset}`);
    console.log(`${C.yellow}Skipping scan — build first.${C.reset}`);
    process.exit(0);
  }

  const files = fs.readdirSync(CHUNKS_DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(CHUNKS_DIR, f));

  console.log(`${C.dim}Scanning ${files.length} chunk files in ${CHUNKS_DIR}${C.reset}\n`);

  let criticalFinds = 0;
  let totalFinds    = 0;

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative('/Users/neal/lifestats', filePath);

    for (const { re, label, critical } of PATTERNS) {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(content)) !== null) {
        totalFinds++;
        if (critical) criticalFinds++;
        const tag = critical
          ? `${C.red}${C.bold}CRITICAL${C.reset}`
          : `${C.yellow}WARN${C.reset}`;
        console.log(`  ${tag} ${label}`);
        console.log(`    File: ${C.cyan}${relPath}${C.reset}`);
        console.log(`    Context: ${C.dim}…${getContext(content, match.index)}…${C.reset}`);
        console.log();
      }
    }
  }

  console.log('─'.repeat(60));
  if (totalFinds === 0) {
    console.log(`${C.green}${C.bold}✅ PASS — No secrets found in ${files.length} client chunks.${C.reset}`);
    process.exit(0);
  } else {
    console.log(`${C.red}${C.bold}🚨 CRITICAL FAIL — ${totalFinds} potential secret(s) found in client bundle!${C.reset}`);
    console.log(`${C.red}These secrets are visible to anyone who downloads your JS.${C.reset}`);
    console.log(`${C.dim}Fix: ensure secrets are only in server-side code, never in NEXT_PUBLIC_ vars.${C.reset}`);
    process.exit(1);
  }
}

run();
