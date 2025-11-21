import React from 'react';
import type { Size } from '@/internals/types';

export const InputGroupContext = React.createContext<{
  onFocus: () => void;
  onBlur: () => void;
  size?: Size;
} | null>(null);
