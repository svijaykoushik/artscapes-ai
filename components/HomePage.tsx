import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Wallpaper, WallpaperCollection } from '../types';
import { WALLPAPERS, WALLPAPER_COLLECTIONS, APP_TITLE } from '../constants';
import WallpaperGrid from './WallpaperGrid';
import CollectionCard from './CollectionCard';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';
import { DownloadIcon, ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from './Icons';
import SortOptions, { SortOption } from './SortOptions';
import TagPill from './TagPill';

const HomePage: React.FC = () => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullImageLoading, setIsFullImageLoading] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortOption>('dateAdded_desc');

  useEffect(() => {
    document.title = `${APP_TITLE} - Home`;
  }, []);

  const filteredAndSortedWallpapers = useMemo(() => {
    let items = [...WALLPAPERS];
    // Tag filtering removed from here

    return items.sort((a, b) => {
      switch (currentSort) {
        case 'dateAdded_asc':
          return new Date(a.dateAdded || 0).getTime() - new Date(b.dateAdded || 0).getTime();
        case 'dateAdded_desc':
          return new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime();
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [currentSort]);

  const collectionsToDisplay = useMemo(() => {
    // Tag filtering removed from here
    return WALLPAPER_COLLECTIONS.map(collection => {
      const cover = WALLPAPERS.find(wp => wp.id === collection.coverWallpaperId);
      return { ...collection, coverWallpaper: cover };
    });
  }, []);


  const openModalWithWallpaper = useCallback((wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setIsModalOpen(true);
    setIsFullImageLoading(true);
    const img = new Image();
    img.src = wallpaper.fullUrl;
    img.onload = () => setIsFullImageLoading(false);
    img.onerror = () => {
      setIsFullImageLoading(false);
      console.error("Failed to load full image:", wallpaper.fullUrl);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedWallpaper(null);
  }, []);

  const navigateWallpaper = useCallback((direction: 'prev' | 'next') => {
    if (!selectedWallpaper) return;
    const currentWallpaperList = filteredAndSortedWallpapers.length > 0 ? filteredAndSortedWallpapers : WALLPAPERS;
    const currentIndex = currentWallpaperList.findIndex(wp => wp.id === selectedWallpaper.id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + currentWallpaperList.length) % currentWallpaperList.length;
    } else {
      newIndex = (currentIndex + 1) % currentWallpaperList.length;
    }
    openModalWithWallpaper(currentWallpaperList[newIndex]);
  }, [selectedWallpaper, openModalWithWallpaper, filteredAndSortedWallpapers]);

  const handleSurpriseMe = () => {
    if (WALLPAPERS.length > 0) {
      const randomIndex = Math.floor(Math.random() * WALLPAPERS.length);
      openModalWithWallpaper(WALLPAPERS[randomIndex]);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <h2 className="text-3xl font-bold text-text-lt dark:text-light-text mb-4 md:mb-0">Discover Wallpapers</h2>
            <button
                onClick={handleSurpriseMe}
                className="inline-flex items-center justify-center bg-accent hover:bg-sky-600 dark:bg-accent-lt dark:hover:bg-sky-500 text-dark-text dark:text-text-on-accent-lt font-semibold py-2 px-4 transition-colors duration-200 text-sm"
                aria-label="Show a random wallpaper"
            >
                <SparklesIcon className="w-5 h-5 mr-2" />
                Surprise Me!
            </button>
        </div>
        
        {/* TagFilter component removed from here */}
        
        <SortOptions currentSort={currentSort} onSortChange={setCurrentSort} />

        {collectionsToDisplay.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-text-lt dark:text-light-text mt-8 mb-4">Collections</h3>
            <div className="masonry-grid">
              {collectionsToDisplay.map(collection => (
                <CollectionCard
                  key={`col-${collection.id}`}
                  collection={collection}
                  coverWallpaper={collection.coverWallpaper}
                />
              ))}
            </div>
            <hr className="my-8 border-border-light dark:border-border-dark" />
          </>
        )}
        
        <h3 className="text-2xl font-semibold text-text-lt dark:text-light-text mt-4 mb-4">All Wallpapers</h3>
        {filteredAndSortedWallpapers.length > 0 ? (
          <div className="masonry-grid">
            <WallpaperGrid wallpapers={filteredAndSortedWallpapers} onViewWallpaper={openModalWithWallpaper} />
          </div>
        ) : (
           <p className="text-center text-muted-text-lt dark:text-muted-text text-xl py-10">
             No wallpapers found. Try adjusting the sort order or check back later!
           </p>
        )}
        
        {WALLPAPERS.length === 0 && WALLPAPER_COLLECTIONS.length === 0 && ( // Initial empty state
           <p className="text-center text-muted-text-lt dark:text-muted-text text-xl py-10">No content found. Check back later!</p>
        )}
      </div>

      {selectedWallpaper && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedWallpaper.title}>
          <div className="relative flex flex-col items-center justify-center">
            {isFullImageLoading ? (
              <div className="w-full h-[60vh] flex items-center justify-center bg-primary-lt dark:bg-primary">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <img
                src={selectedWallpaper.fullUrl}
                alt={selectedWallpaper.altText}
                className="max-w-full max-h-[75vh] object-contain"
              />
            )}
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                <button
                    onClick={() => navigateWallpaper('prev')}
                    className="bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
                    aria-label="Previous wallpaper"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <button
                    onClick={() => navigateWallpaper('next')}
                    className="bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
                    aria-label="Next wallpaper"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="mt-4 p-4 bg-primary-lt dark:bg-primary w-full text-center border-t border-border-light dark:border-border-dark">
              <h3 className="text-xl font-semibold text-text-lt dark:text-light-text mb-1">{selectedWallpaper.title}</h3>
              <p className="text-sm text-muted-text-lt dark:text-muted-text mb-1">Theme: {selectedWallpaper.theme}</p>
              <p className="text-sm text-muted-text-lt dark:text-muted-text mb-3">Resolution: {selectedWallpaper.resolution}</p>
              {selectedWallpaper.tags && selectedWallpaper.tags.length > 0 && (
                <div className="mb-3">
                  {selectedWallpaper.tags.map(tag => <TagPill key={tag} tag={tag} className="text-xs" />)}
                </div>
              )}
              <a
                href={selectedWallpaper.fullUrl}
                download={`${selectedWallpaper.title.replace(/\s+/g, '_')}_${selectedWallpaper.resolution}.jpg`}
                className="inline-flex items-center justify-center bg-accent hover:bg-sky-600 dark:bg-accent-lt dark:hover:bg-sky-500 text-dark-text dark:text-text-on-accent-lt font-bold py-3 px-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
                aria-label={`Download ${selectedWallpaper.title}`}
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Download Full Resolution
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;