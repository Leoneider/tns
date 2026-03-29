"use client";

import { Truck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Add paths here that feature a dark background header at the very top
  const isDarkHeaderPage = pathname === '/responsabilidad-social';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Resp. Social', href: '/responsabilidad-social' },
    { label: 'Noticias', href: '/noticias' },
    { label: 'Políticas', href: '/politicas' },
    { label: 'Contacto', href: '/contacto' },
  ];

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <Image
            src="/tns-logo.png"
            alt="TNS Logo"
            width={160}
            height={60}
            className="w-auto h-10 transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm uppercase tracking-widest font-bold transition-all hover:text-secondary ${
                isActive(item.href) ? 'text-secondary' : (!isScrolled && isDarkHeaderPage) ? 'text-white/80' : 'text-primary/60'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/573182172113"
            target="_blank"
            rel="noopener noreferrer"
            className={`${(!isScrolled && isDarkHeaderPage) ? 'bg-white text-primary hover:text-white' : 'bg-primary text-white'} px-6 py-2 rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-secondary transition-colors`}
          >
            Cotizar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden ${(!isScrolled && isDarkHeaderPage) ? 'text-white' : 'text-primary'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-primary/5 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-left text-lg font-bold uppercase ${isActive(item.href) ? 'text-secondary' : 'text-primary'}`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
