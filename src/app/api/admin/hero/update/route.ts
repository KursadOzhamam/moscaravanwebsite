import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const ADMIN_PASSWORD = 'admin123';
const CONFIG_PATH = path.join(process.cwd(), 'src/config/hero.ts');

export async function POST(request: NextRequest) {
  try {
    // Yetkilendirme kontrolü
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slideId, newUrl } = await request.json();

    if (!slideId || !newUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mevcut config dosyasını oku
    let content = await readFile(CONFIG_PATH, 'utf-8');

    // slideId'ye göre URL'yi güncelle
    const regex = new RegExp(`(id: ${slideId},[\\s\\n]*image: )"[^"]*"`, 'g');
    content = content.replace(regex, `$1"${newUrl}"`);

    // Değişiklikleri kaydet
    await writeFile(CONFIG_PATH, content, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating hero slide:', error);
    return NextResponse.json(
      { error: 'Failed to update slide' },
      { status: 500 }
    );
  }
} 