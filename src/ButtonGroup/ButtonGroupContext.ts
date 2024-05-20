import React from 'react';
import { TypeAttributes } from '@/internals/types';

export interface ButtonGroupContextProps {
  size?: TypeAttributes.Size;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextProps | null>(null);

export default ButtonGroupContext;
