import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import logo from "../../public/ttrans.png";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 ">
          {/* Logo */}
          <div className="flex justify-content-center align-items-center space-x-1.5  ">
            <img src={logo} alt="T-trans-logo" width={40} height={40} />
            <h1 className="text-xl font-bold text-green-600 my-auto">
              AUTOSAAS
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={
          isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-200"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => {
                const el = document.querySelector(item.href);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  setTimeout(() => setIsOpen(false), 500);
                }
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
