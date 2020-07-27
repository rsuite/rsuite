import * as React from 'react';
import { StandardProps, TypeAttributes } from '../@types/common';
import Size = TypeAttributes.Size;

export interface ToggleProps extends StandardProps {
  /** Wheather to disabled toggle */
  disabled?: boolean;

  /** Checked（Controlled) */
  checked?: boolean;

  /** Default checked */
  defaultChecked?: boolean;

  /** Checked display content */
  checkedChildren?: React.ReactNode;

  /** Unselected display content */
  unCheckedChildren?: React.ReactNode;

  /** Callback function when state changes */
  onChange?: (checked: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void;

  /** */
  size?: Omit<Size, 'xs'>;
}

declare const Toggle: React.ComponentType<ToggleProps>;

export default Toggle;
