import { ShoppingCart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Header = ({ cartCount = 0 }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleResize() {
      if (window.innerWidth > 768) setMobileOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  const handleNavMobile = () => setMobileOpen(false);

  const navLinks = [
    <NavLink
      key="home"
      to="/"
      className={({ isActive }) =>
        `transition-colors duration-200 no-underline ${isActive ? 'text-theme-teal font-bold' : 'text-theme-secondary hover:text-theme-teal font-semibold'}`
      }
      onClick={handleNavMobile}
    >
      Home
    </NavLink>,
    <NavLink
      key="sobre"
      to="/sobre"
      className={({ isActive }) =>
        `transition-colors duration-200 no-underline ${isActive ? 'text-theme-teal font-bold' : 'text-theme-secondary hover:text-theme-teal font-semibold'}`
      }
      onClick={handleNavMobile}
    >
      Sobre
    </NavLink>,
    (
      <div key="produtos" className="relative" ref={dropdownRef}>
        <button
          className="text-theme-secondary font-semibold hover:text-theme-teal transition-colors duration-200 cursor-pointer"
          onClick={() => setDropdownOpen((open) => !open)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          Produtos
          <svg className="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <ul className="absolute left-0 mt-2 w-48 bg-theme-background border-theme rounded-lg shadow-lg py-2" role="menu">
            <li>
              <NavLink
                to="/produtos/bootstrap"
                className={({ isActive }) =>
                  `block px-4 py-2 focus:bg-theme-teal-light focus:outline-none transition-colors duration-200 no-underline ${isActive ? 'text-theme-teal bg-theme-teal-light' : 'text-theme-secondary hover:bg-theme-teal-light'}`
                }
                role="menuitem"
                onClick={() => { setDropdownOpen(false); handleNavMobile(); }}
              >
                Bootstrap
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/produtos/material"
                className={({ isActive }) =>
                  `block px-4 py-2 focus:bg-theme-teal-light focus:outline-none transition-colors duration-200 no-underline ${isActive ? 'text-theme-teal bg-theme-teal-light' : 'text-theme-secondary hover:bg-theme-teal-light'}`
                }
                role="menuitem"
                onClick={() => { setDropdownOpen(false); handleNavMobile(); }}
              >
                Material UI
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/produtos/milligram"
                className={({ isActive }) =>
                  `block px-4 py-2 focus:bg-theme-teal-light focus:outline-none transition-colors duration-200 no-underline ${isActive ? 'text-theme-teal bg-theme-teal-light' : 'text-theme-secondary hover:bg-theme-teal-light'}`
                }
                role="menuitem"
                onClick={() => { setDropdownOpen(false); handleNavMobile(); }}
              >
                Milligram
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    )
  ];

  return (
    <header className="bg-theme-background shadow-md fixed top-0 left-0 w-full z-50 transition-colors duration-200">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-bold text-xl text-theme-teal hover:text-theme-teal transition-colors duration-200 no-underline flex items-center gap-2"
        >
          <Logo size={28} />
          StyledStore
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          {navLinks}
        </div>
        <div className="flex items-center gap-1 relative">
          <div className="sm:hidden">
            <button
              className="p-2 rounded-lg text-theme-secondary hover:bg-theme-teal-light focus:outline-none focus:ring-2 focus:ring-theme-teal transition-colors duration-200 cursor-pointer"
              aria-label="Abrir menu"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <ThemeToggle />
          <button
            aria-label="Carrinho"
            className="p-2 rounded-lg text-theme-teal hover:bg-theme-teal-light focus:outline-none focus:ring-2 focus:ring-theme-teal transition-colors duration-200 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-[1px] -right-[1px] bg-badge-cart text-white text-xs rounded-full w-4 h-4 flex items-center justify-center px-1 font-medium">
              {cartCount}
            </span>
          )}
        </div>
      </nav>
      {mobileOpen && (
        <div ref={mobileMenuRef} className="sm:hidden bg-theme-background border-t border-theme px-6 py-4 flex flex-col gap-4 shadow-lg cursor-pointer">
          {navLinks}
        </div>
      )}
    </header>
  );
};

export default Header;
