'use client';

import { useState } from 'react';
import { HeroSlide } from '@/config/hero';

interface HeroSlideEditorProps {
  slide: HeroSlide;
  onImageUpdate?: (slideId: number, file: File) => Promise<void>;
}

export default function HeroSlideEditor({ slide, onImageUpdate }: HeroSlideEditorProps) {
  const [imageUrl, setImageUrl] = useState(slide.image);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      console.log(`Slide resmi yükleniyor: ${slide.id}, ${file.name}`);
      
      if (onImageUpdate) {
        await onImageUpdate(slide.id, file);
      } else {
        // Mock update for testing
        alert(`Slide resim yükleme simülasyonu: ${file.name}`);
      }
    } catch (error) {
      console.error('Resim yükleme hatası:', error);
      alert('Resim yüklenirken bir hata oluştu.');
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`URL güncelleme simülasyonu: ${imageUrl}`);
    // Gerçek uygulamada burada API çağrısı yapılacak
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold text-[#FF5C37] mb-3">Slide {slide.id}</h2>
      
      <div className="aspect-video relative bg-black/50 rounded overflow-hidden mb-3">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
          <label className="bg-[#FF5C37] text-white px-3 py-1 rounded text-sm cursor-pointer">
            Değiştir
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      
      <form onSubmit={handleUrlSubmit} className="flex gap-2">
        <input
          type="text"
          value={imageUrl}
          onChange={handleUrlChange}
          className="flex-1 bg-black/30 border border-white/10 rounded px-3 py-2 text-white text-sm"
          placeholder="Resim URL'si"
        />
        <button
          type="submit"
          className="bg-[#FF5C37] text-white px-3 py-2 rounded text-sm"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
} 