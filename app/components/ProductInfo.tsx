import React, { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Product } from "./types";
import { IoEyeSharp } from "react-icons/io5";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxHeight = 150;

  return (
    <div className="max-w-[510px]" id="product-info">
      <div className="flex flex-wrap gap-2 mb-4 max-w-[510px]">
        {product.categories.slice(0, 4).map((cat, index) => (
          <span key={`${cat}-${index}`} className="px-3 py-1 bg-netral font-medium text-black text-sm rounded-[40px] whitespace-nowrap">
            {cat}
          </span>
        ))}
      </div>

      <h1 className="text-[32px] font-bold text-gelap mb-1">{product.title}</h1>

      <h3 className="text-2xl font-bold text-gelap mb-2">${product.price.toFixed(2)}</h3>

      <div className="mb-4">
        <span className="text-sm font-semibold text-abu">Availability : </span>
        <span className="text-sm text-biru font-semibold">{product.availability}</span>
      </div>

      <div className="mb-6">
        <div className={`text-desc font-normal leading-relaxed overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-none" : "max-h-[150px]"}`}>{product.description}</div>
        {product.description.length > 300 && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-biru font-semibold text-sm mt-2 hover:underline cursor-pointer">
            {isExpanded ? "See less" : "See more..."}
          </button>
        )}
      </div>

      <div className="border-t pt-6 mb-6">
        <div className="text-sm text-desc flex flex-col gap-1">
          <div>
            <span className="text-desc font-bold">Pages:</span>
            <span className="ml-2 font-normal">{product.pages}</span>
          </div>
          <div>
            <span className="text-desc font-bold">Publisher:</span>
            <span className="ml-2 font-normal">{product.format}</span>
          </div>
          <div>
            <span className="text-desc font-bold">ISBN:</span>
            <span className="ml-2 font-normal">{product.isbn}</span>
          </div>
          <div>
            <span className="text-desc font-bold">Published:</span>
            <span className="ml-2 font-normal">{product.published}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="px-3  bg-[#007AFF] hover:bg-blue-700 text-white font-semibold rounded-xl">Buy Now</button>
        <button className="p-3 bg-primary  rounded-4xl">
          <Heart size={20} className="text-gelap" />
        </button>
        <button className="p-3 bg-primary rounded-4xl">
          <ShoppingCart size={20} className="text-gelap" />
        </button>
        <button className="p-3 bg-primary rounded-4xl">
          <IoEyeSharp size={20} className="text-gelap" />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
