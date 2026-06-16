'use client';

import React, { useState } from 'react';

interface SubscribeFormProps {
  source?: string; // e.g. "blog", "homepage", "footer"
  variant?: 'inline' | 'compact' | 'full';
  className?: string;
}

export default function SubscribeForm({ source = 'unknown', variant = 'inline', className = '' }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: 'You\'re subscribed! Welcome to Artemis.' });
        setEmail('');
      } else {
        setResult({ success: false, message: data.error || 'Something went wrong.' });
      }
    } catch {
      setResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {submitting ? '...' : 'Subscribe'}
        </button>
        {result && (
          <span className={`text-[12px] font-medium self-center ${result.success ? 'text-green-600' : 'text-red-600'}`}>
            {result.message}
          </span>
        )}
      </form>
    );
  }

  if (variant === 'full') {
    return (
      <form onSubmit={handleSubmit} className={`${className}`}>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 bg-white px-4 py-3.5 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Subscribing...' : 'Subscribe to the Artemis Newsletter'}
          </button>
          {result && (
            <div className={`p-3 text-[13px] font-medium ${result.success ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              {result.message}
            </div>
          )}
        </div>
      </form>
    );
  }

  // Default: inline
  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1 border border-gray-300 bg-white px-3 py-2 text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all min-w-0"
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-[#8A0000] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors disabled:opacity-50 shrink-0"
      >
        {submitting ? '...' : 'Subscribe'}
      </button>
      {result && (
        <span className={`text-[11px] font-medium self-center whitespace-nowrap ${result.success ? 'text-green-600' : 'text-red-600'}`}>
          {result.success ? 'Subscribed!' : 'Error'}
        </span>
      )}
    </form>
  );
}
