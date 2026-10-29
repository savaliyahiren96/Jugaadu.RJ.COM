import React from 'react';
import { Layers, Lightbulb, Gift, Bookmark, Bell } from 'lucide-react';
import { Language } from '../types';

interface BottomNavProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  language: Language;
  savedCount: number;
  watchlistCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  language,
  savedCount,
  watchlistCount,
}) => {
  const tabs = [
    {
      id: 'deal-finder',
      label: language === 'en' ? 'Deal Stack' : 'डील स्टैक',
      icon: Layers,
    },
    {
      id: 'tips',
      label: language === 'en' ? 'Jugaad Tips' : 'टिप्स',
      icon: Lightbulb,
    },
    {
      id: 'referrals',
      label: language === 'en' ? 'Referrals' : 'रेफ़रल',
      icon: Gift,
    },
    {
      id: 'saved',
      label: language === 'en' ? 'Saved' : 'सेव की हुई',
      icon: Bookmark,
      badge: savedCount > 0 ? savedCount : undefined,
    },
    {
      id: 'watchlist',
      label: language === 'en' ? 'Watchlist' : 'वॉचलिस्ट',
      icon: Bell,
      badge: watchlistCount > 0 ? watchlistCount : undefined,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B132B]/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-[#FF9933]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-black flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'font-black' : 'font-semibold'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#FF9933] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
