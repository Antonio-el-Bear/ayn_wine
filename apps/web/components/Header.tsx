'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useAuthStore, useUIStore, useCartStore } from '@/store';

export default function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const { items } = useCartStore();
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-primary text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl sm:text-2xl">
            <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="hidden sm:inline">Ayn Wine</span>
            <span className="sm:hidden">AW</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="hover:text-secondary transition">
              Products
            </Link>
            <Link href="/about" className="hover:text-secondary transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-secondary transition">
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative hover:text-secondary transition"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Auth Links */}
            {!isAuthenticated ? (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="hidden sm:inline px-3 py-1 rounded hover:bg-secondary hover:text-primary transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1 bg-secondary text-primary rounded font-semibold hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm truncate hidden sm:inline">{user?.name}</span>
                <Link
                  href="/account"
                  className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center font-bold"
                >
                  {user?.name?.charAt(0) || 'U'}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-primary/30 pt-4">
            <Link href="/products" className="block hover:text-secondary">
              Products
            </Link>
            <Link href="/about" className="block hover:text-secondary">
              About
            </Link>
            <Link href="/contact" className="block hover:text-secondary">
              Contact
            </Link>
            {!isAuthenticated && (
              <Link href="/login" className="block hover:text-secondary">
                Login
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/account" className="block hover:text-secondary">
                My Account
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
