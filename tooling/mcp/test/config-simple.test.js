#!/usr/bin/env node

/**
 * Simple configuration test for MCP Server
 */

console.log('🔧 Simple MCP Configuration Test\n');

console.log('Environment variables:');
console.log('RSUITE_MCP_BASE_URL:', process.env.RSUITE_MCP_BASE_URL || 'not set (will use default: https://rsuitejs.com)');
console.log('RSUITE_MCP_VERSION:', process.env.RSUITE_MCP_VERSION || 'not set');

// Test configuration object
const config = {
  baseUrl: process.env.RSUITE_MCP_BASE_URL,
  version: process.env.RSUITE_MCP_VERSION,
};

console.log('\n📋 MCP Service Configuration:');
console.log('Config passed to RSuiteService:', JSON.stringify(config, null, 2));

const finalBaseUrl = config.baseUrl || 'https://rsuitejs.com';
console.log('Final baseUrl that will be used:', finalBaseUrl);

console.log('\n✅ Configuration test completed!');
console.log('\n💡 To use test environment, set:');
console.log('   RSUITE_MCP_BASE_URL=https://rsuite-nextjs-git-feat-mcp-server-improvements-rsuite.vercel.app');
