#!/usr/bin/env node
/**
 * seo-pwa-audit.js — SEO and PWA requirements check
 * Usage: node scripts/seo-pwa-audit.js [baseUrl]
 * Default: http://localhost:3016
 */

const BASE_URL = process.argv[2] || 'http://localhost:3009';

const C = {
  reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m',
  yellow: '\x1b[33m', cyan: '\x1b[36m', bold: '\x1b[1m', dim: '\x1b[2m',
};

let passed = 0, failed = 0, warned = 0, criticalFails = 0;

function tpass(label, note = '') {
  console.log(`  ${C.green}✓ PASS${C.reset}  ${label}${note ? C.dim + ' — ' + note + C.reset : ''}`);
  passed++;
}
function tfail(label, note = '', critical = false) {
  console.log(`  ${C.red}✗ FAIL${C.reset}  ${label}${note ? C.dim + ' — ' + note + C.reset : ''}`);
  failed++;
  if (critical) criticalFails++;
}
function twarn(label, note = '') {
  console.log(`  ${C.yellow}⚠ WARN${C.reset}  ${label}${note ? C.dim + ' — ' + note + C.reset : ''}`);
  warned++;
}
function section(title) { console.log(`\n${C.cyan}${C.bold}${title}${C.reset}`); }

async function doFetch(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000), redirect: 'follow' });
    const body = await res.text().catch(() => '');
    return { status: res.status, body, ok: true };
  } catch (e) {
    return { status: null, body: '', ok: false, error: e.message };
  }
}

function extractTag(html, pattern) {
  const m = html.match(pattern);
  return m ? m[0] : null;
}

