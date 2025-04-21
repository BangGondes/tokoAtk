"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

function Header() {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productCount, setProductCount] = useState(0);

  const navItems = ["Home", "Product", "About", "Contact"];

  // Deteksi klik luar (untuk tutup menu/search)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Deteksi tombol ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSearch(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Ambil jumlah item dari localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setProductCount(cart.length);
  }, []);

  // Fungsi untuk menangani pencarian saat tombol Enter ditekan
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Mencegah form submit (jika ada)
      if (searchQuery.trim() !== "") {
        // Lakukan aksi pencarian, misalnya mengarahkan ke halaman pencarian
        console.log("Pencarian: ", searchQuery);
        // Contoh redirect ke halaman pencarian (ganti sesuai dengan kebutuhan)
        // router.push(`/search?q=${searchQuery}`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Mobile Header */}
        <div className="flex items-center justify-between w-full lg:hidden">
          <button
            ref={menuButtonRef}
            className="text-neutral-700 transition"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 absolute left-1/2 -translate-x-1/2"
          >
            ATK
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label="Search"
            >
              <Search className="w-6 h-6 text-neutral-700 hover:text-blue-600 transition" />
            </button>
            <Link href="/keranjang" className="relative" aria-label="Cart">
              <ShoppingCart className="w-6 h-6 text-neutral-700 hover:text-blue-600 transition" />
              {productCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {productCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Logo */}
        <Link
          href="/"
          className="hidden lg:block text-2xl font-bold text-blue-600 hover:text-blue-800"
        >
          ATK
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-6 text-base font-medium text-neutral-700">
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

        {/* Desktop Tools */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            aria-label="Search"
          >
            <Search className="w-6 h-6 text-neutral-700 hover:text-blue-600 transition" />
          </button>
          <Link href="/keranjang" className="relative" aria-label="Cart">
            <ShoppingCart className="w-6 h-6 text-neutral-700 hover:text-blue-600 transition" />
            {productCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
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

      {/* 🔍 Search Input */}
      {showSearch && (
        <div
          ref={searchRef}
          className="absolute top-full left-0 right-0 mt-2 px-4 z-40 transition-all duration-200"
        >
          <div className="relative w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk..."
              onKeyDown={handleSearchSubmit}  
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute left-4 top-[70px] w-60 bg-white border border-gray-200 rounded-xl shadow-xl transition-transform duration-300 ease-in-out transform ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
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
