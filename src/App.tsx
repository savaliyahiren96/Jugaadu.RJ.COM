/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { DealStackView } from './components/DealStackView';
import { TipsFeed } from './components/TipsFeed';
import { ReferralCorner } from './components/ReferralCorner';
import { SavedDealsView } from './components/SavedDealsView';
import { WatchlistView } from './components/WatchlistView';
import { SponsoredSlot } from './components/SponsoredSlot';
import { AffiliateModal } from './components/AffiliateModal';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { DealStackResult, Language, AffiliateConfig, WatchlistItem, JugaadTip } from './types';
import { SAMPLE_DEAL_STACKS } from './data/mockDeals';
import {
  getStoredAffiliateConfig,
  saveAffiliateConfig,
  getStoredTotalSaved,
  addToTotalSaved,
  getStoredSavedDeals,
  toggleSaveDeal,
  getStoredWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getStoredTips,
  saveTips,
} from './services/storageService';
import { fetchDealStack } from './services/dealService';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('jugaddu_language_v1');
      if (saved === 'hi' || saved === 'en') return saved;
    } catch {}
    return 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('deal-finder');
  const [currentDeal, setCurrentDeal] = useState<DealStackResult>(SAMPLE_DEAL_STACKS['iphone 16']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [totalSaved, setTotalSaved] = useState<number>(getStoredTotalSaved);
  const [savedDeals, setSavedDeals] = useState<DealStackResult[]>(getStoredSavedDeals);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(getStoredWatchlist);
  const [tips, setTips] = useState<JugaadTip[]>(getStoredTips);
  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>(getStoredAffiliateConfig);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('jugaddu_language_v1', language);
    } catch {}
  }, [language]);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setActiveTab('deal-finder');
    try {
      const result = await fetchDealStack(query);
      setCurrentDeal(result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Could not find deals. Please try another query.');
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentDealSaved = savedDeals.some(
    (d) => d.id === currentDeal.id || d.productTitle.toLowerCase() === currentDeal.productTitle.toLowerCase()
  );

  const handleToggleSaveCurrent = () => {
    const res = toggleSaveDeal(currentDeal);
    setSavedDeals(res.list);
  };

  const handleAddToWatchlist = () => {
    const item: WatchlistItem = {
      id: 'wl-' + Date.now(),
      productTitle: currentDeal.productTitle,
      category: currentDeal.category,
      currentLowestPrice: currentDeal.lowestBasePrice,
      bestPlatform: currentDeal.bestPlatform,
      targetPrice: Math.round(currentDeal.finalStackedPrice * 0.95),
      dateAdded: 'Just now',
      hasDropped: false,
      dealStack: currentDeal,
    };
    const next = addToWatchlist(item);
    setWatchlist(next);
    setActiveTab('watchlist');
  };

  const handleMarkPurchased = (amount: number) => {
    const nextSaved = addToTotalSaved(amount);
    setTotalSaved(nextSaved);
  };

  const handleAddManualSaving = (amount: number) => {
    const nextSaved = addToTotalSaved(amount);
    setTotalSaved(nextSaved);
  };

  const handleRemoveSavedDeal = (deal: DealStackResult) => {
    const res = toggleSaveDeal(deal);
    setSavedDeals(res.list);
  };

  const handleRemoveWatchlistItem = (id: string) => {
    const next = removeFromWatchlist(id);
    setWatchlist(next);
  };

  const handleAddWatchlistItem = (item: WatchlistItem) => {
    const next = addToWatchlist(item);
    setWatchlist(next);
  };

  const handleSimulatePriceDrop = (id: string) => {
    const next = watchlist.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          currentLowestPrice: Math.round(w.targetPrice * 0.98),
          hasDropped: true,
        };
      }
      return w;
    });
    setWatchlist(next);
    try {
      localStorage.setItem('jugaddu_watchlist_v1', JSON.stringify(next));
    } catch {}
  };

  const handleUpdateTips = (updated: JugaadTip[]) => {
    setTips(updated);
    saveTips(updated);
  };

  const handleSaveAffiliateConfig = (config: AffiliateConfig) => {
    setAffiliateConfig(config);
    saveAffiliateConfig(config);
  };

  const handleSelectSavedDeal = (deal: DealStackResult) => {
    setCurrentDeal(deal);
    setActiveTab('deal-finder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B132B] text-slate-100 pb-16 md:pb-0">
      {/* Header */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        totalSaved={totalSaved}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
        savedDealsCount={savedDeals.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Deal Finder Screen (Home) */}
        {activeTab === 'deal-finder' && (
          <div>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} language={language} />

            {/* Sponsored Deal of the Day */}
            <SponsoredSlot language={language} affiliateConfig={affiliateConfig} />

            {/* Error Message if any */}
            {errorMsg && (
              <div className="max-w-3xl mx-auto px-4 my-3">
                <div className="bg-rose-950/60 border border-rose-500/50 text-rose-200 p-4 rounded-2xl flex items-center gap-3 text-xs">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <span className="font-bold">Error: </span>
                    <span>{errorMsg}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF9933]/20 flex items-center justify-center animate-pulse">
                    <Loader2 className="w-8 h-8 text-[#FF9933] animate-spin" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {language === 'en'
                      ? 'Stacking Discounts with Google Search...'
                      : 'गूगल सर्च से सभी ऑफर्स स्टैक हो रहे हैं...'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {language === 'en'
                      ? 'Checking Amazon, Flipkart, Croma, bank card instant discounts, coupons, and cashbacks.'
                      : 'अमेज़न, फ्लिपकार्ट, क्रोमा, बैंक कार्ड ऑफर्स, कूपन और कैशबैक की जांच जारी है।'}
                  </p>
                </div>
              </div>
            )}

            {/* Result Screen ("Deal Stack") */}
            {!isLoading && currentDeal && (
              <div className="mt-4">
                <DealStackView
                  deal={currentDeal}
                  language={language}
                  affiliateConfig={affiliateConfig}
                  isSaved={isCurrentDealSaved}
                  onToggleSave={handleToggleSaveCurrent}
                  onAddToWatchlist={handleAddToWatchlist}
                  onMarkPurchased={handleMarkPurchased}
                />
              </div>
            )}
          </div>
        )}

        {/* Jugaad Tips Screen */}
        {activeTab === 'tips' && (
          <TipsFeed tips={tips} language={language} onUpdateTips={handleUpdateTips} />
        )}

        {/* Referral Corner Screen */}
        {activeTab === 'referrals' && <ReferralCorner language={language} />}

        {/* Saved Deals & Total Money Saved Screen */}
        {activeTab === 'saved' && (
          <SavedDealsView
            savedDeals={savedDeals}
            totalSaved={totalSaved}
            language={language}
            affiliateConfig={affiliateConfig}
            onSelectDeal={handleSelectSavedDeal}
            onRemoveDeal={handleRemoveSavedDeal}
            onAddManualSaving={handleAddManualSaving}
          />
        )}

        {/* Price Drop Watchlist Screen */}
        {activeTab === 'watchlist' && (
          <WatchlistView
            watchlist={watchlist}
            language={language}
            onRemoveItem={handleRemoveWatchlistItem}
            onAddItem={handleAddWatchlistItem}
            onSimulatePriceDrop={handleSimulatePriceDrop}
            onSelectDeal={handleSelectSavedDeal}
          />
        )}
      </main>

      {/* Affiliate Tag Settings Modal */}
      <AffiliateModal
        isOpen={isAffiliateModalOpen}
        onClose={() => setIsAffiliateModalOpen(false)}
        config={affiliateConfig}
        onSave={handleSaveAffiliateConfig}
        language={language}
      />

      {/* Footer with Mandatory Affiliate Disclosure */}
      <Footer language={language} onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)} />

      {/* Mobile-first Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        language={language}
        savedCount={savedDeals.length}
        watchlistCount={watchlist.length}
      />
    </div>
  );
}
