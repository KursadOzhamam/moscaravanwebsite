import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    const token = await createToken(password);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Geçersiz şifre' },
        { status: 401 }
      );
    }

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Kimlik doğrulama hatası' },
      { status: 500 }
    );
  }
} 