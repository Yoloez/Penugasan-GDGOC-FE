import React from "react";
import { Book } from "./types";
import Image from "next/image";
import { fetchBookById } from "./bookApi";

interface ProductCardProps {
  book: Book;
  onBookClick?: (book: Book) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ book, onBookClick }) => {
  // Extract price from details.price string (e.g., "Rp 160,000" -> 160000)
  const priceString = book.details.price.replace(/[^0-9]/g, "");
  const priceIDR = parseInt(priceString);
  const priceUSD = priceIDR / 15000; // Convert IDR to USD (approximate rate)
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
    <div className="group cursor-pointer pb-8 bg-white" onClick={handleClick}>
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 mb-4">
        <Image src={book.cover_image} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
      </div>
      <div className="text-left px-6">
        <h3 className="font-bold text-gelap mb-2 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-abu mb-3">{book.category.name}</p>
        <div className="flex pl-2 items-center justify-start gap-2">
          <span className="text-gray-400 line-through text-sm">{formattedOriginalPrice}</span>
          <span className="text-greenMantap font-bold">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
