"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Book, ApiResponse } from "./types";

interface BestsellerProductsProps {
  sort?: string;
  page?: number;
  year?: string;
  genre?: string;
  keyword?: string;
}

const BestsellerProducts: React.FC<BestsellerProductsProps> = ({ sort = "newest", page = 1, year = "", genre = "", keyword = "" }) => {
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

  if (loading) {
    return (
      <section className="py-12 flex justify-center bg-white">
        <div className="w-[1050px]">
          <div className="text-center text-gray-500">Loading products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 flex justify-center bg-white">
        <div className="w-[1050px]">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 flex justify-center">
      <div className="w-[1050px]">
        <h3 className="text-2xl font-bold text-left text-gelap mb-8">BESTSELLER PRODUCTS</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8 border-t-2 border-light-gray">
          {books.slice(0, 8).map((book) => (
            <ProductCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellerProducts;
