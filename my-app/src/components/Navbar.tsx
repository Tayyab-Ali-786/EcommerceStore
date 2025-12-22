"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  ShoppingCart,
  Heart,
  Menu,
  ChevronDown,
  Search,
} from "lucide-react";

export default function Navbar() {
  const [catsOpen, setCatsOpen] = useState(false);
  const categories = ["Men", "Women", "Kids", "Accessories", "Sale"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-sky-700 to-indigo-800 text-white backdrop-blur-md shadow-xl">
      {/* Increased height -> h-24 */}
      <div className="max-w-7xl mx-auto h-24 flex items-center px-6 sm:px-8 gap-6">
        {/* Left: Logo + Categories */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-extrabold tracking-tight">MC</span>
            </div>
            <div className="hidden md:block">
              <span className="text-2xl font-bold">My Store</span>
              <div className="text-base text-white/80">Quality & Style</div>
            </div>
          </Link>

          {/* Categories dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setCatsOpen((s) => !s)}
              onBlur={() => setTimeout(() => setCatsOpen(false), 150)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-3 rounded-md hover:bg-white/10 transition text-lg"
              aria-expanded={catsOpen}
            >
              Categories <ChevronDown className="w-5 h-5" />
            </button>

            {catsOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white/95 text-gray-800 rounded-md shadow-lg ring-1 ring-black/10">
                <ul>
                  {categories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/category/${cat.toLowerCase()}`}
                        className="block px-5 py-3 hover:bg-gray-100"
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 px-4">
          <div className="hidden sm:flex justify-center">
            <div className="w-full max-w-3xl">
              <label className="relative block">
                <span className="sr-only">Search products</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/70">
                  <Search className="w-5 h-5" />
                </span>
                <input
                  type="search"
                  placeholder="Search products, brands, categories..."
                  className="w-full rounded-full bg-white/10 text-white placeholder-white/60 py-3 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-white/25 text-lg transition"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right: Icons / Actions */}
        <div className="flex items-center gap-4">
          <button
            className="inline-flex items-center justify-center p-3 rounded-md hover:bg-white/10 md:hidden"
            aria-label="menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link
            href="/wishlist"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-md hover:bg-white/10 transition text-lg"
          >
            <Heart className="w-6 h-6" />
            <span className="hidden sm:inline">Wishlist</span>
          </Link>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-md hover:bg-white/10 transition text-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="hidden md:inline">Cart</span>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-md hover:bg-white/10 transition text-lg"
          >
            <User className="w-6 h-6" />
            <span className="hidden md:inline">Login</span>
          </Link>

          <Link
            href="/signup"
            className="ml-2 inline-flex items-center gap-3 bg-white text-indigo-800 font-semibold px-6 py-3 rounded-full hover:brightness-95 transition text-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};