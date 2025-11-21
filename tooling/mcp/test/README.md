# RSuite MCP Server Tests

This directory contains comprehensive tests for the RSuite Model Context Protocol (MCP) server.

## Test Files

### Core Tests

- **`config-simple.test.js`** - Basic configuration validation
- **`environment-config.test.js`** - Environment variable configuration testing
- **`mcp-service.test.js`** - Comprehensive MCP service functionality tests
- **`local-api.test.js`** - Local development API endpoint testing
- **`url-debug.test.js`** - URL construction and network connectivity debugging

### Test Runner

- **`run-all.js`** - Runs all tests in sequence with proper environment setup

## Running Tests

### Individual Tests

```bash
# Basic configuration test
node test/config-simple.test.js

# Environment configuration test with custom base URL
RSUITE_MCP_BASE_URL=http://localhost:3002 node test/environment-config.test.js

# Local API test (requires docs dev server running)
node test/local-api.test.js

# Comprehensive service test
RSUITE_MCP_BASE_URL=http://localhost:3002 node test/mcp-service.test.js

# URL debugging test
node test/url-debug.test.js
```

### All Tests

```bash
# Run all tests with proper environment setup
node test/run-all.js
```

## Prerequisites

### For Local API Tests

1. Start the docs development server:
   ```bash
   cd docs
   npm run dev
   ```
   The server should be running on `http://localhost:3002`

2. Ensure the MCP server is built:
   ```bash
   npm run build
   ```

### Environment Variables

- **`RSUITE_MCP_BASE_URL`** - Override the default API base URL
  - Default: `https://rsuitejs.com`
  - Local development: `http://localhost:3002`
  - Test environment: `https://rsuite-nextjs-git-feat-mcp-server-improvements-rsuite.vercel.app`

- **`RSUITE_MCP_VERSION`** - Optional version specification

## Test Coverage

The tests cover:

- ✅ Configuration validation
- ✅ Environment variable handling
- ✅ URL construction and validation
- ✅ Network connectivity
- ✅ API endpoint functionality
- ✅ Component data retrieval
- ✅ Hook data retrieval
- ✅ Search functionality
- ✅ Caching mechanism
- ✅ Error handling

## Expected Results

When all tests pass, you should see:

- 87+ components discovered
- 4+ hooks available
- Button component with 15+ properties
- Successful API connectivity
- Proper URL construction
- Working cache functionality

## Troubleshooting

### Common Issues

1. **Network timeouts**: Check if the target API server is accessible
2. **Module import errors**: Ensure `npm run build` has been executed
3. **API 404 errors**: Verify the API endpoints exist and are properly configured
4. **Port conflicts**: Make sure the docs dev server is running on the expected port

### Debug Mode

For detailed debugging, run individual tests with verbose output:

```bash
DEBUG=* node test/mcp-service.test.js
```
