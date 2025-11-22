import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
  productTitle: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, currentImageIndex, onNextImage, onPrevImage, productTitle }) => {
  return (
    <div className="relative bg-gray-200 rounded-lg overflow-hidden">
      <div className="aspect-3/4 flex items-center justify-center">
        <img src={images[currentImageIndex]} alt={productTitle} className="max-w-full max-h-full object-contain" />
      </div>
      <button onClick={onPrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg">
        <ChevronLeft size={24} />
      </button>
      <button onClick={onNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ProductGallery;
