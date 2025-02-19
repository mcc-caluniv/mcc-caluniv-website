import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GanttChart, LogOut, X } from "lucide-react";
import MCCLogo from "../../assets/img/mcc.png";
import CULogo from "../../assets/img/cu.png";
import BG from "../../assets/img/asset-1.png";
import { useAuthStore } from "../../store/useAuthStore";
import { Button } from "../ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const { authUser, logout } = useAuthStore();

  // Navigation Items (conditionally show "Admin")
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Events", to: "/events" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  if (authUser) {
    navItems.push({ label: "Admin Dashboard", to: "/admin" });
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#1B2A4A] text-white z-50">
        <div className="relative">
          <div
            className={`absolute inset-0 bg-cover bg-center opacity-20 rotate-180 z-10`}
            style={{ backgroundImage: `url(${BG})` }}
          />
          <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-4 z-50">
              <LazyLoadImage
                effect="blur"
                width={55}
                src={CULogo}
                alt="CU Logo"
                className="invert object-contain"
              />
              <LazyLoadImage
                effect="blur"
                src={MCCLogo}
                alt="MCC Logo"
                className="h-14 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative text-sm font-medium transition-all duration-300 z-50 ${
                    location.pathname === item.to
                      ? "text-primary after:w-full"
                      : "text-muted after:w-0"
                  } hover:text-primary/80 after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:w-0 hover:after:w-full`}
                >
                  {item.label}
                </Link>
              ))}
              {authUser && (
                <Button
                  variant={"ghost"}
                  onClick={logout}
                  className="p-0 z-50 hover:bg-transparent hover:text-white/70"
                >
                  Logout
                  <LogOut />
                </Button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white z-20"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <GanttChart size={28} />}
            </button>
          </div>

          {/* Mobile Navigation (Dropdown Under Navbar) */}
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={
              isOpen
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden bg-[#1B2A4A] md:hidden z-50"
          >
            <ul className="flex flex-col items-center gap-4 pt-4 pb-8">
              {navItems.map((item) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={
                    isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
                  }
                  transition={{ delay: isOpen ? 0.1 : 0 }}
                >
                  <Link
                    to={item.to}
                    className={`relative text-sm font-medium transition-all duration-300 z-50 ${
                      location.pathname === item.to
                        ? "text-primary after:w-full"
                        : "text-muted after:w-0"
                    } hover:text-primary/80 after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:w-0 hover:after:w-full`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              {authUser && (
                <Button variant={"ghost"} onClick={logout}>
                  Logout
                  <LogOut />
                </Button>
              )}
            </ul>
          </motion.nav>
        </div>
      </header>
      {/* 🛠 FIX: Add padding to prevent content from being overlapped */}
      <div className="pt-[5.45rem]"></div>
    </>
  );
}
