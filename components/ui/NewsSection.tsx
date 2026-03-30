"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type NewsItem = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  date: string;
};

export const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20">
      <div className="py-24 bg-surface-low text-center px-6">
        <span className="label-technical text-primary/40 mb-4 block animate-fade-in-up">Actualidad</span>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-primary animate-fade-in-up delay-100">
          Noticias
        </h1>
        <p className="text-primary/60 max-w-2xl mx-auto mt-6 text-lg animate-fade-in-up delay-200">
          Entérese de las últimas novedades, logros y proyectos de TNS, impulsando el futuro.
        </p>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="aspect-[4/3] bg-primary/5 rounded-md w-full" />
                <div className="h-3 bg-primary/10 rounded w-1/4 mt-2" />
                <div className="h-6 bg-primary/10 rounded w-5/6" />
                <div className="h-4 bg-primary/10 rounded w-full" />
                <div className="h-4 bg-primary/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <p className="text-center text-primary/40 text-lg py-20 font-medium">
            Aún no hay noticias publicadas.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {news.map((item) => {
              const fecha = new Date(item.date).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
              
              const isImageValid = item.imageUrl && item.imageUrl.trim() !== '';

              return (
                <Link
                  key={item.id}
                  href={`/noticias/${item.id}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-md mb-6 bg-surface-low relative">
                    {isImageValid ? (
                      <Image
                        src={item.imageUrl as string}
                        alt={item.title}
                        fill
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/20 text-4xl font-black uppercase grayscale group-hover:grayscale-0 transition-all duration-700">
                        {new Date(item.date).toLocaleDateString('es-CO', { month: 'short' })}
                      </div>
                    )}
                    {/* Subtle Overlay on hover to make it feel premium */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block bg-secondary/10 px-2 py-0.5 rounded-sm">
                      Actualidad
                    </span>
                    <span className="text-xs font-semibold text-primary/40 uppercase tracking-widest block">
                      {fecha}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold leading-tight group-hover:text-secondary transition-colors mb-4 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-primary/60 text-base leading-relaxed line-clamp-3">
                    {item.content}
                  </p>
                  
                  <div className="mt-6 flex items-center text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                    Leer artículo completo
                    <span className="material-symbols-outlined ml-1 text-lg group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
