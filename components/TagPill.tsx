
import React from 'react';

interface TagPillProps {
  tag: string;
  onClick?: (tag: string) => void;
  isActive?: boolean;
  className?: string;
}

const TagPill: React.FC<TagPillProps> = ({ tag, onClick, isActive, className = '' }) => {
  const baseClasses = "text-xs font-medium px-2 py-0.5 mr-1 mb-1 inline-block transition-all duration-200";
  const activeClasses = "bg-accent text-dark-text dark:bg-accent-lt dark:text-text-on-accent-lt";
  const inactiveClasses = `
    bg-secondary text-light-text 
    dark:bg-secondary-lt dark:text-text-lt 
    hover:bg-accent hover:text-dark-text 
    dark:hover:bg-accent-lt dark:hover:text-text-on-accent-lt
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
