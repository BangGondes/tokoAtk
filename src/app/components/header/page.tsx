"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

function Header() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productCount, setProductCount] = useState(0);

  const navItems = ["Home", "Product", "About", "Contact"];

  // Detect click outside for closing menu/search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get product count from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setProductCount(cart.length);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Mobile Header */}
        <div className="flex items-center justify-between w-full lg:hidden">
          <button
            ref={buttonRef}
            className="text-neutral-700 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition absolute left-1/2 -translate-x-1/2"
          >
            ATK
          </Link>

          <div className="flex items-center space-x-4">
            <button onClick={() => setShowSearch(!showSearch)}>
              <Search className="w-6 h-6 text-neutral-700 hover:text-blue-600 transition" />
            </button>
            <Link href="/keranjang" className="relative">
              <ShoppingCart className="w-6 h-6 text-neutral-700 hover:text-blue-600 transition" />
              {productCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {productCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Logo */}
        <Link
          href="/"
          className="hidden lg:block text-2xl font-bold text-blue-600 hover:text-blue-800 transition"
        >
          ATK
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-6 text-[16px] font-medium text-neutral-700">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-blue-500 transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-6 h-6 text-neutral-700 hover:text-blue-600 transition" />
          </button>
          <Link href="/keranjang" className="relative">
            <ShoppingCart className="w-6 h-6 text-neutral-700 hover:text-blue-600 transition" />
            {productCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {productCount}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="absolute top-full mt-2 w-full px-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full max-w-md mx-auto block border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden absolute left-4 top-[70px] bg-white border border-gray-200 rounded-xl shadow-xl w-60 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col p-5 space-y-4 text-neutral-800 font-medium">
          {navItems.map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="block hover:text-blue-500 transition"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/login"
              className="block bg-blue-500 hover:bg-blue-600 text-center text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
