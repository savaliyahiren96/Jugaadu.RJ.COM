import { AffiliateConfig, DealStackResult, WatchlistItem, JugaadTip } from '../types';
import { SAMPLE_DEAL_STACKS } from '../data/mockDeals';
import { INITIAL_JUGAAD_TIPS } from '../data/tipsData';

const STORAGE_KEYS = {
  AFFILIATE_CONFIG: 'jugaddu_affiliate_config_v1',
  SAVED_DEALS: 'jugaddu_saved_deals_v1',
  TOTAL_SAVED: 'jugaddu_total_money_saved_v1',
  WATCHLIST: 'jugaddu_watchlist_v1',
  TIPS_DATA: 'jugaddu_tips_data_v1',
  LANGUAGE: 'jugaddu_language_v1',
};

export const DEFAULT_AFFILIATE_CONFIG: AffiliateConfig = {
  amazonTag: 'jugaddu-21',
  flipkartAffId: 'jugaddu_rf',
  cromaTag: 'jugaad_crm',
  cashkaroReferral: 'JUGADDUCK',
};

export function getStoredAffiliateConfig(): AffiliateConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AFFILIATE_CONFIG);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_AFFILIATE_CONFIG;
}

export function saveAffiliateConfig(config: AffiliateConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AFFILIATE_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error(e);
  }
}

export function buildAffiliateUrl(originalUrl: string, platform: string, config: AffiliateConfig): string {
  if (!originalUrl) return '#';
  try {
    const p = platform.toLowerCase();
    if (p.includes('amazon')) {
      const url = new URL(originalUrl);
      url.searchParams.set('tag', config.amazonTag || 'jugaddu-21');
      return url.toString();
    } else if (p.includes('flipkart')) {
      const url = new URL(originalUrl);
      url.searchParams.set('affid', config.flipkartAffId || 'jugaddu_rf');
      return url.toString();
    } else if (p.includes('croma')) {
      const url = new URL(originalUrl);
      url.searchParams.set('utm_source', config.cromaTag || 'jugaad_crm');
      url.searchParams.set('utm_medium', 'affiliate');
      return url.toString();
    }
  } catch {
    // If not a parseable URL, return with query param
    return originalUrl;
  }
  return originalUrl;
}

export function getStoredTotalSaved(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOTAL_SAVED);
    if (raw) return Number(raw);
  } catch (e) {
    console.error(e);
  }
  return 14500; // Baseline initial community savings counter for realistic social proof
}

export function addToTotalSaved(amount: number): number {
  const current = getStoredTotalSaved();
  const next = current + Math.max(0, amount);
  try {
    localStorage.setItem(STORAGE_KEYS.TOTAL_SAVED, String(next));
  } catch (e) {
    console.error(e);
  }
  return next;
}

export function getStoredSavedDeals(): DealStackResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_DEALS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [SAMPLE_DEAL_STACKS['iphone 16']];
}

export function toggleSaveDeal(deal: DealStackResult): { isSaved: boolean; list: DealStackResult[] } {
  const current = getStoredSavedDeals();
  const index = current.findIndex((d) => d.id === deal.id || d.productTitle.toLowerCase() === deal.productTitle.toLowerCase());
  let nextList: DealStackResult[];
  let isSaved = false;
  if (index >= 0) {
    nextList = current.filter((_, i) => i !== index);
    isSaved = false;
  } else {
    nextList = [deal, ...current];
    isSaved = true;
  }
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_DEALS, JSON.stringify(nextList));
  } catch (e) {
    console.error(e);
  }
  return { isSaved, list: nextList };
}

export function getStoredWatchlist(): WatchlistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'wl-1',
      productTitle: 'Apple iPhone 16 (128 GB)',
      category: 'Smartphones',
      currentLowestPrice: 74900,
      bestPlatform: 'Flipkart',
      targetPrice: 69999,
      dateAdded: '2 days ago',
      hasDropped: true,
      dealStack: SAMPLE_DEAL_STACKS['iphone 16'],
    },
    {
      id: 'wl-2',
      productTitle: 'Sony WH-1000XM5 Headphones',
      category: 'Audio',
      currentLowestPrice: 28990,
      bestPlatform: 'Amazon',
      targetPrice: 24999,
      dateAdded: 'Yesterday',
      hasDropped: false,
      dealStack: SAMPLE_DEAL_STACKS['sony wh-1000xm5'],
    },
  ];
}

export function addToWatchlist(item: WatchlistItem): WatchlistItem[] {
  const current = getStoredWatchlist();
  const existingIndex = current.findIndex((w) => w.productTitle.toLowerCase() === item.productTitle.toLowerCase());
  let next: WatchlistItem[];
  if (existingIndex >= 0) {
    next = [...current];
    next[existingIndex] = item;
  } else {
    next = [item, ...current];
  }
  try {
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(next));
  } catch (e) {
    console.error(e);
  }
  return next;
}

export function removeFromWatchlist(id: string): WatchlistItem[] {
  const current = getStoredWatchlist();
  const next = current.filter((w) => w.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(next));
  } catch (e) {
    console.error(e);
  }
  return next;
}

export function getStoredTips(): JugaadTip[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TIPS_DATA);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_JUGAAD_TIPS;
}

export function saveTips(tips: JugaadTip[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TIPS_DATA, JSON.stringify(tips));
  } catch (e) {
    console.error(e);
  }
}
