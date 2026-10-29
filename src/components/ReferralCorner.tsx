import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Gift, ShieldAlert, Sparkles } from 'lucide-react';
import { ReferralCode, Language } from '../types';
import { INITIAL_REFERRALS } from '../data/referralsData';

interface ReferralCornerProps {
  language: Language;
}

export const ReferralCorner: React.FC<ReferralCornerProps> = ({ language }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filtered = INITIAL_REFERRALS.filter(
    (item) => selectedCat === 'all' || item.category === selectedCat
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-5">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-1">
          <Gift className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Official App Welcome Perks' : 'ऑफिशियल वेलकम कोड्स'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {language === 'en' ? 'Desi Referral Corner' : 'रेफ़रल कॉर्नर'}
        </h2>
        <p className="text-xs text-slate-400">
          {language === 'en'
            ? 'Verified working referral codes for everyday apps in India. Get instant welcome cash, ride discounts, and free food delivery.'
            : 'भारत के प्रमुख ऐप्स के सत्यापित रेफरल कोड्स। पाएं तुरंत डिस्काउंट, फ्री राइड और वेलकम कैशबैक।'}
        </p>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Apps', labelHi: 'सभी ऐप्स' },
          { id: 'food', label: 'Food (Swiggy/Zomato)', labelHi: 'खाना' },
          { id: 'travel', label: 'Travel (Uber)', labelHi: 'सवारी' },
          { id: 'grocery', label: 'Grocery (Zepto/Blinkit)', labelHi: 'ग्रोसरी' },
          { id: 'fintech', label: 'Fintech (CRED/INDmoney)', labelHi: 'बैंकिंग' },
          { id: 'shopping', label: 'Cashback Portals', labelHi: 'कैशबैक' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedCat === cat.id
                ? 'bg-[#FF9933] text-slate-950 shadow-sm'
                : 'bg-[#1C2541] text-slate-300 hover:bg-slate-700/60 border border-slate-700'
            }`}
          >
            {language === 'en' ? cat.label : cat.labelHi}
          </button>
        ))}
      </div>

      {/* Grid of Referral Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filtered.map((ref) => {
          const isCopied = copiedId === ref.id;
          const perk = language === 'hi' && ref.discountPerkHi ? ref.discountPerkHi : ref.discountPerk;

          return (
            <div
              key={ref.id}
              className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 shadow-lg flex flex-col justify-between hover:border-slate-600 transition-all space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-slate-800 border border-slate-700">
                      {ref.logo}
                    </span>
                    <div>
                      <h3 className="font-black text-sm text-white">{ref.appName}</h3>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {ref.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Verified
                  </span>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
                    <span>{perk}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{ref.terms}</p>
                </div>
              </div>

              {/* Code + Copy + Claim */}
              <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-black text-white bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-700">
                    {ref.code}
                  </span>
                  <button
                    onClick={() => handleCopy(ref.id, ref.code)}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                      isCopied
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                    title="Copy Code"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a
                  href={ref.claimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF9933] hover:bg-amber-500 text-slate-950 text-xs font-black uppercase transition-all shadow-sm"
                >
                  <span>{language === 'en' ? 'Claim' : 'प्राप्त करें'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclosure Box */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-200">
            {language === 'en' ? 'Official Referral Transparency Disclosure: ' : 'रेफ़रल पारदर्शिता प्रकटीकरण: '}
          </span>
          <span>
            {language === 'en'
              ? 'These referral codes are shared for legitimate community benefit. Using these codes grants you the listed promotional welcome rewards, and Jugaddu.RJ.COM may earn referral reward points at zero extra cost to you.'
              : 'ये कोड्स समुदाय के लाभ के लिए हैं। इनका उपयोग करने पर आपको वेलकम बोनस मिलता है और Jugaddu को बिना किसी अतिरिक्त खर्च के कुछ पॉइंट्स मिल सकते हैं।'}
          </span>
        </div>
      </div>
    </div>
  );
};
