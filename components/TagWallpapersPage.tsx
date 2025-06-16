
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Wallpaper } from '../types';
import { WALLPAPERS, APP_TITLE } from '../constants';
import WallpaperGrid from './WallpaperGrid';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';
import { DownloadIcon, ChevronLeftIcon, ChevronRightIcon, HomeIcon, TagIcon } from './Icons';
import TagPill from './TagPill'; // For displaying tags in modal

const TagWallpapersPage: React.FC = () => {
  const { tagName: rawTagName } = useParams<{ tagName: string }>();
  const navigate = useNavigate();
  const tagName = useMemo(() => rawTagName ? decodeURIComponent(rawTagName) : '', [rawTagName]);

  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullImageLoading, setIsFullImageLoading] = useState(false);

  useEffect(() => {
    if (tagName) {
      document.title = `Tagged: #${tagName} - ${APP_TITLE}`;
    } else {
      document.title = `Invalid Tag - ${APP_TITLE}`;
      navigate('/', {replace: true});
    }
  }, [tagName, navigate]);

  const taggedWallpapers = useMemo(() => {
    if (!tagName) return [];
    return WALLPAPERS.filter(wp => wp.tags?.map(t => t.toLowerCase()).includes(tagName.toLowerCase()))
      .sort((a, b) => new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime()); // Default sort by newest
  }, [tagName]);

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

  const navigateWallpaperInTagResults = useCallback((direction: 'prev' | 'next') => {
    if (!selectedWallpaper || taggedWallpapers.length === 0) return;
    const currentIndex = taggedWallpapers.findIndex(wp => wp.id === selectedWallpaper.id);
    if (currentIndex === -1) { // Should not happen if selectedWallpaper is from taggedWallpapers
        if(taggedWallpapers.length > 0) openModalWithWallpaper(taggedWallpapers[0]);
        return;
    }

    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + taggedWallpapers.length) % taggedWallpapers.length;
    } else {
      newIndex = (currentIndex + 1) % taggedWallpapers.length;
    }
    openModalWithWallpaper(taggedWallpapers[newIndex]);
  }, [selectedWallpaper, taggedWallpapers, openModalWithWallpaper]);

  useEffect(() => {
    if (isModalOpen && selectedWallpaper) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
          navigateWallpaperInTagResults('prev');
        } else if (event.key === 'ArrowRight') {
          navigateWallpaperInTagResults('next');
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen, selectedWallpaper, navigateWallpaperInTagResults]);


  if (!tagName) { 
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-muted-text-lt dark:text-muted-text">Tag name not provided.</p>
         <Link to="/tags" className="text-accent dark:text-accent-lt hover:underline mt-4 inline-block">Browse all tags</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-secondary-lt dark:bg-secondary py-8 px-4 border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center gap-x-4 mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-accent dark:text-accent-lt hover:text-sky-400 dark:hover:text-sky-300 transition-colors group"
              aria-label="Back to Home"
            >
              <HomeIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              Home
            </Link>
            <Link 
              to="/tags" 
              className="inline-flex items-center text-accent dark:text-accent-lt hover:text-sky-400 dark:hover:text-sky-300 transition-colors group"
              aria-label="Back to All Tags"
            >
              <TagIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              All Tags
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-text-lt dark:text-light-text mb-2 tracking-tight">
            Wallpapers tagged: <span className="text-accent dark:text-accent-lt">#{tagName}</span>
          </h1>
          <p className="text-muted-text-lt dark:text-muted-text">
            Found {taggedWallpapers.length} wallpaper{taggedWallpapers.length !== 1 ? 's' : ''}.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {taggedWallpapers.length > 0 ? (
          <div className="masonry-grid">
            <WallpaperGrid wallpapers={taggedWallpapers} onViewWallpaper={openModalWithWallpaper} />
          </div>
        ) : (
          <p className="text-center text-muted-text-lt dark:text-muted-text text-xl py-10">
            No wallpapers found for the tag "#{tagName}". Try <Link to="/tags" className="text-accent dark:text-accent-lt hover:underline">browsing other tags</Link>.
          </p>
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
                    onClick={() => navigateWallpaperInTagResults('prev')}
                    className="bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
                    aria-label="Previous wallpaper"
                    disabled={taggedWallpapers.length <= 1}
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <button
                    onClick={() => navigateWallpaperInTagResults('next')}
                    className="bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
                    aria-label="Next wallpaper"
                    disabled={taggedWallpapers.length <= 1}
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

export default TagWallpapersPage;
