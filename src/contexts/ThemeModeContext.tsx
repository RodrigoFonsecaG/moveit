import Cookies from 'js-cookie';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import {dark} from '../styles/themes/dark';
import {light} from '../styles/themes/light';

interface ThemeContextData {
  theme: Theme;
  toggleTheme: (isDarkMode: boolean) => void;
  isDarkModeState: boolean;
  setIsDarkModeState: Dispatch<SetStateAction<boolean>>;
}

interface ThemeProviderProps {
  children: ReactNode;
}

interface Theme {
  title: string;
  colors: Colors;
}

interface Colors {
  background: string;
  secondary: string;
  text: string;
  title: string;
}

export const ThemeModeContext = createContext({} as ThemeContextData);

export const ThemeModeProvider = ({ children }: ThemeProviderProps) => {
  const favoriteTheme = Cookies.get('theme');

  const [theme, setTheme] = useState(light);
  const [isDarkModeState, setIsDarkModeState] = useState(false);

  function toggleTheme(isDarkMode: boolean) {
    if (isDarkMode) {
      setTheme(light);
      setIsDarkModeState(false);
    } else {
      setTheme(dark);
      setIsDarkModeState(true);
    }
  }

  useEffect(() => {
    Cookies.set('theme', String(theme.title));
  }, [theme]);

  useEffect(() => {
    if (favoriteTheme === dark.title) {
      setTheme(dark);
      setIsDarkModeState(true);
    } else {
      setTheme(light);
      setIsDarkModeState(false);
    }
  }, []);

  return (
    <ThemeModeContext.Provider
      value={{ theme, toggleTheme, isDarkModeState, setIsDarkModeState }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
};
