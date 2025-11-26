"use client";

import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Navigation from "./Navigation";

interface HeaderProps {
  onSearch?: (keyword: string) => void;
  searchKeyword?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchKeyword = "" }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 90);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="text-white w-full">
      <TopBar isScrolled={isScrolled} />
      <Navigation
        onSearch={onSearch}
        isScrolled={isScrolled}
        searchKeyword={searchKeyword}
        // Pass ke Navigation
      />
    </header>
  );
};

export default Header;
