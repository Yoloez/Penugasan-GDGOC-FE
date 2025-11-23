"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, Search, UserRound, X, Menu } from "lucide-react";
import { BiMenuAltRight } from "react-icons/bi";
import { IoChevronDownOutline } from "react-icons/io5";

interface NavigationProps {
  onSearch?: (keyword: string) => void;
  isScrolled?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onSearch, isScrolled }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <div className={`flex justify-center bg-white py-2 z-50 shadow-sm transition-all duration-300 ${isScrolled ? "fixed top-0 left-0 right-0" : "sticky top-0"}`}>
      <div className="flex text-gray-700 justify-between items-center py-4 w-full max-w-[1042px] px-4 md:px-0">
        <a href="#">
          <div className="text-2xl font-bold">Bookstar</div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-abu font-semibold">
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="hover:text-emerald-600">
            Home
          </a>
          <a href="#product-detail" onClick={(e) => handleNavClick(e, "#product-detail")} className="hover:text-emerald-600 text-gelap">
            Shop
            <span>
              <IoChevronDownOutline size={12} className="inline-block ml-2" />
            </span>
          </a>
          <a href="#reading-list" onClick={(e) => handleNavClick(e, "#reading-list")} className="hover:text-emerald-600">
            About
          </a>
          <a href="#bestseller-section" onClick={(e) => handleNavClick(e, "#bestseller-section")} className="hover:text-emerald-600">
            Blog
          </a>
          <a href="#product-detail" onClick={(e) => handleNavClick(e, "#product-detail")} className="hover:text-emerald-600">
            Contact
          </a>
          <a href="#bestseller-section" onClick={(e) => handleNavClick(e, "#bestseller-section")} className="hover:text-emerald-600">
            Pages
          </a>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6 text-biru">
          <a href="#" className="text-biru flex gap-1 font-semibold hover:text-blue-600">
            <span>
              <UserRound size={20} className="cursor-pointer" />
            </span>
            Login / Register
          </a>
          <Search size={20} className="cursor-pointer" onClick={handleSearchToggle} />
          <div className="flex items-center gap-1">
            <ShoppingCart size={20} className="cursor-pointer" />
            <span>1</span>
          </div>
          <div className="flex items-center gap-1 text-biru">
            <Heart size={20} className="cursor-pointer" />
            <span>1</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isMenuOpen ? <BiMenuAltRight size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-8 flex flex-col items-center gap-8 h-[calc(100vh-80px)] overflow-y-auto border-t border-gray-100">
          <nav className="flex flex-col items-center gap-6 text-abu font-semibold text-xl">
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="hover:text-emerald-600">
              Home
            </a>
            <a href="#product-detail" onClick={(e) => handleNavClick(e, "#product-detail")} className="hover:text-emerald-600 text-gelap">
              Shop
            </a>
            <a href="#reading-list" onClick={(e) => handleNavClick(e, "#reading-list")} className="hover:text-emerald-600">
              About
            </a>
            <a href="#bestseller-section" onClick={(e) => handleNavClick(e, "#bestseller-section")} className="hover:text-emerald-600">
              Blog
            </a>
            <a href="#product-detail" onClick={(e) => handleNavClick(e, "#product-detail")} className="hover:text-emerald-600">
              Contact
            </a>
            <a href="#bestseller-section" onClick={(e) => handleNavClick(e, "#bestseller-section")} className="hover:text-emerald-600">
              Pages
            </a>
          </nav>
          <div className="flex flex-col items-center gap-6 text-biru text-xl">
            <a href="#" className="text-biru flex gap-2 font-semibold hover:text-blue-600 items-center">
              <UserRound size={24} />
              Login / Register
            </a>
            <Search size={24} className="cursor-pointer text-biru" onClick={handleSearchToggle} />
            <div className="flex items-center gap-1 text-biru">
              <ShoppingCart size={24} className="cursor-pointer" />
              <span>1</span>
            </div>
            <div className="flex items-center gap-1 text-biru">
              <Heart size={24} className="cursor-pointer" />
              <span>1</span>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <div className="flex justify-center py-4">
            <div className="w-[1042px] flex items-center gap-4">
              <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books by title, author, or keyword..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gelap focus:outline-none focus:border-biru"
                />
                <button type="submit" className="px-6 py-2 bg-biru text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Search
                </button>
              </form>
              <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
