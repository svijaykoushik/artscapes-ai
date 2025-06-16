import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CollectionPage from './components/CollectionPage';
import CollectionsOverviewPage from './components/CollectionsOverviewPage';
import TagsIndexPage from './components/TagsIndexPage'; // New
import TagWallpapersPage from './components/TagWallpapersPage'; // New
import { ThemeProvider } from './contexts/ThemeContext';
import ScrollToTopButton from './components/ScrollToTopButton';
import { APP_TITLE } from './constants'; // For setting document title

const App: React.FC = () => {
  React.useEffect(() => {
    document.title = APP_TITLE; // Set default title
  }, []);

  return (
    <ThemeProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-primary-lt dark:bg-primary transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/collection/:collectionSlug" element={<CollectionPage />} />
              <Route path="/collections-overview" element={<CollectionsOverviewPage />} />
              <Route path="/tags" element={<TagsIndexPage />} /> {/* New Route for tags index */}
              <Route path="/tags/:tagName" element={<TagWallpapersPage />} /> {/* New Route for specific tag */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;