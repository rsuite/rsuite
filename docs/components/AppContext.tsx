import React from 'react';
import { readTheme, readDirection } from '@/utils/themeHelpers';

interface AppContextProps {
  direction?: string;
  theme?: string[];
  onChangeDirection?: () => void;
  onChangeTheme?: () => void;
  onChangeLanguage?: (value: string) => void;
  messages?: any;
  language?: string;
  localePath?: string;
  styleLoaded?: boolean;
}

export const AppContext = React.createContext<AppContextProps>({
  direction: readDirection(),
  theme: readTheme(), // [themeName,direction]
  onChangeDirection: null,
  onChangeTheme: null,
  onChangeLanguage: null,
  messages: null,
  language: 'zh',
  localePath: '',
  styleLoaded: false
});

export default AppContext;
