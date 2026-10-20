export interface Values {
  profile: { email: string };
  password: string;
  confirmation: string;
  username: string;
  contacts: Array<{ email: string }>;
  company?: string;
}
export interface AdapterChannel {
  readValues: () => unknown;
  engine: string;
  stateOwnership: string;
  validationOwnership: string;
}
export interface AdapterProps {
  attach: (channel: AdapterChannel) => void;
  onSubmit: (value: unknown) => void;
}
export interface FormSnapshot {
  values: unknown;
  fields: Record<string, { value: string; errors: string[]; invalid: string | null }>;
  errors: string[];
  invalidReferences: string[];
}
declare global {
  const __LIBRARY__: string;
  interface Window {
    formBenchmark: {
      ready: () => boolean;
      metadata: () => Record<string, unknown>;
      snapshot: () => FormSnapshot & Record<string, unknown>;
    };
  }
}
