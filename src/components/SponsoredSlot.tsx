import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { Language, AffiliateConfig } from '../types';

interface SponsoredSlotProps {
  language: Language;
  affiliateConfig: AffiliateConfig;
}

export const SponsoredSlot: React.FC<SponsoredSlotProps> = ({ language, affiliateConfig }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-2 pb-1">
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-[#1C2541] to-slate-900 border border-amber-500/30 p-3.5 shadow-lg overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Decorative corner tag */}
        <div className="absolute top-0 right-0 bg-amber-500/20 text-[#FF9933] border-b border-l border-amber-500/40 text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg tracking-wider">
          Sponsored Deal of the Day
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-[#FF9933] text-slate-950 flex items-center justify-center font-black text-lg shadow-md shrink-0">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-extrabold text-white">
                Tata Neu Croma Mega Gadget Days: Extra 5% NeuCoins
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">
                Verified Partner
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {language === 'en'
                ? 'Get 5% NeuCoins on Laptops & Smart TVs + No Cost EMI on HDFC & ICICI cards.'
                : 'लैपटॉप और स्मार्ट टीवी पर पाएं 5% न्यूकॉइन + HDFC और ICICI कार्ड्स पर नो कॉस्ट ईएमआई।'}
            </p>
          </div>
        </div>

        <a
          href="https://www.croma.com"
          target="_blank"
          rel="noopener noreferrer"
          className="self-end sm:self-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#FF9933] hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider transition-all shadow-sm active:scale-95"
        >
          <span>{language === 'en' ? 'Check Offer' : 'ऑफर देखें'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
