import * as React from 'react';
import { StandardProps, FormControlBaseProps } from '../@types/common';
import { RadioProps } from '../Radio/Radio.d';

export interface RadioGroupProps<V = any>
  extends StandardProps,
    FormControlBaseProps<RadioProps<V>['value']> {
  /** A radio group can have different appearances */
  appearance?: 'default' | 'picker';

  /** Name to use for form */
  name?: string;

  /** Inline layout */
  inline?: boolean;

  /** Primary content */
  children?: React.ReactNode;
}

declare const RadioGroup: React.ComponentType<RadioGroupProps>;

export default RadioGroup;
