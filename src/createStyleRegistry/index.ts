import { createRegistry } from '@/internals/styled-system/registry/createRegistry';

export type { StyleRegistryInstance } from '@/internals/styled-system/registry/types';

/**
 * Create one registry per server request, and keep its client instance stable for the provider.
 * Insert getStyleElement() into the document head, then flush() after each streamed insertion.
 */
export const createStyleRegistry = createRegistry;

export default createStyleRegistry;
