import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from '../types/Weather';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light'
    );
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useThemeContext deve ser usado dentro de ThemeProvider.'
    );
  }

  return context;
}