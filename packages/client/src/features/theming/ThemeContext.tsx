import { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../../tailwind.config';
import { Children } from '../../common/types';
import { getValueForKeyInLocalStorage, storeInLocalStorage } from '../../common/utils/localStorage';

const themeData = resolveConfig(tailwindConfig).theme as unknown as typeof tailwindConfig.theme.extend;

type Theme = 'dark' | 'light';
type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof themeData.colors;
};
const ThemeContext = createContext({} as ThemeContext);

type Props = {
  children: Children;
};
export const ThemeContextProvider = ({ children }: Props) => {
  const persistedTheme = (getValueForKeyInLocalStorage('theme') ||
    ((window as Window)?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) as Theme;

  const [theme, setTheme] = useState<Theme>(persistedTheme);
  const toggleTheme = useCallback(() => {
    setTheme((theme) => {
      storeInLocalStorage('theme', theme === 'dark' ? 'light' : 'dark');
      return theme === 'dark' ? 'light' : 'dark';
    });
  }, []);

  useLayoutEffect(() => {
    const documentBg = theme === 'dark' ? ' bg-secondary-800' : '';
    document.documentElement.className = `${theme}${documentBg}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeData.colors }}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
