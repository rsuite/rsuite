import { InputProps } from '../Input';
import { RsRefForwardingComponent } from '../internals/types';
import type { TextMaskProps } from './TextMask';
export type MaskedInputProps = Omit<TextMaskProps, 'onChange'> & Omit<InputProps, 'type'>;
declare const MaskedInput: RsRefForwardingComponent<'input', MaskedInputProps>;
export default MaskedInput;
