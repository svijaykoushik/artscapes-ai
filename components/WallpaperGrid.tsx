
import React from 'react';
import { Wallpaper } from '../types';
import WallpaperCard from './WallpaperCard';

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
  onViewWallpaper: (wallpaper: Wallpaper) => void;
}

const WallpaperGrid: React.FC<WallpaperGridProps> = ({ wallpapers, onViewWallpaper }) => {
  if (wallpapers.length === 0) {
    // This message is usually handled by the parent component (HomePage, CollectionPage)
    // which provides more context about filtering/empty state.
    // Returning null here to let parent decide what to render.
    return null; 
  }

  return (
    <>
      {/* Container and masonry-grid class will be applied by the parent (HomePage or CollectionPage) */}
      {wallpapers.map((wallpaper) => (
        <WallpaperCard
          key={wallpaper.id}
          wallpaper={wallpaper}
          onView={onViewWallpaper}
        />
      ))}
    </>
  );
};

export default WallpaperGrid;
