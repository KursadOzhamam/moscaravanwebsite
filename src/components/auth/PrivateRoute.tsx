'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Client tarafında çalıştığından emin ol
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      // Basit token kontrolü
      if (token) {
        setIsAuthorized(true);
      } else {
        router.push('/admin');
      }
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FF5C37] text-xl">Yükleniyor...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
} 
} 