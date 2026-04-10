'use client';

import { useEffect, useState } from 'react';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isPreCheckout, setIsPreCheckout] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setIsPreCheckout(false);
    setError(null);

    try {
      const response = await fetch('/api/payment/create', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        const errorMsg = data.error || data.message || 'The payment server returned an error.';
        setError(errorMsg);
        setIsPreCheckout(true);
      }
    } catch (err: any) {
      setError(`Connection error: ${err.message}`);
      setIsPreCheckout(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background pt-32 min-h-[80vh]">
      <div className="max-w-md w-full text-center">
        {isPreCheckout ? (
          <div className="bg-card p-10 border border-gold/20 shadow-xl rounded-sm">
            <h1 className="font-serif text-3xl text-blue-deep mb-4 italic">Secure Checkout</h1>
            <p className="text-muted mb-8 text-sm">Please enter the email address where you would like to receive the course material.</p>
            
            <form onSubmit={handleCheckout} className="space-y-6">
              <input 
                type="email" 
                required 
                placeholder="you@example.com"
                className="w-full bg-transparent border-b border-gold/40 py-3 px-2 outline-none focus:border-gold text-blue-deep text-lg transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className="w-full bg-gold text-blue-deep font-medium py-4 hover:bg-gold-light transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Proceed to Payment <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-muted/60 mt-8 uppercase tracking-widest flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Encrypted & Secure
            </p>
          </div>
        ) : !error ? (
          <>
            <div className="flex justify-center mb-8">
              <Loader2 className="w-12 h-12 text-gold animate-spin" />
            </div>
            <h1 className="font-serif text-3xl text-blue-deep mb-4 italic">
              Redirecting to Secure Payment
            </h1>
            <p className="text-muted leading-relaxed">
              We are connecting you to Lava Top to complete your purchase.
            </p>
          </>
        ) : (
          <div className="p-8 border border-red-900/10 bg-red-50/50 rounded-sm">
            <h1 className="font-serif text-2xl text-red-900 mb-4">Something went wrong</h1>
            <p className="text-muted mb-6">{error}</p>
            <button 
              onClick={() => setIsPreCheckout(true)}
              className="bg-gold text-blue-deep px-8 py-3 font-medium transition-transform hover:-translate-y-0.5"
            >
              Back to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
