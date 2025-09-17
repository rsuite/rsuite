import fetch from 'node-fetch';
import { ComponentsIndex, ComponentTypeFile, RSuiteConfig } from './types.js';

const DEFAULT_BASE_URL = 'https://rsuitejs.com';

export class RSuiteService {
  private baseUrl: string;
  private cache: Map<string, any> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor(config: RSuiteConfig = {}) {
    // Try multiple base URLs in order of preference
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    // Remove trailing slash to avoid double slashes in URL construction
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  private async fetchWithCache<T>(url: string): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(url);
    const expiry = this.cacheExpiry.get(url);

    if (cached && expiry && now < expiry) {
      return cached;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as T;
      this.cache.set(url, data);
      this.cacheExpiry.set(url, now + this.CACHE_TTL);

      return data;
    } catch (error) {
      throw new Error(
        `Failed to fetch ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getComponentsIndex(): Promise<ComponentsIndex> {
    const url = `${this.baseUrl}/api/types/index`;
    return this.fetchWithCache<ComponentsIndex>(url);
  }

  async getComponentTypes(component: string): Promise<ComponentTypeFile> {
    const url = `${this.baseUrl}/api/types/${component}`;
    return this.fetchWithCache<ComponentTypeFile>(url);
  }

  async getAllComponents(): Promise<string[]> {
    const index = await this.getComponentsIndex();
    return index.components;
  }

  async getAllHooks(): Promise<string[]> {
    const index = await this.getComponentsIndex();
    return index.hooks;
  }

  async searchComponents(query: string): Promise<string[]> {
    const components = await this.getAllComponents();
    const lowerQuery = query.toLowerCase();

    return components.filter(component => component.toLowerCase().includes(lowerQuery));
  }

  async getComponentProps(
    componentId: string,
    componentName?: string
  ): Promise<Record<string, any>> {
    const typeFile = await this.getComponentTypes(componentId);

    if (componentName) {
      const component = typeFile[componentName];
      if (!component) {
        throw new Error(`Component "${componentName}" not found in ${componentId}`);
      }
      return component.props;
    }

    // Return all components in the file
    const result: Record<string, any> = {};
    for (const [name, definition] of Object.entries(typeFile)) {
      result[name] = definition;
    }

    return result;
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }
}
