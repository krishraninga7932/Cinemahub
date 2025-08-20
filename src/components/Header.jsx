import React, { useState } from "react";
import { Search, User, Bell, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Using regular anchor tags for demo - replace with your Link component
  const Link = ({ to, children, className, onClick }) => (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  );

  return (
    <div>
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500 bg-clip-text text-transparent">
              CinemaHub
            </div>

            <ul className="hidden md:flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium relative group"
                >
                  Movies
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tv"
                  className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium relative group"
                >
                  TV Shows
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/details"
                  className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium relative group"
                >
                  View Details
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/list"
                  className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium relative group"
                >
                  My List
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>

            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-white hover:text-cyan-400 cursor-pointer transition-colors duration-300" />
              <Bell className="w-6 h-6 text-white hover:text-cyan-400 cursor-pointer transition-colors duration-300" />
              <User className="w-6 h-6 text-white hover:text-cyan-400 cursor-pointer transition-colors duration-300" />
              <Menu 
                className="w-6 h-6 text-white md:hidden cursor-pointer hover:text-cyan-400 transition-colors duration-300" 
                onClick={toggleMobileMenu}
              />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-full bg-gradient-to-bl from-black via-[#011422] to-black z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500 bg-clip-text text-transparent">
              CinemaHub
            </div>
            <X 
              className="w-6 h-6 text-white cursor-pointer hover:text-cyan-400 transition-colors duration-300"
              onClick={toggleMobileMenu}
            />
          </div>
          
          <ul className="space-y-6">
            <li>
              <Link
                to="/"
                className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium text-lg block"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium text-lg block"
                onClick={toggleMobileMenu}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/tv"
                className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium text-lg block"
                onClick={toggleMobileMenu}
              >
                TV Shows
              </Link>
            </li>
            <li>
              <Link
                to="/details"
                className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium text-lg block"
                onClick={toggleMobileMenu}
              >
                View Details
              </Link>
            </li>
            <li>
              <Link
                to="/list"
                className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium text-lg block"
                onClick={toggleMobileMenu}
              >
                My List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;