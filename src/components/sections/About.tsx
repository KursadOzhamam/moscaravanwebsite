'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!isIntersecting) return;

    const startTime = Date.now();
    const endValue = end;
    const startValue = countRef.current;

    const animateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentCount = Math.floor(startValue + (endValue - startValue) * progress);

      if (progress < 1) {
        setCount(currentCount);
        requestAnimationFrame(animateCount);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animateCount);
  }, [end, duration, isIntersecting]);

  return { count, setIsIntersecting };
};

const CountUpDisplay = ({ end, label }: { end: number, label: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { count, setIsIntersecting } = useCountUp(end);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [setIsIntersecting]);

  return (
    <div ref={containerRef} className="text-center">
      <div className="text-4xl font-bold text-[#FF5C37] mb-2">
        {count}+
      </div>
      <div className="text-gray-300">{label}</div>
    </div>
  );
};

const About = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Title underline animation
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

  // Image scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Element is in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const maxDistance = viewportHeight / 2 + rect.height / 2;
        
        const distancePercentage = distanceFromCenter / maxDistance;
        const scale = 1.2 - (distancePercentage * 0.3);
        
        const imageElement = imageRef.current.querySelector('img');
        if (imageElement) {
          imageElement.style.transform = `scale(${scale})`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div ref={titleRef} className="title-underline">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Hakkımızda
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl relative">
              <div ref={imageRef} className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/about.jpg"
                  alt="Mös Karavan Hakkında"
                  width={500}
                  height={560}
                  className="object-cover w-full h-full transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <p className="text-gray-300 text-lg mb-6">
                Mös Karavan olarak, özgürlüğü ve konforu bir araya getiren özel karavan çözümleri sunuyoruz. 
                Deneyimli ekibimiz ve kaliteli hizmet anlayışımızla, siz işinizi yaparken biz size evinizin rahatlığını yaşamayı vaat ediyoruz.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <CountUpDisplay end={10} label="Yıllık Deneyim" />
                <CountUpDisplay end={1000} label="Mutlu Müşteri" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 