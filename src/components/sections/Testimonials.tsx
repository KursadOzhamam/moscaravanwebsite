'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    role: 'Karavan Sahibi',
    image: '/images/testimonial-1.jpg',
    content:
      'Mös Karavan ile çalışmak harika bir deneyimdi. Profesyonel ekip ve kaliteli hizmet sayesinde karavanımı sorunsuz bir şekilde aldım.',
    time: '10Ay Önce',
  },
  {
    id: 2,
    name: 'Ayşe Kaya',
    role: 'Kamp Tutkunu',
    image: '/images/testimonial-2.jpg',
    content:
      'Kamp malzemeleri konusunda en iyi hizmeti aldım. Ürün çeşitliliği ve fiyat/performans açısından çok memnun kaldım.',
    time: '15:30',
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    role: 'Karavan Tamircisi',
    image: '/images/testimonial-3.jpg',
    content:
      'Yedek parça ve aksesuar konusunda her zaman yanımızda olan Mös Karavan, sektörün öncü firmalarından.',
    time: '16:45',
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FF5C37] mb-4">
            Referanslarımız
          </h2>
          <div className="w-24 h-1 bg-[#FF5C37] mx-auto"></div>
        </div>

        <div className="relative min-h-[400px] max-w-2xl mx-auto">
          {/* WhatsApp Style Chat Container */}
          <div className="bg-[#111111] rounded-2xl p-6 shadow-2xl border border-white/10">
            {/* Chat Header */}
            <div className="flex items-center pb-4 mb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-[#FF5C37] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-white font-semibold">Müşteri Yorumları</h3>
                <p className="text-gray-400 text-sm">{testimonials.length} mesaj</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === currentTestimonial 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4 absolute'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="bg-[#1f2937] rounded-lg p-4 relative">
                        {/* Triangle */}
                        <div className="absolute left-[-8px] top-4 w-0 h-0 
                          border-t-[8px] border-t-transparent
                          border-r-[8px] border-r-[#1f2937]
                          border-b-[8px] border-b-transparent">
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[#FF5C37] font-medium">{testimonial.name}</span>
                            <span className="text-gray-400 text-sm ml-2">({testimonial.role})</span>
                          </div>
                          <span className="text-gray-400 text-xs">{testimonial.time}</span>
                        </div>
                        <p className="text-gray-300">{testimonial.content}</p>
                        {/* Double Check Icon */}
                        <div className="flex justify-end mt-1">
                          <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.45,6.55l4.5,4.5L15.45,2.55l1.41,1.41L7.45,13.37L1.04,6.96L2.45,6.55z M10.45,13.37l-1.41-1.41 l7.41-7.41l1.41,1.41L10.45,13.37z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-[#FF5C37]' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 