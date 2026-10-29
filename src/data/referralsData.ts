import { ReferralCode } from '../types';

export const INITIAL_REFERRALS: ReferralCode[] = [
  {
    id: 'ref-swiggy',
    appName: 'Swiggy Food & Instamart',
    logo: '🍔',
    category: 'food',
    code: 'JUGADDUFOOD',
    discountPerk: 'Flat ₹100 Off + Free Delivery on First 2 Orders',
    discountPerkHi: 'पहले 2 ऑर्डर्स पर फ्लैट ₹100 छूट + फ्री डिलीवरी',
    terms: 'Valid on first order above ₹199 for new and dormant accounts.',
    claimUrl: 'https://swiggy.onelink.me/888564224',
    verified: true
  },
  {
    id: 'ref-zomato',
    appName: 'Zomato & Zomato Gold',
    logo: '🍕',
    category: 'food',
    code: 'JUGADDUZOM',
    discountPerk: 'Flat 50% Off up to ₹120 on First Order',
    discountPerkHi: 'पहले ऑर्डर पर 50% छूट (अधिकतम ₹120)',
    terms: 'Valid across all major restaurant partners in India.',
    claimUrl: 'https://zomato.onelink.me',
    verified: true
  },
  {
    id: 'ref-uber',
    appName: 'Uber India',
    logo: '🚗',
    category: 'travel',
    code: 'JUGADDUUBER',
    discountPerk: '₹75 Off on your Next 3 Premier & Auto Rides',
    discountPerkHi: 'अगली 3 प्रीमियर या ऑटो राइड्स पर ₹75 की छूट',
    terms: 'Apply in Uber Wallet -> Promotions before booking.',
    claimUrl: 'https://uber.com',
    verified: true
  },
  {
    id: 'ref-zepto',
    appName: 'Zepto 10-Min Grocery',
    logo: '⚡',
    category: 'grocery',
    code: 'ZEPTOJUGAAD',
    discountPerk: '₹150 Off + Free Delivery on First Grocery Order',
    discountPerkHi: 'पहले ग्रोसरी ऑर्डर पर ₹150 छूट + फ्री डिलीवरी',
    terms: 'Minimum cart value ₹399.',
    claimUrl: 'https://zepto.onelink.me',
    verified: true
  },
  {
    id: 'ref-cred',
    appName: 'CRED (Credit Card Bills & UPI)',
    logo: '💳',
    category: 'fintech',
    code: 'CREDMAXJUGAAD',
    discountPerk: 'Up to ₹250 Cashback on First Credit Card Bill Payment',
    discountPerkHi: 'पहले क्रेडिट कार्ड बिल पेमेंट पर ₹250 तक कैशबैक',
    terms: 'Valid for credit scores above 750 on initial registration.',
    claimUrl: 'https://cred.club',
    verified: true
  },
  {
    id: 'ref-blinkit',
    appName: 'Blinkit (Quick Delivery)',
    logo: '🛍️',
    category: 'grocery',
    code: 'BLINKITDEAL',
    discountPerk: 'Flat ₹100 Off on orders above ₹499',
    discountPerkHi: '₹499 से ऊपर के ऑर्डर्स पर फ्लैट ₹100 छूट',
    terms: 'New user welcome promo voucher.',
    claimUrl: 'https://blinkit.com',
    verified: true
  },
  {
    id: 'ref-cashkaro',
    appName: 'CashKaro Cashback App',
    logo: '💰',
    category: 'shopping',
    code: 'JUGADDUCK',
    discountPerk: 'Instant ₹50 Signup Bonus straight to your wallet',
    discountPerkHi: 'साइनअप करते ही तुरंत ₹50 का बोनस आपके वॉलेट में',
    terms: 'Transferable to bank account upon reaching ₹250 confirmed cashback.',
    claimUrl: 'https://cashkaro.com/r=JUGADDUCK',
    verified: true
  },
  {
    id: 'ref-indmoney',
    appName: 'INDmoney (US Stocks & Mutual Funds)',
    logo: '📈',
    category: 'fintech',
    code: 'JUGADDUIND',
    discountPerk: 'Free ₹1,000 Apple or Tesla Stock on First Account Setup',
    discountPerkHi: 'पहले अकाउंट सेटअप पर ₹1,000 का फ्री Apple या Tesla शेयर',
    terms: 'Requires completion of standard PAN KYC.',
    claimUrl: 'https://indmoney.onelink.me',
    verified: true
  }
];
