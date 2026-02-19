#!/usr/bin/env node
/**
 * perf-benchmarks.js — Measure response times for key endpoints
 * Usage: node scripts/perf-benchmarks.js [baseUrl]
 * Default: http://localhost:3009
 */

const BASE_URL = process.argv[2] || 'http://localhost:3009';
const RUNS     = 3;

const C = {
  reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m',
  yellow: '\x1b[33m', cyan: '\x1b[36m', bold: '\x1b[1m', dim: '\x1b[2m',
};

function median(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function fmtMs(ms) {
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(2)}s`;
}

function bar(ms, threshold) {
  const pct   = Math.min(ms / threshold, 1.5);
  const width = 20;
  const filled = Math.round((pct / 1.5) * width);
  const color  = pct > 1 ? C.red : pct > 0.5 ? C.yellow : C.green;
  return color + '[' + '█'.repeat(filled) + '░'.repeat(width - filled) + ']' + C.reset;
}

const ENDPOINTS = [
  {
    label:   'GET /',
    method:  'GET',
    path:    '/',
    threshold: 2000,
  },
  {
    label:   'GET /privacy',
    method:  'GET',
    path:    '/privacy',
    threshold: 2000,
  },
  {
    label:   'GET /terms',
    method:  'GET',
    path:    '/terms',
    threshold: 2000,
  },
  {
    label:   'GET /life-in-numbers',
    method:  'GET',
    path:    '/life-in-numbers',
    threshold: 2000,
  },
  {
    label:    'POST /api/log-submission',
    method:   'POST',
    path:     '/api/log-submission',
    threshold: 3000,
    body:     JSON.stringify({ month: 6, day: 15, year: 1990, gender: 'male', location: 'us' }),
    headers:  { 'Content-Type': 'application/json' },
  },
];

async function timeRequest(url, method, headers = {}, body = undefined) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method,
      headers,
      body,
      signal: AbortSignal.timeout(10000),
      redirect: 'follow',
    });
    const elapsed = Date.now() - start;
    return { ok: true, status: res.status, elapsed };
  } catch (e) {
    return { ok: false, error: e.message, elapsed: Date.now() - start };
  }
}

async function benchEndpoint(ep) {
  const url    = BASE_URL + ep.path;
  const times  = [];
  const statuses = [];

  for (let i = 0; i < RUNS; i++) {
    const result = await timeRequest(url, ep.method, ep.headers ?? {}, ep.body);
    times.push(result.elapsed);
    statuses.push(result.ok ? result.status : `ERR:${result.error?.split('\n')[0]}`);
    // Small gap between requests
    if (i < RUNS - 1) await new Promise(r => setTimeout(r, 200));
  }

  const med       = median(times);
  const threshold = ep.threshold;
  const ratio     = med / threshold;

  let status, color;
  if (!times.every((_, i) => statuses[i].toString().match(/^\d/))) {
    status = 'ERROR'; color = C.red;
  } else if (ratio > 1) {
    status = 'FAIL '; color = C.red;
  } else if (ratio > 0.5) {
    status = 'WARN '; color = C.yellow;
  } else {
    status = 'PASS '; color = C.green;
  }

  return { label: ep.label, med, threshold, status, color, statuses, times };
}

async function run() {
  console.log(`\n${C.bold}⚡ Performance Benchmarks — LifeStats${C.reset}`);
  console.log(`${C.dim}Target: ${BASE_URL}  |  ${RUNS} runs per endpoint, median reported${C.reset}`);
  console.log(`${C.dim}Thresholds: WARN >50% of limit  ·  FAIL >100% of limit${C.reset}\n`);

  // Quick connectivity check
  try {
    await fetch(BASE_URL + '/', { signal: AbortSignal.timeout(3000) });
  } catch {
    console.log(`${C.red}✗ Cannot connect to ${BASE_URL} — is the app running?${C.reset}`);
    console.log(`${C.dim}Start with: pm2 start lifestats${C.reset}`);
    process.exit(1);
  }

  const results = [];
  let anyFail = false;

  console.log(`  ${'Endpoint'.padEnd(32)} ${'Median'.padStart(8)}  ${'Limit'.padStart(8)}  ${'Progress'.padStart(22)}  Status`);
  console.log('  ' + '─'.repeat(85));

  for (const ep of ENDPOINTS) {
    process.stdout.write(`  ${ep.label.padEnd(32)} ${'…'.padStart(8)}\r`);
    const r = await benchEndpoint(ep);
    results.push(r);

    const medStr    = fmtMs(r.med).padStart(8);
    const limitStr  = fmtMs(r.threshold).padStart(8);
    const progress  = bar(r.med, r.threshold).padStart(22);
    const runs      = r.times.map(t => fmtMs(t)).join(', ');

    if (r.status === 'FAIL ') anyFail = true;

    console.log(
      `  ${r.label.padEnd(32)} ${medStr}  ${limitStr}  ${progress}  ${r.color}${r.status}${C.reset}`
    );
    console.log(`    ${C.dim}Runs: [${runs}]  Status codes: [${r.statuses.join(', ')}]${C.reset}`);
  }

  console.log('\n' + '─'.repeat(60));
  if (anyFail) {
    const failures = results.filter(r => r.status === 'FAIL ');
    console.log(`${C.red}${C.bold}✗ FAIL — ${failures.length} endpoint(s) over threshold:${C.reset}`);
    for (const r of failures) {
      console.log(`  ${C.red}• ${r.label}: ${fmtMs(r.med)} (limit: ${fmtMs(r.threshold)})${C.reset}`);
    }
    process.exit(1);
  } else {
    const warned = results.filter(r => r.status === 'WARN ');
    if (warned.length > 0) {
      console.log(`${C.yellow}${C.bold}⚠ WARN — ${warned.length} endpoint(s) above 50% of threshold:${C.reset}`);
      for (const r of warned) {
        console.log(`  ${C.yellow}• ${r.label}: ${fmtMs(r.med)} (limit: ${fmtMs(r.threshold)})${C.reset}`);
      }
    }
    console.log(`${C.green}${C.bold}✅ PASS — All endpoints within time limits.${C.reset}`);
    process.exit(0);
  }
}

run();
