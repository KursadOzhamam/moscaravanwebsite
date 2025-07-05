import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'src/config/hero.ts');

export async function GET() {
  try {
    // Config dosyasını oku
    const content = await readFile(CONFIG_PATH, 'utf-8');
    
    // heroSlides array'ini çıkar
    const match = content.match(/export const heroSlides = (\[[\s\S]*?\]);/);
    
    if (!match) {
      throw new Error('Hero slides data not found');
    }

    // String olarak array'i parse et
    const slidesArray = eval(match[1]);

    return NextResponse.json({ slides: slidesArray });
  } catch (error) {
    console.error('Error reading hero slides:', error);
    return NextResponse.json(
      { error: 'Failed to load hero slides' },
      { status: 500 }
    );
  }
} 