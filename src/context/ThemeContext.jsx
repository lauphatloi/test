import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';

const ThemeContext = createContext();

const STORAGE_KEY = 'honda_sh350i_theme_v2';

export function ThemeProvider({ children }) {
  // Default to 'light' (Day mode - Honda Việt Nam style) as requested
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        // Clean up legacy key if present so it doesn't force dark mode
        localStorage.removeItem('honda_sh350i_theme');
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') {
          return saved;
        }
      } catch (e) {
        // Ignore localStorage access errors
      }
    }
    return 'light'; // Default Day Mode
  });

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
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ignore
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
