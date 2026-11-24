#!/usr/bin/env node

/**
 * Debug URL construction and network connectivity
 */

console.log('🔍 Debugging URL construction and network connectivity\n');

import('../dist/rsuite-service.js').then(async () => {
  // Test different baseUrl configurations
  const testConfigs = [
    { name: 'Default (rsuitejs.com)', config: {} },
    { 
      name: 'Netlify hostname without trailing slash',
      config: { baseUrl: 'https://rsuite-docs-main.netlify.app' }
    },
    { 
      name: 'Netlify hostname with trailing slash',
      config: { baseUrl: 'https://rsuite-docs-main.netlify.app/' }
    },
    {
      name: 'Local development server',
      config: { baseUrl: 'http://localhost:3002' }
    }
  ];

  for (const { name, config } of testConfigs) {
    console.log(`\n📋 Testing: ${name}`);
    console.log('Config:', JSON.stringify(config, null, 2));
    
    // Test URL construction logic by simulating it
    try {
      const testBaseUrl = config.baseUrl || 'https://rsuitejs.com';
      const finalBaseUrl = testBaseUrl.endsWith('/') ? testBaseUrl.slice(0, -1) : testBaseUrl;
      
      const indexUrl = `${finalBaseUrl}/api/types/index`;
      const buttonUrl = `${finalBaseUrl}/api/types/button`;
      
      console.log('  Index URL:', indexUrl);
      console.log('  Button URL:', buttonUrl);
      
      // Check for double slashes
      if (indexUrl.includes('//api') || buttonUrl.includes('//api')) {
        console.log('  ❌ Double slash detected!');
      } else {
        console.log('  ✅ URL construction looks correct');
      }
      
    } catch (error) {
      console.log('  ❌ Error:', error.message);
    }
  }
  
  console.log('\n🌐 Testing network connectivity...');
  
  // Test basic network connectivity
  const fetch = (await import('node-fetch')).default;
  
  const testUrls = [
    'https://rsuitejs.com',
    'http://localhost:3002'
  ];
  
  for (const url of testUrls) {
    try {
      console.log(`\n  Testing: ${url}`);
      const response = await fetch(url, { timeout: 5000 });
      console.log(`  Status: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
    }
  }
  
}).catch((error) => {
  console.error('❌ Failed to run debug:', error);
});
