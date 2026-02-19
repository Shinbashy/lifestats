#!/usr/bin/env node
/**
 * security-headers.js — Check HTTP security headers
 * Usage: node scripts/security-headers.js [baseUrl]
 * Default: http://localhost:3016
 */

const BASE_URL = process.argv[2] || 'http://localhost:3016';

const C = {
  reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m',
  yellow: '\x1b[33m', cyan: '\x1b[36m', bold: '\x1b[1m', dim: '\x1b[2m',
};

const pass  = (label, note = '') => console.log(`  ${C.green}✓ PASS${C.reset}  ${label}${note ? C.dim + ' — ' + note + C.reset : ''}`);
const fail  = (label, note = '') => console.log(`  ${C.red}✗ FAIL${C.reset}  ${label}${note ? C.dim + ' — ' + note + C.reset : ''}`);
const warn  = (label, note = '') => console.log(`  ${C.yellow}⚠ WARN${C.reset}  ${label}${note ? C.dim + ' — ' + note + C.reset : ''}`);
const info  = (msg)              => console.log(`${C.cyan}${msg}${C.reset}`);

let passed = 0, failed = 0, warned = 0, criticalFails = 0;

function tpass(label, note) { pass(label, note); passed++; }
function tfail(label, note, critical = false) { fail(label, note); failed++; if (critical) criticalFails++; }
function twarn(label, note) { warn(label, note); warned++; }

async function run() {
  console.log(`\n${C.bold}🔒 Security Headers Audit${C.reset}`);
  console.log(`${C.dim}Target: ${BASE_URL}${C.reset}\n`);

  let headers;
  try {
    const res = await fetch(BASE_URL, { redirect: 'follow', signal: AbortSignal.timeout(8000) });
    headers = {};
    res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });
    console.log(`${C.dim}HTTP ${res.status} ${res.statusText}${C.reset}\n`);
  } catch (e) {
    console.error(`${C.red}✗ Could not connect to ${BASE_URL}: ${e.message}${C.reset}`);
    process.exit(1);
  }

  info('── Clickjacking protection ──');
  const hasXFO = !!headers['x-frame-options'];
  const hasCSPFrameAncestors = headers['content-security-policy']?.includes('frame-ancestors');
  if (hasXFO || hasCSPFrameAncestors) {
    tpass('Clickjacking protection', hasXFO ? `x-frame-options: ${headers['x-frame-options']}` : 'CSP frame-ancestors present');
  } else {
    tfail('Clickjacking protection', 'Missing x-frame-options AND CSP frame-ancestors', true);
  }

  info('── MIME sniffing ──');
  const xcto = headers['x-content-type-options'];
  if (xcto?.toLowerCase() === 'nosniff') {
    tpass('x-content-type-options: nosniff', xcto);
  } else {
    tfail('x-content-type-options: nosniff', `Got: ${xcto ?? 'missing'}`, true);
  }

  info('── HTTPS enforcement (HSTS) ──');
  const hsts = headers['strict-transport-security'];
  if (hsts) {
    tpass('strict-transport-security', hsts);
  } else if (BASE_URL.startsWith('http://localhost')) {
    twarn('strict-transport-security', 'Not set — expected on localhost (ok for dev)');
  } else {
    tfail('strict-transport-security', 'Missing on non-localhost target', true);
  }

  info('── XSS protection (legacy) ──');
  const xxss = headers['x-xss-protection'];
  if (xxss) {
    tpass('x-xss-protection', xxss);
  } else {
    twarn('x-xss-protection', 'Not set — legacy header, nice-to-have');
  }

  info('── Referrer policy ──');
  const rp = headers['referrer-policy'];
  if (rp) {
    tpass('referrer-policy', rp);
  } else {
    tfail('referrer-policy', 'Missing — privacy concern', false);
  }

  info('── Permissions policy ──');
  const pp = headers['permissions-policy'];
  if (pp) {
    tpass('permissions-policy', pp.substring(0, 80) + (pp.length > 80 ? '…' : ''));
  } else {
    twarn('permissions-policy', 'Not set — feature policy missing');
  }

  info('── Tech stack leakage ──');
  const xpb = headers['x-powered-by'];
  if (!xpb) {
    tpass('No x-powered-by header', 'Server identity not leaked');
  } else {
    tfail('x-powered-by present', `Leaks: ${xpb}`, false);
  }

  info('── Content Security Policy ──');
  const csp = headers['content-security-policy'];
  if (csp) {
    tpass('content-security-policy present', csp.substring(0, 100) + (csp.length > 100 ? '…' : ''));
  } else {
    tfail('content-security-policy', 'Missing — XSS risk', true);
  }

  // Summary
  console.log('\n' + '─'.repeat(60));
  const total = passed + failed + warned;
  console.log(`${C.bold}Results: ${C.green}${passed} PASS${C.reset}  ${C.red}${failed} FAIL${C.reset}  ${C.yellow}${warned} WARN${C.reset}  (${total} checks)`);
  if (criticalFails > 0) {
    console.log(`${C.red}${C.bold}⚠ ${criticalFails} critical failure(s) — fix before production!${C.reset}`);
    process.exit(1);
  } else if (failed > 0) {
    console.log(`${C.yellow}${C.bold}${failed} non-critical failure(s) — should be addressed.${C.reset}`);
    process.exit(1);
  } else {
    console.log(`${C.green}${C.bold}✅ All critical security headers present.${C.reset}`);
    process.exit(0);
  }
}

run();
