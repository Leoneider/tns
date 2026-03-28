"use client";

import { useEffect, useState } from 'react';

export const NewsSection = () => {
  const [news, setNews] = useState([]);
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
        <span className="label-technical text-primary/40 mb-4 block">Actualidad</span>
        <h1 className="text-5xl font-black uppercase">Noticias</h1>
        <p className="text-primary/60 max-w-2xl mx-auto mt-4">
          Entérese de las últimas novedades, logros y proyectos de TNS.
        </p>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-primary/10 rounded-sm overflow-hidden animate-pulse">
                <div className="bg-primary/5 h-48" />
                <div className="p-8 space-y-4">
                  <div className="h-3 bg-primary/10 rounded w-1/3" />
                  <div className="h-5 bg-primary/10 rounded w-3/4" />
                  <div className="h-3 bg-primary/10 rounded w-full" />
                  <div className="h-3 bg-primary/10 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <p className="text-center text-primary/40 text-lg py-20">
            Aún no hay noticias publicadas. Puedes crear una desde el Panel Administrativo.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {news.map((item) => {
              const fecha = new Date(item.date).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              const mes = new Date(item.date)
                .toLocaleDateString('es-CO', { month: 'short' })
                .toUpperCase();

              return (
                <div
                  key={item.id}
                  className="border border-primary/10 rounded-sm overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <div
                    className="h-48 bg-primary/5 bg-cover bg-center flex items-center justify-center"
                    style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : {}}
                  >
                    {!item.imageUrl && (
                      <span className="text-primary/20 text-6xl font-black">{mes}</span>
                    )}
                  </div>
                  <div className="p-8">
                    <span className="text-xs text-primary/40 uppercase font-bold tracking-widest block mb-3">
                      {fecha}
                    </span>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-primary/60 text-sm leading-relaxed">
                      {item.content.length > 150
                        ? item.content.substring(0, 150) + '...'
                        : item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
