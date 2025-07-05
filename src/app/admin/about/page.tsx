'use client';

import Image from 'next/image';
import { useState } from 'react';

const AboutAdminPage = () => {
  const [aboutImage, setAboutImage] = useState('/images/about.jpg');

  const handleAboutImageUpdate = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('section', 'about');
      formData.append('type', 'main');

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
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#FF5C37]">
          Hakkımızda Yönetimi
        </h1>
      </div>

      <div className="space-y-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-[#FF5C37] mb-6">
            Hakkımızda Görseli
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-gray-300 mb-3">Ana Görsel</h3>
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-white/20">
                <Image
                  src={aboutImage}
                  alt="About Image"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-[#FF5C37] text-white py-2 px-4 rounded-lg hover:bg-[#FF5C37]/90 transition-colors">
                    Resmi Değiştir
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleAboutImageUpdate(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Diğer Hakkımızda bölümü öğeleri buraya eklenebilir */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutAdminPage; 