import React from 'react';
import { TypeAttributes } from '../@types/common';

export interface ButtonGroupContextProps {
  size?: TypeAttributes.Size;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextProps | null>(null);

export default ButtonGroupContext;
