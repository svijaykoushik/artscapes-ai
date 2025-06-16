
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
import TagFilter from './TagFilter'; // Import TagFilter

const HomePage: React.FC = () => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullImageLoading, setIsFullImageLoading] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortOption>('dateAdded_desc');
  const [activeTags, setActiveTags] = useState<string[]>([]); // State for active tags

  useEffect(() => {
    document.title = `${APP_TITLE} - Home`;
  }, []);

  const allAvailableTags = useMemo(() => {
    const tags = new Set<string>();
    WALLPAPERS.forEach(wp => wp.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort((a,b) => a.localeCompare(b));
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setActiveTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  }, []);

  const handleClearTagFilters = useCallback(() => {
    setActiveTags([]);
  }, []);

  const filteredAndSortedWallpapers = useMemo(() => {
    let items = [...WALLPAPERS];

    if (activeTags.length > 0) {
      items = items.filter(wallpaper => 
        wallpaper.tags && wallpaper.tags.some(tag => activeTags.includes(tag))
      );
    }

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
  }, [currentSort, activeTags]);

  const collectionsToDisplay = useMemo(() => {
    let filteredCollections = [...WALLPAPER_COLLECTIONS];

    if (activeTags.length > 0) {
      filteredCollections = filteredCollections.filter(collection =>
        collection.tags && collection.tags.some(tag => activeTags.includes(tag))
      );
    }
    
    filteredCollections.sort((a,b) => a.name.localeCompare(b.name));

    return filteredCollections.map(collection => {
      const cover = WALLPAPERS.find(wp => wp.id === collection.coverWallpaperId);
      return { ...collection, coverWallpaper: cover };
    });
  }, [activeTags]);


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
    if (currentWallpaperList.length === 0) return;

    const currentIndex = currentWallpaperList.findIndex(wp => wp.id === selectedWallpaper.id);
    if (currentIndex === -1) { 
        openModalWithWallpaper(currentWallpaperList[0]);
        return;
    }

    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + currentWallpaperList.length) % currentWallpaperList.length;
    } else {
      newIndex = (currentIndex + 1) % currentWallpaperList.length;
    }
    openModalWithWallpaper(currentWallpaperList[newIndex]);
  }, [selectedWallpaper, openModalWithWallpaper, filteredAndSortedWallpapers]);

  useEffect(() => {
    if (isModalOpen && selectedWallpaper) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
          navigateWallpaper('prev');
        } else if (event.key === 'ArrowRight') {
          navigateWallpaper('next');
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen, selectedWallpaper, navigateWallpaper]);

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
                className="inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 transition-colors duration-200 text-sm"
                aria-label="Show a random wallpaper"
            >
                <SparklesIcon className="w-5 h-5 mr-2" />
                Surprise Me!
            </button>
        </div>
        
        <TagFilter 
          allTags={allAvailableTags}
          activeTags={activeTags}
          onTagClick={handleTagClick}
          onClearFilters={handleClearTagFilters}
        />
        
        <SortOptions currentSort={currentSort} onSortChange={setCurrentSort} />

        {WALLPAPER_COLLECTIONS.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-text-lt dark:text-light-text mt-8 mb-4">
              {activeTags.length > 0 ? 
                `Collections (${collectionsToDisplay.length} found)` : 
                'Featured Collections'
              }
            </h3>
            {collectionsToDisplay.length > 0 ? (
              <div className="masonry-grid">
                {collectionsToDisplay.map(collection => (
                  <CollectionCard
                    key={`col-home-${collection.id}`}
                    collection={collection}
                    coverWallpaper={collection.coverWallpaper}
                  />
                ))}
              </div>
            ) : (
              activeTags.length > 0 && ( 
                <p className="text-center text-muted-text-lt dark:text-muted-text text-lg py-6">
                  No collections match the current tag filters.
                </p>
              )
            )}
             { (collectionsToDisplay.length > 0 || activeTags.length > 0) && <hr className="my-8 border-border-light dark:border-border-dark" /> }
          </>
        )}
        
        <h3 className="text-2xl font-semibold text-text-lt dark:text-light-text mt-4 mb-4">
          {activeTags.length > 0 ? `Wallpapers (${filteredAndSortedWallpapers.length} found)` : 'All Wallpapers'}
        </h3>
        {filteredAndSortedWallpapers.length > 0 ? (
          <div className="masonry-grid">
            <WallpaperGrid wallpapers={filteredAndSortedWallpapers} onViewWallpaper={openModalWithWallpaper} />
          </div>
        ) : (
           <p className="text-center text-muted-text-lt dark:text-muted-text text-xl py-10">
             No wallpapers found. Try adjusting the filters or sort order, or check back later!
           </p>
        )}
        
        {WALLPAPERS.length === 0 && WALLPAPER_COLLECTIONS.length === 0 && (
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
                    disabled={filteredAndSortedWallpapers.length <= 1 && WALLPAPERS.length <=1}
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <button
                    onClick={() => navigateWallpaper('next')}
                    className="bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
                    aria-label="Next wallpaper"
                    disabled={filteredAndSortedWallpapers.length <= 1 && WALLPAPERS.length <=1}
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
                className="inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
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
