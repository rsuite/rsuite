#!/usr/bin/env node
// Fetch props for a specific React Suite component.
// Usage: node get_component_props.mjs Button
const BASE_URL = process.env.RSUITE_BASE_URL || 'https://rsuitejs.com';

async function main() {
  const name = process.argv[2];
  if (!name) {
    console.error('Usage: node get_component_props.mjs <ComponentName>');
    process.exit(1);
  }
  const id = name.toLowerCase();
  const res = await fetch(`${BASE_URL}/api/types/${id}`);
  if (!res.ok) {
    console.error(`Component "${name}" not found (${res.status}).`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
