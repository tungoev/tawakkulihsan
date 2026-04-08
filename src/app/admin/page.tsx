import { getAnalytics, mockPurchase } from '@/app/actions';
import { DollarSign, Users, BookOpenCheck, Activity, User, HeartPulse } from 'lucide-react';

export default async function AdminDashboardOverview() {
  const analytics = await getAnalytics();
  
  const totalBuyers = analytics.buyersByGender.male + analytics.buyersByGender.female;
  const malePercent = totalBuyers === 0 ? 0 : Math.round((analytics.buyersByGender.male / totalBuyers) * 100);
  const femalePercent = totalBuyers === 0 ? 0 : Math.round((analytics.buyersByGender.female / totalBuyers) * 100);

  const stats = [
    { name: 'Total Sales', value: `$${analytics.sales * 27}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { name: 'Total Buyers', value: totalBuyers.toLocaleString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { name: 'Page Visits', value: analytics.visits.toLocaleString(), icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { name: 'Courses Completed', value: analytics.coursesCompleted.toLocaleString(), icon: BookOpenCheck, color: 'text-[#c9a84c]', bg: 'bg-[#c9a84c]/10' },
  ];

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-wide mb-2"><span className="text-[#c9a84c]">Analytics</span> Overview</h1>
          <p className="text-gray-400 text-sm tracking-wide">Real-time statistics for your landing page.</p>
        </div>
        
        {/* Secret Dev Buttons to populate data */}
        <div className="flex gap-2">
          <form action={async () => { 'use server'; await mockPurchase('MALE'); }}>
            <button className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-card/5 hover:bg-card/10 text-white/50 border border-white/10 rounded">Mock Buy (Brother)</button>
          </form>
          <form action={async () => { 'use server'; await mockPurchase('FEMALE'); }}>
            <button className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-card/5 hover:bg-card/10 text-white/50 border border-white/10 rounded">Mock Buy (Sister)</button>
          </form>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-[#1a1f2c] rounded-xl p-6 border border-[#252b36] shadow-sm hover:border-[#353c4a] transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-[0.15em] font-medium mb-1">{stat.name}</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-3xl font-light text-white tracking-tight">{stat.value}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Buyer Demographics */}
        <div className="bg-[#1a1f2c] rounded-xl p-8 border border-[#252b36] shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-8 border-b border-[#252b36] pb-4">
            <User className="text-[#c9a84c] w-5 h-5" /> 
            Buyer Demographics (Sales)
          </h3>
          
          <div className="flex justify-between items-end mb-2">
            <div className="text-gray-400">Brothers</div>
            <div className="text-2xl font-light text-white">{analytics.buyersByGender.male} <span className="text-sm text-gray-500">({malePercent}%)</span></div>
          </div>
          <div className="w-full bg-[#151923] h-3 rounded-full mb-8 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${malePercent}%` }}></div>
          </div>

          <div className="flex justify-between items-end mb-2">
            <div className="text-gray-400">Sisters</div>
            <div className="text-2xl font-light text-white">{analytics.buyersByGender.female} <span className="text-sm text-gray-500">({femalePercent}%)</span></div>
          </div>
          <div className="w-full bg-[#151923] h-3 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full" style={{ width: `${femalePercent}%` }}></div>
          </div>
        </div>

        {/* Sentiment Analysis by Gender */}
        <div className="bg-[#1a1f2c] rounded-xl p-8 border border-[#252b36] shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-8 border-b border-[#252b36] pb-4">
            <HeartPulse className="text-[#c9a84c] w-5 h-5" /> 
            Review Sentiments by Gender
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Brothers Sub-panel */}
            <div className="bg-[#151923] p-5 rounded-lg border border-[#252b36]">
              <h4 className="text-blue-400 text-sm font-medium tracking-wide uppercase mb-4 text-center">Brothers</h4>
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-400">Positive</span>
                <span className="text-emerald-400 font-bold">{analytics.sentimentByGender.malePositive}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-[#252b36]">
                <span className="text-gray-400">Negative / Pending</span>
                <span className="text-rose-400 font-bold">{analytics.sentimentByGender.maleNegative}</span>
              </div>
            </div>

            {/* Sisters Sub-panel */}
            <div className="bg-[#151923] p-5 rounded-lg border border-[#252b36]">
              <h4 className="text-rose-400 text-sm font-medium tracking-wide uppercase mb-4 text-center">Sisters</h4>
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-400">Positive</span>
                <span className="text-emerald-400 font-bold">{analytics.sentimentByGender.femalePositive}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-[#252b36]">
                <span className="text-gray-400">Negative / Pending</span>
                <span className="text-rose-400 font-bold">{analytics.sentimentByGender.femaleNegative}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
