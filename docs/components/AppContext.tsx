import React from 'react';
import { readTheme, readDirection } from '@/utils/themeHelpers';

interface AppContextProps {
  direction?: string;
  theme?: string[];
  handleToggleDirection?: () => void;
  handleToggleTheme?: () => void;
  messages?: any;
  localePath?: string;
}

export const AppContext = React.createContext<AppContextProps>({
  direction: readDirection(),
  theme: readTheme(), // [themeName,direction]
  handleToggleDirection: null,
  handleToggleTheme: null,
  messages: null,
  localePath: ''
});

export default AppContext;