async function auditHomepage() {
  section('🏠 Homepage HTML Audit');
  const r = await doFetch(BASE_URL + '/');
  if (!r.ok || !r.status) {
    console.log(`  ${C.red}✗${C.reset}  Could not fetch homepage: ${r.error}`);
    return false;
  }
  if (r.status !== 200) {
    console.log(`  ${C.red}✗${C.reset}  Homepage returned HTTP ${r.status}`);
    return false;
  }

  const html = r.body;

  // Title tag
  const title = extractTag(html, /<title[^>]*>[^<]+<\/title>/i);
  if (title) {
    tpass('<title> tag', title.slice(0, 80));
  } else {
    tfail('<title> tag missing', 'Critical for SEO', true);
  }

  // Meta description
  const desc = extractTag(html, /<meta[^>]+name=["']description["'][^>]*>/i)
    ?? extractTag(html, /<meta[^>]+content=["'][^"']+["'][^>]+name=["']description["'][^>]*>/i);
  if (desc) {
    const content = desc.match(/content=["']([^"']{0,100})/i)?.[1] ?? '(present)';
    tpass('<meta name="description">', content);
  } else {
    tfail('<meta name="description"> missing', 'Important for search snippets');
  }

  // OG title
  const ogTitle = extractTag(html, /<meta[^>]+property=["']og:title["'][^>]*>/i)
    ?? extractTag(html, /<meta[^>]+content=["'][^"']+["'][^>]+property=["']og:title["'][^>]*>/i);
  if (ogTitle) {
    tpass('<meta property="og:title">', 'Open Graph title present');
  } else {
    twarn('<meta property="og:title"> missing', 'Affects social sharing previews');
  }

  // OG description
  const ogDesc = extractTag(html, /<meta[^>]+property=["']og:description["'][^>]*>/i)
    ?? extractTag(html, /<meta[^>]+content=["'][^"']+["'][^>]+property=["']og:description["'][^>]*>/i);
  if (ogDesc) {
    tpass('<meta property="og:description">', 'Open Graph description present');
  } else {
    twarn('<meta property="og:description"> missing', 'Affects social sharing previews');
  }

  // Viewport
  const viewport = extractTag(html, /<meta[^>]+name=["']viewport["'][^>]*>/i)
    ?? extractTag(html, /<meta[^>]+content=["'][^"']+["'][^>]+name=["']viewport["'][^>]*>/i);
  if (viewport) {
    tpass('<meta name="viewport">', 'Mobile viewport set');
  } else {
    tfail('<meta name="viewport"> missing', 'Required for mobile — critical', true);
  }

  // Manifest link (PWA)
  const manifest = extractTag(html, /<link[^>]+rel=["']manifest["'][^>]*>/i)
    ?? extractTag(html, /<link[^>]+href=["'][^"']+["'][^>]+rel=["']manifest["'][^>]*>/i);
  if (manifest) {
    tpass('<link rel="manifest">', 'PWA manifest linked');
  } else {
    twarn('<link rel="manifest"> missing', 'Required for PWA install prompt');
  }

  // Apple touch icon
  const appleIcon = extractTag(html, /<link[^>]+rel=["']apple-touch-icon["'][^>]*>/i)
    ?? extractTag(html, /<link[^>]+href=["'][^"']+["'][^>]+rel=["']apple-touch-icon["'][^>]*>/i);
  if (appleIcon) {
    tpass('<link rel="apple-touch-icon">', 'iOS home screen icon');
  } else {
    twarn('<link rel="apple-touch-icon"> missing', 'Nice-to-have for iOS PWA');
  }

  return true;
}

async function auditManifest() {
  section('📱 PWA Manifest (/manifest.webmanifest)');
  // Next.js serves the manifest at /manifest.webmanifest
  const r = await doFetch(BASE_URL + '/manifest.webmanifest')
    .then(res => res.status === 404 ? doFetch(BASE_URL + '/manifest.json') : res);
  if (!r.ok || r.status === 404) {
    tfail('/manifest.json not found or unreachable', r.error ?? `HTTP ${r.status}`);
    return;
  }
  if (r.status !== 200) {
    tfail(`/manifest.json returned HTTP ${r.status}`);
    return;
  }
  let manifest;
  try {
    manifest = JSON.parse(r.body);
  } catch {
    tfail('/manifest.json returned invalid JSON', r.body.slice(0, 100));
    return;
  }
  tpass('/manifest.json reachable and valid JSON');

  if (manifest.name) {
    tpass('manifest.name', manifest.name);
  } else {
    tfail('manifest missing "name" field');
  }
  if (manifest.icons && Array.isArray(manifest.icons) && manifest.icons.length > 0) {
    tpass('manifest.icons', `${manifest.icons.length} icon(s) defined`);
  } else {
    twarn('manifest.icons missing or empty', 'Icons needed for install prompt');
  }
  if (manifest.start_url) {
    tpass('manifest.start_url', manifest.start_url);
  } else {
    twarn('manifest.start_url missing');
  }
}

async function auditRobots() {
  section('🤖 /robots.txt');
  const r = await doFetch(BASE_URL + '/robots.txt');
  if (r.ok && r.status === 200) {
    tpass('/robots.txt reachable', r.body.slice(0, 60).replace(/\n/g, '\\n'));
  } else if (r.status === 404) {
    twarn('/robots.txt not found', 'Recommended — tells crawlers what to index');
  } else {
    tfail(`/robots.txt returned HTTP ${r.status ?? 'error'}`, r.error ?? '');
  }
}

async function run() {
  console.log(`\n${C.bold}🔍 SEO + PWA Audit — LifeStats${C.reset}`);
  console.log(`${C.dim}Target: ${BASE_URL}${C.reset}`);

  const ok = await auditHomepage();
  if (ok) {
    await auditManifest();
    await auditRobots();
  }

  console.log('\n' + '─'.repeat(60));
  const total = passed + failed + warned;
  console.log(`${C.bold}Results: ${C.green}${passed} PASS${C.reset}  ${C.red}${failed} FAIL${C.reset}  ${C.yellow}${warned} WARN${C.reset}  (${total} checks)`);

  if (criticalFails > 0) {
    console.log(`${C.red}${C.bold}✗ FAIL — ${criticalFails} critical SEO/PWA issue(s) found.${C.reset}`);
    process.exit(1);
  } else if (failed > 0) {
    console.log(`${C.yellow}${C.bold}⚠ PARTIAL — ${failed} non-critical issue(s). Fix before launch.${C.reset}`);
    process.exit(1);
  } else {
    console.log(`${C.green}${C.bold}✅ PASS — All critical SEO + PWA requirements met.${C.reset}`);
    process.exit(0);
  }
}

run();
