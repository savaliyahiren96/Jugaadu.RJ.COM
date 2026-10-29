export type Language = 'en' | 'hi';

export interface PlatformDeal {
  platform: 'Amazon' | 'Flipkart' | 'Croma' | 'Myntra' | 'Reliance Digital' | 'Tata CLiQ' | 'Vijay Sales' | 'Samsung Store' | 'Apple Store' | 'Other';
  price: number;
  originalPrice: number;
  deliveryDays: string;
  url: string;
  sellerRating?: string;
  inStock: boolean;
  specialNote?: string;
  affiliateUrl?: string;
}

export interface BankOffer {
  id: string;
  bankName: string; // e.g. "HDFC Bank", "ICICI Bank", "SBI Card", "Axis Bank", "OneCard"
  cardType: 'Credit Card' | 'Debit Card' | 'EMI' | 'UPI';
  discountAmount: number;
  discountPercentage?: number;
  minPurchase: number;
  description: string;
  conditions: string;
  expiryDate?: string;
  platforms: string[];
}

export interface CouponCode {
  id: string;
  code: string;
  discountText: string;
  discountAmount: number;
  platform: string;
  minOrder?: number;
  conditions: string;
  verifiedToday: boolean;
}

export interface CashbackPortal {
  id: string;
  name: string; // "CashKaro", "EarnKaro", "GoPaisa", "CRED UPI", "Paytm UPI"
  cashbackText: string;
  estimatedReturn: number;
  payoutTime: string;
  url: string;
  conditions: string;
}

export interface GiftCardDiscount {
  id: string;
  provider: string; // "Gyftr SmartBuy", "Woohoo", "Zingoy", "Amazon Pay"
  voucherFor: string;
  discountPercent: number;
  savingsAmount: number;
  method: string;
}

export interface PriceMatchPolicy {
  platform: string;
  policySummary: string;
  howToClaim: string;
}

export interface UpcomingSale {
  saleName: string;
  expectedDate: string;
  expectedDiscount: string;
  verdict: 'WAIT' | 'BUY_NOW' | 'MODERATE';
  verdictReason: string;
}

export interface DealStackResult {
  id: string;
  productTitle: string;
  category: string;
  imageUrl?: string;
  mrp: number;
  lowestBasePrice: number;
  bestPlatform: string;
  platforms: PlatformDeal[];
  bankOffers: BankOffer[];
  coupons: CouponCode[];
  cashbacks: CashbackPortal[];
  giftCards: GiftCardDiscount[];
  priceMatch: PriceMatchPolicy[];
  upcomingSale: UpcomingSale;
  
  // Stacking calculation
  bestBankSaving: number;
  bestCouponSaving: number;
  bestCashbackSaving: number;
  bestGiftCardSaving: number;
  finalStackedPrice: number;
  totalSavings: number;
  savingsPercentage: number;
  
  verdictText: string;
  verdictBadge: 'STEAL DEAL' | 'SOLID JUGAAD' | 'WAIT FOR FESTIVAL' | 'AVERAGE';
  groundingSources?: { title: string; url: string }[];
  searchQuery: string;
  timestamp: string;
}

export interface JugaadTip {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  category: 'bank' | 'voucher' | 'cart' | 'student' | 'gst' | 'general';
  upvotes: number;
  workedCount: number;
  didntWorkCount: number;
  userVote?: 'up' | 'down';
  userFeedback?: 'worked' | 'didnt_work';
  author: string;
  verified: boolean;
  tag: string;
  dateAdded: string;
}

export interface ReferralCode {
  id: string;
  appName: string;
  logo: string;
  category: 'food' | 'travel' | 'grocery' | 'fintech' | 'shopping';
  code: string;
  discountPerk: string;
  discountPerkHi?: string;
  terms: string;
  claimUrl: string;
  verified: boolean;
}

export interface WatchlistItem {
  id: string;
  productTitle: string;
  category: string;
  currentLowestPrice: number;
  bestPlatform: string;
  targetPrice: number;
  dateAdded: string;
  hasDropped: boolean;
  dealStack?: DealStackResult;
}

export interface AffiliateConfig {
  amazonTag: string;
  flipkartAffId: string;
  cromaTag: string;
  cashkaroReferral: string;
}
