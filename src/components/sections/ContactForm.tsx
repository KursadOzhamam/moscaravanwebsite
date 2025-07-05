'use client';

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gönderim başarısız');
      }

      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setFormStatus('error');
      console.error('Form gönderim hatası:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FF5C37] mb-4">
            İletişim
          </h2>
          <div className="w-24 h-1 bg-[#FF5C37] mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-[#FF5C37] focus:ring-[#FF5C37] focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-[#FF5C37] focus:ring-[#FF5C37] focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-[#FF5C37] focus:ring-[#FF5C37] focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-[#FF5C37] focus:ring-[#FF5C37] focus:ring-opacity-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-[#FF5C37] focus:ring-[#FF5C37] focus:ring-opacity-50"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#FF5C37] hover:bg-[#ff3c00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5C37] disabled:opacity-50 transition-colors"
              >
                {formStatus === 'submitting' ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </div>

            {formStatus === 'success' && (
              <div className="text-green-400 text-center">
                Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
              </div>
            )}

            {formStatus === 'error' && (
              <div className="text-red-400 text-center">
                Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 