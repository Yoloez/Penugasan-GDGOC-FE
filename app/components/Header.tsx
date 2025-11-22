import React from "react";
import TopBar from "./TopBar";
import Navigation from "./Navigation";

const Header: React.FC = () => {
  return (
    <header className="text-white min-h-[136px] w-full flex flex-col">
      <TopBar />
      <Navigation />
    </header>
  );
};

export default Header;
