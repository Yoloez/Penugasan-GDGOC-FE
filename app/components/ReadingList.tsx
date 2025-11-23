"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Book, ApiResponse } from "./types";

interface ReadingListProps {
  sort?: string;
  page?: number;
  year?: string;
  genre?: string;
  keyword?: string;
  onBookClick?: (book: Book) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ sort = "popular", page = 2, year = "", genre = "", keyword = "", onBookClick }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (sort) params.append("sort", sort);
        if (page) params.append("page", page.toString());
        if (year) params.append("year", year);
        if (genre) params.append("genre", genre);
        if (keyword) params.append("keyword", keyword);

        const response = await fetch(`https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data: ApiResponse = await response.json();
        setBooks(data.books);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [sort, page, year, genre, keyword]);

  const handleBookClick = (book: Book) => {
    console.log("Reading list book clicked:", book);
    if (onBookClick) {
      onBookClick(book);
    }
  };

  if (loading) {
    return (
      <section className="py-12 flex justify-center">
        <div className="w-[1050px]">
          <div className="text-center text-gray-500">Loading reading list...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 flex justify-center">
        <div className="w-[1050px]">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-12 flex justify-center">
      <div className="w-full max-w-[1050px] md:px-0">
        <h2 className="text-xl md:text-2xl font-bold text-gelap mb-4 md:mb-8 px-4 md:px-0">Your Reading List</h2>
        <div className="md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 md:border-t md:border-gray-200 md:pt-8 overflow-x-auto flex md:flex-none gap-4 px-4 md:px-0 pb-4 md:pb-0 scrollbar-hide">
          {books.slice(0, 4).map((book) => {
            const priceString = book.details.price.replace(/[^0-9]/g, "");
            const priceIDR = parseInt(priceString);
            const priceUSD = priceIDR / 15000; // Convert IDR to USD (approximate rate)
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
                  <div className="flex items-center justify-start gap-1 md:gap-2 px-1">
                    <span className="text-gray-400 line-through text-xs md:text-sm">{formattedOriginalPrice}</span>
                    <span className="text-greenMantap font-bold text-sm md:text-base">{formattedPrice}</span>
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
