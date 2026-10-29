import React, { useState } from 'react';
import { X, Check, Key, ShieldCheck, DollarSign, Info } from 'lucide-react';
import { AffiliateConfig, Language } from '../types';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AffiliateConfig;
  onSave: (config: AffiliateConfig) => void;
  language: Language;
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  language,
}) => {
  const [amazonTag, setAmazonTag] = useState(config.amazonTag);
  const [flipkartAffId, setFlipkartAffId] = useState(config.flipkartAffId);
  const [cromaTag, setCromaTag] = useState(config.cromaTag);
  const [cashkaroReferral, setCashkaroReferral] = useState(config.cashkaroReferral);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      amazonTag: amazonTag.trim(),
      flipkartAffId: flipkartAffId.trim(),
      cromaTag: cromaTag.trim(),
      cashkaroReferral: cashkaroReferral.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1C2541] border border-slate-700 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#FF9933]/20 text-[#FF9933] flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-white">
            {language === 'en' ? 'Money Model & Affiliate Tags' : 'मनी मॉडल और एफिलिएट आईडी'}
          </h3>
        </div>

        <p className="text-xs text-slate-300 mb-4">
          {language === 'en'
            ? 'Swap in your own affiliate partner IDs below. All "Buy Here" buttons across the deal stack will automatically use these parameters.'
            : 'यहाँ अपनी स्वयं की एफिलिएट आईडी डालें। सभी "यहाँ से खरीदें" बटन आपके टैग के साथ खुलेंगे।'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Amazon Associates Store Tag
            </label>
            <input
              type="text"
              value={amazonTag}
              onChange={(e) => setAmazonTag(e.target.value)}
              placeholder="e.g. jugaddu-21"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933] font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Injected into Amazon product URLs as <code className="text-amber-400">?tag=...</code>
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Flipkart Affiliate ID
            </label>
            <input
              type="text"
              value={flipkartAffId}
              onChange={(e) => setFlipkartAffId(e.target.value)}
              placeholder="e.g. jugaddu_rf"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933] font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Injected into Flipkart product URLs as <code className="text-amber-400">?affid=...</code>
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Croma / Tata Neu Campaign Tag
            </label>
            <input
              type="text"
              value={cromaTag}
              onChange={(e) => setCromaTag(e.target.value)}
              placeholder="e.g. croma_jugaddu"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              CashKaro / EarnKaro Referral Code
            </label>
            <input
              type="text"
              value={cashkaroReferral}
              onChange={(e) => setCashkaroReferral(e.target.value)}
              placeholder="e.g. JUGADDUCK"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9933] font-mono"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
            <span>
              {language === 'en'
                ? 'Your affiliate parameters are securely saved in your browser localStorage and injected client-side into product destination links.'
                : 'आपकी एफिलिएट सेटिंग्स आपके ब्राउज़र लोकल स्टोरेज में सुरक्षित रहती हैं।'}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black bg-[#FF9933] hover:bg-amber-500 text-slate-950 uppercase tracking-wide flex items-center gap-1.5 shadow-md"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Affiliate IDs</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
