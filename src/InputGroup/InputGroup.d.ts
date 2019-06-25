import * as React from 'react';

import { StandardProps } from '../@types/common';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';

export interface InputGroupProps extends StandardProps {
  /** Sets the composition content internally */
  inside?: boolean;

  /** An Input group can show that it is disabled */
  disabled?: boolean;

  /** Primary content */
  children?: React.ReactNode;
}

export interface InputGroupComponent extends React.ComponentClass<InputGroupProps> {
  Addon: typeof InputGroupAddon;
  Button: typeof InputGroupButton;
}

declare const InputGroup: InputGroupComponent;

export default InputGroup;
