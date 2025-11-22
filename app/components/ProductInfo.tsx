import React from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Product } from "./types";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {product.categories.map((cat) => (
          <span key={cat} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded">
            {cat}
          </span>
        ))}
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

      <div className="text-3xl font-bold text-gray-900 mb-2">${product.price.toFixed(2)}</div>

      <div className="mb-4">
        <span className="text-sm font-semibold">Availability: </span>
        <span className="text-sm text-blue-600 font-semibold">{product.availability}</span>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

      <div className="border-t pt-6 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Pages:</span>
            <span className="ml-2 font-semibold">{product.pages}</span>
          </div>
          <div>
            <span className="text-gray-500">Format:</span>
            <span className="ml-2 font-semibold">{product.format}</span>
          </div>
          <div>
            <span className="text-gray-500">ISBN:</span>
            <span className="ml-2 font-semibold">{product.isbn}</span>
          </div>
          <div>
            <span className="text-gray-500">Published:</span>
            <span className="ml-2 font-semibold">{product.published}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="px-5 py-2.5 bg-biru hover:bg-blue-700 text-white font-semibold rounded-[5px]">Select Options</button>
        <button className="p-3 border-2 border-gray-300 hover:border-blue-600 rounded-4xl">
          <Heart size={24} />
        </button>
        <button className="p-3 border-2 border-gray-300 hover:border-blue-600 rounded-4xl">
          <ShoppingCart size={24} color="text-gelap" />
        </button>
        <button className="p-3 border-2 border-gray-300 hover:border-blue-600 rounded-4xl">
          <Eye size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
