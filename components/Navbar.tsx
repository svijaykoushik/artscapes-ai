import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NavItem } from '../types';
import { NAV_LINKS, APP_TITLE } from '../constants';
import { XMarkIcon } from './Icons'; 
import ThemeToggleButton from './ThemeToggleButton'; // Import ThemeToggleButton

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);


const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  const renderNavLink = (item: NavItem) => {
    const commonClasses = "px-3 py-2 text-sm font-medium flex items-center space-x-2 block";
    const activeClasses = "bg-accent text-dark-text dark:bg-accent-lt dark:text-text-on-accent-lt";
    const inactiveClasses = "text-text-lt dark:text-light-text hover:bg-secondary-lt dark:hover:bg-secondary hover:text-accent dark:hover:text-accent transition-colors";

    if (item.path.startsWith('http')) { 
        return (
             <a
                key={item.label}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className={`${commonClasses} ${inactiveClasses}`}
            >
                {item.icon && <item.icon className="w-5 h-5" />}
                <span>{item.label}</span>
            </a>
        );
    }

    return (
        <NavLink
            key={item.label}
            to={item.path}
            onClick={closeMobileMenu}
            className={({ isActive }) => 
                `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
        >
            {item.icon && <item.icon className="w-5 h-5" />}
            <span>{item.label}</span>
        </NavLink>
    );
  }


  return (
    <nav className="bg-primary-lt dark:bg-primary sticky top-0 z-40 border-b border-border-light dark:border-border-dark transition-colors duration-300 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-accent dark:text-accent-lt text-2xl font-bold tracking-tight">
              {APP_TITLE}
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-baseline space-x-1">
              {NAV_LINKS.map(renderNavLink)}
            </div>
            <ThemeToggleButton />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggleButton />
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="ml-2 inline-flex items-center justify-center p-2 text-text-lt dark:text-light-text hover:text-accent dark:hover:text-accent hover:bg-secondary-lt dark:hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <XMarkIcon className="block h-6 w-6" /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-primary-lt dark:bg-primary z-30 p-2 space-y-1 sm:px-3 border-b border-border-light dark:border-border-dark shadow-lg transition-colors duration-300">
          {NAV_LINKS.map(renderNavLink)}
        </div>
      )}
    </nav>
  );
};

export default Navbar;