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
    <div className="relative w-full max-h-[606px]">
      <div className="relative rounded-lg overflow-hidden bg-gray-50">
        <div className="aspect-3/4 flex items-center justify-center">
          <img src={images[currentImageIndex]} alt={productTitle} className="max-w-full max-h-full object-contain" />
        </div>
      </div>
      <button onClick={onPrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-gelap/50 hover:bg-gelap/70 shadow-2xl rounded-full p-2 cursor-pointer transition-colors z-10">
        <ChevronLeft size={50} color="white" />
      </button>
      <button onClick={onNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-gelap/50 hover:bg-gelap/70 shadow-2xl rounded-full p-2 cursor-pointer transition-colors z-10">
        <ChevronRight size={50} color="white" />
      </button>
    </div>
  );
};

export default ProductGallery;
