"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Book } from "../types";

interface ReadingListProps {
  onBookClick?: (book: Book) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ onBookClick }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load recently viewed books from localStorage
    const loadRecentlyViewed = () => {
      try {
        setLoading(true);
        const saved = localStorage.getItem("recentlyViewed");
        if (saved) {
          const recentBooks: Book[] = JSON.parse(saved);
          setBooks(recentBooks.slice(0, 4)); // Show max 8 books
        }
      } catch (err) {
        console.error("Error loading recently viewed books:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadRecentlyViewed();

    // Listen for storage changes (when a book is viewed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "recentlyViewed") {
        loadRecentlyViewed();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab updates
    const handleCustomEvent = () => {
      loadRecentlyViewed();
    };

    window.addEventListener("recentlyViewedUpdated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("recentlyViewedUpdated", handleCustomEvent);
    };
  }, []);

  const handleBookClick = (book: Book) => {
    console.log("Reading list book clicked:", book);
    if (onBookClick) {
      onBookClick(book);
    }
  };

  if (loading) {
    return null; // Don't show anything while loading
  }

  if (books.length === 0) {
    return null; // Don't show section if no recently viewed books
  }

  return (
    <section className="py-6 md:py-12 flex justify-center">
      <div className="w-full max-w-[1050px] md:px-0">
        <h2 className="text-xl md:text-2xl font-bold text-gelap mb-4 md:mb-8 px-4 md:px-0">Your Reading List</h2>
        <div className="md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 md:border-t md:border-gray-200 md:pt-8 overflow-x-auto flex md:flex-none gap-4 px-4 md:px-0 pb-4 md:pb-0 scrollbar-hide">
          {books.map((book) => {
            const priceString = book.details.price.replace(/[^0-9]/g, "");
            const priceIDR = parseInt(priceString);
            const priceUSD = priceIDR / 16654; // Convert IDR to USD (current rate: Rp 16,654 per USD)
            const formattedPrice = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(priceUSD);

            const originalPriceUSD = priceUSD * 1.3;
            const formattedOriginalPrice = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(originalPriceUSD);

            return (
              <div key={book._id} className="group cursor-pointer bg-white shrink-0 w-[238px] md:w-auto pb-8" onClick={() => handleBookClick(book)}>
                <div className="relative aspect-3/4 overflow-hidden bg-gray-100 mb-3 md:mb-4">
                  <Image src={book.cover_image} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
                </div>
                <div className="text-left px-3">
                  <h3 className="font-bold text-gelap text-sm md:text-base mb-1 md:mb-2 line-clamp-1">{book.title}</h3>
                  <p className="text-xs md:text-sm text-abu mb-2 md:mb-3">{book.category.name}</p>
                  <div className="flex items-center justify-start gap-1 md:gap-2 px-2">
                    <span className="text-greenMantap font-semibold text-[16px] md:text-base">{formattedOriginalPrice}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReadingList;
