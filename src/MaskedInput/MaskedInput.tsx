import React from 'react';
import TextMask from './TextMask';
import Input, { InputProps } from '../Input';
import type { TextMaskProps } from './TextMask';

import { RsRefForwardingComponent } from '../@types/common';

export type MaskedInputProps = Omit<TextMaskProps, 'onChange'> & Omit<InputProps, 'type'>;

const MaskedInput: RsRefForwardingComponent<'input', MaskedInputProps> = React.forwardRef<
  HTMLInputElement,
  MaskedInputProps
>((props: MaskedInputProps, ref) => {
  const { as: inputAs = TextMask } = props;

  return <Input {...props} as={inputAs} ref={ref} />;
});

export default MaskedInput;
