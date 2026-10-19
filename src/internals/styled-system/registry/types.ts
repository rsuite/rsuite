import type { ReactElement } from 'react';
import type { StyleRule } from '../style-rules';
import type { StyleInputState } from './style-input';

export interface StyleRegistryInstance {
  /** Return the styles collected since the last flush, ready for insertion into the document head. */
  getStyleElement(): ReactElement | null;

  /** Clear the pending output after insertion, retaining previously collected rules. */
  flush(): void;
}

export interface RegistryRule extends StyleRule {
  key: string;
  nonce?: string;
}

export interface RuleOptions {
  key?: string;
  nonce?: string;
}

export interface PendingStyleInput {
  state: StyleInputState;
  rules: RegistryRule[];
  nonce?: string;
}
