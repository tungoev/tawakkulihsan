'use client';

import { useState } from 'react';
import { submitAdvancedReview, requestVerificationCode, verifyReviewCode } from '@/app/actions';
import { Star, ShieldCheck, Mail, ArrowRight, User, Loader2 } from 'lucide-react';

type ReviewStatus = 'PENDING' | 'PUBLISHED' | 'REJECTED';
// ... (rest of types remain same) ...

export function ReviewSection({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    authorName: '',
    gender: 'MALE' as Gender,
    content: '',
    depth: 5,
    clarity: 5,
    practicality: 5,
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const result = await requestVerificationCode(formData.email);
    
    if (result.success) {
      setStep(2);
    } else {
      if (result.error === 'purchased_not_found') {
        setError('Verification failed. This email was not found in our purchase records.');
      } else {
        setError('Failed to send code. Please try again later.');
      }
    }
    setIsLoading(false);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await verifyReviewCode(formData.email, formData.verificationCode);
    
    if (result.success) {
      setStep(3);
    } else {
      setError(result.error === 'invalid_code' ? 'Invalid code.' : 'Code expired.');
    }
    setIsLoading(false);
  };

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const average = parseFloat(((formData.depth + formData.clarity + formData.practicality) / 3).toFixed(1));

    // Optimistic UI update
    const optimisticReview: Review = {
      id: Math.random().toString(),
      authorName: formData.authorName || 'Anonymous',
      email: formData.email,
      gender: formData.gender,
      content: formData.content,
      ratingAverage: average,
      subRatings: { depth: formData.depth, clarity: formData.clarity, practicality: formData.practicality },
      sentiment: average >= 4 ? 'POSITIVE' : 'NEGATIVE',
      status: 'PUBLISHED',
      createdAt: new Date().toISOString(),
    };

    setReviews([optimisticReview, ...reviews]);
    setStep(0);

    // Actual submission
    const data = new FormData();
    data.append('authorName', formData.authorName);
    data.append('email', formData.email);
    data.append('gender', formData.gender);
    data.append('content', formData.content);
    data.append('depth', formData.depth.toString());
    data.append('clarity', formData.clarity.toString());
    data.append('practicality', formData.practicality.toString());

    await submitAdvancedReview(data);

    // Reset Form
    setFormData({
      email: '', verificationCode: '', authorName: '', gender: 'MALE', content: '', depth: 5, clarity: 5, practicality: 5
    });
    setIsSubmitting(false);
  }

  const StarRater = ({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gold/10">
      <span className="text-sm font-medium tracking-wide text-blue-deep uppercase">{label}</span>
      <div className="flex gap-1 mt-2 sm:mt-0">
        {[1, 2, 3, 4, 5].map((star) => (
          <button type="button" key={star} onClick={() => onChange(star)} className="focus:outline-none transition-transform hover:scale-110">
            <Star className={`w-6 h-6 ${star <= value ? 'fill-gold text-gold' : 'text-gray-300'}`} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="font-serif text-4xl text-blue-deep mb-4">Verified Testimonials</h2>
        <p className="text-muted max-w-2xl mx-auto mb-12">
          Reflections from brothers and sisters who have completed the course and built a deeper trust in Allah.
        </p>

        {step === 0 && (
          <button
            onClick={() => setStep(1)}
            className="px-8 py-3 bg-gold text-blue-deep font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all shadow-md active:scale-95 mx-auto flex items-center gap-2 rounded-sm"
          >
            <ShieldCheck className="w-4 h-4" /> Verify Purchase & Review
          </button>
        )}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto bg-card p-8 border border-gold/20 shadow-sm text-left">
            <h3 className="font-serif text-2xl text-blue-deep mb-2 text-center">Verify Purchase</h3>
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded text-center animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}
            <div className="relative mb-6">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gold/60" />
              <input
                type="email" required placeholder="Email Address"
                className="w-full border border-gold/30 bg-transparent py-3 pl-10 pr-4 outline-none focus:border-gold text-blue-deep"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-gold text-blue-deep font-medium py-3 hover:bg-gold-light flex justify-center items-center gap-2 disabled:opacity-70">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Verification Code'} <ArrowRight className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => setStep(0)} className="w-full text-muted text-xs mt-4 hover:text-blue-deep">Cancel</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeSubmit} className="max-w-md mx-auto bg-card p-8 border border-gold/20 shadow-sm text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
            <h3 className="font-serif text-2xl text-blue-deep mb-2 text-center">Enter Code</h3>
            <p className="text-xs text-muted text-center mb-6">We sent a verification code to {formData.email}</p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded text-center animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <div className="mb-6">
              <input
                type="text" required placeholder="4-Digit Code" maxLength={4}
                className={`w-full border bg-transparent py-3 px-4 text-center tracking-[0.5em] text-xl outline-none transition-colors ${error ? 'border-red-400 focus:border-red-500 text-red-600' : 'border-gold/30 focus:border-gold text-blue-deep'}`}
                value={formData.verificationCode} onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-gold text-blue-deep font-medium py-3 hover:bg-gold-light flex justify-center items-center gap-2 disabled:opacity-70">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify Authenticity'} <ShieldCheck className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-muted text-xs mt-4 hover:text-blue-deep">Back</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="max-w-2xl mx-auto bg-card p-8 border border-gold/20 shadow-sm text-left">
            <div className="flex items-center gap-2 justify-center mb-6 text-emerald-600 bg-emerald-50 py-2 border border-emerald-100">
              <ShieldCheck className="w-4 h-4" /> <span className="text-sm font-medium">Purchase Verified</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm text-muted mb-2 uppercase tracking-wide">First Name (Optional)</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gold/60" />
                  <input
                    type="text" placeholder="Anonymous"
                    className="w-full border-b border-gold/30 bg-transparent py-2 pl-9 pr-2 focus:outline-none focus:border-gold text-blue-deep"
                    value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted mb-2 uppercase tracking-wide">I am a</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setFormData({ ...formData, gender: 'MALE' })} className={`flex-1 py-2 border text-sm font-medium transition-colors ${formData.gender === 'MALE' ? 'bg-blue-deep text-white border-blue-deep' : 'bg-transparent text-muted border-gold/30 hover:border-gold'}`}>Brother</button>
                  <button type="button" onClick={() => setFormData({ ...formData, gender: 'FEMALE' })} className={`flex-1 py-2 border text-sm font-medium transition-colors ${formData.gender === 'FEMALE' ? 'bg-blue-deep text-white border-blue-deep' : 'bg-transparent text-muted border-gold/30 hover:border-gold'}`}>Sister</button>
                </div>
              </div>
            </div>

            <div className="mb-8 bg-background p-6 border border-gold/10">
              <StarRater label="Spiritual Depth" value={formData.depth} onChange={(val) => setFormData({ ...formData, depth: val })} />
              <StarRater label="Clarity & Simplicity" value={formData.clarity} onChange={(val) => setFormData({ ...formData, clarity: val })} />
              <StarRater label="Practicality" value={formData.practicality} onChange={(val) => setFormData({ ...formData, practicality: val })} />
            </div>

            <div className="mb-8">
              <label className="block text-sm text-muted mb-2 uppercase tracking-wide flex justify-between">
                <span>Your Reflection</span> <span className="text-[10px] text-gray-400 normal-case bg-gray-100 px-2 rounded">Optional</span>
              </label>
              <textarea
                rows={4} placeholder="How did this course impact your relationship with provision?"
                className="w-full border border-gold/30 p-4 outline-none focus:border-gold resize-none text-blue-deep bg-transparent"
                value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(0)} className="flex-1 border border-muted/30 text-muted py-3 hover:bg-background">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="flex-2 bg-gold text-blue-deep font-medium px-8 py-3 hover:bg-gold-light">
                {isSubmitting ? 'Publishing...' : 'Publish Authentic Review'}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card p-8 border border-gold/10 shadow-[0_4px_20px_-10px_rgba(201,168,76,0.15)] flex flex-col h-full relative">
            <div className="absolute top-0 right-0 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 flex items-center gap-1 border-l border-b border-gold/10">
              <ShieldCheck className="w-3 h-3" /> Verified
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-deep flex items-center justify-center rounded-full text-gold font-serif text-xl border border-gold/20 shrink-0">
                  {review.authorName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-blue-deep flex items-center gap-2">
                    {review.authorName} <span className="w-1 h-1 bg-gold rounded-full"></span> <span className="text-[11px] text-muted tracking-wider uppercase font-normal">{review.gender === 'MALE' ? 'Brother' : 'Sister'}</span>
                  </h4>
                  <div className="flex text-gold mt-1 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(review.ratingAverage) ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-3xl font-serif text-blue-deep tracking-tighter leading-none">{review.ratingAverage.toFixed(1)}</div>
                <div className="text-[9px] uppercase tracking-widest text-muted mt-1">Average</div>
              </div>
            </div>

            {review.content && (
              <p className="text-muted leading-relaxed italic mb-6 flex-1 text-[15px]">"{review.content}"</p>
            )}

            <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-gold/10 text-center">
              <div>
                <div className="text-[10px] uppercase text-muted tracking-wide mb-1">Depth</div>
                <div className="flex justify-center text-gold gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < review.subRatings.depth ? 'fill-current' : 'text-gray-300'}`} />)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-muted tracking-wide mb-1">Clarity</div>
                <div className="flex justify-center text-gold gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < review.subRatings.clarity ? 'fill-current' : 'text-gray-300'}`} />)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-muted tracking-wide mb-1">Practical</div>
                <div className="flex justify-center text-gold gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < review.subRatings.practicality ? 'fill-current' : 'text-gray-300'}`} />)}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
