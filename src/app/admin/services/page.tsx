'use client';

import { useState, useEffect } from 'react';
import { services } from '@/config/services';

export default function ServicesAdminPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    console.log('Services data:', services);
    setIsLoaded(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, serviceId: number, type: string, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    alert(`Resim yükleme simülasyonu: ${file.name} - Service ID: ${serviceId} - Type: ${type} - Index: ${index || 0}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#FF5C37] mb-6">Hizmetler Yönetimi</h1>
      
      {!isLoaded ? (
        <div className="text-white">Yükleniyor...</div>
      ) : (
        <div>
          <p className="text-white mb-4">Toplam {services.length} hizmet bulundu.</p>
          
          <div className="space-y-6">
            {services.map(service => (
              <div key={service.id} className="bg-white/10 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-[#FF5C37] mb-4">{service.title}</h2>
                <p className="text-white mb-4">{service.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sol taraf - Ana resim */}
                  <div className="space-y-4">
                    <h3 className="text-white">Ana Resim</h3>
                    
                    <div className="aspect-video relative bg-black/50 rounded overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.image})` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <label className="bg-[#FF5C37] text-white px-3 py-1 rounded text-sm cursor-pointer">
                          Değiştir
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageChange(e, service.id, 'main')}
                          />
                        </label>
                      </div>
                    </div>
                    
                    <div className="text-gray-400 text-sm break-all">
                      {service.image}
                    </div>
                  </div>
                  
                  {/* Sağ taraf - Galeri resimleri */}
                  <div className="space-y-4">
                    <h3 className="text-white">Galeri Resimleri</h3>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {service.gallery.map((img, idx) => (
                        <div key={idx} className="aspect-video relative bg-black/50 rounded overflow-hidden">
                          <div 
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${img})` }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                            <label className="bg-[#FF5C37] text-white px-2 py-1 rounded text-xs cursor-pointer">
                              Değiştir
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageChange(e, service.id, 'gallery', idx)}
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 