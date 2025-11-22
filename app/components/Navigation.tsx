import React from "react";
import { ShoppingCart, Heart, Search, UserRound } from "lucide-react";

const Navigation: React.FC = () => {
  return (
    <div className="flex justify-center bg-white sticky top-0 z-50">
      <div className="flex text-gray-700 justify-between items-center py-4 w-[1042px]">
        <div className="text-2xl font-bold">Bandage</div>
        <nav className="flex gap-6 text-abu font-bold">
          <a href="#" className="hover:text-emerald-600">
            Home
          </a>
          <a href="#" className="hover:text-emerald-600 font-medium text-gelap">
            Shop
          </a>
          <a href="#" className="hover:text-emerald-600">
            About
          </a>
          <a href="#" className="hover:text-emerald-600">
            Blog
          </a>
          <a href="#" className="hover:text-emerald-600">
            Contact
          </a>
          <a href="#" className="hover:text-emerald-600">
            Pages
          </a>
        </nav>
        <div className="flex items-center gap-6 text-biru">
          <UserRound size={20} className="cursor-pointer" />
          <a href="#" className="text-[#23A6F0] font-bold hover:text-blue-600">
            Login / Register
          </a>
          <Search size={20} className="cursor-pointer" />
          <div className="flex items-center gap-1">
            <ShoppingCart size={20} className="cursor-pointer" />
            <span>1</span>
          </div>
          <div className="flex items-center gap-1 text-biru">
            <Heart size={20} className="cursor-pointer" />
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
