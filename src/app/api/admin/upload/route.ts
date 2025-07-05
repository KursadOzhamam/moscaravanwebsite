import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const ADMIN_PASSWORD = 'admin123';

export async function POST(request: NextRequest) {
  try {
    // Yetkilendirme kontrolü
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const section = formData.get('section') as string;
    const type = formData.get('type') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let filePath = '';
    let fileUrl = '';

    // Farklı section'lar için dosya yollarını belirle
    if (section === 'services') {
      const serviceId = formData.get('serviceId');
      const imageType = formData.get('imageType');
      const index = formData.get('index');

      if (imageType === 'main') {
        filePath = path.join(process.cwd(), 'public', 'images', 'services', `service-${serviceId}.jpg`);
        fileUrl = `/images/services/service-${serviceId}.jpg`;
      } else if (imageType === 'gallery') {
        filePath = path.join(process.cwd(), 'public', 'images', 'services', `service-${serviceId}-gallery-${index}.jpg`);
        fileUrl = `/images/services/service-${serviceId}-gallery-${index}.jpg`;
      }
    } else if (section === 'hero') {
      const slideId = formData.get('slideId');
      filePath = path.join(process.cwd(), 'public', 'images', 'hero', `slide-${slideId}.jpg`);
      fileUrl = `/images/hero/slide-${slideId}.jpg`;
    } else if (section === 'about') {
      filePath = path.join(process.cwd(), 'public', 'images', 'about.jpg');
      fileUrl = '/images/about.jpg';
    } else if (section === 'contact') {
      filePath = path.join(process.cwd(), 'public', 'images', 'contact.jpg');
      fileUrl = '/images/contact.jpg';
    }

    if (!filePath) {
      return NextResponse.json(
        { error: 'Invalid section or type' },
        { status: 400 }
      );
    }

    // Dizin yoksa oluştur
    const dir = path.dirname(filePath);
    await createDirectoryIfNotExists(dir);

    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true,
      fileUrl: fileUrl
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

async function createDirectoryIfNotExists(dir: string) {
  const fs = require('fs').promises;
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
} 