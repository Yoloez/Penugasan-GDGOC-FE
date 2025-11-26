import React from "react";
import { Book } from "../types";
import Image from "next/image";
import { fetchBookById } from "./bookApi";

interface ProductCardProps {
  book: Book;
  onBookClick?: (book: Book) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ book, onBookClick }) => {
  const priceString = book.details.price.replace(/[^0-9]/g, "");
  const priceIDR = parseInt(priceString);
  const priceUSD = priceIDR / 16654;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(priceUSD);

  // Calculate discounted price (e.g., 30% off)
  const originalPriceUSD = priceUSD * 1.3;
  const formattedOriginalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(originalPriceUSD);

  const handleClick = () => {
    console.log("ProductCard clicked, book:", book);
    if (onBookClick) {
      onBookClick(book);
    }
  };

  return (
    <div className="group cursor-pointer bg-white shrink-0 w-[238px] md:w-auto pb-8" onClick={handleClick}>
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 mb-3 md:mb-4">
        <Image src={book.cover_image} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
      </div>
      <div className="text-left px-4">
        <h3 className="font-bold text-gelap text-sm md:text-base mb-1 md:mb-2 line-clamp-1">{book.title}</h3>
        <p className="text-xs md:text-sm text-abu mb-2 md:mb-3">{book.category.name}</p>
        <div className="flex items-center px-2 justify-start gap-1 md:gap-2">
          <span className="text-greenMantap font-semibold text-[16px] md:text-base">{formattedOriginalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
