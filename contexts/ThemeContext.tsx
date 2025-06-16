
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default for SSR or environments without window
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove both classes to ensure a clean state before applying the current theme class
    root.classList.remove('dark', 'light');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      // For light theme, no specific class is needed for Tailwind's dark mode to be off.
      // If '.light' class is needed for other specific CSS (like old scrollbars), it could be added.
      // However, for pure Tailwind darkMode: 'class', absence of 'dark' means light.
      // We will add 'light' class back if specific CSS like scrollbars require it and cannot be defaulted.
      // For now, let's assume scrollbar CSS will be adjusted.
      // To be safe and ensure specific `html.light` CSS rules (like scrollbars previously) work, we can add it.
       root.classList.add('light'); // This ensures html.light css rules can be used if needed.
                                   // If all CSS is managed by .dark presence/absence, this isn't strictly necessary for Tailwind.
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
