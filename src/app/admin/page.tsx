'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ana sayfada direkt içerik gösterelim, yönlendirme yapmayalım
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FF5C37] text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#FF5C37] mb-6">Mös Karavan Admin Paneli</h1>
      
      <div className="bg-white/10 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Hoş Geldiniz</h2>
        <p className="text-gray-300 mb-4">
          Bu panel üzerinden sitenizin içeriğini yönetebilirsiniz. 
          Soldaki menüden ilgili bölüme giderek düzenlemeler yapabilirsiniz.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-[#FF5C37] font-bold mb-2">Ana Sayfa</h3>
            <p className="text-gray-300 text-sm mb-3">Hero slider ve ana sayfa içeriklerini düzenleyin.</p>
            <button 
              onClick={() => router.push('/admin/home')}
              className="bg-[#FF5C37] text-white px-4 py-2 rounded hover:bg-[#FF5C37]/80 transition-colors"
            >
              Düzenle
            </button>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-[#FF5C37] font-bold mb-2">Hizmetler</h3>
            <p className="text-gray-300 text-sm mb-3">Hizmet kartlarını ve içeriklerini yönetin.</p>
            <button 
              onClick={() => router.push('/admin/services')}
              className="bg-[#FF5C37] text-white px-4 py-2 rounded hover:bg-[#FF5C37]/80 transition-colors"
            >
              Düzenle
            </button>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-[#FF5C37] font-bold mb-2">Mesajlar</h3>
            <p className="text-gray-300 text-sm mb-3">Gelen mesajları görüntüleyin ve yanıtlayın.</p>
            <button 
              onClick={() => router.push('/admin/messages')}
              className="bg-[#FF5C37] text-white px-4 py-2 rounded hover:bg-[#FF5C37]/80 transition-colors"
            >
              Görüntüle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 