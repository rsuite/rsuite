#!/usr/bin/env node
// List all React Suite custom hooks.
const BASE_URL = (process.env.RSUITE_BASE_URL || 'https://rsuitejs.com').replace(/\/+$/, '');

async function main() {
  const res = await fetch(`${BASE_URL}/api/types/index`);
  if (!res.ok) {
    console.error(`Failed to fetch index: ${res.status}`);
    process.exit(1);
  }
  const data = await res.json();
  const hooks = data?.hooks || [];
  for (const h of hooks) {
    if (typeof h === 'string') {
      console.log(h);
    } else if (h && typeof h === 'object') {
      const name = h.id || h.name;
      if (name) console.log(name);
    }
  }
  console.error(`\n${hooks.length} hooks.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
