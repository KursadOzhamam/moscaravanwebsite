'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { title: 'Ana Sayfa', href: '/' },
  { title: 'Hakkımızda', href: '#about' },
  { title: 'Çekme Karavanlar', href: '#caravans', subItems: ['LA LA LAND', 'INCEPTION'] },
  { title: 'Karavan Kiralama', href: '#rental' },
  { title: 'Mutlu İnsanlar', href: '#happy-people' },
  { title: 'Konfiguratör', href: '#configurator' },
  { title: 'İletişim', href: '#contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full bg-black/60 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Mös Karavan Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <span className="text-white font-medium text-lg">MENU</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 text-white focus:outline-none"
              aria-label="Menüyü Aç/Kapat"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex items-center justify-center">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 text-white/60 hover:text-white"
            aria-label="Kapat"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col items-center space-y-6">
            {menuItems.map((item) => (
              <div key={item.title} className="text-center">
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-white text-2xl font-light tracking-wide transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
                {item.subItems && (
                  <div className="mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <div key={subItem} className="text-gray-400 text-lg font-light">
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 