import { getAnalytics, mockPurchase, addManualBuyer, removeBuyer, addBuyerAction, removeBuyerAction, mockPurchaseMaleAction, mockPurchaseFemaleAction } from '@/app/actions';
import { DollarSign, Users, BookOpenCheck, Activity, User, HeartPulse, Globe, Smartphone, Monitor, ShieldCheck, Plus, Trash2 } from 'lucide-react';

export default async function AdminDashboardOverview() {
  const analytics = await getAnalytics();
  
  const totalBuyers = (analytics.buyersByGender?.male || 0) + (analytics.buyersByGender?.female || 0);
  const malePercent = totalBuyers === 0 ? 0 : Math.round(((analytics.buyersByGender?.male || 0) / totalBuyers) * 100);
  const femalePercent = totalBuyers === 0 ? 0 : Math.round(((analytics.buyersByGender?.female || 0) / totalBuyers) * 100);

  const totalDevices = (analytics.devices?.mobile || 0) + (analytics.devices?.desktop || 0);
  const mobilePercent = totalDevices === 0 ? 0 : Math.round(((analytics.devices?.mobile || 0) / totalDevices) * 100);
  const desktopPercent = totalDevices === 0 ? 0 : Math.round(((analytics.devices?.desktop || 0) / totalDevices) * 100);

  // Sort countries by visit count
  const sortedCountries = Object.entries(analytics.countries || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const stats = [
    { name: 'Total Sales', value: `$${(analytics.sales || 0) * 27}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { name: 'Total Buyers', value: totalBuyers.toLocaleString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { name: 'Unique Visits', value: (analytics.visits || 0).toLocaleString(), icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { name: 'Courses Completed', value: (analytics.coursesCompleted || 0).toLocaleString(), icon: BookOpenCheck, color: 'text-[#c9a84c]', bg: 'bg-[#c9a84c]/10' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-wide mb-2"><span className="text-[#c9a84c]">Analytics</span> Overview</h1>
          <p className="text-gray-400 text-sm tracking-wide">Real-time statistics for your landing page.</p>
        </div>
        
        {/* Secret Dev Buttons to populate data */}
        <div className="flex gap-2">
          <form action={mockPurchaseMaleAction}>
            <button className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-card/5 hover:bg-card/10 text-white/50 border border-white/10 rounded transition-colors">Mock Buy (Brother)</button>
          </form>
          <form action={mockPurchaseFemaleAction}>
            <button className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-card/5 hover:bg-card/10 text-white/50 border border-white/10 rounded transition-colors">Mock Buy (Sister)</button>
          </form>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-[#1a1f2c] rounded-xl p-6 border border-[#252b36] shadow-sm hover:border-[#353c4a] transition-all duration-300 group">
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
        {/* Visitor Locations */}
        <div className="bg-[#1a1f2c] rounded-xl p-8 border border-[#252b36] shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-8 border-b border-[#252b36] pb-4">
            <Globe className="text-[#c9a84c] w-5 h-5" /> 
            Top Visitor Locations
          </h3>
          
          <div className="space-y-6">
            {sortedCountries.length > 0 ? sortedCountries.map(([code, count]) => (
              <div key={code} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-medium">{code}</span>
                  <div className="h-1.5 w-32 bg-[#151923] rounded-full overflow-hidden">
                    <div 
                      className="bg-[#c9a84c]/60 h-full" 
                      style={{ width: `${analytics.visits === 0 ? 0 : Math.round((count / (analytics.visits || 1)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-white font-serif">{count} <span className="text-xs text-gray-500 ml-1">visits</span></div>
              </div>
            )) : (
              <p className="text-gray-500 text-sm italic py-4">No location data yet...</p>
            )}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-[#1a1f2c] rounded-xl p-8 border border-[#252b36] shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-8 border-b border-[#252b36] pb-4">
            <Smartphone className="text-[#c9a84c] w-5 h-5" /> 
            Device Distribution
          </h3>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center p-4 bg-[#151923] rounded-lg border border-[#252b36]">
              <Monitor className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-light text-white mb-1">{desktopPercent}%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Desktop</div>
            </div>
            <div className="text-center p-4 bg-[#151923] rounded-lg border border-[#252b36]">
              <Smartphone className="w-6 h-6 text-rose-400 mx-auto mb-2" />
              <div className="text-2xl font-light text-white mb-1">{mobilePercent}%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Mobile</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-tighter">
              <span>Desktop</span>
              <span>Mobile</span>
            </div>
            <div className="w-full bg-[#151923] h-4 rounded-full overflow-hidden flex">
              <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${desktopPercent}%` }}></div>
              <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: `${mobilePercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Buyer Demographics */}
        <div className="bg-[#1a1f2c] rounded-xl p-8 border border-[#252b36] shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-8 border-b border-[#252b36] pb-4">
            <User className="text-[#c9a84c] w-5 h-5" /> 
            Buyer Demographics (Sales)
          </h3>
          
          <div className="flex justify-between items-end mb-2">
            <div className="text-gray-400 uppercase text-xs tracking-widest">Brothers</div>
            <div className="text-2xl font-light text-white">{analytics.buyersByGender?.male || 0} <span className="text-sm text-gray-500 ml-1">({malePercent}%)</span></div>
          </div>
          <div className="w-full bg-[#151923] h-3 rounded-full mb-8 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${malePercent}%` }}></div>
          </div>

          <div className="flex justify-between items-end mb-2">
            <div className="text-gray-400 uppercase text-xs tracking-widest">Sisters</div>
            <div className="text-2xl font-light text-white">{analytics.buyersByGender?.female || 0} <span className="text-sm text-gray-500 ml-1">({femalePercent}%)</span></div>
          </div>
          <div className="w-full bg-[#151923] h-3 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full transition-all duration-1000" style={{ width: `${femalePercent}%` }}></div>
          </div>
        </div>

        {/* Sentiment Analysis by Gender */}
        <div className="bg-[#1a1f2c] rounded-xl p-8 border border-[#252b36] shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-8 border-b border-[#252b36] pb-4">
            <HeartPulse className="text-[#c9a84c] w-5 h-5" /> 
            Review Sentiments by Gender
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#151923] p-5 rounded-lg border border-[#252b36] hover:border-blue-500/20 transition-colors">
              <h4 className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">Brothers</h4>
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-400">Positive</span>
                <span className="text-emerald-400 font-bold">{analytics.sentimentByGender?.malePositive || 0}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-[#252b36]">
                <span className="text-gray-400">Neutral/Other</span>
                <span className="text-rose-400 font-bold">{analytics.sentimentByGender?.maleNegative || 0}</span>
              </div>
            </div>

            <div className="bg-[#151923] p-5 rounded-lg border border-[#252b36] hover:border-rose-500/20 transition-colors">
              <h4 className="text-rose-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">Sisters</h4>
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-400">Positive</span>
                <span className="text-emerald-400 font-bold">{analytics.sentimentByGender?.femalePositive || 0}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-[#252b36]">
                <span className="text-gray-400">Neutral/Other</span>
                <span className="text-rose-400 font-bold">{analytics.sentimentByGender?.femaleNegative || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1f2c] rounded-xl p-8 border border-[#252b36] shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-8 border-b border-[#252b36] pb-4">
          <ShieldCheck className="text-[#c9a84c] w-5 h-5" /> 
          Verified Buyers Management
        </h3>

        <form action={addBuyerAction} className="mb-8 p-4 bg-[#151923] border border-[#252b36] rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              name="email" type="email" required placeholder="Buyer Email"
              className="flex-1 bg-transparent border-b border-[#252b36] py-2 px-1 focus:border-[#c9a84c] outline-none text-white text-sm"
            />
            <button type="submit" className="bg-[#c9a84c] text-[#1a1f2c] font-bold px-4 py-2 rounded text-xs flex items-center gap-2 hover:bg-[#d4b96b] transition-colors">
              <Plus className="w-3 h-3" /> Add Buyer
            </button>
          </div>
        </form>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {(analytics.buyers || []).map((email: string) => (
            <div key={email} className="flex justify-between items-center p-3 bg-[#151923] border border-[#252b36] rounded group hover:border-[#c9a84c]/30 transition-colors">
              <div className="flex flex-col">
                <span className="text-gray-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{email}</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Verified Buyer</span>
              </div>
              <form action={removeBuyerAction}>
                <input type="hidden" name="email" value={email} />
                <button type="submit" className="p-2 text-gray-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          ))}
          {(analytics.buyers || []).length === 0 && (
            <div className="text-center py-8 border border-dashed border-[#252b36] rounded-lg">
              <p className="text-gray-500 text-sm italic">No verified buyers yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
