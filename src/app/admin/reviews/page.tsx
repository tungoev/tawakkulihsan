import { getAllReviews } from '@/app/actions';
import { AdminReviewCard } from './AdminReviewCard';
import { MessageSquareWarning, MessageSquareHeart } from 'lucide-react';

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();
  
  const pendingReviews = reviews.filter(r => r.status === 'PENDING');
  const publishedReviews = reviews.filter(r => r.status === 'PUBLISHED');

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-white tracking-wide mb-2"><span className="text-[#c9a84c]">Review</span> Moderation</h1>
        <p className="text-gray-400 text-sm tracking-wide">Manage incoming reflections. Positive ones are automatically published.</p>
      </div>

      <div className="mb-12">
        <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-6 border-b border-[#252b36] pb-3">
          <MessageSquareWarning className="text-orange-400 w-5 h-5" /> 
          Pending Moderation ({pendingReviews.length})
        </h3>
        
        {pendingReviews.length === 0 ? (
          <div className="bg-[#1a1f2c] rounded-lg border border-[#252b36] p-8 text-center">
            <p className="text-gray-500">No pending reviews. Good job!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {pendingReviews.map(r => (
              <AdminReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-6 border-b border-[#252b36] pb-3">
          <MessageSquareHeart className="text-emerald-400 w-5 h-5" /> 
          Published Reviews ({publishedReviews.length})
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {publishedReviews.map(r => (
            <AdminReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
