"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date | string;
}

export function SocialGallery({ projects }: { projects: Project[] }) {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const paginatedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (projects.length === 0) return null;

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 border-t border-primary/10 mt-12 bg-white">
      <div className="text-center mb-16">
        <span className="label-technical text-primary/50 mb-4 block">Nuestras Historias</span>
        <h2 className="editorial-h2 inline-block relative">
          Galería de Proyectos
          <div className="hidden md:block absolute -bottom-4 left-1/4 right-1/4 h-1 bg-secondary rounded-full opacity-80 decoration"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
        {paginatedProjects.map((p) => (
          <div key={p.id} className="group relative bg-surface-low rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-primary/5 cursor-pointer">
            <div className="relative w-full h-80 overflow-hidden">
               <Image 
                 src={p.imageUrl} 
                 alt={p.title} 
                 fill 
                 unoptimized
                 className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight drop-shadow-md">{p.title}</h3>
              <p className="text-white/80 text-sm line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-sm h-10">
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-16 pb-8">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-primary/20 text-primary disabled:opacity-30 hover:bg-primary hover:text-white transition-colors disabled:hover:bg-transparent disabled:hover:text-primary"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-3 rounded-full transition-all duration-300 ${currentPage === i + 1 ? 'bg-secondary w-10' : 'bg-primary/20 hover:bg-primary/40 w-3'}`}
                aria-label={`Página ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-primary/20 text-primary disabled:opacity-30 hover:bg-primary hover:text-white transition-colors disabled:hover:bg-transparent disabled:hover:text-primary"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
