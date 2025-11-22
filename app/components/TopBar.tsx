import React from "react";
import { FaTwitter, FaFacebook, FaYoutube, FaInstagram, FaMailBulk } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";

const TopBar: React.FC = () => {
  return (
    <div className="flex-row justify-items-center px-6 py-2 text-sm border-b border-emerald-600 bg-[#23856D] w-full">
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
          <span className="font-bold text-sm">Follow Us and get a chance to win 80% off</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold">Follow Us :</span>
            <FaInstagram size={16} />
            <FaYoutube size={16} />
            <FaFacebook size={16} />
            <FaTwitter size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
