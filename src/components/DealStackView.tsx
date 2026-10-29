import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Calendar,
  CreditCard,
  Tag,
  Gift,
  Scale,
  Sparkles,
  TrendingDown,
  Bookmark,
  BookmarkCheck,
  Bell,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
} from 'lucide-react';
import { DealStackResult, Language, AffiliateConfig } from '../types';
import { buildAffiliateUrl } from '../services/storageService';

interface DealStackViewProps {
  deal: DealStackResult;
  language: Language;
  affiliateConfig: AffiliateConfig;
  isSaved: boolean;
  onToggleSave: () => void;
  onAddToWatchlist: () => void;
  onMarkPurchased: (savingsAmount: number) => void;
}

export const DealStackView: React.FC<DealStackViewProps> = ({
  deal,
  language,
  affiliateConfig,
  isSaved,
  onToggleSave,
  onAddToWatchlist,
  onMarkPurchased,
}) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const handleMarkAsBought = () => {
    onMarkPurchased(deal.totalSavings);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3500);
  };

  const handleShare = async () => {
    const text = `Check this deal on Jugaddu! ${deal.productTitle} - MRP ₹${deal.mrp.toLocaleString('en-IN')}, Stacked to ₹${deal.finalStackedPrice.toLocaleString('en-IN')}!`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Jugaddu Deal Stack',
          text,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  const getVerdictColor = (verdict?: string) => {
    switch (verdict) {
      case 'WAIT':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'BUY_NOW':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 pb-12 space-y-6">
      {/* Toast notifications */}
      {shareToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#FF9933] text-slate-950 px-4 py-2 rounded-xl font-bold shadow-xl flex items-center gap-2 text-xs animate-bounce">
          <Check className="w-4 h-4" />
          <span>{language === 'en' ? 'Link copied to clipboard!' : 'लिंक कॉपी हो गया!'}</span>
        </div>
      )}

      {showCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
          <div className="bg-gradient-to-r from-amber-500 via-[#FF9933] to-orange-500 text-slate-950 p-6 rounded-2xl shadow-2xl border-4 border-white flex flex-col items-center text-center animate-bounce pointer-events-auto">
            <span className="text-4xl mb-1">🎉 🇮🇳 💰</span>
            <div className="text-xl font-black">
              {language === 'en' ? 'CONGRATULATIONS!' : 'बधाई हो! असली बचत!'}
            </div>
            <div className="text-sm font-extrabold mt-1">
              {language === 'en'
                ? `You just saved ₹${deal.totalSavings.toLocaleString('en-IN')}!`
                : `आपने अभी ₹${deal.totalSavings.toLocaleString('en-IN')} की बचत की!`}
            </div>
            <div className="text-xs font-semibold mt-1 opacity-90">
              {language === 'en' ? 'Added to your lifetime savings counter.' : 'आपके कुल बचत खाते में जोड़ दिया गया।'}
            </div>
          </div>
        </div>
      )}

      {/* Main Product Info & Top Action Bar */}
      <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9933]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {deal.category}
            </span>
            <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Legal Jugaad</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Verified: {deal.timestamp}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Share Deal"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {/* Watchlist */}
            <button
              onClick={onAddToWatchlist}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              title="Track Price Drop"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{language === 'en' ? 'Watchlist' : 'वॉचलिस्ट'}</span>
            </button>
            {/* Bookmark */}
            <button
              onClick={onToggleSave}
              className={`p-2 rounded-xl transition-colors ${
                isSaved ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              title="Save Deal"
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
          {deal.productTitle}
        </h2>

        {/* 8. The Big "You Save ₹X" Hero Badge & Stacked Price Summary */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-[#FF9933]/20 to-orange-500/20 border-2 border-[#FF9933] shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#FF9933] text-slate-950 flex flex-col items-center justify-center font-black shadow-lg">
              <span className="text-xs uppercase font-extrabold tracking-tight">SAVE</span>
              <span className="text-lg sm:text-xl -mt-1">{deal.savingsPercentage}%</span>
            </div>

            <div>
              <div className="flex items-baseline gap-2 flex-wrap justify-center sm:justify-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {language === 'en' ? 'Final Stacked Price:' : 'अंतिम स्टैक्ड कीमत:'}
                </span>
                <span className="text-2xl sm:text-4xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  ₹{deal.finalStackedPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  MRP ₹{deal.mrp.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2 justify-center sm:justify-start text-xs font-bold text-emerald-400">
                <Sparkles className="w-4 h-4 text-[#FF9933]" />
                <span>
                  {language === 'en'
                    ? `You Save Flat ₹${deal.totalSavings.toLocaleString('en-IN')} with this Stack!`
                    : `इस जुगाड़ से आपकी सीधी बचत: ₹${deal.totalSavings.toLocaleString('en-IN')}!`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleMarkAsBought}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'en' ? 'I Bought This (Add to Savings)' : 'मैंने खरीदा (बचत जोड़ें)'}</span>
            </button>
          </div>
        </div>

        {/* Verdict Callout */}
        <div className="mt-3 text-xs bg-slate-900/60 rounded-xl p-3 border border-slate-800 text-slate-200 flex items-start gap-2">
          <span className="text-base">💡</span>
          <div>
            <span className="font-extrabold text-[#FF9933]">
              {language === 'en' ? 'Jugaad Verdict: ' : 'जुगाड़ निष्कर्ष: '}
            </span>
            <span>{deal.verdictText}</span>
          </div>
        </div>
      </div>

      {/* 1. Price Comparison Across Platforms */}
      <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {language === 'en'
                ? 'Store Price Comparison & "Buy Here"'
                : 'स्टोर कीमत तुलना और "यहाँ से खरीदें"'}
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {language === 'en' ? 'Affiliate Partner Links' : 'एफिलिएट पार्टनर लिंक्स'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {deal.platforms.map((plat, idx) => {
            const affUrl = buildAffiliateUrl(plat.url, plat.platform, affiliateConfig);
            const isBest = plat.platform === deal.bestPlatform;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isBest
                    ? 'bg-[#FF9933]/10 border-[#FF9933] shadow-md'
                    : 'bg-slate-900/70 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-base text-white flex items-center gap-1.5">
                      {plat.platform}
                      {isBest && (
                        <span className="text-[10px] bg-[#FF9933] text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                          {language === 'en' ? 'Cheapest' : 'सबसे सस्ता'}
                        </span>
                      )}
                    </span>
                    <span className="text-lg font-black text-white">
                      ₹{plat.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                    <span>{plat.deliveryDays}</span>
                    {plat.sellerRating && (
                      <span className="text-amber-400 font-medium">{plat.sellerRating}</span>
                    )}
                  </div>

                  {plat.specialNote && (
                    <p className="text-[11px] text-slate-300 mt-1 italic">
                      {plat.specialNote}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {plat.inStock ? '🟢 In Stock' : '🔴 Limited'}
                  </span>

                  <a
                    href={affUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all shadow-sm ${
                      isBest
                        ? 'bg-[#FF9933] hover:bg-amber-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{language === 'en' ? 'Buy Here' : 'यहाँ से खरीदें'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Best Bank & Credit Card Offers */}
      <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{language === 'en' ? 'Best Bank & Card Offers' : 'सर्वश्रेष्ठ बैंक और कार्ड ऑफर्स'}</span>
                <CreditCard className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'en'
                  ? 'Instant discounts applied directly at checkout gateway'
                  : 'चेकआउट पेमेंट पेज पर सीधे मिलने वाली छूट'}
              </p>
            </div>
          </div>
          {deal.bestBankSaving > 0 && (
            <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Save up to ₹{deal.bestBankSaving.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <div className="space-y-2.5">
          {deal.bankOffers.length > 0 ? (
            deal.bankOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">{offer.bankName}</span>
                    <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                      {offer.cardType}
                    </span>
                    {offer.expiryDate && (
                      <span className="text-[10px] text-amber-400 font-medium">
                        ⏱ {offer.expiryDate}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">{offer.description}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Conditions: {offer.conditions}
                  </p>
                </div>

                <div className="text-right self-end sm:self-center shrink-0">
                  <div className="text-sm font-black text-emerald-400">
                    -₹{offer.discountAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400">Min: ₹{offer.minPurchase}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic">
              {language === 'en' ? 'No platform-exclusive bank card discount active right now.' : 'वर्तमान में कोई अतिरिक्त बैंक डिस्काउंट सक्रिय नहीं है।'}
            </p>
          )}
        </div>
      </div>

      {/* 3. Working Coupon Codes */}
      <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{language === 'en' ? 'Working Coupon Codes' : 'कार्यरत कूपन कोड्स'}</span>
                <Tag className="w-4 h-4 text-purple-400" />
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? '1-Click copy & apply in cart' : 'एक क्लिक में कॉपी करें और कार्ट में लगाएं'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {deal.coupons.length > 0 ? (
            deal.coupons.map((coupon) => {
              const isCopied = copiedCodeId === coupon.id;
              return (
                <div
                  key={coupon.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/70 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-[#FF9933] bg-slate-800 px-2 py-0.5 rounded border border-[#FF9933]/30">
                        {coupon.code}
                      </span>
                      <span className="text-[10px] font-bold text-slate-300">
                        {coupon.platform}
                      </span>
                    </div>
                    <div className="text-xs text-slate-200 font-semibold mt-1">
                      {coupon.discountText}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {coupon.conditions}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyCode(coupon.id, coupon.code)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      isCopied
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Copied' : 'कॉपी हो गया'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Copy' : 'कॉपी'}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-400 italic">
              {language === 'en' ? 'No manual coupon required; discounts auto-applied at checkout.' : 'कोई मैनुअल कूपन आवश्यक नहीं है; छूट सीधे मिलती है।'}
            </p>
          )}
        </div>
      </div>

      {/* 4. Cashback Portal Options */}
      <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {language === 'en' ? 'Cashback Portals (CashKaro / CRED)' : 'कैशबैक पोर्टल्स (कैशकरो / CRED)'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'en'
                  ? 'Real money transferred directly to your bank account'
                  : 'सीधे बैंक खाते में ट्रांसफर होने वाला असली कैशबैक'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {deal.cashbacks.map((cb) => (
            <div
              key={cb.id}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-white">{cb.name}</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">
                    {cb.payoutTime}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{cb.cashbackText}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{cb.conditions}</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-sm font-black text-amber-400">
                  +₹{cb.estimatedReturn.toLocaleString('en-IN')}
                </span>
                <a
                  href={cb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1"
                >
                  <span>{language === 'en' ? 'Activate' : 'सक्रिय करें'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Gift Card & Voucher Discounts */}
      {deal.giftCards && deal.giftCards.length > 0 && (
        <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
              5
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{language === 'en' ? 'Gift Voucher Stacking (Gyftr / Woohoo)' : 'गिफ्ट वाउचर स्टैकिंग (Gyftr / Woohoo)'}</span>
                <Gift className="w-4 h-4 text-rose-400" />
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'en'
                  ? 'Buy discounted e-gift cards before paying on Amazon/Flipkart'
                  : 'अमेज़न/फ्लिपकार्ट पर पेमेंट करने से पहले डिस्काउंटेड गिफ्ट वाउचर खरीदें'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {deal.giftCards.map((gc) => (
              <div
                key={gc.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">{gc.provider}</span>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-1.5 py-0.5 rounded">
                      {gc.voucherFor}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{gc.method}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-rose-400">
                    Save ~{gc.discountPercent}% (₹{gc.savingsAmount})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Price-Match / Price-Adjustment Policies */}
      {deal.priceMatch && deal.priceMatch.length > 0 && (
        <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
              6
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{language === 'en' ? 'Offline Price-Match Policy' : 'ऑफलाइन स्टोर प्राइस-मैच गारंटी'}</span>
                <Scale className="w-4 h-4 text-teal-400" />
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'en'
                  ? 'Walk into retail store & get the online price on the spot'
                  : 'दुकान में जाकर ऑनलाइन दाम दिखाकर तुरंत हाथ में सामान पाएं'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {deal.priceMatch.map((pm, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs space-y-1"
              >
                <div className="font-bold text-teal-300">{pm.platform}</div>
                <div className="text-slate-300">{pm.policySummary}</div>
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">How to claim: </span>
                  {pm.howToClaim}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Upcoming Sales (Festival / Seasonal) & Whether to Wait */}
      <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
              7
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{language === 'en' ? 'Upcoming Festival Sales & Verdict' : 'आने वाली सेल्स और हमारा सुझाव'}</span>
                <Calendar className="w-4 h-4 text-orange-400" />
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Should you wait for Diwali / Big Billion Days?' : 'क्या सेल का इंतज़ार करना चाहिए?'}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getVerdictColor(
              deal.upcomingSale?.verdict
            )}`}
          >
            {deal.upcomingSale?.verdict === 'WAIT'
              ? language === 'en'
                ? '⏳ WAIT FOR SALE'
                : '⏳ सेल का इंतज़ार करें'
              : language === 'en'
              ? '⚡ BUY NOW (GREAT PRICE)'
              : '⚡ अभी खरीदें (बेहतरीन दाम)'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span className="font-extrabold text-sm text-white">
              {deal.upcomingSale?.saleName}
            </span>
            <span className="text-xs text-amber-400 font-semibold">
              📅 {deal.upcomingSale?.expectedDate}
            </span>
          </div>

          <p className="text-xs text-slate-300">
            <span className="font-bold text-slate-200">Expected Discount: </span>
            {deal.upcomingSale?.expectedDiscount}
          </p>

          <p className="text-xs text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
            <span className="font-extrabold text-[#FF9933]">
              {language === 'en' ? 'Verdict Analysis: ' : 'विश्लेषण: '}
            </span>
            {deal.upcomingSale?.verdictReason}
          </p>
        </div>
      </div>

      {/* Grounding Sources (Google Search Transparency) */}
      {deal.groundingSources && deal.groundingSources.length > 0 && (
        <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400">
          <div className="font-bold text-slate-300 mb-1 flex items-center gap-1">
            <span>🌐 {language === 'en' ? 'Live Grounding Sources:' : 'लाइव डेटा स्रोत:'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {deal.groundingSources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/80 hover:text-amber-300 hover:underline truncate max-w-xs"
              >
                {source.title || source.url}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
