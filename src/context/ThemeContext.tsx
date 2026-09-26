"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'saathi_theme_preference';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      let initial: Theme = 'light';
      if (savedTheme === 'light' || savedTheme === 'dark') {
        initial = savedTheme;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initial = 'dark';
      }
      setThemeState(initial);
      document.documentElement.setAttribute('data-theme', initial);
      document.documentElement.classList.toggle('dark', initial === 'dark');
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    setThemeState((prevTheme) => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
      try {
        document.documentElement.setAttribute('data-theme', nextTheme);
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // ignore
      }
      return nextTheme;
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
