import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Service } from '@/types/services';

interface ModalProps {
  service: Service;
  onClose: () => void;
}

const EkipmanKiralamaModal = ({ service, onClose }: ModalProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(service.gallery[0]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-black/90 w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl animate-modal"
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Sol taraf - Resim Galerisi */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt={service.title}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {service.gallery.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-[#FF5C37]' : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${service.title} ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 25vw, 10vw"
                    quality={60}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Sağ taraf - Detaylar */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#FF5C37]">
              {service.details.title}
            </h3>
            <div className="text-gray-300 space-y-4 whitespace-pre-line">
              {service.details.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EkipmanKiralamaModal; 