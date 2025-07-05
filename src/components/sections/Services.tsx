'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Service } from '@/types/services';
import MobilTuvaletModal from '../modals/servicesmodal/MobilTuvaletModal';
import MobilDusModal from '../modals/servicesmodal/MobilDusModal';
import OrganizasyonAltyapiModal from '../modals/servicesmodal/OrganizasyonAltyapiModal';
import EkipmanKiralamaModal from '../modals/servicesmodal/EkipmanKiralamaModal';
import { services } from '@/config/services';

const Services = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('title-underline-active');
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const renderModal = () => {
    if (!selectedService) return null;

    switch (selectedService.id) {
      case 1:
        return <MobilTuvaletModal service={selectedService} onClose={() => setSelectedService(null)} />;
      case 2:
        return <MobilDusModal service={selectedService} onClose={() => setSelectedService(null)} />;
      case 3:
        return <OrganizasyonAltyapiModal service={selectedService} onClose={() => setSelectedService(null)} />;
      case 4:
        return <EkipmanKiralamaModal service={selectedService} onClose={() => setSelectedService(null)} />;
      default:
        return null;
    }
  };

  return (
    <section id="services" className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div ref={titleRef} className="title-underline">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hizmetlerimiz
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group border border-white/10 flex flex-col cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-300"></div>
              </div>
              <div className="p-6 backdrop-blur-xl bg-white/5 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#FF5C37] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderModal()}
    </section>
  );
};

export default Services; 