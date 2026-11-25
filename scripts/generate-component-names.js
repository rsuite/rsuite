const fs = require('node:fs');
const path = require('node:path');
const { generateComponentRegistry } = require('./component-registry.cjs');

async function main() {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && args[0] !== '--check')) {
    throw new Error('Usage: node scripts/generate-component-names.js [--check]');
  }
  const { filename, contents, entries } = await generateComponentRegistry({
    sourceRoot: path.resolve(__dirname, '../src')
  });
  if (args[0] === '--check') {
    if (!fs.existsSync(filename) || fs.readFileSync(filename, 'utf8') !== contents) {
      throw new Error(
        'Component defaults registry is stale. Run npm run generate:component-types.'
      );
    }
    console.log(`Component defaults registry is current (${entries.length} components).`);
    return;
  }
  fs.writeFileSync(filename, contents);
  console.log(
    `Generated ${path.relative(path.resolve(__dirname, '..'), filename)} (${entries.length} components).`
  );
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
