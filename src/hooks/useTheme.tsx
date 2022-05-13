import React, { useState } from 'react'
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import DayNightToggle from 'react-day-and-night-toggle';

const useTheme = () => {
    const [theme, setTheme] = useState(light);

  function toggleTheme(isDarkMode: boolean) {
    if (isDarkMode) {
      setTheme(light);
    } else {
      setTheme(dark);
    }

  }

          

  return {theme, toggleTheme}
  
}

export default useTheme