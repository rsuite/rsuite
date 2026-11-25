#!/usr/bin/env node

/**
 * Test local API endpoints
 */

import fetch from 'node-fetch';

async function testLocalAPI() {
  console.log('🧪 Testing local API endpoints...\n');

  const baseUrl = 'http://localhost:3000';

  try {
    // Test index API
    console.log('📋 Testing /api/types/index...');
    const indexResponse = await fetch(`${baseUrl}/api/types/index`);

    if (indexResponse.ok) {
      const indexData = await indexResponse.json();
      console.log('✅ Index API works!');
      console.log(`   Found ${indexData.components?.length || 0} components`);
      console.log(`   Found ${indexData.hooks?.length || 0} hooks`);
    } else {
      console.log(`❌ Index API failed: ${indexResponse.status} ${indexResponse.statusText}`);
    }

    // Test button API
    console.log('\n🔘 Testing /api/types/button...');
    const buttonResponse = await fetch(`${baseUrl}/api/types/button`);

    if (buttonResponse.ok) {
      const buttonData = await buttonResponse.json();
      console.log('✅ Button API works!');
      if (buttonData.Button?.props) {
        const propCount = Object.keys(buttonData.Button.props).length;
        console.log(`   Found ${propCount} props for Button component`);
        console.log(`   Sample props: ${Object.keys(buttonData.Button.props).slice(0, 3).join(', ')}`);
      }
    } else {
      console.log(`❌ Button API failed: ${buttonResponse.status} ${buttonResponse.statusText}`);
    }

    console.log('\n🎉 Local API test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the docs dev server is running on localhost:3002');
    console.log('   Run: cd docs && npm run dev');
  }
}

testLocalAPI();
