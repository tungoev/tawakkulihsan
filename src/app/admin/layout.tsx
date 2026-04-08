import Link from 'next/link';
import { Home, LineChart, MessageSquare, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 bg-[#0f1219] text-gray-200 min-h-screen flex flex-col font-sans selection:bg-[#c9a84c]/30">
      
      {/* Top Navbar */}
      <nav className="bg-[#151923] border-b border-[#252b36] py-4 px-6 flex justify-between items-center z-10 shadow-md">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="font-serif text-2xl tracking-wide text-white hover:text-white transition-colors flex items-center gap-2">
            <span className="text-[#c9a84c]">✦</span> Admin Panel
          </Link>
        </div>
        <div className="flex items-center gap-4 border-l border-[#252b36] pl-4">
          <span className="text-sm font-medium tracking-wider text-gray-400">STATUS:</span>
          <span className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Live
          </span>
        </div>
      </nav>

      {/* Main Content Area + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-72 bg-[#151923] border-r border-[#252b36] p-6 hidden md:block">
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 font-bold">Main Menu</p>
            <div className="space-y-1">
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-[#1a1f2c] transition-colors group">
                <LineChart className="w-4 h-4 text-gray-400 group-hover:text-[#c9a84c] transition-colors" /> Overview
              </Link>
              <Link href="/admin/reviews" className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-[#1a1f2c] transition-colors group">
                <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-[#c9a84c] transition-colors" /> Reviews & Feedback
              </Link>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 font-bold">Quick Links</p>
            <div className="space-y-1">
              <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-[#1a1f2c] transition-colors group">
                <Home className="w-4 h-4 text-gray-400 group-hover:text-[#c9a84c] transition-colors" /> Go to Website
              </Link>
            </div>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-[#0a0c10]">
          <div className="max-w-6xl mx-auto border border-[#252b36]/50 bg-[#151923]/50 rounded-xl p-1 shadow-2xl backdrop-blur-sm">
            <div className="bg-[#151923] rounded-lg border border-[#252b36] p-6 lg:p-10 shadow-inner">
              {children}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
