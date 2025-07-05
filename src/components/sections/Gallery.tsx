'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/gallery-1.jpg',
    alt: 'Karavan Görseli 1',
  },
  {
    id: 2,
    src: '/images/gallery-2.jpg',
    alt: 'Karavan Görseli 2',
  },
  {
    id: 3,
    src: '/images/gallery-3.jpg',
    alt: 'Karavan Görseli 3',
  },
  {
    id: 4,
    src: '/images/gallery-4.jpg',
    alt: 'Karavan Görseli 4',
  },
  {
    id: 5,
    src: '/images/gallery-5.jpg',
    alt: 'Karavan Görseli 5',
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FF5C37] mb-4">
            Galeri
          </h2>
          <div className="w-24 h-1 bg-[#FF5C37] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative h-64 rounded-lg overflow-hidden cursor-pointer group border-2 border-white/10"
              onClick={() => setSelectedImage(image.id)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-[#FF5C37] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="relative w-full max-w-4xl h-[80vh]">
              <Image
                src={galleryImages.find((img) => img.id === selectedImage)?.src || ''}
                alt="Gallery Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery; 