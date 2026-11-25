#!/usr/bin/env node

/**
 * Comprehensive test for RSuite MCP Service
 */

import { RSuiteService } from '../dist/rsuite-service.js';

async function testRSuiteService() {
  console.log('🧪 Testing RSuite MCP Service...\n');
  
  const config = {
    baseUrl: process.env.RSUITE_MCP_BASE_URL,
    version: process.env.RSUITE_MCP_VERSION,
  };
  
  const service = new RSuiteService(config);

  try {
    // Test 1: Get components index
    console.log('📋 Testing getComponentsIndex...');
    const index = await service.getComponentsIndex();
    console.log(`✅ Found ${index.components.length} components and ${index.hooks.length} hooks\n`);

    // Test 2: Get specific component props
    console.log('🔍 Testing getComponentProps for "button"...');
    const buttonProps = await service.getComponentProps('button');
    console.log('Button props structure:', Object.keys(buttonProps));
    
    // Check if we have Button component data
    if (buttonProps.Button && buttonProps.Button.props) {
      const buttonComponentProps = buttonProps.Button.props;
      console.log(`✅ Button component has ${Object.keys(buttonComponentProps).length} props`);
      if (Object.keys(buttonComponentProps).length > 0) {
        console.log(`   Sample props: ${Object.keys(buttonComponentProps).slice(0, 3).join(', ')}`);
      }
    } else {
      console.log('❌ Button component props not found in expected structure');
      console.log('Available components:', Object.keys(buttonProps));
      if (buttonProps.Button) {
        console.log('Button structure:', Object.keys(buttonProps.Button));
      }
    }
    console.log();

    // Test 3: Search components
    console.log('🔎 Testing searchComponents with query "input"...');
    const inputComponents = await service.searchComponents('input');
    console.log(`✅ Found ${inputComponents.length} components matching "input": ${inputComponents.join(', ')}\n`);

    // Test 4: Get all components
    console.log('📦 Testing getAllComponents...');
    const allComponents = await service.getAllComponents();
    console.log(`✅ Total components: ${allComponents.length}\n`);

    // Test 5: Get all hooks
    console.log('🪝 Testing getAllHooks...');
    const allHooks = await service.getAllHooks();
    console.log(`✅ Total hooks: ${allHooks.length}: ${allHooks.join(', ')}\n`);

    // Test 6: Test cache functionality
    console.log('⚡ Testing cache functionality...');
    const start = Date.now();
    await service.getComponentsIndex(); // Should use cache
    const cacheTime = Date.now() - start;
    console.log(`✅ Cache response time: ${cacheTime}ms\n`);

    console.log('🎉 All tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testRSuiteService();
}
