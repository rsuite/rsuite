import React from 'react';
import { SizeType } from '@/internals/types';

export interface ButtonGroupContextProps {
  size?: SizeType;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextProps | null>(null);

export default ButtonGroupContext;
