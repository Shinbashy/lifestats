#!/usr/bin/env node
/**
 * bundle-size.js — Check JS bundle sizes against thresholds
 * Usage: node scripts/bundle-size.js
 * Scans: /Users/neal/newsletter-reader/app/.next/static/chunks/*.js
 */

const fs   = require('fs');
const path = require('path');

const C = {
  reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m',
  yellow: '\x1b[33m', cyan: '\x1b[36m', bold: '\x1b[1m', dim: '\x1b[2m',
};

const CHUNKS_DIR = path.join('/Users/neal/lifestats/.next/static/chunks');
const WARN_SIZE  = 500 * 1024;  // 500KB
const FAIL_SIZE  = 1024 * 1024; // 1MB
const TOTAL_FAIL = 3 * 1024 * 1024; // 3MB

function fmtBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

function bar(bytes, max) {
  const pct = Math.min(bytes / max, 1);
  const width = 20;
  const filled = Math.round(pct * width);
  return '[' + '█'.repeat(filled) + '░'.repeat(width - filled) + ']';
}

async function run() {
  console.log(`\n${C.bold}📦 JS Bundle Size Check${C.reset}`);

  if (!fs.existsSync(CHUNKS_DIR)) {
    console.log(`${C.yellow}⚠ .next/static/chunks not found at ${CHUNKS_DIR}${C.reset}`);
    console.log(`${C.dim}Run: cd /Users/neal/lifestats && npm run build${C.reset}`);
    console.log(`${C.yellow}Skipping — build first.${C.reset}`);
    process.exit(0);
  }

  const files = fs.readdirSync(CHUNKS_DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => ({
      name: f,
      path: path.join(CHUNKS_DIR, f),
      size: fs.statSync(path.join(CHUNKS_DIR, f)).size,
    }))
    .sort((a, b) => b.size - a.size);

  console.log(`${C.dim}Scanning ${files.length} JS chunks in ${CHUNKS_DIR}${C.reset}`);
  console.log(`${C.dim}Thresholds: WARN >500KB · FAIL >1MB · Total FAIL >3MB${C.reset}\n`);

  let totalSize   = 0;
  let anyFail     = false;

  console.log(`  ${'File'.padEnd(50)} ${'Size'.padStart(10)}  Status`);
  console.log('  ' + '─'.repeat(75));

  for (const { name, size } of files) {
    totalSize += size;
    const display = name.length > 48 ? '…' + name.slice(-47) : name;
    const sizeStr = fmtBytes(size).padStart(10);

    if (size > FAIL_SIZE) {
      anyFail = true;
      console.log(`  ${C.red}${display.padEnd(50)} ${sizeStr}  ✗ FAIL  >1MB${C.reset}`);
    } else if (size > WARN_SIZE) {
      console.log(`  ${C.yellow}${display.padEnd(50)} ${sizeStr}  ⚠ WARN  >500KB${C.reset}`);
    } else {
      console.log(`  ${C.green}${display.padEnd(50)} ${sizeStr}  ✓ OK${C.reset}`);
    }
  }

  console.log('\n  ' + '─'.repeat(75));
  const totalStr = fmtBytes(totalSize).padStart(10);
  const totalStatus = totalSize > TOTAL_FAIL
    ? `${C.red}✗ FAIL — exceeds 3MB total!${C.reset}`
    : `${C.green}✓ OK — under 3MB total${C.reset}`;
  console.log(`  ${'TOTAL'.padEnd(50)} ${totalStr}  ${totalStatus}`);

  if (totalSize > TOTAL_FAIL) anyFail = true;

  // Percentage breakdown
  console.log(`\n  ${C.bold}Largest chunks:${C.reset}`);
  for (const { name, size } of files.slice(0, 5)) {
    const pct = ((size / totalSize) * 100).toFixed(1);
    const display = name.length > 40 ? '…' + name.slice(-39) : name;
    console.log(`    ${display.padEnd(42)} ${bar(size, FAIL_SIZE)} ${pct}% of total`);
  }

  console.log('\n' + '─'.repeat(60));
  if (anyFail) {
    console.log(`${C.red}${C.bold}✗ FAIL — bundle size threshold exceeded.${C.reset}`);
    console.log(`${C.dim}Consider: code splitting, lazy imports, removing large deps.${C.reset}`);
    process.exit(1);
  } else {
    console.log(`${C.green}${C.bold}✅ PASS — All bundle sizes within acceptable limits.${C.reset}`);
    process.exit(0);
  }
}

run();
