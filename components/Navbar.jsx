"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ModeToggle } from './Toggle';
import { supabase } from '@/lib/supabaseClient';

const filmCategories = [
    { name: "Kategori", href: "/category" },
  { name: "Korku", href: "/category/horror" },
  { name: "Aksiyon", href: "/category/action" },
  { name: "Bilim Kurgu", href: "/category/sci-fi" },
];

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">FilmCritic</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center justify-center flex-1">
            {filmCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-lg font-medium text-muted-foreground hover:text-primary px-3 py-2 rounded-md"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {user ? (
              <>
                <Button variant="ghost" onClick={handleLogout}>Çıkış Yap</Button>
                <ModeToggle />
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="mr-2">Giriş Yap</Button>
                </Link>
                <Link href="/register">
                  <Button>Üye Ol</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {filmCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block text-sm font-medium text-muted-foreground hover:text-primary px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-5">
                <Button variant="ghost" onClick={handleLogout} className="w-full text-left">Çıkış Yap</Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-5">
                <Link href="/login" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full">Giriş Yap</Button>
                </Link>
                <Link href="/register" onClick={toggleMenu}>
                  <Button className="w-full">Üye Ol</Button>
                </Link>
              </div>
            )}
            <div className="mt-3 px-5">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}