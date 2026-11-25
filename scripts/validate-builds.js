#!/usr/bin/env node

/**
 * Script to validate builds from the lib directory
 * This is used in the prepublishOnly npm script
 */

const path = require('path');
const { execSync } = require('child_process');

// Change to the project root directory (parent of lib)
process.chdir(path.join(__dirname, '..'));

try {
  // Run the validation test using vitest
  execSync('VITEST_RUNNING_POSTBUILD=true npx vitest run --environment=node test/validateBuilds.spec.ts', {
    stdio: 'inherit'
  });

  console.log('✅ Build validation successful!');
  process.exit(0);
} catch (err) {
  console.error('❌ Build validation failed:', err.message);
  process.exit(1);
}
