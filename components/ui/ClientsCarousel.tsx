'use client';

import Image from 'next/image';
import { Client } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';

interface ClientsCarouselProps {
  clients: Client[];
}

export function ClientsCarousel({ clients }: ClientsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!scrollerRef.current) return;
    const scrollerContent = Array.from(scrollerRef.current.children);

    // Clone each item to make it loop seamlessly
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem);
      }
    });
    setStart(true);
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

      <div className="relative max-w-7xl mx-auto overflow-hidden">
        {/* Gradients for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollerRef}
          className={`flex w-max min-w-full gap-8 py-4 px-4 ${start ? 'animate-infinite-scroll' : ''
            } hover:[animation-play-state:paused]`}
        >
          {clients.map((c, index) => {
            const Wrapper = (c as any).websiteUrl ? 'a' : 'div';
            const wrapperProps = (c as any).websiteUrl
              ? { href: (c as any).websiteUrl, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Wrapper
                key={`${c.id}-${index}`}
                {...wrapperProps}
                className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl w-[250px] flex-shrink-0 transition-transform cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-100"
              >
                {c.logoUrl ? (
                  <div className="relative w-full h-20 mb-4 transition-transform group-hover:scale-110">
                    <Image
                      src={c.logoUrl}
                      alt={c.name}
                      fill
                      className="object-contain filter grayscale group-hover:filter-none transition-all duration-300"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-full h-20 mb-4 rounded-xl bg-orange-50 flex items-center justify-center transition-transform group-hover:scale-105">
                    <span className="text-3xl font-black text-orange-300">
                      {c.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {/* <h3 className="text-sm font-bold text-gray-800 text-center uppercase tracking-wide">
                {c.name}
              </h3> */}
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  );
}
