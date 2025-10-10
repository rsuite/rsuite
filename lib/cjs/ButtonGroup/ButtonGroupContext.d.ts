import React from 'react';
import { TypeAttributes } from '../internals/types';
export interface ButtonGroupContextProps {
    size?: TypeAttributes.Size;
}
declare const ButtonGroupContext: React.Context<ButtonGroupContextProps | null>;
export default ButtonGroupContext;
