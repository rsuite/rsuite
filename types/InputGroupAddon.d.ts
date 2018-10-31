import * as React from 'react';

export interface InputGroupAddonProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** An Input group addon can show that it is disabled */
  disabled?: boolean;
}

declare const InputGroupAddon: React.ComponentType<InputGroupAddonProps>;

export default InputGroupAddon;
