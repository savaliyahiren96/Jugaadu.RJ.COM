import React, { useState } from 'react';
import { Bell, BellRing, Plus, Trash2, ArrowDownRight, Sparkles, Check, ExternalLink } from 'lucide-react';
import { WatchlistItem, Language, DealStackResult } from '../types';

interface WatchlistViewProps {
  watchlist: WatchlistItem[];
  language: Language;
  onRemoveItem: (id: string) => void;
  onAddItem: (item: WatchlistItem) => void;
  onSimulatePriceDrop: (id: string) => void;
  onSelectDeal?: (deal: DealStackResult) => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  watchlist,
  language,
  onRemoveItem,
  onAddItem,
  onSimulatePriceDrop,
  onSelectDeal,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTarget) return;

    const item: WatchlistItem = {
      id: 'wl-' + Date.now(),
      productTitle: newTitle.trim(),
      category: 'Tracked Product',
      currentLowestPrice: Math.round(Number(newTarget) * 1.15),
      bestPlatform: 'Flipkart',
      targetPrice: Number(newTarget),
      dateAdded: 'Just now',
      hasDropped: false,
    };

    onAddItem(item);
    setShowAddForm(false);
    setNewTitle('');
    setNewTarget('');
    showToast('Added to Price Drop Watchlist! 🎯');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-5">
      {toastMsg && (
        <div className="fixed top-20 right-4 z-50 bg-[#FF9933] text-slate-950 px-4 py-2 rounded-xl font-bold shadow-xl flex items-center gap-2 text-xs">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Smart Price Alerts' : 'प्राइस ड्रॉप अलर्ट्स'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'en' ? 'Price Drop Watchlist' : 'प्राइस ड्रॉप वॉचलिस्ट'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Set your target buying price. When festival sales or card discounts hit your target, grab it!'
              : 'अपना मनपसंद टारगेट प्राइस सेट करें। जैसे ही कीमत गिरे, तुरंत खरीदें।'}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="self-start sm:self-auto flex items-center gap-1.5 bg-[#FF9933] hover:bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Add Item' : 'सामान जोड़ें'}</span>
        </button>
      </div>

      {/* Add Item Drawer/Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubmit}
          className="bg-[#1C2541] border border-amber-500/50 rounded-2xl p-4 shadow-xl space-y-3"
        >
          <h3 className="text-sm font-black text-white">
            {language === 'en' ? 'Track a New Product' : 'नया सामान ट्रैक करें'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Product Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Sony PS5 Slim or Dyson V12"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Target Alert Price (₹)</label>
              <input
                type="number"
                required
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="e.g. 44990"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#FF9933] text-slate-950 text-xs font-black rounded-xl uppercase"
            >
              Start Tracking
            </button>
          </div>
        </form>
      )}

      {/* Watchlist Cards */}
      <div className="space-y-3">
        {watchlist.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              item.hasDropped
                ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-500/5'
                : 'bg-[#1C2541] border-slate-700/80'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {item.category}
                </span>
                {item.hasDropped ? (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 flex items-center gap-1 animate-pulse">
                    <BellRing className="w-3 h-3" />
                    <span>TARGET HIT! PRICE DROPPED</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">
                    Added: {item.dateAdded}
                  </span>
                )}
              </div>

              <h3 className="text-base font-extrabold text-white">
                {item.productTitle}
              </h3>

              <div className="mt-2 flex items-center gap-4 text-xs flex-wrap">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Current Lowest:
                  </span>
                  <span className="text-base font-black text-white">
                    ₹{item.currentLowestPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    on {item.bestPlatform}
                  </span>
                </div>

                <div className="border-l border-slate-700 pl-4">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Target Alert Price:
                  </span>
                  <span className="text-base font-black text-amber-400">
                    ₹{item.targetPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {/* Simulate Drop Demo Button */}
              <button
                onClick={() => onSimulatePriceDrop(item.id)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                title="Test how price drop alert looks"
              >
                Simulate Drop ⚡
              </button>

              {item.dealStack && onSelectDeal && (
                <button
                  onClick={() => onSelectDeal(item.dealStack!)}
                  className="px-3 py-1.5 rounded-xl bg-[#FF9933] hover:bg-amber-500 text-slate-950 text-xs font-black uppercase transition-colors"
                >
                  View Deals
                </button>
              )}

              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                title="Remove from Watchlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
