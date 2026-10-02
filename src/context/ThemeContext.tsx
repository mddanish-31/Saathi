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

  const applyTheme = (targetTheme: Theme) => {
    try {
      document.documentElement.setAttribute('data-theme', targetTheme);
      document.documentElement.classList.toggle('dark', targetTheme === 'dark');
      localStorage.setItem(THEME_STORAGE_KEY, targetTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(nextTheme);

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        applyTheme(nextTheme);
      });
    } else {
      applyTheme(nextTheme);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        applyTheme(newTheme);
      });
    } else {
      applyTheme(newTheme);
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
