'use client';

import Image from 'next/image';
import { Client } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';

interface ClientsCarouselProps {
  clients: Client[];
}

export function ClientsCarousel({ clients }: ClientsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;
    const scroller = scrollerRef.current;
    
    // Cleanup any existing cloned nodes first (React StrictMode fix)
    const existingChildren = Array.from(scroller.children);
    existingChildren.forEach(child => {
      if ((child as HTMLElement).dataset.cloned === "true") {
        scroller.removeChild(child);
      }
    });

    // Reproduce content to allow infinite scrolling
    const originalChildren = Array.from(scroller.children);
    originalChildren.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.dataset.cloned = "true";
      scroller.appendChild(duplicatedItem);
    });

    let animationId: number;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let isHovering = false;

    // Auto-scroll logic
    const autoScroll = () => {
      if (!isDown && !isHovering) {
        scroller.scrollLeft += 1;
        
        // Loop back when reaching the middle (where cloned elements start)
        const maxScroll = scroller.scrollWidth / 2;
        if (scroller.scrollLeft >= maxScroll) {
          scroller.scrollLeft = 0;
        }
      }
      animationId = window.requestAnimationFrame(autoScroll);
    };

    animationId = window.requestAnimationFrame(autoScroll);

    // Mouse drag logic
    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      scroller.style.cursor = 'grabbing';
      startX = e.pageX - scroller.offsetLeft;
      scrollLeft = scroller.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      isHovering = false;
      scroller.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      isDown = false;
      scroller.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      scroller.scrollLeft = scrollLeft - walk;
    };

    scroller.addEventListener('mousedown', handleMouseDown);
    scroller.addEventListener('mouseleave', handleMouseLeave);
    scroller.addEventListener('mouseup', handleMouseUp);
    scroller.addEventListener('mousemove', handleMouseMove);
    scroller.addEventListener('mouseenter', () => { isHovering = true; scroller.style.cursor = 'grab'; });

    return () => {
      window.cancelAnimationFrame(animationId);
      scroller.removeEventListener('mousedown', handleMouseDown);
      scroller.removeEventListener('mouseleave', handleMouseLeave);
      scroller.removeEventListener('mouseup', handleMouseUp);
      scroller.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600 mb-4 block">
          Confían en nosotros
        </span>
        <h2 className="text-4xl font-black text-gray-900 uppercase leading-tight">
          Nuestros <span className="text-orange-600">Clientes</span>
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto overflow-hidden text-center cursor-grab active:cursor-grabbing">
        {/* Gradients for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollerRef}
          className="flex w-full gap-8 py-4 px-4 overflow-x-auto scrollbar-hide select-none relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {clients.map((c, index) => (
              <div
                key={`${c.id}-${index}`}
                className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl w-[250px] flex-shrink-0 transition-transform hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-100"
              >
                {c.logoUrl ? (
                  <div className="relative w-full h-20 mb-4 transition-transform group-hover:scale-110 pointer-events-none">
                    <Image
                      src={c.logoUrl}
                      alt={c.name}
                      fill
                      className="object-contain filter grayscale group-hover:filter-none transition-all duration-300"
                      unoptimized
                      draggable="false"
                    />
                  </div>
                ) : (
                  <div className="w-full h-20 mb-4 rounded-xl bg-orange-50 flex items-center justify-center transition-transform group-hover:scale-105 pointer-events-none">
                    <span className="text-3xl font-black text-orange-300">
                      {c.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
