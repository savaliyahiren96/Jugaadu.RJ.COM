import React, { useState } from 'react';
import {
  ThumbsUp,
  CheckCircle,
  XCircle,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  Search,
  Filter,
  Check,
} from 'lucide-react';
import { JugaadTip, Language } from '../types';

interface TipsFeedProps {
  tips: JugaadTip[];
  language: Language;
  onUpdateTips: (updated: JugaadTip[]) => void;
}

export const TipsFeed: React.FC<TipsFeedProps> = ({ tips, language, onUpdateTips }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<JugaadTip['category']>('bank');
  const [newTag, setNewTag] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleUpvote = (id: string) => {
    const next = tips.map((tip) => {
      if (tip.id === id) {
        const isUp = tip.userVote === 'up';
        return {
          ...tip,
          upvotes: isUp ? tip.upvotes - 1 : tip.upvotes + 1,
          userVote: isUp ? undefined : ('up' as const),
        };
      }
      return tip;
    });
    onUpdateTips(next);
  };

  const handleFeedback = (id: string, feedback: 'worked' | 'didnt_work') => {
    const next = tips.map((tip) => {
      if (tip.id === id) {
        if (tip.userFeedback === feedback) {
          return tip; // already voted
        }
        return {
          ...tip,
          workedCount: feedback === 'worked' ? tip.workedCount + 1 : tip.workedCount,
          didntWorkCount: feedback === 'didnt_work' ? tip.didntWorkCount + 1 : tip.didntWorkCount,
          userFeedback: feedback,
        };
      }
      return tip;
    });
    onUpdateTips(next);
    showToast(feedback === 'worked' ? 'Marked as Worked! 🎉' : 'Feedback recorded');
  };

  const handleAddTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const created: JugaadTip = {
      id: 'tip-usr-' + Date.now(),
      title: newTitle.trim(),
      description: newDesc.trim(),
      category: newCat,
      upvotes: 1,
      workedCount: 1,
      didntWorkCount: 0,
      userVote: 'up',
      author: 'You (Community Contributor)',
      verified: true,
      tag: newTag.trim() || 'Verified Jugaad',
      dateAdded: 'Just now',
    };

    onUpdateTips([created, ...tips]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewTag('');
    showToast('Your Jugaad tip is published! 🚀');
  };

  const filtered = tips.filter((t) => {
    const matchCat = selectedCat === 'all' || t.category === selectedCat;
    const matchQuery =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.titleHi && t.titleHi.includes(searchQuery));
    return matchCat && matchQuery;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-5">
      {toastMsg && (
        <div className="fixed top-20 right-4 z-50 bg-[#FF9933] text-slate-950 px-4 py-2 rounded-xl font-bold shadow-xl flex items-center gap-2 text-xs">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header & Submit Tip Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Community Hacks' : 'देसी बचत जुगाड़'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'en' ? 'Top Indian Shopping Jugaad Tips' : 'टॉप भारतीय शॉपिंग जुगाड़ टिप्स'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Crowdsourced, 100% legal shopping hacks tested by fellow Indian bargain hunters.'
              : 'साथी भारतीय खरीदारों द्वारा परखे गए 100% वैध बचत के तरीके।'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto flex items-center gap-1.5 bg-[#FF9933] hover:bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition-all shadow-md active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === 'en' ? 'Share a Jugaad' : 'जुगाड़ शेयर करें'}</span>
        </button>
      </div>

      {/* Search & Categories Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'en' ? 'Search hacks (e.g. Croma, GST, Unidays, SBI)...' : 'हैक खोजें (जैसे Croma, GST, Unidays)...'}
            className="w-full bg-[#1C2541] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All', labelHi: 'सब' },
            { id: 'bank', label: 'Bank Cards', labelHi: 'बैंक कार्ड' },
            { id: 'voucher', label: 'Vouchers', labelHi: 'वाउचर' },
            { id: 'cart', label: 'Cart Hacks', labelHi: 'कार्ट हैक' },
            { id: 'student', label: 'Student', labelHi: 'छात्र' },
            { id: 'gst', label: 'GST Credit', labelHi: 'GST इनपुट' },
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
      </div>

      {/* Tips List */}
      <div className="space-y-3.5">
        {filtered.map((tip) => {
          const displayTitle = language === 'hi' && tip.titleHi ? tip.titleHi : tip.title;
          const displayDesc = language === 'hi' && tip.descriptionHi ? tip.descriptionHi : tip.description;

          return (
            <div
              key={tip.id}
              className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/30">
                    {tip.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    by {tip.author} • {tip.dateAdded}
                  </span>
                </div>

                {tip.verified && (
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white leading-snug">
                  {displayTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {displayDesc}
                </p>
              </div>

              {/* Action Bar (Upvote + Worked/Didn't Work) */}
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between flex-wrap gap-2">
                {/* Upvote button */}
                <button
                  onClick={() => handleUpvote(tip.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    tip.userVote === 'up'
                      ? 'bg-[#FF9933] text-slate-950 shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Upvote ({tip.upvotes})</span>
                </button>

                {/* Worked / Didn't Work Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    {language === 'en' ? 'Did it work for you?' : 'क्या इसने काम किया?'}
                  </span>

                  <button
                    onClick={() => handleFeedback(tip.id, 'worked')}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      tip.userFeedback === 'worked'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Worked ({tip.workedCount})</span>
                  </button>

                  <button
                    onClick={() => handleFeedback(tip.id, 'didnt_work')}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      tip.userFeedback === 'didnt_work'
                        ? 'bg-rose-500 text-white'
                        : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Didn’t Work ({tip.didntWorkCount})</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Tip Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C2541] border border-slate-700 rounded-2xl max-w-lg w-full p-5 shadow-2xl relative">
            <h3 className="text-lg font-black text-white mb-1">
              {language === 'en' ? 'Share Your Shopping Jugaad' : 'अपना शॉपिंग जुगाड़ शेयर करें'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Help fellow Indian shoppers save big. Only 100% legal, terms-compliant hacks allowed.
            </p>

            <form onSubmit={handleAddTip} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 5% extra cashback trick on Amazon via Gift Voucher"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933]"
                >
                  <option value="bank">Bank Cards & EMI</option>
                  <option value="voucher">Gift Cards & Vouchers</option>
                  <option value="cart">Cart & App Hacks</option>
                  <option value="student">Student Discounts</option>
                  <option value="gst">GST Input Credit</option>
                  <option value="general">General Jugaad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Short Tag / Badge</label>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="e.g. Save ₹1000 or 5% Cashback"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">How it works (step-by-step)</label>
                <textarea
                  required
                  rows={4}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain clearly which card, app, or portal to open and what terms apply..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black bg-[#FF9933] hover:bg-amber-500 text-slate-950 uppercase tracking-wide"
                >
                  Publish Jugaad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
