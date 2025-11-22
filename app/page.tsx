"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ReadingList from "./components/ReadingList";
import BestsellerProducts from "./components/BestsellerProducts";
import { Product, Book, convertBookToProduct } from "./components/types";

const ProductDetailPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
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
    <div className="min-h-screen bg-light">
      <Header onSearch={handleSearch} />

      <section className="py-6 flex justify-center">
        <div className="w-[1050px]">
          <Breadcrumb />
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ProductGallery images={product.images} currentImageIndex={currentImageIndex} onNextImage={nextImage} onPrevImage={prevImage} productTitle={product.title} />
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Reading List */}
      <ReadingList onBookClick={handleBookSelect} />

      {/* Bestseller Products */}
      <div id="bestseller-section">
        <BestsellerProducts onBookSelect={handleBookSelect} keyword={searchKeyword} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
