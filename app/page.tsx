"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ReadingList from "./components/ReadingList";
import BestsellerProducts from "./components/BestsellerProducts";
import { Product, Book, convertBookToProduct, ApiResponse } from "./components/types";

const ProductDetailPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  const initialProduct: Product = {
    id: "1",
    title: "Beyond the Stars",
    price: 1139.33,
    availability: "In Stock",
    description: "Mei minum facile non deest. Alamo art sit officia dolor do met sem. RELIT official consequent door ENIM BELIT. Mollis Exclusion venal consequent sunt nostrum met. Auctor Marcus piem",
    pages: 328,
    format: "Paperback",
    isbn: "978-1-234567-90-8",
    published: "January 20, 2024",
    categories: ["Self Improvement", "Technology"],
    images: ["/images/hndoko.jpg"],
  };

  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    const fetchInitialProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?sort=popular&page=1");

        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }

        const data: ApiResponse = await response.json();
        if (data.books && data.books.length > 0) {
          setAllBooks(data.books);
          const firstBook = data.books[0];
          const convertedProduct = convertBookToProduct(firstBook);
          setProduct(convertedProduct);
          setCurrentBookIndex(0);
        }
      } catch (error) {
        console.error("Error fetching initial product:", error);
        // Keep using initialProduct as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchInitialProduct();
  }, []);

  const nextBook = () => {
    if (allBooks.length > 0) {
      const nextIndex = (currentBookIndex + 1) % allBooks.length;
      setCurrentBookIndex(nextIndex);
      const convertedProduct = convertBookToProduct(allBooks[nextIndex]);
      setProduct(convertedProduct);
      setCurrentImageIndex(0);
    }
  };

  const prevBook = () => {
    if (allBooks.length > 0) {
      const prevIndex = (currentBookIndex - 1 + allBooks.length) % allBooks.length;
      setCurrentBookIndex(prevIndex);
      const convertedProduct = convertBookToProduct(allBooks[prevIndex]);
      setProduct(convertedProduct);
      setCurrentImageIndex(0);
    }
  };

  const handleBookSelect = (book: Book) => {
    console.log("handleBookSelect called with book:", book);
    const convertedProduct = convertBookToProduct(book);
    console.log("Converted product:", convertedProduct);
    setProduct(convertedProduct);
    setCurrentImageIndex(0);
    // Scroll to product detail section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (keyword: string) => {
    console.log("Search keyword:", keyword);
    setSearchKeyword(keyword);
    // Scroll to bestseller products section
    const bestsellerSection = document.getElementById("bestseller-section");
    if (bestsellerSection) {
      bestsellerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="min-h-screen bg-light">
      <Header onSearch={handleSearch} />

      <section id="product-detail" className="py-6 flex justify-center">
        <div className="w-[1050px]">
          <Breadcrumb />
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ProductGallery images={product.images} currentImageIndex={currentImageIndex} onNextImage={nextBook} onPrevImage={prevBook} productTitle={product.title} />
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Reading List */}
      <div id="reading-list">
        <ReadingList onBookClick={handleBookSelect} />
      </div>

      {/* Bestseller Products */}
      <div id="bestseller-section">
        <BestsellerProducts onBookSelect={handleBookSelect} keyword={searchKeyword} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
