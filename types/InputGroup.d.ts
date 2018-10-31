import * as React from 'react';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';

export interface InputGroupProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Sets the composition content internally */
  inside?: boolean;

  /** An Input group can show that it is disabled */
  disabled?: boolean;

  /** Primary content */
  children?: React.ReactNode;
}

interface InputGroupComponent extends React.ComponentClass<InputGroupProps> {
  Addon: typeof InputGroupAddon;
  Button: typeof InputGroupButton;
}

declare const InputGroup: InputGroupComponent;

export default InputGroup;
