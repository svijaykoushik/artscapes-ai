import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WallpaperCollection, Wallpaper } from '../types';
import { CollectionIcon, TagIcon } from './Icons'; 
import LoadingSpinner from './LoadingSpinner';

interface CollectionCardProps {
  collection: WallpaperCollection;
  coverWallpaper: Wallpaper | undefined;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, coverWallpaper }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (coverWallpaper?.thumbnailUrl) {
      setIsImageLoading(true);
      const img = new Image();
      img.src = coverWallpaper.thumbnailUrl;
      img.onload = () => setIsImageLoading(false);
      img.onerror = () => setIsImageLoading(false);
    } else {
      setIsImageLoading(false); 
    }
  }, [coverWallpaper?.thumbnailUrl]);

  return (
    <Link
      to={`/collection/${collection.slug}`}
      className="masonry-grid-item block group relative bg-secondary-lt dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-lt focus:ring-offset-2 focus:ring-offset-primary-lt dark:focus:ring-offset-primary overflow-hidden"
      aria-label={`View collection: ${collection.name}`}
      title={`View collection: ${collection.name}`}
    >
      <div className="w-full aspect-[4/3] bg-primary-lt dark:bg-primary flex items-center justify-center overflow-hidden relative">
        {isImageLoading && coverWallpaper && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary-lt dark:bg-secondary">
              <LoadingSpinner size="md" />
          </div>
        )}
        {!isImageLoading && coverWallpaper && (
          <img 
              src={coverWallpaper.thumbnailUrl} 
              alt={`Cover for ${collection.name}`} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              loading="lazy" 
          />
        )}
        {(!coverWallpaper && !isImageLoading) && (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-text-lt dark:text-muted-text p-4 bg-secondary-lt dark:bg-secondary">
                <CollectionIcon className="w-12 h-12 mb-2 text-gray-500 dark:text-gray-400" />
            </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
            <h3 className="text-md font-semibold text-white transition-colors duration-200 truncate">{collection.name}</h3>
            <p className="text-xs text-gray-300 transition-colors duration-200">{collection.wallpaperIds.length} Wallpapers</p>
            {collection.tags && collection.tags.length > 0 && (
              <div className="mt-1 flex items-center flex-wrap">
                  <TagIcon className="w-3 h-3 mr-1 text-gray-300 flex-shrink-0" />
                  {collection.tags.slice(0,2).map(tag => (
                    <span key={tag} className="text-xs text-gray-300 mr-1.5 truncate">{tag}</span>
                  ))}
                  {collection.tags.length > 2 && <span className="text-xs text-gray-300">...</span>}
              </div>
            )}
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;