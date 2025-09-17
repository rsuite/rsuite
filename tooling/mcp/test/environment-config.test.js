#!/usr/bin/env node

/**
 * Test environment variable configuration for RSuite MCP Server
 */

console.log('🔧 Testing environment variable configuration...\n');

console.log('Environment variables:');
console.log('RSUITE_MCP_BASE_URL:', process.env.RSUITE_MCP_BASE_URL || 'not set');
console.log('RSUITE_MCP_VERSION:', process.env.RSUITE_MCP_VERSION || 'not set');

// Import service and test configuration
import('../dist/rsuite-service.js').then(({ RSuiteService }) => {
  const config = {
    baseUrl: process.env.RSUITE_MCP_BASE_URL,
    version: process.env.RSUITE_MCP_VERSION,
  };
  
  console.log('\n📋 Service configuration:');
  console.log('Config object:', config);
  
  const service = new RSuiteService(config);
  console.log('✅ RSuiteService created successfully');
  
  // Test actual baseUrl used by service
  console.log('\n🌐 Testing actual baseUrl used by service...');
  // Since baseUrl is private, we test by trying to get components
  service.getComponentsIndex()
    .then(() => {
      console.log('✅ Successfully connected to API');
    })
    .catch((error) => {
      console.log('❌ Failed to connect to API:', error.message);
      console.log('💡 Make sure to set RSUITE_MCP_BASE_URL environment variable');
    });
}).catch((error) => {
  console.error('❌ Failed to import service:', error);
});
