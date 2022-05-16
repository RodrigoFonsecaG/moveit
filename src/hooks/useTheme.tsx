import React, { useEffect, useState } from 'react';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import Cookies from 'js-cookie';

const useTheme = () => {

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
    }
    else {
      setTheme(light);
      setIsDarkModeState(false);
    }
  }, []);

  return { theme, toggleTheme, isDarkModeState, setIsDarkModeState };
};

export default useTheme;
