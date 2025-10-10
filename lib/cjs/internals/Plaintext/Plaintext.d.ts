import React from 'react';
import { WithAsProps } from '../types';
type LocaleKey = 'unfilled' | 'notSelected' | 'notUploaded';
export interface PlaintextProps extends WithAsProps {
    placeholder?: React.ReactNode;
    localeKey?: LocaleKey;
}
/**
 * Make the component display in plain text, and display default characters when there is no children.
 * @private
 */
declare const Plaintext: React.ForwardRefExoticComponent<PlaintextProps & React.RefAttributes<unknown>>;
export default Plaintext;
