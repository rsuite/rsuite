#!/usr/bin/env node

/**
 * Test runner for all RSuite MCP tests
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tests = [
  {
    name: 'Configuration Simple Test',
    file: 'config-simple.test.js',
    description: 'Test basic configuration setup'
  },
  {
    name: 'Environment Configuration Test',
    file: 'environment-config.test.js',
    description: 'Test environment variable configuration',
    env: { RSUITE_MCP_BASE_URL: 'http://localhost:3000' }
  },
  {
    name: 'URL Debug Test',
    file: 'url-debug.test.js',
    description: 'Debug URL construction and connectivity'
  },
  {
    name: 'Local API Test',
    file: 'local-api.test.js',
    description: 'Test local development API endpoints'
  },
  {
    name: 'MCP Service Test',
    file: 'mcp-service.test.js',
    description: 'Comprehensive MCP service functionality test',
    env: { RSUITE_MCP_BASE_URL: 'http://localhost:3000' }
  }
];

async function runTest(test) {
  return new Promise((resolve) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🧪 Running: ${test.name}`);
    console.log(`📝 ${test.description}`);
    console.log(`${'='.repeat(60)}\n`);

    const testFile = join(__dirname, test.file);
    const env = { ...process.env, ...test.env };
    
    const child = spawn('node', [testFile], {
      stdio: 'inherit',
      env
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${test.name} completed successfully`);
      } else {
        console.log(`\n❌ ${test.name} failed with exit code ${code}`);
      }
      resolve(code);
    });

    child.on('error', (error) => {
      console.error(`\n❌ ${test.name} failed to start:`, error.message);
      resolve(1);
    });
  });
}

async function runAllTests() {
  console.log('🚀 Starting RSuite MCP Test Suite\n');
  
  let passedTests = 0;
  let failedTests = 0;

  for (const test of tests) {
    const exitCode = await runTest(test);
    if (exitCode === 0) {
      passedTests++;
    } else {
      failedTests++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 Test Results Summary');
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`📈 Total:  ${passedTests + failedTests}`);
  
  if (failedTests === 0) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the output above.');
  }
}

// Run all tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(console.error);
}
