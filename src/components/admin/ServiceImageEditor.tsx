'use client';

import { useState } from 'react';
import { Service } from '@/types/services';

interface ServiceImageEditorProps {
  service: Service;
  onImageUpdate?: (serviceId: number, imageType: 'main' | 'gallery', index: number, file: File) => Promise<void>;
}

export default function ServiceImageEditor({ service, onImageUpdate }: ServiceImageEditorProps) {
  const [selectedImage, setSelectedImage] = useState<string>(service.image);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, imageType: 'main' | 'gallery', index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      console.log(`Resim yükleniyor: ${service.id}, ${imageType}, ${index}, ${file.name}`);
      
      if (onImageUpdate) {
        await onImageUpdate(service.id, imageType, index, file);
      } else {
        // Mock update for testing
        alert(`Resim yükleme simülasyonu: ${file.name}`);
      }
    } catch (error) {
      console.error('Resim yükleme hatası:', error);
      alert('Resim yüklenirken bir hata oluştu.');
    }
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg mb-6">
      <h2 className="text-xl font-bold text-[#FF5C37] mb-4">{service.title}</h2>
      <p className="text-white mb-4">{service.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sol taraf - Ana resim ve düzenleme */}
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
                  onChange={(e) => handleFileChange(e, 'main', 0)}
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
                      onChange={(e) => handleFileChange(e, 'gallery', idx)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 