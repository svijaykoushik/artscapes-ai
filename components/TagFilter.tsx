
import React from 'react';
import TagPill from './TagPill';
import { FilterIcon } from './Icons';

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
    <div className="mb-6 p-4 bg-secondary-lt dark:bg-secondary border border-border-light dark:border-border-dark">
      <div className="flex items-center mb-3">
        <FilterIcon className="w-5 h-5 mr-2 text-text-lt dark:text-light-text" />
        <h3 className="text-lg font-semibold text-text-lt dark:text-light-text">Filter by Tags</h3>
        {activeTags.length > 0 && (
          <button
            onClick={onClearFilters}
            className="ml-auto text-sm text-accent dark:text-accent-lt hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap">
        {allTags.map(tag => (
          <TagPill
            key={tag}
            tag={tag}
            onClick={onTagClick}
            isActive={activeTags.includes(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
