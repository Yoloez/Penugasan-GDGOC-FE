"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useShop();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-biru hover:underline mb-4 inline-block">
            ← Back to Shop
          </Link>
          <h1 className="text-3xl font-bold text-gelap mb-2">My Wishlist</h1>
          <p className="text-abu">{wishlist.length} items in your wishlist</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gelap mb-2">Your wishlist is empty</h2>
            <p className="text-abu mb-6">Save your favorite books here!</p>
            <Link href="/" className="px-6 py-3 bg-biru text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] bg-gray-100">
                  <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gelap mb-1 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-abu mb-2">{item.categories[0]}</p>
                  <p className="text-lg font-bold text-greenMantap mb-4">${item.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={isInCart(item.id)}
                      className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                        isInCart(item.id) ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-biru text-white hover:bg-blue-700"
                      }`}
                    >
                      <ShoppingCart size={16} />
                      {isInCart(item.id) ? "In Cart" : "Add to Cart"}
                    </button>
                    <button onClick={() => removeFromWishlist(item.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Remove from wishlist">
                      <Trash2 size={20} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
