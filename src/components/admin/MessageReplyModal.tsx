'use client';

import { useState, useEffect } from 'react';
import { Message } from '@/types';
import { createPortal } from 'react-dom';

interface MessageReplyModalProps {
  message: Message;
  onClose: () => void;
}

export default function MessageReplyModal({ message, onClose }: MessageReplyModalProps) {
  const [replyText, setReplyText] = useState('');
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const COMPANY_EMAIL = 'info@möskaravan.com';

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  const handleWhatsAppReply = () => {
    // WhatsApp URL'ini oluştur
    const whatsappText = encodeURIComponent(replyText);
    const whatsappUrl = `https://wa.me/${message.phone.replace(/\D/g, '')}?text=${whatsappText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailReply = () => {
    // Email URL'ini oluştur
    const subject = encodeURIComponent(`Re: ${message.subject}`);
    const body = encodeURIComponent(replyText);
    const mailtoUrl = `mailto:${message.email}?subject=${subject}&body=${body}&from=${COMPANY_EMAIL}`;
    window.location.href = mailtoUrl;
  };

  if (!portalContainer) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999999]"
      onClick={onClose}
    >
      <div 
        className="bg-[#111111] w-full max-w-2xl rounded-lg shadow-2xl border border-white/10 p-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {message.name} kişisine yanıt ver
            </h3>
            <p className="text-sm text-gray-400">
              {message.email} • {message.phone}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Original Message */}
        <div className="mb-6 p-4 bg-white/5 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">Gelen Mesaj:</div>
          <div className="text-white">{message.message}</div>
        </div>

        {/* Reply Text Area */}
        <div className="mb-6">
          <label htmlFor="reply" className="block text-sm font-medium text-gray-400 mb-2">
            Yanıtınız
          </label>
          <textarea
            id="reply"
            rows={6}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full bg-[#1A1A1A] text-white border border-white/10 rounded-lg p-3 focus:outline-none focus:border-[#FF5C37] transition-colors"
            placeholder="Yanıtınızı buraya yazın..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleWhatsAppReply}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp ile Yanıtla
          </button>
          <button
            onClick={handleEmailReply}
            className="flex-1 bg-[#FF5C37] hover:bg-[#ff3c00] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            E-posta ile Yanıtla
          </button>
        </div>
      </div>
    </div>,
    portalContainer
  );
} 