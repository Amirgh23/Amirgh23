#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const svgRefs = [...readme.matchAll(/src="\.\/(assets\/svg\/[^"]+\.svg)"/g)].map((m) => m[1]);
const files = [];
function walk(dir) { for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { const full = path.join(dir, entry.name); entry.isDirectory() ? walk(full) : entry.name.endsWith('.svg') && files.push(full); } }
walk(path.join(root, 'assets', 'svg'));
const failures = [];
for (const ref of svgRefs) if (!fs.existsSync(path.join(root, ref))) failures.push(`Missing README image: ${ref}`);
for (const file of files) { const source = fs.readFileSync(file, 'utf8'); if (!source.startsWith('<svg') || !source.includes('</svg>')) failures.push(`Malformed SVG wrapper: ${file}`); if (!/viewBox="0 0 \d+ \d+"/.test(source)) failures.push(`Missing viewBox: ${file}`); if (/<script\b/i.test(source) || /javascript:/i.test(source)) failures.push(`Unsafe SVG content: ${file}`); if (!/<title\b/.test(source) || !/<desc\b/.test(source)) failures.push(`Missing title/desc: ${file}`); }
const all = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n') + readme;
if (/(ghp_|github_pat_|AIza|BEGIN (RSA |OPENSSH )?PRIVATE KEY)/i.test(all)) failures.push('Credential-like content detected');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Validated ${files.length} SVG files and ${svgRefs.length} README image references.`);
