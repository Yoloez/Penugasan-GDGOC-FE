"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import BestsellerProducts from "./components/BestsellerProducts";
import { Product } from "./components/types";

const ProductDetailPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product: Product = {
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-light">
      <Header />

      <section className="py-6 flex justify-center">
        <div className="w-[1050px]">
          <Breadcrumb />

          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ProductGallery images={product.images} currentImageIndex={currentImageIndex} onNextImage={nextImage} onPrevImage={prevImage} productTitle={product.title} />
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Bestseller Products */}
      <BestsellerProducts />
    </div>
  );
};

export default ProductDetailPage;
