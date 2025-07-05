'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminLoginProps {
  onLogin: (isAuthenticated: boolean) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basit doğrulama
    if (password === 'admin123') {
      console.log('Giriş başarılı');
      localStorage.setItem('adminToken', 'valid-token');
      onLogin(true);
      router.push('/admin/home');
    } else {
      setError('Hatalı şifre');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/5 p-8 rounded-lg border border-white/10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#FF5C37] mb-6 text-center">
          Mös Karavan Admin
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF5C37]"
              placeholder="••••••••"
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-[#FF5C37] text-white py-2 px-4 rounded-lg hover:bg-[#FF5C37]/90 transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
} 