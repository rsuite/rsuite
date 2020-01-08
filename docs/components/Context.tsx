import React from 'react';
import { readTheme, readDirection } from '../utils/themeHelpers';

interface ThemeContextProps {
  direction?: string;
  theme?: string[];
  handleToggleDirection?: () => void;
  handleToggleTheme?: () => void;
  messages?: any;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  direction: readDirection(),
  theme: readTheme(), // [themeName,direction]
  handleToggleDirection: null,
  handleToggleTheme: null,
  messages: null
});
