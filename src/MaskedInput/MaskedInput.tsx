import React from 'react';
import TextMask from './TextMask';
import Input, { InputProps } from '../Input';
import { forwardRef } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { PropsWithoutChange } from '@/internals/types';
import type { TextMaskProps } from './TextMask';

export type MaskedInputProps = PropsWithoutChange<TextMaskProps> & Omit<InputProps, 'type'>;

const MaskedInput = forwardRef<'input', MaskedInputProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('MaskedInput', props);

  const { as: inputAs = TextMask } = propsWithDefaults;

  return <Input {...propsWithDefaults} as={inputAs} ref={ref} />;
});

MaskedInput.displayName = 'MaskedInput';

export default MaskedInput;
