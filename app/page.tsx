"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ReadingList from "./components/ReadingList";
import BestsellerProducts from "./components/BestsellerProducts";
import { Product, Book, convertBookToProduct, ApiResponse } from "./types";
import { addToRecentlyViewed } from "./utils/recentlyViewed";

const ProductDetailPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [isSelectingBook, setIsSelectingBook] = useState(false);
  const [preventSearch, setPreventSearch] = useState(false);

  const initialProduct: Product = {
    id: "1",
    title: "Beyond the Stars",
    price: 11.33,
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
        const response = await fetch("https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?sort=popular&page=2");
        if (!response.ok) {
          throw new Error("Keknya lagi banyak yang akses");
        }

        const data: ApiResponse = await response.json();
        if (data.books && data.books.length > 0) {
          setAllBooks(data.books);
          const firstBook = data.books[0];
          const convertedProduct = convertBookToProduct(firstBook);
          setProduct(convertedProduct);
          setCurrentBookIndex(0);
          // Add to recently viewed
          addToRecentlyViewed(firstBook);
        }
      } catch (error) {
        console.error("Error fetching initial product:", error);
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
      const nextBookData = allBooks[nextIndex];
      const convertedProduct = convertBookToProduct(nextBookData);
      setProduct(convertedProduct);
      setCurrentImageIndex(0);
      // Add to recently viewed
      addToRecentlyViewed(nextBookData);
    }
  };

  const prevBook = () => {
    if (allBooks.length > 0) {
      const prevIndex = (currentBookIndex - 1 + allBooks.length) % allBooks.length;
      setCurrentBookIndex(prevIndex);
      const prevBookData = allBooks[prevIndex];
      const convertedProduct = convertBookToProduct(prevBookData);
      setProduct(convertedProduct);
      setCurrentImageIndex(0);
      // Add to recently viewed
      addToRecentlyViewed(prevBookData);
    }
  };

  const handleBookSelect = (book: Book) => {
    console.log("handleBookSelect called with book:", book);
    setIsSelectingBook(true);
    const convertedProduct = convertBookToProduct(book);
    console.log("Converted product:", convertedProduct);
    setProduct(convertedProduct);
    setCurrentImageIndex(0);
    setPreventSearch(true);
    // Add to recently viewed
    addToRecentlyViewed(book);

    // Scroll to product detail section with longer delay
    setTimeout(() => {
      console.log("Scrolling to product-detail...");
      const productDetail = document.getElementById("product-detail");
      if (productDetail) {
        console.log("Product detail element found, scrolling...");
        productDetail.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        console.log("Product detail element NOT found, scrolling to top");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setTimeout(() => {
        setIsSelectingBook(false);
        setPreventSearch(true); // RESET FLAG SETELAH SELESAI
      }, 1000);
    }, 200);
  };

  const handleSearch = (keyword: string) => {
    console.log("Search keyword:", keyword);
    // Don't scroll if user is selecting a book
    if (preventSearch || isSelectingBook) {
      console.log("Skipping search - user is selecting book");
      return;
    }

    setSearchKeyword(keyword);
    setIsSearching(keyword.trim().length > 0);

    setTimeout(() => {
      const bestsellerSection = document.getElementById("bestseller-section");
      if (bestsellerSection) {
        bestsellerSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
    setIsSearching(false);
  };

  return (
    <div id="home" className="min-h-screen bg-light">
      <Header onSearch={handleSearch} searchKeyword={searchKeyword} />
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

      <div id="reading-list">
        <ReadingList onBookClick={handleBookSelect} />
      </div>

      <div id="bestseller-section">
        <BestsellerProducts onBookSelect={handleBookSelect} keyword={searchKeyword} isSearching={isSearching} onClearSearch={handleClearSearch} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
