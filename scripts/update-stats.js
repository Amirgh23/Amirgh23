#!/usr/bin/env node
'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const profilePath = path.join(root, 'data', 'profile.json');
const svgDir = path.join(root, 'assets', 'svg');
const token = process.env.GITHUB_TOKEN || '';

const xml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&apos;', '"': '&quot;' })[char]);
const compactDate = (value) => new Date(value).toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

async function github(endpoint) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'neural-nexus-profile', 'X-GitHub-Api-Version': '2022-11-28' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`https://api.github.com${endpoint}`, { headers });
  if (!response.ok) throw new Error(`GitHub API ${response.status} for ${endpoint}`);
  return response.json();
}

function activitySvg(profile, data) {
  const logs = [
    ['ONLINE', 'NEURAL CORE SYNCHRONIZED'],
    ['PROJECT', `LATEST REPOSITORY: ${data.latest.name}`],
    ['SYSTEM', `${data.user.public_repos} PUBLIC REPOSITORIES INDEXED`],
    ['NETWORK', `${data.user.followers} FOLLOWERS · ${data.stars} STARS RECEIVED`],
    ['LANG', `PRIMARY SIGNALS: ${data.languages.join(' / ') || 'UNCLASSIFIED'}`],
    ['UPDATE', `LAST PUSH: ${compactDate(data.latest.pushed_at)}`]
  ];
  const rows = logs.map(([tag, message], i) => `<g transform="translate(55 ${126 + i * 54})"><circle r="4" fill="${i === 0 ? '#39FF14' : '#00F7FF'}"/><text x="20" y="4" class="tag">[${xml(tag)}]</text><text x="135" y="4" class="msg">${xml(message)}</text><path d="M0 24H1090" stroke="#172033"/></g>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="500" viewBox="0 0 1200 500" role="img" aria-labelledby="activity-title activity-desc"><title id="activity-title">Live intelligence feed</title><desc id="activity-desc">Public GitHub activity for ${xml(profile.name)}, generated ${xml(data.generated)}.</desc><defs><pattern id="act-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#00F7FF" stroke-opacity=".04"/></pattern><style>.mono,.tag,.msg{font-family:'Share Tech Mono','Courier New',monospace}.tag{fill:#00F7FF;font-size:12px}.msg{fill:#D9FAFF;font-size:13px}</style></defs><path d="M16 0H1184L1200 16V484L1184 500H16L0 484V16Z" fill="#02030A" stroke="#00F7FF"/><path d="M0 0h1200v500H0z" fill="url(#act-grid)"/><text x="38" y="47" class="mono" fill="#00F7FF" font-size="18" letter-spacing="5">LIVE INTELLIGENCE FEED</text><text x="38" y="75" class="mono" fill="#60758F" font-size="10">SOURCE: GITHUB PUBLIC API // GENERATED ${xml(data.generated)}</text><text x="1010" y="47" class="mono" fill="#39FF14" font-size="11">● LIVE SNAPSHOT</text>${rows}<text x="55" y="466" class="mono" fill="#60758F" font-size="10">PROFILE NODE ${xml(profile.nodeId)} // RATE-LIMIT SAFE // NO PRIVATE TELEMETRY</text></svg>`;
}

function neuralSvg(profile, data) {
  const cards = [
    ['NEURAL CORE', '94%', 94, '#00F7FF'], ['AGENT NETWORK', `${Math.min(data.user.public_repos, 99)} NODES`, Math.min(data.user.public_repos * 5, 92), '#FF2BD6'],
    ['VECTOR MEMORY', `${data.user.public_repos} REPOS`, 76, '#8B5CF6'], ['SECURITY LAYER', profile.securityStatus, 88, '#39FF14'],
    ['MODEL ROUTER', 'OPERATIONAL', 82, '#00F7FF'], ['COMPUTE NODE', profile.computeNode, 90, '#FF2BD6']
  ];
  const blocks = cards.map(([name, value, level, color], i) => { const x = 38 + (i % 3) * 376; const y = 82 + Math.floor(i / 3) * 190; return `<g transform="translate(${x} ${y})"><path d="M0 12L12 0h328l12 12v140l-12 12H0Z" fill="#050816" stroke="${color}" stroke-opacity=".55"/><text x="18" y="31" class="name">${xml(name)}</text><text x="18" y="67" class="value">${xml(value)}</text><rect x="18" y="91" width="316" height="6" fill="#172033"/><rect x="18" y="91" width="${Math.round(316 * level / 100)}" height="6" fill="${color}"/><path d="M18 126l35-11 35 5 35-24 35 15 35-31 35 22 35-9 35 18" fill="none" stroke="${color}" stroke-opacity=".7"/><text x="18" y="148" class="meta">ID N-${String(i + 1).padStart(2, '0')} // UPDATE ${xml(data.generated.slice(0, 10))}</text></g>`; }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="480" viewBox="0 0 1200 480" role="img" aria-labelledby="core-title core-desc"><title id="core-title">Neural core dashboard</title><desc id="core-desc">System status modules generated from profile configuration and public GitHub data.</desc><defs><style>.name,.value,.meta{font-family:'Share Tech Mono','Courier New',monospace}.name{fill:#60758F;font-size:11px}.value{fill:#D9FAFF;font-size:15px}.meta{fill:#60758F;font-size:9px}</style></defs><path d="M16 0H1184L1200 16V464L1184 480H16L0 464V16Z" fill="#02030A" stroke="#8B5CF6"/><text x="38" y="45" class="name" fill="#00F7FF" font-size="17">NEURAL CORE // SYSTEM TELEMETRY</text>${blocks}</svg>`;
}

async function main() {
  const profile = JSON.parse(await fs.readFile(profilePath, 'utf8'));
  try {
    const [user, repos] = await Promise.all([github(`/users/${encodeURIComponent(profile.username)}`), github(`/users/${encodeURIComponent(profile.username)}/repos?per_page=100&sort=pushed`)]);
    const owned = repos.filter((repo) => !repo.fork);
    const latest = owned.find((repo) => repo.name.toLowerCase() !== profile.username.toLowerCase()) || owned[0];
    if (!latest) throw new Error('No public repositories returned');
    const stars = owned.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const languages = [...new Set(owned.map((repo) => repo.language).filter(Boolean))].slice(0, 4);
    const generated = new Date().toISOString();
    const data = { user, latest, stars, languages, generated };
    await fs.mkdir(svgDir, { recursive: true });
    await Promise.all([fs.writeFile(path.join(svgDir, 'activity.svg'), activitySvg(profile, data)), fs.writeFile(path.join(svgDir, 'neural-core.svg'), neuralSvg(profile, data))]);
    profile.lastUpdated = generated;
    await fs.writeFile(profilePath, `${JSON.stringify(profile, null, 2)}\n`);
    console.log(`Neural Nexus updated from public GitHub data at ${generated}.`);
  } catch (error) {
    const outputsExist = await Promise.all(['activity.svg', 'neural-core.svg'].map(async (file) => { try { await fs.access(path.join(svgDir, file)); return true; } catch { return false; } }));
    if (outputsExist.every(Boolean)) { console.warn(`GitHub data unavailable; preserving last valid SVGs. ${error.message}`); return; }
    throw error;
  }
}

main().catch((error) => { console.error(`Profile generation failed: ${error.message}`); process.exitCode = 1; });
