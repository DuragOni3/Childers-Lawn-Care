"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoImage from "./LogoImage";

const navLinks = [
  { href: "/",          label: "Home" },
  { href: "/services",  label: "Services" },
  { href: "/about",     label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact",   label: "Contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || pathname !== "/"
          ? "bg-green-dark/95 backdrop-blur-md shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <LogoImage
              className="h-20 w-auto transition-all group-hover:scale-105"
              style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.4))" }}
            />
            <div className="leading-tight">
              <span className="text-white font-serif font-bold text-xl sm:text-2xl block">
                Childer&apos;s Lawn Care
              </span>
              <span className="text-yellow text-sm tracking-widest uppercase">&amp; More LLC</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md group ${
                  pathname === link.href
                    ? "text-yellow"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-yellow rounded-full" />
                )}
              </Link>
            ))}
            <a
              href="tel:9104342533"
              className="ml-4 bg-yellow hover:bg-yellow-dark text-green-dark font-bold px-4 py-2 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              (910) 434-2533
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-dark/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-yellow bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:9104342533"
              className="block mt-2 bg-yellow text-green-dark font-bold px-4 py-3 rounded-full text-sm text-center"
            >
              (910) 434-2533
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
