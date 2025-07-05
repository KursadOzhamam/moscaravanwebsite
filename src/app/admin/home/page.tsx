'use client';

import { useState, useEffect } from 'react';
import { heroSlides } from '@/config/hero';

export default function HomeAdminPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    console.log('Hero slides data:', heroSlides);
    setIsLoaded(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, slideId: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    alert(`Slide resim yükleme simülasyonu: ${file.name} - Slide ID: ${slideId}`);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    alert(`Logo yükleme simülasyonu: ${file.name}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#FF5C37] mb-6">Ana Sayfa Yönetimi</h1>
      
      {!isLoaded ? (
        <div className="text-white">Yükleniyor...</div>
      ) : (
        <div>
          <div className="bg-white/10 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold text-[#FF5C37] mb-4">Hero Slider Resimleri</h2>
            <p className="text-white mb-4">Toplam {heroSlides.length} slide bulundu.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {heroSlides.map(slide => (
                <div key={slide.id} className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#FF5C37] mb-3">Slide {slide.id}</h3>
                  
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
                          onChange={(e) => handleImageChange(e, slide.id)}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={slide.image}
                      className="flex-1 bg-black/30 border border-white/10 rounded px-3 py-2 text-white text-sm"
                      placeholder="Resim URL'si"
                    />
                    <button
                      onClick={() => alert(`URL güncelleme simülasyonu: ${slide.image}`)}
                      className="bg-[#FF5C37] text-white px-3 py-2 rounded text-sm"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-[#FF5C37] mb-4">Site Ayarları</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 p-3 rounded">
                <h3 className="text-white mb-2">Logo</h3>
                <div className="h-20 bg-black/50 rounded flex items-center justify-center p-4">
                  <div 
                    className="h-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(/images/logo.png)` }}
                  ></div>
                </div>
                <label className="inline-block bg-[#FF5C37] text-white px-3 py-1 rounded text-sm mt-3 cursor-pointer">
                  Logo Değiştir
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>
              
              <div className="bg-black/30 p-3 rounded">
                <h3 className="text-white mb-2">İletişim Bilgileri</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-gray-300 text-sm block">Telefon</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/30 border border-white/10 rounded p-2 text-white"
                      defaultValue="+90 555 123 4567"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm block">E-posta</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/30 border border-white/10 rounded p-2 text-white"
                      defaultValue="info@moskaravan.com"
                    />
                  </div>
                  <button 
                    className="bg-[#FF5C37] text-white px-3 py-1 rounded text-sm mt-2"
                    onClick={() => alert('İletişim bilgileri güncellendi')}
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 