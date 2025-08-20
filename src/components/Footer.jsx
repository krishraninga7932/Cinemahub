import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-950 border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-400">
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">CinemaHub</h4>
            <p className="text-sm">
              Your gateway to the world of entertainment. Watch anywhere.
              Anytime.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-white">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/tv" className="hover:text-white">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link to="/details" className="hover:text-white">
                  Details
                </Link>
              </li>
              <li>
                <Link to="/list" className="hover:text-white">
                  My List
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@cinemahub.com"
                  className="hover:text-white"
                >
                  info@cinemahub.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-gray-500">
          © 2025 CinemaHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
