'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initPayment() {
      try {
        const response = await fetch('/api/payment/create', { method: 'POST' });
        const data = await response.json();

        if (data.success && data.url) {
          // Redirect to Lava Top
          window.location.href = data.url;
        } else {
          // Provide a clean message from the server or a fallback
          const errorMsg = data.error || data.message || 'The payment server returned an empty response.';
          setError(errorMsg);
          console.error('Checkout error:', data);
        }
      } catch (err: any) {
        console.error('Checkout fetch error:', err);
        setError(`Connection error: ${err.message || 'Please check your internet and try again.'}`);
      }
    }

    initPayment();
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background pt-24 min-h-[70vh]">
      <div className="max-w-md w-full text-center">
        {!error ? (
          <>
            <div className="flex justify-center mb-8">
              <Loader2 className="w-12 h-12 text-gold animate-spin" />
            </div>
            <h1 className="font-serif text-3xl text-blue-deep mb-4 italic">
              Preparing Secure Checkout
            </h1>
            <p className="text-muted leading-relaxed">
              We are connecting you to Lava Top to complete your purchase of <br />
              <strong>"Rizq, Tawakkul & Barakah"</strong>.
            </p>
            <p className="text-xs text-muted/60 mt-8 uppercase tracking-widest">
              Please do not refresh the page
            </p>
          </>
        ) : (
          <div className="p-8 border border-red-900/10 bg-red-50/50 rounded-sm">
            <h1 className="font-serif text-2xl text-red-900 mb-4">Something went wrong</h1>
            <p className="text-muted mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gold text-blue-deep px-8 py-3 font-medium transition-transform hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
