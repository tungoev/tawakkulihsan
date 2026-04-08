'use client';

import { approveReview, rejectReview } from '@/app/actions';
import { useTransition } from 'react';
import { Check, X, Star, Mail, User } from 'lucide-react';

interface SubRatings {
  depth: number;
  clarity: number;
  practicality: number;
}

interface Review {
  id: string;
  authorName: string;
  email: string;
  gender: string;
  content?: string;
  ratingAverage: number;
  subRatings: SubRatings;
  sentiment: string;
  status: string;
  createdAt: string;
}

export function AdminReviewCard({ review }: { review: Review }) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    startTransition(() => {
      approveReview(review.id);
    });
  };

  const handleReject = () => {
    startTransition(() => {
      rejectReview(review.id);
    });
  };

  return (
    <div className={`p-6 rounded-lg border ${review.status === 'PUBLISHED' ? 'border-[#c9a84c]/30 bg-[#1a1f2c]' : 'border-orange-500/30 bg-orange-500/5'} transition-all`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-medium text-white flex items-center gap-2 mb-1">
            {review.authorName}
            {review.status === 'PUBLISHED' && (
              <span className="text-[10px] uppercase tracking-wider bg-[#c9a84c]/20 text-[#c9a84c] px-2 py-0.5 rounded-full">Published</span>
            )}
            {review.status === 'PENDING' && (
              <span className="text-[10px] uppercase tracking-wider bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">Pending Analysis</span>
            )}
            {review.sentiment === 'NEGATIVE' && review.status === 'PENDING' && (
              <span className="text-[10px] uppercase tracking-wider bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Low Rating Warning</span>
            )}
          </h4>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {review.email}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {review.gender === 'MALE' ? 'Brother' : 'Sister'}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-serif text-[#c9a84c] leading-none">{review.ratingAverage.toFixed(1)}</div>
          <div className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">Average</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#252b36] mb-4">
        <div className="text-center">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Depth</div>
          <div className="flex justify-center text-[#c9a84c]">
            {review.subRatings.depth}/5
          </div>
        </div>
        <div className="text-center border-l border-[#252b36]">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Clarity</div>
          <div className="flex justify-center text-[#c9a84c]">
             {review.subRatings.clarity}/5
          </div>
        </div>
        <div className="text-center border-l border-[#252b36]">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Practicality</div>
          <div className="flex justify-center text-[#c9a84c]">
             {review.subRatings.practicality}/5
          </div>
        </div>
      </div>

      {review.content ? (
        <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{review.content}"</p>
      ) : (
        <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">No written reflection provided.</p>
      )}

      {review.status === 'PENDING' && (
        <div className="flex gap-3">
          <button 
            onClick={handleApprove}
            disabled={isPending}
            className="flex-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 hover:border-transparent py-2 rounded-md text-xs font-medium uppercase tracking-wider transition-all flex justify-center items-center gap-2"
          >
            <Check className="w-4 h-4" /> Approve
          </button>
          <button 
            onClick={handleReject}
            disabled={isPending}
            className="flex-1 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 hover:border-transparent py-2 rounded-md text-xs font-medium uppercase tracking-wider transition-all flex justify-center items-center gap-2"
          >
            <X className="w-4 h-4" /> Reject
          </button>
        </div>
      )}
    </div>
  );
}
