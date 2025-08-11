import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../public/ttrans.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isScholarshipPage = location.pathname === "/scholarship";

  // Define menu items based on current page
  const allMenuItems = [
    { name: "Home", href: "#home", route: "/" },
    { name: "About", href: "#about", route: "/" },
    { name: "Services", href: "#services", route: "/" },
    { name: "Contact", href: "#contact", route: "/" },
    { name: "Scholarship", href: "/scholarship", route: "/scholarship" },
  ];

  // Show only Home and Scholarship on scholarship page
  const menuItems = isScholarshipPage
    ? allMenuItems.filter(
        (item) => item.name === "Home" || item.name === "Scholarship"
      )
    : allMenuItems;

  const handleNavClick = (item) => {
    setIsOpen(false);

    if (item.route === "/scholarship") {
      // Navigate to scholarship page
      navigate("/scholarship");
    } else if (item.href.startsWith("#")) {
      // Handle hash navigation
      if (location.pathname !== "/") {
        // If not on homepage, navigate to homepage first
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on homepage, just scroll
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex justify-content-center align-items-center space-x-1.5">
            <img src={logo} alt="T-trans-logo" width={40} height={40} />
            <Link to="/" className="text-xl font-bold text-green-600 my-auto">
              <header>AUTOSAAS</header>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.route &&
                    item.route === "/scholarship"
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {item.name}
                </button>
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
            <button
              key={item.name}
              onClick={() => handleNavClick(item)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left ${
                location.pathname === item.route &&
                item.route === "/scholarship"
                  ? "text-green-600 bg-green-50"
                  : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
