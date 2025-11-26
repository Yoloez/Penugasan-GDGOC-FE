import React from "react";
import { FaTwitter, FaFacebook, FaYoutube, FaInstagram, FaMailBulk } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";

interface TopBarProps {
  isScrolled?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isScrolled }) => {
  return (
    <div className={`hidden md:flex flex-row justify-items-center justify-center px-6 py-2 text-sm border-b bg-[#23856D] w-full transition-all duration-300 ${isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"}`}>
      <div className="w-[1020px] h-[46px] flex justify-between items-center">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <FiPhone size={14} />
            <span className="font-normal">(225) 555-0118</span>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <TfiEmail size={14} />
            <span className="font-normal">michelle.rivera@example.com</span>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-sm">Follow Us and get a chance to win 80% off</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-normal">Follow Us :</span>
            <a href="">
              <FaInstagram size={16} />
            </a>
            <a href="">
              <FaYoutube size={16} />
            </a>
            <a href="">
              <FaFacebook size={16} />
            </a>
            <a href="">
              <FaTwitter size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
