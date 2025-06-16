
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-text-lt dark:text-light-text hover:text-accent dark:hover:text-accent-lt hover:bg-secondary-lt dark:hover:bg-secondary transition-colors duration-150"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5" /> 
      ) : (
        <MoonIcon className="w-5 h-5" /> 
      )}
    </button>
  );
};

export default ThemeToggleButton;
