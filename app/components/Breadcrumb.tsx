import React from "react";
import { ChevronRight } from "lucide-react";

const Breadcrumb: React.FC = () => {
  return (
    <div className="bg-light">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-center sm:justify-start sm:items-center gap-2 text-sm text-gray-600">
          <a href="" className="text-gelap hover:text-emerald-700 font-bold">
            Home
          </a>
          <ChevronRight size={16} className="text-muda" />
          <span className="text-muda font-bold">Shop</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
