
import React from 'react';
import { SortAscendingIcon } from './Icons'; // Assuming you might use an icon later

export type SortOption = 'dateAdded_desc' | 'dateAdded_asc' | 'title_asc' | 'title_desc';

interface SortOptionsProps {
  currentSort: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

const sortOptionsMap: { value: SortOption; label: string }[] = [
  { value: 'dateAdded_desc', label: 'Date Added (Newest)' },
  { value: 'dateAdded_asc', label: 'Date Added (Oldest)' },
  { value: 'title_asc', label: 'Title (A-Z)' },
  { value: 'title_desc', label: 'Title (Z-A)' },
];

const SortOptions: React.FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="mb-6 flex items-center justify-start">
      <label htmlFor="sort-select" className="mr-2 text-sm font-medium text-text-lt dark:text-light-text">Sort by:</label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="p-2 border border-border-light dark:border-border-dark bg-primary-lt dark:bg-primary text-text-lt dark:text-light-text focus:ring-accent dark:focus:ring-accent-lt focus:border-accent dark:focus:border-accent-lt text-sm"
      >
        {sortOptionsMap.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortOptions;
