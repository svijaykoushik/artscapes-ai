
import React, { useState, useEffect } from 'react';
import { Wallpaper } from '../types';
import { DownloadIcon, TagIcon } from './Icons';
import LoadingSpinner from './LoadingSpinner';
import TagPill from './TagPill'; // Import TagPill

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onView: (wallpaper: Wallpaper) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, onView }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = wallpaper.thumbnailUrl;
    img.onload = () => setIsImageLoading(false);
    img.onerror = () => setIsImageLoading(false); 
  }, [wallpaper.thumbnailUrl]);

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation(); 
  };

  const handleCardClick = () => {
    if (!isImageLoading) { 
      onView(wallpaper);
    }
  };

  return (
    <div 
      className="masonry-grid-item overflow-hidden relative group transition-all duration-300 bg-secondary-lt dark:bg-secondary focus-within:ring-2 focus-within:ring-accent dark:focus-within:ring-accent-lt focus-within:ring-offset-2 focus-within:ring-offset-primary-lt dark:focus-within:ring-offset-primary"
      onClick={handleCardClick}
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }}
      role="button"
      tabIndex={isImageLoading ? -1 : 0}
      aria-label={`View details for ${wallpaper.title}`}
    >
      <div className={`relative w-full flex items-center justify-center bg-secondary-lt dark:bg-secondary 
                      ${isImageLoading ? 'aspect-[4/3]' : ''} 
                      ${!isImageLoading ? 'cursor-pointer' : ''} overflow-hidden`}>
        {isImageLoading ? (
          <div className="w-full aspect-[4/3] flex items-center justify-center">
            <LoadingSpinner size="md" />
          </div>
        ) : (
          <img
            src={wallpaper.thumbnailUrl}
            alt={wallpaper.altText}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
        {!isImageLoading && (
          <div 
            className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
            aria-hidden="true" 
          >
            <h3 
              className="text-sm font-medium text-white truncate select-none" /* Text color explicitly white for overlay */
              title={wallpaper.title}
            >
              {wallpaper.title}
            </h3>
            <p className="text-xs text-gray-300 select-none">{wallpaper.resolution}</p>
            {wallpaper.tags && wallpaper.tags.length > 0 && (
              <div className="mt-1 flex flex-wrap items-center">
                <TagIcon className="w-3 h-3 mr-1 text-gray-300 flex-shrink-0" />
                {wallpaper.tags.slice(0, 2).map(tag => ( // Show max 2 tags on card
                  <span key={tag} className="text-xs text-gray-300 mr-1.5 select-none truncate">{tag}</span>
                ))}
                {wallpaper.tags.length > 2 && <span className="text-xs text-gray-300 select-none">...</span>}
              </div>
            )}
            <a
              href={wallpaper.fullUrl}
              download={`${wallpaper.title.replace(/\s+/g, '_')}_${wallpaper.resolution}.jpg`}
              onClick={handleDownloadClick}
              className="absolute top-2 right-2 text-white hover:text-accent p-2 transition-colors duration-200 z-10 bg-black/30 hover:bg-black/50"
              aria-label={`Download ${wallpaper.title}`}
              title={`Download ${wallpaper.title}`}
              tabIndex={0} 
            >
              <DownloadIcon className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default WallpaperCard;
