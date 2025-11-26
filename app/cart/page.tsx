"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { cart, removeFromCart } = useShop();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-biru hover:underline mb-4 inline-block">
            ← Back to Shop
          </Link>
          <h1 className="text-3xl font-bold text-gelap mb-2">Shopping Cart</h1>
          <p className="text-abu">{cart.length} items in your cart</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gelap mb-2">Your cart is empty</h2>
            <p className="text-abu mb-6">Add some books to get started!</p>
            <Link href="/" className="px-6 py-3 bg-biru text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 flex gap-4 shadow-sm">
                  <div className="relative w-24 h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gelap mb-1">{item.title}</h3>
                    <p className="text-sm text-abu mb-2">{item.categories[0]}</p>
                    <p className="text-lg font-bold text-greenMantap">${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-red-50 rounded-full transition-colors self-start" title="Remove from cart">
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-gelap mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4 pb-4 border-b">
                  <div className="flex justify-between text-abu">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-abu">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold text-gelap mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-3 bg-biru text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
