
import React, { useEffect, useMemo } from 'react';
import { Wallpaper, WallpaperCollection } from '../types';
import { WALLPAPERS, WALLPAPER_COLLECTIONS, APP_TITLE } from '../constants';
import CollectionCard from './CollectionCard';
import { Link } from 'react-router-dom';
import { HomeIcon } from './Icons';

const CollectionsOverviewPage: React.FC = () => {
  useEffect(() => {
    document.title = `All Collections - ${APP_TITLE}`;
  }, []);

  const collectionsWithCovers = useMemo(() => {
    return WALLPAPER_COLLECTIONS.map(collection => {
      const cover = WALLPAPERS.find(wp => wp.id === collection.coverWallpaperId);
      return { ...collection, coverWallpaper: cover };
    }).sort((a,b) => a.name.localeCompare(b.name)); // Sort collections alphabetically
  }, []);

  return (
    <div className="min-h-screen">
       <header className="bg-secondary-lt dark:bg-secondary py-8 px-4 border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center text-accent dark:text-accent-lt hover:text-sky-400 dark:hover:text-sky-300 mb-4 transition-colors group">
            <HomeIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-text-lt dark:text-light-text mb-2 tracking-tight">Browse All Collections</h1>
          <p className="text-muted-text-lt dark:text-muted-text max-w-3xl leading-relaxed">
            Explore curated sets of wallpapers, each with a unique theme and aesthetic.
          </p>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {collectionsWithCovers.length > 0 ? (
          <div className="masonry-grid">
            {collectionsWithCovers.map(collection => (
              <CollectionCard
                key={`col-overview-${collection.id}`}
                collection={collection}
                coverWallpaper={collection.coverWallpaper}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-text-lt dark:text-muted-text text-xl py-10">No collections available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionsOverviewPage;
