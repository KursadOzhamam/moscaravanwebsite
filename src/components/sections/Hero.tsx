'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroSlides, HeroSlide } from '@/config/hero';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>(heroSlides);
  const [showModal, setShowModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [form, setForm] = useState({
    name: '',
    surname: '',
    company: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    // Config dosyasını yeniden yükle
    const loadConfig = async () => {
      try {
        const response = await fetch('/api/hero/slides');
        if (response.ok) {
          const data = await response.json();
          setSlides(data.slides);
        }
      } catch (error) {
        console.error('Error loading hero slides:', error);
      }
    };

    loadConfig();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getScaleValue = () => {
    const maxScroll = 500; // Bu değeri ihtiyaca göre ayarlayabilirsiniz
    const minScale = 0.5; // Minimum scale değeri
    const scale = 1 - (scrollY / maxScroll) * (1 - minScale);
    return Math.max(minScale, Math.min(1, scale));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    setShowModal(false);
    setForm({
      name: '',
      surname: '',
      company: '',
      phone: '',
      email: '',
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ transform: `scale(${1 + scrollY * 0.0003})` }}
        >
          <Image
            src={slide.image}
            alt="Karavan Hero"
            fill
            className="object-cover"
            priority={index === 0}
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20" 
        style={{ transform: `scale(${getScaleValue()})`, transition: 'transform 0.2s ease-out' }}
      >
        <Image src="/images/logo.png" alt="Logo" width={120} height={120} className="mb-4" />
        <h1 className="text-white text-5xl md:text-8xl font-bold text-center mb-4 drop-shadow-lg">
          MÖS KARAVAN
        </h1>
        <p className="text-white text-2xl md:text-5xl italic mb-2 text-center drop-shadow-lg font-oooh-baby">
          Tüm etkinlik ve organizasyonlarda evinizin rahatlığını yanınıza getiriyoruz.
        </p>
        <span className="text-white text-xl md:text-2xl tracking-widest">2025</span>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Contact Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 z-40 bg-[#FF5C37] hover:bg-[#ff3c00] text-white font-medium px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
        style={{ boxShadow: "0 4px 24px 0 rgba(255,92,55,0.25)" }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#fff"/>
          <path d="M16.5 15.5c-1.104 0-2.5-1.396-2.5-2.5s1.396-2.5 2.5-2.5 2.5 1.396 2.5 2.5-1.396 2.5-2.5 2.5z" fill="#FF5C37"/>
          <path d="M7.5 8.5c1.104 0 2.5 1.396 2.5 2.5s-1.396 2.5-2.5 2.5-2.5-1.396-2.5-2.5 1.396-2.5 2.5-2.5z" fill="#FF5C37"/>
        </svg>
        Sizi hemen arayalım
      </button>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md relative animate-slide-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Kapat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Sizi hemen arayalım
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="İsim"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C37]"
                  required
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Soyisim"
                  value={form.surname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C37]"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Şirket"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C37]"
                />

                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                    <span className="text-gray-600">🇹🇷 +90</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefon"
                    value={form.phone}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C37]"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C37]"
                  required
                />

                <p className="text-sm text-gray-500 text-center">
                  Bu formu doldurarak ve Gönder butonuna tıklayarak,{' '}
                  <Link href="/gizlilik-politikasi" className="text-[#FF5C37] hover:underline">
                    gizlilik politikamızı
                  </Link>
                  {' '}kabul etmiş olursunuz.
                </p>

                <button
                  type="submit"
                  className="w-full bg-[#FF5C37] hover:bg-[#ff3c00] text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Gönder
                </button>

                <div className="text-center text-sm text-gray-400 mt-4">
                  Powered by{' '}
                  <a
                    href="https://cractive.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF5C37] hover:underline"
                  >
                    Cractive
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero; 