"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = ["Home", "About", "Contact", "Products", "Services"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-md px-6 py-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-400 hover:text-white transition duration-300"
        >
          ATK
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-6 text-lg font-medium">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-blue-400 transition duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          className="lg:hidden text-white transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden absolute right-4 top-[70px] bg-gray-800 rounded-xl shadow-xl w-56 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col p-5 space-y-4 text-white font-medium">
          {navItems.map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="block hover:text-blue-400 transition duration-300"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/login"
              className="block bg-blue-500 hover:bg-blue-600 text-center text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="block bg-blue-500 hover:bg-blue-600 text-center text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
