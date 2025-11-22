import React from "react";
import { Book } from "./types";
import Image from "next/image";

interface ProductCardProps {
  book: Book;
}

const ProductCard: React.FC<ProductCardProps> = ({ book }) => {
  // Extract price from details.price string (e.g., "Rp 160,000" -> 160000)
  const priceString = book.details.price.replace(/[^0-9]/g, "");
  const price = parseInt(priceString);
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

  // Calculate discounted price (e.g., 30% off)
  const originalPrice = price * 1.3;
  const formattedOriginalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(originalPrice);

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Image src={book.cover_image} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-gelap mb-2 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-abu mb-3">{book.category.name}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-400 line-through text-sm">{formattedOriginalPrice}</span>
          <span className="text-greenMantap font-bold">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
