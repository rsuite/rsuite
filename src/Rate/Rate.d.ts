import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface RateProps<ValueType = number> extends StandardProps {
  // Whether to allow semi selection
  allowHalf?: boolean;

  // custom character of rate
  character?: React.ReactNode;

  // The prefix of the component CSS class
  classPrefix?: string;

  // Whether to allow cancel selection
  cleanable?: boolean;

  // Default value
  defaultValue?: ValueType;

  // disabled,unable to select
  disabled?: boolean;

  // Maximum rate
  max?: number;

  // read only,unable to select
  readOnly: boolean;

  // render coutom character
  renderCharacter?: (value: number, index: number) => React.ReactNode;

  // Rate size
  size?: 'xs' | 'sm' | 'md' | 'lg';

  // Value (Controlled)
  value?: ValueType;

  // Vertical Rate half
  vertical?: boolean;

  // Callback function that changes value
  onChange?: (value: ValueType, event: React.SyntheticEvent<HTMLElement>) => void;

  // Callback function when hover state changes
  onChangeActive?: (value: ValueType, event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const Rate: React.ComponentType<RateProps>;

export default Rate;
