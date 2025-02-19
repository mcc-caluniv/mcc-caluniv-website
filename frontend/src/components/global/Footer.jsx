import React from "react";
import BG from "../../assets/img/asset-2.png";
import Logo from "../../assets/img/mcc.png";
import CULogo from "../../assets/img/cu.png";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Youtube,
  LinkedinIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white pt-10 ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <LazyLoadImage
          src={BG}
          className="w-full h-full object-cover opacity-20 object-top"
          alt="Background"
        />
      </div>

      {/* Footer Content */}
      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex gap-4">
              <LazyLoadImage
                effect="blur"
                width={55}
                src={CULogo}
                alt="CU Logo"
                className="invert object-contain"
              />
              <LazyLoadImage
                effect="blur"
                height={14}
                src={Logo}
                alt="MCC Logo"
                className="h-14 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold mt-4 font-serif text-primary">
              Moot Court Committee
            </h2>
            <p className="mt-2 text-sm text-muted font-normal">
              Department of Law, University of Calcutta
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold ">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary duration-200 transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-primary duration-200 transition-all"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary duration-200 transition-all"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary duration-200 transition-all"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold ">Follow Us</h3>
              <div className="mt-4 flex space-x-4 items-center">
                <Link
                  to="https://www.linkedin.com/company/moot-court-committee-department-of-law-university-of-calcutta/"
                  target="_blank"
                  className="hover:text-primary duration-200 transition-all"
                >
                  <LinkedinIcon size={20} />
                </Link>
                <Link
                  to="https://www.instagram.com/culaw_mcc"
                  target="_blank"
                  className="hover:text-primary duration-200 transition-all"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  to="https://youtube.com/@culaw_mcc"
                  target="_blank"
                  className="hover:text-primary duration-200 transition-all"
                >
                  <Youtube size={24} />
                </Link>
                <Link
                  to="mailto:culawmcc@gmail.com"
                  target="_blank"
                  className="hover:text-primary duration-200 transition-all"
                >
                  <Mail size={20} />
                </Link>
              </div>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold">Admin Links</h3>
              <ul className="mt-4 flex gap-x-4">
                <li>
                  <Link
                    to="/admin/login"
                    className="hover:text-primary duration-200 transition-all"
                  >
                    Login
                  </Link>
                </li>
                |
                <li>
                  <Link
                    to="/admin/signup"
                    className="hover:text-primary duration-200 transition-all"
                  >
                    Signup
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
          &copy; {new Date().getFullYear()} MCC Committee. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
