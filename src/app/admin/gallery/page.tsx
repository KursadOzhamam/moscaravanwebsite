'use client';

import { useState } from 'react';
import Image from 'next/image';
import { galleryImages, GalleryImage } from '@/components/sections/Gallery';

const GalleryAdminPage = () => {
  const [images, setImages] = useState<GalleryImage[]>(galleryImages);
  const [isUploading, setIsUploading] = useState<{[key: number]: boolean}>({});

  const handleImageUpdate = async (imageId: number, file: File) => {
    try {
      setIsUploading(prev => ({ ...prev, [imageId]: true }));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('section', 'gallery');
      formData.append('imageId', imageId.toString());

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      // Başarılı yükleme sonrası sayfayı yenile
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsUploading(prev => ({ ...prev, [imageId]: false }));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#FF5C37]">
          Galeri Yönetimi
        </h1>
      </div>

      <div className="space-y-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-[#FF5C37] mb-6">
            Galeri Resimleri
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-white/20">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className={`cursor-pointer bg-[#FF5C37] text-white py-2 px-4 rounded-lg hover:bg-[#FF5C37]/90 transition-colors ${
                      isUploading[image.id] ? 'opacity-50 cursor-not-allowed' : ''
                    }`}>
                      {isUploading[image.id] ? 'Yükleniyor...' : 'Resmi Değiştir'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading[image.id]}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpdate(image.id, file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <input
                  type="text"
                  value={image.alt}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF5C37] focus:border-transparent"
                  placeholder="Resim açıklaması"
                  onChange={(e) => {
                    // Alt text update logic will be implemented
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryAdminPage; 