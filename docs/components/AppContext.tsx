import React, { useContext } from 'react';
import { readTheme, readDirection } from '@/utils/themeHelpers';
import { LocaleEn } from '@/locales';

export type Theme = 'light' | 'dark' | 'high-contrast';

interface AppContextProps {
  direction?: string;
  theme?: [string, string];
  onChangeDirection?: () => void;
  onChangeTheme?: (theme: Theme) => void;
  locales?: LocaleEn;
  language?: string;
  localePath?: string;
  styleLoaded?: boolean;
}

export const AppContext = React.createContext<AppContextProps>({
  direction: readDirection(),
  theme: readTheme(), // [themeName, direction]
  onChangeDirection: null,
  onChangeTheme: null,
  locales: null,
  language: 'zh',
  localePath: '',
  styleLoaded: false
});

export const AppProvider = AppContext.Provider;

export const useApp = () => {
  return useContext(AppContext);
};

export default AppContext;
