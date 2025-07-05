'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Message } from '@/types';
import dynamic from 'next/dynamic';

// Modal'ı dinamik olarak import et
const MessageReplyModal = dynamic(() => import('./MessageReplyModal'), {
  ssr: false,
});

// Test mesajı - geliştirme aşamasında kullanmak için
const TEST_MESSAGE = {
  id: 1,
  name: "Test Kullanıcı",
  email: "test@example.com",
  phone: "5551234567",
  subject: "Test Mesajı",
  message: "Bu bir test mesajıdır.",
  timestamp: new Date().toISOString(),
  isRead: false
};

export default function NotificationBell() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched messages:', data.messages);
        // API'den gelen mesajlar boşsa test mesajını kullan
        const messageList = data.messages.length > 0 ? data.messages : [TEST_MESSAGE];
        setMessages(messageList);
        setUnreadCount(messageList.filter((msg: Message) => !msg.isRead).length);
      }
    } catch (error) {
      console.error('Mesajlar alınamadı:', error);
      // Hata durumunda test mesajını göster
      setMessages([TEST_MESSAGE]);
      setUnreadCount(1);
    }
  };

  const handleMessageClick = (message: Message) => {
    console.log('handleMessageClick çağrıldı:', message);
    setSelectedMessage(message);
    setShowModal(true);
    setShowDropdown(false);

    // Mesajı okundu olarak işaretle
    if (!message.isRead) {
      fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageId: message.id }),
      })
        .then(response => {
          if (response.ok) {
            fetchMessages();
          }
        })
        .catch(error => {
          console.error('Mesaj güncellenemedi:', error);
        });
    }
  };

  useEffect(() => {
    console.log('Messages değişti:', messages);
  }, [messages]);

  useEffect(() => {
    console.log('Selected message değişti:', selectedMessage);
  }, [selectedMessage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalContainer(document.body);
    }
    fetchMessages();

    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderDropdown = () => {
    if (!buttonRef.current || !portalContainer) return null;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const dropdownStyle = {
      position: 'fixed',
      top: `${buttonRect.bottom + 8}px`,
      right: '1rem',
      zIndex: 999999
    } as const;

    return createPortal(
      <>
        <div 
          className="fixed inset-0 bg-black/50" 
          style={{ zIndex: 999998 }}
          onClick={() => setShowDropdown(false)}
        />
        <div
          className="w-96 bg-[#111111] rounded-lg shadow-2xl border border-white/10 overflow-hidden"
          style={dropdownStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 p-4 border-b border-white/10 bg-[#111111]">
            <h3 className="text-lg font-semibold text-white">Bildirimler</h3>
          </div>
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-4 text-gray-400 text-center">
                Henüz bildirim yok
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    console.log('Mesaj kartına tıklandı:', message);
                    handleMessageClick(message);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleMessageClick(message);
                    }
                  }}
                  className={`w-full text-left p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer ${
                    !message.isRead ? 'bg-white/5' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-[#FF5C37]">{message.name}</span>
                    <span className="text-xs text-gray-400">{formatDate(message.timestamp)}</span>
                  </div>
                  <div className="text-sm text-gray-300 mb-1">{message.subject}</div>
                  <div className="text-xs text-gray-400">
                    {message.email} • {message.phone}
                  </div>
                </div>
              ))
            )}
          </div>
          {messages.length > 0 && (
            <div className="sticky bottom-0 p-3 bg-[#111111] border-t border-white/10 text-center">
              <Link
                href="/admin/messages"
                className="text-[#FF5C37] hover:text-[#ff3c00] text-sm font-medium"
              >
                Tüm mesajları görüntüle
              </Link>
            </div>
          )}
        </div>
      </>,
      portalContainer
    );
  };

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setShowDropdown(!showDropdown)}
          className="relative p-2 text-gray-300 hover:text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#FF5C37] rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {showDropdown && renderDropdown()}
      </div>

      {showModal && selectedMessage && (
        <MessageReplyModal
          message={selectedMessage}
          onClose={() => {
            setShowModal(false);
            setSelectedMessage(null);
          }}
        />
      )}
    </>
  );
} 