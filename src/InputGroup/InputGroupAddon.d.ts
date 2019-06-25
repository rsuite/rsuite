import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface InputGroupAddonProps extends StandardProps {
  /** An Input group addon can show that it is disabled */
  disabled?: boolean;
}

declare const InputGroupAddon: React.ComponentType<InputGroupAddonProps>;

export default InputGroupAddon;
