#!/usr/bin/env node
// Search React Suite components by name substring.
// Usage: node search_components.mjs picker
const BASE_URL = (process.env.RSUITE_BASE_URL || 'https://rsuitejs.com').replace(/\/+$/, '');

async function main() {
  const query = (process.argv[2] || '').toLowerCase();
  if (!query) {
    console.error('Usage: node search_components.mjs <query>');
    process.exit(1);
  }
  const res = await fetch(`${BASE_URL}/api/types/index`);
  if (!res.ok) {
    console.error(`Failed to fetch index: ${res.status}`);
    process.exit(1);
  }
  const data = await res.json();
  const components = data?.components || [];
  const getId = c => (typeof c === 'string' ? c : c?.id || c?.name || '');
  const matches = components.filter(c => getId(c).toLowerCase().includes(query));
  for (const c of matches) {
    console.log(getId(c));
  }
  console.error(`\n${matches.length} matches for "${query}".`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
