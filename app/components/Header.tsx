import React from "react";
import TopBar from "./TopBar";
import Navigation from "./Navigation";

interface HeaderProps {
  onSearch?: (keyword: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="text-white min-h-[136px] w-full flex flex-col">
      <TopBar />
      <Navigation onSearch={onSearch} />
    </header>
  );
};

export default Header;
