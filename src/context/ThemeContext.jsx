import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to 'light' (Day mode - Honda Việt Nam style) as requested
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    try {
      // Clear legacy/cached keys so it never forces dark mode on reload
      localStorage.removeItem('honda_sh350i_theme');
      localStorage.removeItem('honda_sh350i_theme_v2');
      localStorage.removeItem('honda_sh350i_theme_v3');
      localStorage.removeItem('honda_sh350i_theme_v4');
    } catch (e) {
      // Ignore
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    soundFx.playClick();
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
