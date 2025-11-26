"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Book, ApiResponse } from "../types";

interface BestsellerProductsProps {
  sort?: string;
  page?: number;
  year?: string;
  genre?: string;
  keyword?: string;
  isSearching?: boolean;
  onClearSearch?: () => void;
  onBookSelect?: (book: Book) => void;
}

const BestsellerProducts: React.FC<BestsellerProductsProps> = ({ sort = "newest", page: initialPage = 2, year = "", genre = "", keyword = "", isSearching = false, onClearSearch, onBookSelect }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (sort) params.append("sort", sort);
        params.append("page", currentPage.toString());
        if (year) params.append("year", year);
        if (genre) params.append("genre", genre);
        // Normalize keyword to lowercase for case-insensitive search
        if (keyword) params.append("keyword", keyword.toLowerCase());

        const response = await fetch(`https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?${params.toString()}`);

        if (!response.ok) {
          throw new Error("keknya lagi banyak yang akses  ");
        }

        const data: ApiResponse = await response.json();

        // Client-side filtering for better case-insensitive matching
        let filteredBooks = data.books;
        if (keyword && keyword.trim()) {
          const searchTerm = keyword.toLowerCase();
          filteredBooks = data.books.filter((book) => book.title.toLowerCase().includes(searchTerm));
        }

        setBooks(filteredBooks);
        setPagination({
          totalPages: data.pagination.totalPages,
          totalItems: data.pagination.totalItems,
          hasNextPage: data.pagination.hasNextPage,
          hasPrevPage: data.pagination.hasPrevPage,
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [sort, currentPage, year, genre, keyword]);

  const handleBookClick = (book: Book) => {
    console.log("Book clicked:", book);
    if (onBookSelect) {
      onBookSelect(book);
    }
  };

  if (loading) {
    return (
      <section className="py-12 flex justify-center">
        <div className="w-[1050px]">
          <div className="text-center text-gray-500">Loading products...</div>
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
    <section className="py-6 md:py-12 flex justify-center" id="bestSeller">
      <div className="w-full max-w-[1050px] md:px-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-8 px-4 md:px-0 gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl md:text-2xl font-bold text-gelap">{isSearching ? `Search Results for "${keyword}"` : "Books For You"}</h3>
            {isSearching && books.length > 0 && (
              <p className="text-sm md:text-base text-abu">
                Found {books.length} book{books.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          {isSearching && onClearSearch && (
            <button onClick={onClearSearch} className="text-sm md:text-base px-4 py-2 bg-gray-200 text-gelap rounded-lg hover:bg-gray-300 transition-colors font-semibold self-start md:self-auto">
              Clear Search
            </button>
          )}
        </div>
        {books.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-lg text-abu mb-4">No books found matching "{keyword}"</p>
            {onClearSearch && (
              <button onClick={onClearSearch} className="px-6 py-3 bg-biru text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Show All Books
              </button>
            )}
          </div>
        ) : (
          <div className="md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 md:pt-8 md:border-t md:border-gray-200 overflow-x-auto flex md:flex-none gap-4 px-4 md:px-0 pb-4 md:pb-0 scrollbar-hide">
            {books.slice(0, 8).map((book) => (
              <ProductCard key={book._id} book={book} onBookClick={handleBookClick} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 md:gap-4 mt-6 md:mt-8 px-4 md:px-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={!pagination.hasPrevPage}
              className="px-3 md:px-4 py-2 text-sm md:text-base bg-biru text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-1 md:gap-2">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNumber;
                if (pagination.totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= pagination.totalPages - 2) {
                  pageNumber = pagination.totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 md:px-4 py-2 text-sm md:text-base cursor-pointer rounded-lg transition-colors ${currentPage === pageNumber ? "bg-biru text-white font-bold" : "bg-gray-200 text-gelap hover:bg-gray-300"}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
              disabled={!pagination.hasNextPage}
              className="px-3 md:px-4 py-2 text-sm md:text-base bg-biru cursor-pointer text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestsellerProducts;
