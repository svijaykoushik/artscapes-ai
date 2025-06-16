import React from 'react';
import TagPill from './TagPill';
// FilterIcon is removed as the heading is removed

interface TagFilterProps {
  allTags: string[];
  activeTags: string[];
  onTagClick: (tag: string) => void;
  onClearFilters: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ allTags, activeTags, onTagClick, onClearFilters }) => {
  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 py-3 px-1 sm:px-2 border-y border-border-light dark:border-border-dark">
      {activeTags.length > 0 && (
        <div className="flex justify-end mb-2 px-2 sm:px-0">
          <button
            onClick={onClearFilters}
            className="text-xs sm:text-sm text-accent dark:text-accent-lt hover:underline"
            aria-label="Clear all active tag filters"
          >
            Clear Filters
          </button>
        </div>
      )}
      <div className="flex overflow-x-auto whitespace-nowrap pb-2 -mb-2 scrollbar-thin scrollbar-thumb-accent dark:scrollbar-thumb-accent-lt scrollbar-track-secondary-lt dark:scrollbar-track-secondary pr-4 pl-2 sm:pl-0"> 
        {/* pl-2 sm:pl-0 ensures some padding on small screens if container px is less */}
        {allTags.map(tag => (
          <TagPill
            key={tag}
            tag={tag}
            onClick={onTagClick}
            isActive={activeTags.includes(tag)}
            className="flex-shrink-0 mr-1.5 last:mr-0" 
          />
        ))}
        {allTags.length === 0 && <p className="text-sm text-muted-text-lt dark:text-muted-text px-2 sm:px-0">No tags available.</p>}
      </div>
    </div>
  );
};

export default TagFilter;