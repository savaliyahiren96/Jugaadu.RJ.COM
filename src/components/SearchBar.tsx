import React, { useState } from 'react';
import { Search, Link as LinkIcon, Sparkles, ArrowRight, Loader2, Zap } from 'lucide-react';
import { Language } from '../types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  language: Language;
}

const QUICK_CHIPS = [
  { label: 'iPhone 16 128GB', labelHi: 'iPhone 16 128GB', query: 'iPhone 16 128GB' },
  { label: 'Sony WH-1000XM5', labelHi: 'सोनी हेडफोन XM5', query: 'Sony WH-1000XM5' },
  { label: 'Samsung Galaxy S24', labelHi: 'सैमसंग S24', query: 'Samsung Galaxy S24' },
  { label: 'OnePlus 13R', labelHi: 'OnePlus 13R', query: 'OnePlus 13R 5G' },
  { label: 'MacBook Air M3', labelHi: 'मैकबुक एयर M3', query: 'MacBook Air M3' },
  { label: 'Prestige Air Fryer', labelHi: 'एयर फ्रायर', query: 'Air Fryer' },
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, language }) => {
  const [inputVal, setInputVal] = useState('');

  const isLink = inputVal.trim().startsWith('http://') || inputVal.trim().startsWith('https://');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onSearch(inputVal.trim());
  };

  const handleChipClick = (q: string) => {
    setInputVal(q);
    onSearch(q);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputVal(text);
        if (text.startsWith('http')) {
          onSearch(text);
        }
      }
    } catch {
      // fallback if clipboard permission isn't allowed
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-6">
      {/* Catchy Desi Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C2541] border border-amber-500/40 text-amber-400 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FF9933] animate-pulse" />
          <span>
            {language === 'en'
              ? 'AI-Powered Google Grounded Deal Stacker'
              : 'गूगल पावर्ड असली देसी डिस्काउंट स्टैकर'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {language === 'en' ? (
            <>
              Check this <span className="text-[#FF9933] underline decoration-amber-500/50">BEFORE</span> you buy!
            </>
          ) : (
            <>
              ऑनलाइन कुछ भी खरीदने से <span className="text-[#FF9933]">पहले</span> यहाँ चेक करें!
            </>
          )}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg mx-auto">
          {language === 'en'
            ? 'We stack lowest price + card offers + hidden coupons + cashback + gift cards for maximum legal savings.'
            : 'हम सबसे कम कीमत + बैंक कार्ड + गुप्त कूपन + कैशबैक + गिफ्ट वाउचर को जोड़कर असली छूट निकालते हैं।'}
        </p>
      </div>

      {/* Main Search Bar Box */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center bg-[#1C2541] border-2 border-slate-700 focus-within:border-[#FF9933] rounded-2xl shadow-2xl transition-all p-1.5">
          <div className="pl-3 pr-2 text-slate-400">
            {isLink ? (
              <LinkIcon className="w-5 h-5 text-emerald-400 animate-bounce" />
            ) : (
              <Search className="w-5 h-5 text-[#FF9933]" />
            )}
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Type product name or paste Amazon / Flipkart / Croma link...'
                : 'सामान का नाम लिखें या अमेज़न / फ्लिपकार्ट लिंक पेस्ट करें...'
            }
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base px-2 py-2.5 focus:outline-none font-medium"
          />

          {/* Quick paste button if empty */}
          {!inputVal && (
            <button
              type="button"
              onClick={handlePasteClipboard}
              className="hidden sm:flex items-center gap-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg mr-1.5 transition-colors"
            >
              <LinkIcon className="w-3 h-3 text-amber-400" />
              <span>{language === 'en' ? 'Paste Link' : 'लिंक पेस्ट'}</span>
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#FF9933] to-amber-500 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 text-slate-950 font-black px-4 sm:px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">
                  {language === 'en' ? 'Stacking...' : 'खोज रहे हैं...'}
                </span>
              </>
            ) : (
              <>
                <span>{language === 'en' ? 'Stack Deal' : 'जुगाड़ लगाएं'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Link detected indicator */}
        {isLink && (
          <div className="absolute -bottom-5 left-3 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>
              {language === 'en'
                ? 'Product link detected! Extracting full discount stack...'
                : 'प्रोडक्ट लिंक पहचाना गया! सभी ऑफर्स स्टैक हो रहे हैं...'}
            </span>
          </div>
        )}
      </form>

      {/* Popular Desi Quick Search Chips */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 justify-center">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
          {language === 'en' ? 'Popular Jugaad:' : 'लोकप्रिय खोजें:'}
        </span>
        {QUICK_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(chip.query)}
            className="text-xs bg-[#1C2541]/80 hover:bg-[#FF9933]/20 hover:border-[#FF9933]/50 border border-slate-700 text-slate-200 hover:text-[#FF9933] px-2.5 py-1 rounded-full font-medium transition-all"
          >
            {language === 'en' ? chip.label : chip.labelHi}
          </button>
        ))}
      </div>
    </div>
  );
};
