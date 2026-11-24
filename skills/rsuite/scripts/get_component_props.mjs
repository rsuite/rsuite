#!/usr/bin/env node
// Fetch props for a specific React Suite component.
// Usage: node get_component_props.mjs DatePicker
//        node get_component_props.mjs date-picker
const BASE_URL = (process.env.RSUITE_BASE_URL || 'https://rsuitejs.com').replace(/\/+$/, '');

function toKebabCase(value) {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

async function resolveComponentId(name) {
  const res = await fetch(`${BASE_URL}/api/types/index`);
  if (!res.ok) {
    throw new Error(`Failed to fetch component index (${res.status}).`);
  }
  const data = await res.json();
  const ids = (data?.components || []).map(c =>
    typeof c === 'string' ? c : c?.id || c?.name || ''
  );

  const lower = name.toLowerCase();
  const kebab = toKebabCase(name);
  return (
    ids.find(id => id === name) ||
    ids.find(id => id.toLowerCase() === lower) ||
    ids.find(id => id === kebab) ||
    kebab
  );
}

async function main() {
  const name = process.argv[2];
  if (!name) {
    console.error('Usage: node get_component_props.mjs <ComponentNameOrId>');
    process.exit(1);
  }
  const id = await resolveComponentId(name);
  const res = await fetch(`${BASE_URL}/api/types/${encodeURIComponent(id)}`);
  if (!res.ok) {
    console.error(`Component "${name}" (resolved as "${id}") not found (${res.status}).`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
