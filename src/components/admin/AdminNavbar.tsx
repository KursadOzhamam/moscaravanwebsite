'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AdminNavbarProps {
  onLogout: () => void;
}

export default function AdminNavbar({ onLogout }: AdminNavbarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (!mounted) return false;
    return pathname === path;
  };

  const navItems = [
    { name: 'Ana Sayfa', href: '/admin/home' },
    { name: 'Hizmetler', href: '/admin/services' },
    { name: 'Galeri', href: '/admin/gallery' },
    { name: 'Hakkımızda', href: '/admin/about' },
    { name: 'İletişim', href: '/admin/contact' },
    { name: 'Mesajlar', href: '/admin/messages' },
  ];

  return (
    <nav className="bg-[#111111] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin" className="text-[#FF5C37] text-xl font-bold">
              Mös Karavan Admin
            </Link>
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm ${
                  isActive(item.href)
                    ? 'text-[#FF5C37]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onLogout}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 