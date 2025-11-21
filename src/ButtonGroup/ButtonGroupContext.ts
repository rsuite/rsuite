import React from 'react';
import { Size } from '@/internals/types';

export interface ButtonGroupContextProps {
  size?: Size;
  disabled?: boolean;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextProps | null>(null);

export default ButtonGroupContext;
