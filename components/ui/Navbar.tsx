"use client";

import { Truck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
          <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-sm transition-transform group-hover:rotate-12">
            <Truck className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">TNS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm uppercase tracking-widest font-bold transition-all hover:text-secondary ${isActive(item.href) ? 'text-secondary' : 'text-primary/60'}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/573182172113"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-2 rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-secondary transition-colors"
          >
            Cotizar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
