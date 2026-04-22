#!/usr/bin/env node
// List all React Suite components available via the public docs API.
const BASE_URL = (process.env.RSUITE_BASE_URL || 'https://rsuitejs.com').replace(/\/+$/, '');

async function main() {
  const res = await fetch(`${BASE_URL}/api/types/index`);
  if (!res.ok) {
    console.error(`Failed to fetch index: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  const data = await res.json();
  const components = data?.components || [];
  for (const c of components) {
    if (typeof c === 'string') {
      console.log(c);
    } else if (c && typeof c === 'object') {
      const name = c.id || c.name;
      if (name) console.log(name);
    }
  }
  console.error(`\n${components.length} components.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
