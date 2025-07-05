import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'messages.json');

// Mesajları getir
export async function GET() {
  try {
    // data klasörü yoksa oluştur
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });

    let messages = [];
    try {
      const rawData = await fs.readFile(dataFile, 'utf8');
      messages = JSON.parse(rawData);
    } catch (error) {
      // Dosya yoksa boş bir array oluştur
      await fs.writeFile(dataFile, JSON.stringify([]));
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Mesajlar alınamadı:', error);
    return NextResponse.json({ error: 'Mesajlar alınamadı' }, { status: 500 });
  }
}

// Yeni mesaj ekle
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, subject, message } = data;

    // Validasyon
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      );
    }

    // data klasörü yoksa oluştur
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });

    // Mevcut mesajları oku
    let messages = [];
    try {
      const rawData = await fs.readFile(dataFile, 'utf8');
      messages = JSON.parse(rawData);
    } catch (error) {
      // Dosya yoksa boş bir array oluştur
      messages = [];
    }

    // Yeni mesajı ekle
    const newMessage = {
      id: Date.now(),
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    messages.unshift(newMessage); // Yeni mesajı başa ekle

    // Mesajları kaydet
    await fs.writeFile(dataFile, JSON.stringify(messages, null, 2));

    return NextResponse.json({ message: 'Mesaj başarıyla gönderildi' });
  } catch (error) {
    console.error('Mesaj gönderilemedi:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilemedi' },
      { status: 500 }
    );
  }
}

// Mesajı okundu olarak işaretle
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { messageId } = data;

    if (!messageId) {
      return NextResponse.json(
        { error: 'Mesaj ID gerekli' },
        { status: 400 }
      );
    }

    // Mevcut mesajları oku
    const rawData = await fs.readFile(dataFile, 'utf8');
    const messages = JSON.parse(rawData);

    // Mesajı bul ve güncelle
    const messageIndex = messages.findIndex((msg: any) => msg.id === messageId);
    if (messageIndex === -1) {
      return NextResponse.json(
        { error: 'Mesaj bulunamadı' },
        { status: 404 }
      );
    }

    messages[messageIndex].isRead = true;

    // Mesajları kaydet
    await fs.writeFile(dataFile, JSON.stringify(messages, null, 2));

    return NextResponse.json({ message: 'Mesaj okundu olarak işaretlendi' });
  } catch (error) {
    console.error('Mesaj güncellenemedi:', error);
    return NextResponse.json(
      { error: 'Mesaj güncellenemedi' },
      { status: 500 }
    );
  }
} 