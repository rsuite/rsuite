# @rsuite/mcp

Access React Suite component information directly in your AI coding assistant.

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard for connecting AI assistants to trusted sources of documentation and code. For React Suite users, this means you get answers that are accurate, up-to-date, and directly reference the official component APIs.

## Why use MCP?

AI coding assistants often hallucinate component props, provide outdated examples, or cite non-existent documentation. The React Suite MCP server solves these problems by:

- Providing real, direct access to component props and types
- Using official React Suite component definitions
- Offering accurate TypeScript information for better code completion
- Enabling intelligent component search and discovery

## Installation

```bash
npm install @rsuite/mcp
```

## Usage

### Quick Start

Run the server directly:

```bash
npx @rsuite/mcp
```

Or install globally:

```bash
npm install -g @rsuite/mcp
rsuite-mcp
```

### Configuration Examples

The sections below detail how to set up the React Suite MCP in popular agentic coding environments.

#### Windsurf

1. Navigate to "Settings" > "Windsurf Settings" > "Cascade"
2. Click the "Manage MCPs" button, then click the "View raw config" button
3. Add the following to the MCP configuration file:

```json
{
  "mcpServers": {
    "rsuite": {
      "command": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    }
  }
}
```

#### Cursor

1. Navigate to "Settings" > "MCP"
2. Click "Add new global MCP server"
3. Add the following to the MCP configuration file:

```json
{
  "mcpServers": {
    "rsuite": {
      "command": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    }
  }
}
```

#### VS Code

1. Create a `.vscode/mcp.json` file in your workspace
2. Add the following to the MCP configuration file:

```json
{
  "servers": {
    "rsuite": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    }
  }
}
```

#### JetBrains IDEs

Open the MCP configuration (Settings -> Tools -> AI Assistant -> Model Context Protocol (MCP)) and add the following:

- **Name**: React Suite MCP
- **Command**: `npx`
- **Arguments**: `-y @rsuite/mcp@latest`

Click OK and Apply.

#### Zed

You can add the React Suite MCP server to Zed as a custom server:

Search for `agent: add context server` in the Command Palette and add the following:

```json
{
  "rsuite-mcp-server": {
    "command": {
      "path": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    },
    "env": {}
  }
}
```

#### Claude Code

Claude Code is Anthropic's agentic coding tool that runs in your terminal.

You can add the React Suite MCP server to Claude Code via the command line:

```bash
claude mcp add rsuite-mcp -- npx -y @rsuite/mcp@latest
```

By default, this installs the MCP server to local-scope of the project you are working on.

If you want the MCP server to always be available to all projects on your machine, you would install it to user-scope:

```bash
claude mcp add rsuite-mcp -s user -- npx -y @rsuite/mcp@latest
```

#### Trae

1. Navigate to "AI Management" > "MCP"
2. Click "Add Manually"
3. Add the following to the MCP configuration file:

```json
{
  "mcpServers": {
    "rsuite": {
      "command": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    }
  }
}
```

## Usage

Once configured, you can ask your AI assistant questions about React Suite components:

```
What props does the Button component accept?
Show me all input-related components
What's the appearance type for Button?
Find components with "picker" in the name
```

## Available Tools

| Tool Name               | Description                                        |
| ----------------------- | -------------------------------------------------- |
| **get_component_props** | Get detailed props for specific components         |
| **list_components**     | List all available components with optional search |
| **list_hooks**          | List all React Suite custom hooks                  |
| **search_components**   | Search components by name or functionality         |

## Available Resources

The server provides access to component type definitions through the following URI scheme:

- `rsuite://index` - Complete index of components and hooks
- `rsuite://component/{componentId}` - Type definitions for a specific component
- `rsuite://hook/{hookId}` - Information about a specific hook

## Configuration

The server fetches component information from the RSuite documentation website. By default, it uses:

- Base URL: `https://rsuitejs.com`
- Cache TTL: 5 minutes

### Environment Variables

You can customize the server behavior using environment variables:

- **RSUITE_MCP_BASE_URL**: Custom base URL for fetching component data (default: `https://rsuitejs.com`)
- **RSUITE_MCP_VERSION**: Specific version of RSuite to use (optional)

Example with custom configuration:

```json
{
  "mcpServers": {
    "rsuite": {
      "command": "npx",
      "args": ["-y", "@rsuite/mcp@latest"],
      "env": {
        "RSUITE_MCP_BASE_URL": "https://your-custom-rsuite-api.com"
      }
    }
  }
}
```

## Features

- **Real-time Data**: Fetches the latest component information from RSuite's documentation
- **Caching**: Intelligent caching to reduce API calls and improve performance
- **Search**: Flexible search functionality to find relevant components
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Error Handling**: Robust error handling with informative error messages

## Common Issues

### I've installed the MCP but there are errors in connection

1. Ensure Node.js 18+ is installed
2. Verify the JSON syntax in your configuration file
3. Check that `@rsuite/mcp` is accessible via npx

### I've installed the MCP but it's not being used when I ask questions

1. Restart your AI client after configuration
2. Try asking specific questions about React Suite components
3. Check the MCP client logs for connection status

## Example Queries

Here are some example queries you can use with AI assistants:

- "What props does the Button component accept?"
- "Show me all the form-related components in RSuite"
- "What's the type definition for the DatePicker component?"
- "List all components that contain 'picker' in their name"
- "What hooks are available in RSuite?"

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   AI Assistant  │◄──►│  @rsuite/mcp    │◄──►│ RSuite Docs (JSON)  │
│ (Windsurf, etc) │    │  MCP Server      │    │   rsuitejs.com      │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
```

The server acts as a bridge between AI assistants and RSuite's component documentation, providing structured access to component information through the Model Context Protocol.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [RSuite Documentation](https://rsuitejs.com)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [GitHub Repository](https://github.com/rsuite/rsuite)
