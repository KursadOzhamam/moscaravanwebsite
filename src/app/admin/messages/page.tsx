'use client';

import { useState, useEffect } from 'react';
import MessageReplyModal from '@/components/admin/MessageReplyModal';

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Mesajlar alınamadı:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Her 30 saniyede bir mesajları güncelle
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      try {
        const response = await fetch(`/api/contact/${message.id}/read`, {
          method: 'PUT'
        });
        if (response.ok) {
          setMessages(messages.map(m => 
            m.id === message.id ? { ...m, isRead: true } : m
          ));
        }
      } catch (error) {
        console.error('Mesaj durumu güncellenemedi:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#FF5C37]">
          Mesajlar
        </h1>
      </div>

      <div className="bg-[#111111] rounded-2xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-[600px]">
          {/* Mesaj Listesi */}
          <div className="border-r border-white/10">
            <div className="p-4 border-b border-white/10">
              <h2 className="font-semibold text-white">Gelen Kutusu</h2>
            </div>
            <div className="overflow-y-auto h-[calc(600px-57px)]">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`w-full p-4 text-left border-b border-white/10 hover:bg-white/5 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-white/5' : ''
                  } ${!message.isRead ? 'bg-white/5' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-[#FF5C37]">{message.name}</span>
                    <span className="text-xs text-gray-400">{formatDate(message.timestamp)}</span>
                  </div>
                  <div className="text-sm text-gray-300 truncate">{message.subject}</div>
                  <div className="text-xs text-gray-400 truncate">
                    {message.email} • {message.phone}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mesaj Detayı */}
          <div className="col-span-2 p-6">
            {selectedMessage ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {selectedMessage.subject}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{formatDate(selectedMessage.timestamp)}</span>
                    <span>•</span>
                    <span>{selectedMessage.name}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">E-posta:</span>
                      <a href={`mailto:${selectedMessage.email}`} className="ml-2 text-[#FF5C37] hover:underline">
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-gray-400">Telefon:</span>
                      <a href={`tel:${selectedMessage.phone}`} className="ml-2 text-[#FF5C37] hover:underline">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 text-gray-300">
                    {selectedMessage.message}
                  </div>

                  {/* Yanıt Butonları */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setIsReplyModalOpen(true)}
                      className="flex-1 bg-[#FF5C37] hover:bg-[#ff3c00] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Yanıtla
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Mesaj seçilmedi
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Yanıt Modalı */}
      {isReplyModalOpen && selectedMessage && (
        <MessageReplyModal
          message={selectedMessage}
          onClose={() => setIsReplyModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MessagesPage; 