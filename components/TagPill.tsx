import React from 'react';

interface TagPillProps {
  tag: string;
  onClick?: (tag: string) => void;
  isActive?: boolean;
  className?: string;
}

const TagPill: React.FC<TagPillProps> = ({ tag, onClick, isActive, className = '' }) => {
  const baseClasses = "text-xs font-medium px-2 py-0.5 mr-1 mb-1 inline-block transition-all duration-200";
  
  // Default text color, background is inherited
  const defaultTextClasses = "text-text-lt dark:text-light-text";

  // Active classes: inherited background, text color sky-600
  const activeClasses = "text-sky-600";
  
  // Inactive classes: default appearance, hover changes text color to sky-600
  // Background is inherited.
  const inactiveClasses = `
    ${defaultTextClasses}
    hover:text-sky-600 
  `;
  const clickableClasses = onClick ? "cursor-pointer" : "";

  return (
    <span
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${clickableClasses} ${className}`}
      onClick={onClick ? () => onClick(tag) : undefined}
      onKeyPress={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick(tag) : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-pressed={onClick ? isActive : undefined}
    >
      {`#${tag}`}
    </span>
  );
};

export default TagPill;