'use client';

import { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { contactAPI } from '@/lib/api';
import { Loader } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await contactAPI.submit(name, email, message);
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      setStatus('error');
      const errorMessage =
        typeof err === 'object' && err !== null && 'response' in err &&
        (err as { response?: { data?: { error?: string } } }).response?.data?.error;
      setError(errorMessage || 'Failed to send message. Please try again.');
    }
  };

  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-primary to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-secondary font-semibold">Contact</p>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">We are here to help</h1>
            <p className="text-gray-200 text-lg">
              Questions about wine styles, delivery, or special requests? Send a note and we will reply quickly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
              <h3 className="text-lg font-semibold mb-1">Email</h3>
              <p className="text-gray-700">support@aynwine.com</p>
            </div>
            <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
              <h3 className="text-lg font-semibold mb-1">Phone</h3>
              <p className="text-gray-700">+1 (555) 123-4567</p>
            </div>
            <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
              <h3 className="text-lg font-semibold mb-1">Hours</h3>
              <p className="text-gray-700">Mon–Sat, 10am–8pm ET</p>
            </div>
          </div>

          <div className="p-6 border border-gray-200 rounded-2xl shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
            {status === 'sent' && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-green-800 text-sm">
                Thanks for reaching out. We will reply to your email soon.
              </div>
            )}
            {status === 'error' && error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800 text-sm">
                {error}
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">How can we help?</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'loading' && <Loader className="w-4 h-4 animate-spin" />}
                {status === 'loading' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
