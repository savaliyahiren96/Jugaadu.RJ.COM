import React from 'react';
import { ShieldCheck, Heart, AlertTriangle } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenAffiliateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenAffiliateModal }) => {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#070D1E] text-slate-400 py-8 px-4 text-xs">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Affiliate Disclosure Box */}
        <div className="p-4 rounded-2xl bg-[#0B132B] border border-slate-800 text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-white font-extrabold text-xs">
            <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
            <span>
              {language === 'en'
                ? 'Mandatory Affiliate & Legal Disclosure (FTC & Indian Consumer Guidelines)'
                : 'अनिवार्य एफिलिएट एवं कानूनी प्रकटीकरण'}
            </span>
          </div>
          <p className="leading-relaxed text-[11px] text-slate-400">
            {language === 'en'
              ? 'Jugaddu.RJ.COM is an independent deal intelligence and savings aggregator. Some links on this website (such as "Buy Here" buttons on Amazon, Flipkart, Croma, and referral codes) are affiliate links. If you make a purchase through these links, we may earn a small referral commission at no additional cost to you. This supports our server infrastructure and ongoing offer verification.'
              : 'Jugaddu.RJ.COM एक स्वतंत्र बचत एग्रीगेटर है। इस वेबसाइट पर दिए गए कुछ लिंक्स एफिलिएट लिंक्स हैं। यदि आप इनके माध्यम से खरीदारी करते हैं, तो बिना किसी अतिरिक्त खर्च के हमें छोटा सा कमीशन मिल सकता है।'}
          </p>
          <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
            <span>© 2026 Jugaddu.RJ.COM • Made with ❤️ for Indian smart shoppers</span>
            <button
              onClick={onOpenAffiliateModal}
              className="text-[#FF9933] hover:underline font-bold"
            >
              Configure Affiliate Tags ↗
            </button>
          </div>
        </div>

        {/* 100% Legal Policy */}
        <div className="flex items-start gap-2.5 text-[11px] text-slate-500">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p>
            {language === 'en'
              ? 'Policy: Jugaddu strictly aggregates official, authorized public offers (bank cards, platform vouchers, student portals, and affiliate cashback). We strictly forbid exploits, bug misuse, fake accounts, or payment tricks. Offers, coupons, and prices are subject to retailer stock and may expire without notice. Always verify prices directly on the merchant checkout screen.'
              : 'नीति: जुगतू केवल आधिकारिक और वैध सार्वजनिक छूट (बैंक ऑफर्स, कूपन, स्टूडेंट डिस्काउंट) दिखाता है। हम किसी भी बग या अवैध हैक का समर्थन नहीं करते। हमेशा मर्चेंट की वेबसाइट पर अंतिम कीमत की पुष्टि करें।'}
          </p>
        </div>
      </div>
    </footer>
  );
};
