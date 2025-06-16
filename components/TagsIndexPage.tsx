import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { WALLPAPERS, WALLPAPER_COLLECTIONS, APP_TITLE } from '../constants';
import { HomeIcon, TagIcon as PageTagIcon } from './Icons'; // Using PageTagIcon to differentiate if needed, though TagIcon is probably fine.

const TagsIndexPage: React.FC = () => {
  useEffect(() => {
    document.title = `Browse Tags - ${APP_TITLE}`;
  }, []);

  const groupedTags = useMemo(() => {
    const allTags = new Set<string>();
    WALLPAPERS.forEach(wp => wp.tags?.forEach(tag => allTags.add(tag)));
    // Optionally include tags from collections if they are meant to be browsable independently
    // WALLPAPER_COLLECTIONS.forEach(col => col.tags?.forEach(tag => allTags.add(tag)));
    
    const sortedTags = Array.from(allTags).sort((a, b) => a.localeCompare(b));

    return sortedTags.reduce((acc, tag) => {
      let firstLetter = tag[0]?.toUpperCase();
      if (!firstLetter || !/^[A-Z]$/.test(firstLetter)) {
        firstLetter = '#'; // Group non-alphabetical tags under '#'
      }
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(tag);
      return acc;
    }, {} as Record<string, string[]>);
  }, []);

  const sortedGroupKeys = Object.keys(groupedTags).sort((a,b) => {
    if (a === '#') return 1; // Put '#' at the end
    if (b === '#') return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="min-h-screen">
      <header className="bg-secondary-lt dark:bg-secondary py-8 px-4 border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-accent dark:text-accent-lt hover:text-sky-400 dark:hover:text-sky-300 mb-4 transition-colors group"
            aria-label="Back to Home"
          >
            <HomeIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-text-lt dark:text-light-text mb-2 tracking-tight flex items-center">
            <PageTagIcon className="w-8 h-8 mr-3 text-accent dark:text-accent-lt" />
            Browse All Tags
          </h1>
          <p className="text-muted-text-lt dark:text-muted-text max-w-3xl leading-relaxed">
            Discover wallpapers by exploring various themes and keywords.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {sortedGroupKeys.length === 0 && (
          <p className="text-center text-muted-text-lt dark:text-muted-text text-xl py-10">No tags found.</p>
        )}
        {sortedGroupKeys.map(letter => (
          <section key={letter} className="mb-8">
            <h2 className="text-3xl font-semibold text-accent dark:text-accent-lt mb-4 pb-2 border-b-2 border-border-light dark:border-border-dark">
              {letter}
            </h2>
            <div className="flex flex-wrap gap-2">
              {groupedTags[letter].map(tag => (
                <Link
                  key={tag}
                  to={`/tags/${encodeURIComponent(tag)}`}
                  className="text-sm font-medium px-3 py-1.5 bg-secondary dark:bg-secondary-lt text-light-text dark:text-text-lt hover:bg-accent hover:text-dark-text dark:hover:bg-accent-lt dark:hover:text-text-on-accent-lt transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-lt focus:ring-offset-2 focus:ring-offset-primary-lt dark:focus:ring-offset-primary"
                  aria-label={`View wallpapers tagged with ${tag}`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TagsIndexPage;