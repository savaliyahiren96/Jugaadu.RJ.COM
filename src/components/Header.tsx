import React from 'react';
import { Sparkles, IndianRupee, Globe, Settings, ShieldCheck, BookmarkCheck } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  totalSaved: number;
  activeTab: string;
  onChangeTab: (tab: string) => void;
  onOpenAffiliateModal: () => void;
  savedDealsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  totalSaved,
  activeTab,
  onChangeTab,
  onOpenAffiliateModal,
  savedDealsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      {/* Top Banner / Ticker */}
      <div className="bg-gradient-to-r from-amber-600 via-[#FF9933] to-orange-600 text-slate-950 font-bold text-xs py-1 px-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0 overflow-hidden whitespace-nowrap">
          <span className="bg-slate-950 text-white text-[10px] px-1.5 py-0.5 rounded font-black tracking-wider uppercase">
            100% Legal
          </span>
          <span className="truncate">
            {language === 'en'
              ? '🇮🇳 India’s #1 Deal Stacking Engine • Zero Gimmicks, Pure Official Discounts'
              : '🇮🇳 भारत का नंबर 1 डील स्टैकिंग इंजन • बिना किसी झोल के सिर्फ असली बचत'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] font-semibold text-slate-950">
          <span>Amazon • Flipkart • Croma • Myntra</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Logo & Tagline */}
        <div
          onClick={() => onChangeTab('deal-finder')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9933] to-amber-600 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <span className="text-slate-950 font-black text-xl">₹</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Rozha_One',sans-serif]">
                Jugaddu<span className="text-[#FF9933]">.RJ</span>
              </span>
              <span className="text-[10px] bg-[#FF9933]/20 text-[#FF9933] font-extrabold px-1.5 py-0.5 rounded border border-[#FF9933]/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-1 hidden sm:block">
              {language === 'en' ? 'Check this before you buy!' : 'खरीदने से पहले यह जुगाड़ चेक करें!'}
            </p>
          </div>
        </div>

        {/* Center Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1C2541]/70 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => onChangeTab('deal-finder')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'deal-finder'
                ? 'bg-[#FF9933] text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {language === 'en' ? 'Deal Stack' : 'डील स्टैक'}
          </button>
          <button
            onClick={() => onChangeTab('tips')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tips'
                ? 'bg-[#FF9933] text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {language === 'en' ? 'Jugaad Tips' : 'जुगाड़ टिप्स'}
          </button>
          <button
            onClick={() => onChangeTab('referrals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'referrals'
                ? 'bg-[#FF9933] text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {language === 'en' ? 'Referral Corner' : 'रेफ़रल कॉर्नर'}
          </button>
          <button
            onClick={() => onChangeTab('saved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'saved'
                ? 'bg-[#FF9933] text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>{language === 'en' ? 'Saved' : 'सेव की हुई'}</span>
            {savedDealsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center font-bold">
                {savedDealsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onChangeTab('watchlist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'watchlist'
                ? 'bg-[#FF9933] text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {language === 'en' ? 'Watchlist' : 'वॉचलिस्ट'}
          </button>
        </nav>

        {/* Right Side Stats & Actions */}
        <div className="flex items-center gap-2">
          {/* Total Money Saved Pill */}
          <div
            onClick={() => onChangeTab('saved')}
            title="Total money saved using Jugaddu stacks"
            className="flex items-center gap-1.5 bg-[#1C2541] border border-amber-500/40 px-2.5 py-1.5 rounded-xl cursor-pointer hover:border-amber-400 transition-all shadow-inner"
          >
            <div className="w-5 h-5 rounded-full bg-[#FF9933]/20 text-[#FF9933] flex items-center justify-center">
              <IndianRupee className="w-3 h-3 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
                {language === 'en' ? 'Total Saved' : 'कुल बचत'}
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-amber-400 leading-tight">
                ₹{totalSaved.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Language Toggle (EN / हिंदी) */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 bg-[#1C2541] hover:bg-[#3A506B]/50 border border-slate-700 text-slate-200 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors"
            title="Toggle English / Hindi"
          >
            <Globe className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{language === 'en' ? 'हिं' : 'EN'}</span>
          </button>

          {/* Affiliate Tag Settings Button */}
          <button
            onClick={onOpenAffiliateModal}
            className="p-2 rounded-xl bg-[#1C2541] hover:bg-[#3A506B]/50 border border-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
            title="Affiliate IDs & Money Model Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
