
import React from 'react';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  // color prop is removed, will use theme accent color
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const { theme } = useTheme();
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  // Determine color based on theme
  const borderColorClass = theme === 'dark' ? 'border-accent' : 'border-accent-lt';


  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${borderColorClass} border-solid`}
        style={{ borderTopColor: 'transparent' }}
        role="status"
        aria-live="polite"
        aria-label="Loading content"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
