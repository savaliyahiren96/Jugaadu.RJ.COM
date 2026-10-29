import React from 'react';
import { IndianRupee, Trash2, ArrowRight, ExternalLink, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import { DealStackResult, Language, AffiliateConfig } from '../types';
import { buildAffiliateUrl } from '../services/storageService';

interface SavedDealsViewProps {
  savedDeals: DealStackResult[];
  totalSaved: number;
  language: Language;
  affiliateConfig: AffiliateConfig;
  onSelectDeal: (deal: DealStackResult) => void;
  onRemoveDeal: (deal: DealStackResult) => void;
  onAddManualSaving: (amount: number) => void;
}

export const SavedDealsView: React.FC<SavedDealsViewProps> = ({
  savedDeals,
  totalSaved,
  language,
  affiliateConfig,
  onSelectDeal,
  onRemoveDeal,
  onAddManualSaving,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-6">
      {/* Hero Stats Card */}
      <div className="bg-gradient-to-br from-[#1C2541] via-[#1C2541] to-slate-900 border-2 border-[#FF9933]/60 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF9933]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF9933]/20 text-[#FF9933] text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Lifetime Savings Tracker' : 'आजीवन कुल बचत ट्रैकर'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {language === 'en' ? 'Your Personal Jugaad Bank' : 'आपका देसी जुगाड़ बैंक'}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {language === 'en'
                ? 'Total hard-earned money saved by checking Jugaddu before purchasing.'
                : 'खरीदने से पहले जुगाड़ चेक करके आपके द्वारा बचाए गए असली पैसे।'}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-amber-500/40 p-4 rounded-2xl flex items-center gap-3 shadow-inner">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF9933] to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg">
              ₹
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {language === 'en' ? 'Total Saved' : 'कुल बचत'}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-['Plus_Jakarta_Sans',sans-serif]">
                ₹{totalSaved.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Quick simulation buttons */}
        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="text-slate-400 font-medium">
            {language === 'en' ? 'Quick Add Savings from offline or recent orders:' : 'हाल ही में की गई बचत जोड़ें:'}
          </span>
          <div className="flex items-center gap-1.5">
            {[500, 1500, 5000].map((amt) => (
              <button
                key={amt}
                onClick={() => onAddManualSaving(amt)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-[#FF9933] hover:text-slate-950 text-slate-200 rounded-lg text-xs font-bold transition-all"
              >
                +₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Deals List */}
      <div className="space-y-3">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <span>{language === 'en' ? 'Saved Deal Stacks' : 'सेव की हुई डील्स'}</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
            {savedDeals.length}
          </span>
        </h3>

        {savedDeals.length > 0 ? (
          savedDeals.map((deal) => {
            const bestStore = deal.platforms.find((p) => p.platform === deal.bestPlatform) || deal.platforms[0];
            const affUrl = bestStore ? buildAffiliateUrl(bestStore.url, bestStore.platform, affiliateConfig) : '#';

            return (
              <div
                key={deal.id}
                className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-600 transition-all"
              >
                <div className="flex-1 cursor-pointer" onClick={() => onSelectDeal(deal)}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {deal.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Save ₹{deal.totalSavings.toLocaleString('en-IN')} ({deal.savingsPercentage}%)
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-white hover:text-[#FF9933] transition-colors">
                    {deal.productTitle}
                  </h4>

                  <div className="mt-1 flex items-baseline gap-2 text-xs">
                    <span className="text-slate-400">Stacked Price:</span>
                    <span className="text-base font-black text-white">
                      ₹{deal.finalStackedPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-slate-400 line-through text-[11px]">
                      ₹{deal.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-amber-400 font-bold ml-1">
                      on {deal.bestPlatform}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => onSelectDeal(deal)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>View Stack</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={affUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#FF9933] hover:bg-amber-500 text-slate-950 text-xs font-black uppercase flex items-center gap-1 transition-colors shadow-sm"
                  >
                    <span>Buy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onRemoveDeal(deal)}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove from Saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-[#1C2541]/50 border border-dashed border-slate-700 rounded-2xl p-8 text-center text-slate-400">
            <p className="text-sm font-bold text-slate-300">
              {language === 'en' ? 'No deals saved yet!' : 'अभी कोई डील सेव नहीं है!'}
            </p>
            <p className="text-xs mt-1">
              {language === 'en'
                ? 'Search any product on the Deal Stack tab and tap the bookmark icon to save it here.'
                : 'डील स्टैक पर कोई भी सामान खोजें और उसे यहाँ सेव करने के लिए बुकमार्क दबाएं।'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
