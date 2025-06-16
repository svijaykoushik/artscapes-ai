
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Wallpaper, WallpaperCollection } from '../types';
import { WALLPAPERS, WALLPAPER_COLLECTIONS, APP_TITLE } from '../constants';
import WallpaperGrid from './WallpaperGrid';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';
import { DownloadIcon, ChevronLeftIcon, ChevronRightIcon, HomeIcon } from './Icons';
import TagPill from './TagPill';

const CollectionPage: React.FC = () => {
  const { collectionSlug } = useParams<{ collectionSlug: string }>();
  const navigate = useNavigate();

  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullImageLoading, setIsFullImageLoading] = useState(false);

  const collection = useMemo(() => {
    return WALLPAPER_COLLECTIONS.find(c => c.slug === collectionSlug);
  }, [collectionSlug]);

  const collectionWallpapers = useMemo(() => {
    if (!collection) return [];
    return WALLPAPERS.filter(wp => collection.wallpaperIds.includes(wp.id))
      .sort((a,b) => new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime()); // Default sort by newest
  }, [collection]);

  useEffect(() => {
    if (collection) {
      document.title = `${collection.name} - Collections - ${APP_TITLE}`;
    } else {
      const timer = setTimeout(() => {
          if (!WALLPAPER_COLLECTIONS.find(c => c.slug === collectionSlug)) {
            console.warn(`Collection with slug "${collectionSlug}" not found.`);
            navigate('/', { replace: true });
          }
      }, 50);
      return () => clearTimeout(timer);
    }
    return () => {
      // Document title will be reset by App.tsx or other pages
    };
  }, [collection, collectionSlug, navigate]);


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

  const navigateWallpaperInCollection = useCallback((direction: 'prev' | 'next') => {
    if (!selectedWallpaper || collectionWallpapers.length === 0) return;
    const currentIndex = collectionWallpapers.findIndex(wp => wp.id === selectedWallpaper.id);
    if (currentIndex === -1) return; 

    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + collectionWallpapers.length) % collectionWallpapers.length;
    } else {
      newIndex = (currentIndex + 1) % collectionWallpapers.length;
    }
    openModalWithWallpaper(collectionWallpapers[newIndex]);
  }, [selectedWallpaper, collectionWallpapers, openModalWithWallpaper]);

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-12 text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-xl text-muted-text-lt dark:text-muted-text">Loading collection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-secondary-lt dark:bg-secondary py-8 px-4 border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center text-accent dark:text-accent-lt hover:text-sky-400 dark:hover:text-sky-300 mb-4 transition-colors group">
            <HomeIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-text-lt dark:text-light-text mb-2 tracking-tight">{collection.name}</h1>
          <p className="text-muted-text-lt dark:text-muted-text max-w-3xl leading-relaxed">{collection.description}</p>
           {collection.tags && collection.tags.length > 0 && (
            <div className="mt-3">
              {collection.tags.map(tag => <TagPill key={tag} tag={tag} className="text-sm" />)}
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {collectionWallpapers.length > 0 ? (
          <div className="masonry-grid">
            <WallpaperGrid wallpapers={collectionWallpapers} onViewWallpaper={openModalWithWallpaper} />
          </div>
        ) : (
          <p className="text-center text-muted-text-lt dark:text-muted-text text-xl py-10">This collection is currently empty.</p>
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
                    onClick={() => navigateWallpaperInCollection('prev')}
                    className="bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
                    aria-label="Previous wallpaper"
                    disabled={collectionWallpapers.length <= 1}
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <button
                    onClick={() => navigateWallpaperInCollection('next')}
                    className="bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
                    aria-label="Next wallpaper"
                    disabled={collectionWallpapers.length <= 1}
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

export default CollectionPage;
