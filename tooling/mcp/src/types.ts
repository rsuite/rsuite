export interface ComponentProp {
  type: string;
  isRequired: boolean;
  description: string;
  defaultValue?: string;
}

export interface ComponentDefinition {
  props: Record<string, ComponentProp>;
}

export interface ComponentsIndex {
  components: string[];
  hooks: string[];
}

export interface ComponentTypeFile {
  [componentName: string]: ComponentDefinition;
}

export interface RSuiteConfig {
  baseUrl?: string;
  version?: string;
}
