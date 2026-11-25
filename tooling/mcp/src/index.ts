#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { RSuiteService } from './rsuite-service.js';

class RSuiteMCPServer {
  private server: Server;
  private rsuite: RSuiteService;

  constructor() {
    this.server = new Server(
      {
        name: '@rsuite/mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    // Read configuration from environment variables
    const config = {
      baseUrl: process.env.RSUITE_MCP_BASE_URL,
      version: process.env.RSUITE_MCP_VERSION,
    };

    this.rsuite = new RSuiteService(config);
    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_component_props',
            description: 'Get props definition for a specific RSuite component',
            inputSchema: {
              type: 'object',
              properties: {
                componentId: {
                  type: 'string',
                  description: 'Component ID (e.g., "button", "input", "modal")',
                },
                componentName: {
                  type: 'string',
                  description: 'Specific component name within the file (optional)',
                },
              },
              required: ['componentId'],
            },
          },
          {
            name: 'list_components',
            description: 'List all available RSuite components',
            inputSchema: {
              type: 'object',
              properties: {
                search: {
                  type: 'string',
                  description: 'Search query to filter components (optional)',
                },
              },
            },
          },
          {
            name: 'list_hooks',
            description: 'List all available RSuite hooks',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'search_components',
            description: 'Search for components by name or keyword',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query',
                },
              },
              required: ['query'],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_component_props': {
            const { componentId, componentName } = args as {
              componentId: string;
              componentName?: string;
            };

            const props = await this.rsuite.getComponentProps(componentId, componentName);

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(props, null, 2),
                },
              ],
            };
          }

          case 'list_components': {
            const { search } = args as { search?: string };

            let components: string[];
            if (search) {
              components = await this.rsuite.searchComponents(search);
            } else {
              components = await this.rsuite.getAllComponents();
            }

            return {
              content: [
                {
                  type: 'text',
                  text: `Available RSuite components${search ? ` (filtered by "${search}")` : ''}:\n\n${components.map(c => `- ${c}`).join('\n')}`,
                },
              ],
            };
          }

          case 'list_hooks': {
            const hooks = await this.rsuite.getAllHooks();

            return {
              content: [
                {
                  type: 'text',
                  text: `Available RSuite hooks:\n\n${hooks.map(h => `- ${h}`).join('\n')}`,
                },
              ],
            };
          }

          case 'search_components': {
            const { query } = args as { query: string };
            const components = await this.rsuite.searchComponents(query);

            return {
              content: [
                {
                  type: 'text',
                  text: `Components matching "${query}":\n\n${components.map(c => `- ${c}`).join('\n')}`,
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    });

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      try {
        const components = await this.rsuite.getAllComponents();
        const hooks = await this.rsuite.getAllHooks();

        const resources = [
          ...components.map(component => ({
            uri: `rsuite://component/${component}`,
            mimeType: 'application/json',
            name: `${component} Component`,
            description: `Type definitions for RSuite ${component} component`,
          })),
          ...hooks.map(hook => ({
            uri: `rsuite://hook/${hook}`,
            mimeType: 'application/json',
            name: `${hook} Hook`,
            description: `Type definitions for RSuite ${hook} hook`,
          })),
          {
            uri: 'rsuite://index',
            mimeType: 'application/json',
            name: 'Components Index',
            description: 'List of all available RSuite components and hooks',
          },
        ];

        return { resources };
      } catch {
        return { resources: [] };
      }
    });

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      try {
        if (uri === 'rsuite://index') {
          const index = await this.rsuite.getComponentsIndex();
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(index, null, 2),
              },
            ],
          };
        }

        const match = uri.match(/^rsuite:\/\/(component|hook)\/(.+)$/);
        if (!match) {
          throw new Error(`Invalid URI: ${uri}`);
        }

        const [, type, id] = match;

        if (type === 'component') {
          const componentTypes = await this.rsuite.getComponentTypes(id);
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(componentTypes, null, 2),
              },
            ],
          };
        } else if (type === 'hook') {
          // For hooks, we might not have separate files, so return empty for now
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify({ [id]: { description: `RSuite ${id} hook` } }, null, 2),
              },
            ],
          };
        }

        throw new Error(`Unsupported resource type: ${type}`);
      } catch (err) {
        throw new Error(`Failed to read resource ${uri}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('RSuite MCP server running on stdio');
  }
}

// Start the server
const server = new RSuiteMCPServer();
server.run().catch(console.error);
