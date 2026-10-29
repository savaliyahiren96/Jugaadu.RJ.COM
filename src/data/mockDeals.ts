import { DealStackResult } from '../types';

export const SAMPLE_DEAL_STACKS: Record<string, DealStackResult> = {
  'iphone 16': {
    id: 'deal-iphone-16',
    productTitle: 'Apple iPhone 16 (128 GB) - Ultramarine',
    category: 'Smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    mrp: 79900,
    lowestBasePrice: 74900,
    bestPlatform: 'Flipkart',
    platforms: [
      {
        platform: 'Flipkart',
        price: 74900,
        originalPrice: 79900,
        deliveryDays: 'Delivery in 2 Days (Assured)',
        url: 'https://www.flipkart.com/apple-iphone-16-ultramarine-128-gb/p/itm',
        sellerRating: '4.8 ★ SuperComNet',
        inStock: true,
        specialNote: 'Cheapest baseline price before bank card discounts'
      },
      {
        platform: 'Amazon',
        price: 75900,
        originalPrice: 79900,
        deliveryDays: 'Prime 1-Day Delivery',
        url: 'https://www.amazon.in/dp/B0DGJ9BFFC',
        sellerRating: '4.7 ★ Appario Retail',
        inStock: true,
        specialNote: 'Includes 6 months free Spotify Premium'
      },
      {
        platform: 'Croma',
        price: 76900,
        originalPrice: 79900,
        deliveryDays: 'Same-day store pickup available',
        url: 'https://www.croma.com/apple-iphone-16-128gb/p/275632',
        sellerRating: 'Tata Assured',
        inStock: true,
        specialNote: 'Price match eligible with Flipkart price'
      },
      {
        platform: 'Reliance Digital',
        price: 77900,
        originalPrice: 79900,
        deliveryDays: 'Delivery in 24 hours',
        url: 'https://www.reliancedigital.in',
        sellerRating: 'Reliance Official',
        inStock: true,
        specialNote: 'Free screen protection insurance included'
      }
    ],
    bankOffers: [
      {
        id: 'bo-icici-1',
        bankName: 'ICICI Bank',
        cardType: 'Credit Card',
        discountAmount: 5000,
        minPurchase: 65000,
        description: 'Flat ₹5,000 Instant Discount on ICICI Bank Credit Cards (Non-EMI)',
        conditions: 'Valid till Sunday. Applicable once per card per month.',
        expiryDate: 'Expiring soon',
        platforms: ['Flipkart', 'Amazon', 'Croma']
      },
      {
        id: 'bo-sbi-1',
        bankName: 'SBI Card',
        cardType: 'Credit Card',
        discountAmount: 4000,
        minPurchase: 60000,
        description: '₹4,000 Instant Discount on SBI Credit Card transactions',
        conditions: 'Applicable on both EMI & Non-EMI checkouts.',
        expiryDate: 'Valid till 30th of month',
        platforms: ['Amazon', 'Reliance Digital']
      },
      {
        id: 'bo-hdfc-smart',
        bankName: 'HDFC Bank',
        cardType: 'Credit Card',
        discountAmount: 3500,
        minPurchase: 50000,
        description: '₹3,500 Instant Discount + 5X Reward Points via SmartBuy',
        conditions: 'Requires payment via HDFC Millennia or Regalia.',
        expiryDate: 'Active offer',
        platforms: ['Croma', 'Tata CLiQ']
      }
    ],
    coupons: [
      {
        id: 'cp-apple1000',
        code: 'FLIPEXCLUSIVE',
        discountText: 'Flat ₹1,000 Off on Electronics SuperCoin Checkout',
        discountAmount: 1000,
        platform: 'Flipkart',
        minOrder: 50000,
        conditions: 'Redeem with 50 SuperCoins in checkout page',
        verifiedToday: true
      },
      {
        id: 'cp-welcome500',
        code: 'APPDEAL500',
        discountText: '₹500 extra off on Mobile App order',
        discountAmount: 500,
        platform: 'Croma',
        minOrder: 30000,
        conditions: 'Valid only on Croma Android/iOS app checkout',
        verifiedToday: true
      }
    ],
    cashbacks: [
      {
        id: 'cb-cashkaro',
        name: 'CashKaro Portal',
        cashbackText: 'Flat 1.8% Rewards on Electronics',
        estimatedReturn: 1348,
        payoutTime: 'Tracks in 24 hrs, paid to Bank Account',
        url: 'https://cashkaro.com',
        conditions: 'Click through CashKaro before adding product to cart.'
      },
      {
        id: 'cb-cred-upi',
        name: 'CRED UPI Payment',
        cashbackText: '₹250 to ₹750 Cashback on merchant checkout',
        estimatedReturn: 350,
        payoutTime: 'Instant credit to CRED coins / balance',
        url: 'https://cred.club',
        conditions: 'Select CRED Pay UPI at final payment gateway.'
      }
    ],
    giftCards: [
      {
        id: 'gc-gyftr',
        provider: 'Gyftr SmartBuy / Woohoo',
        voucherFor: 'Flipkart E-Gift Voucher',
        discountPercent: 4.5,
        savingsAmount: 2200,
        method: 'Buy voucher using SBI Cashback Card / HDFC Regalia for 5% reward rate prior to checkout.'
      }
    ],
    priceMatch: [
      {
        platform: 'Croma Retail',
        policySummary: 'Croma Store Lowest Price Match Guarantee',
        howToClaim: 'Show the live Flipkart ₹74,900 price page at any Croma retail counter to get an instant on-the-spot price match plus Tata Neu coin accruals.'
      }
    ],
    upcomingSale: {
      saleName: 'Great Summer Festival & Mega Savings Days',
      expectedDate: 'Starts 1st week next month',
      expectedDiscount: 'Expected to drop to ₹71,999 with exchange bonus',
      verdict: 'BUY_NOW',
      verdictReason: 'With stacked ₹5,000 ICICI discount + ₹1,000 coupon + ₹1,348 CashKaro, your net price is ₹67,552—which rivals festival sales.'
    },
    bestBankSaving: 5000,
    bestCouponSaving: 1000,
    bestCashbackSaving: 1348,
    bestGiftCardSaving: 0,
    finalStackedPrice: 67552,
    totalSavings: 12348,
    savingsPercentage: 15.5,
    verdictText: 'Steal Deal! You save ₹12,348 off MRP using the ICICI card + SuperCoin coupon + CashKaro route on Flipkart.',
    verdictBadge: 'STEAL DEAL',
    groundingSources: [
      { title: 'Flipkart iPhone 16 Live Price & Offers', url: 'https://www.flipkart.com' },
      { title: 'Amazon India Apple Store', url: 'https://www.amazon.in' },
      { title: 'Croma Apple Electronics Deals', url: 'https://www.croma.com' }
    ],
    searchQuery: 'iPhone 16 128GB',
    timestamp: 'Just now'
  },

  'sony wh-1000xm5': {
    id: 'deal-sony-xm5',
    productTitle: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Black',
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    mrp: 34990,
    lowestBasePrice: 28990,
    bestPlatform: 'Amazon',
    platforms: [
      {
        platform: 'Amazon',
        price: 28990,
        originalPrice: 34990,
        deliveryDays: 'Prime 1-Day Delivery',
        url: 'https://www.amazon.in/dp/B09XS7JWHH',
        sellerRating: '4.7 ★ Appario',
        inStock: true,
        specialNote: 'Official 1-Year Sony India Warranty'
      },
      {
        platform: 'Flipkart',
        price: 29990,
        originalPrice: 34990,
        deliveryDays: 'Delivery in 3 Days',
        url: 'https://www.flipkart.com',
        sellerRating: '4.6 ★ RetailNet',
        inStock: true,
        specialNote: 'Includes ₹1,000 extra on exchange'
      },
      {
        platform: 'Croma',
        price: 29490,
        originalPrice: 34990,
        deliveryDays: 'Available in 15+ nearby stores',
        url: 'https://www.croma.com',
        sellerRating: 'Tata Assured',
        inStock: true,
        specialNote: '5% NeuCoins on Tata Neu app'
      }
    ],
    bankOffers: [
      {
        id: 'bo-sbi-xm5',
        bankName: 'SBI Card',
        cardType: 'Credit Card',
        discountAmount: 2500,
        minPurchase: 25000,
        description: 'Flat ₹2,500 Instant Discount with SBI Credit Cards',
        conditions: 'Direct checkout on Amazon India.',
        expiryDate: 'Valid this week',
        platforms: ['Amazon']
      },
      {
        id: 'bo-hdfc-xm5',
        bankName: 'HDFC Bank',
        cardType: 'Credit Card',
        discountAmount: 2000,
        minPurchase: 20000,
        description: '₹2,000 off on HDFC Credit Card transactions',
        conditions: 'Terms apply. No-cost EMI also available.',
        expiryDate: 'Monthly offer',
        platforms: ['Amazon', 'Croma']
      }
    ],
    coupons: [
      {
        id: 'cp-amazon-coupon',
        code: 'COLLECT_TICKBOX',
        discountText: '₹2,000 Apply Coupon Checkbox on Amazon Product Page',
        discountAmount: 2000,
        platform: 'Amazon',
        minOrder: 25000,
        conditions: 'Tick the green coupon box right below the product price before adding to cart!',
        verifiedToday: true
      }
    ],
    cashbacks: [
      {
        id: 'cb-ck-xm5',
        name: 'CashKaro',
        cashbackText: 'Flat 3.5% Cashback on Audio gear',
        estimatedReturn: 857,
        payoutTime: 'Within 48 hours tracking',
        url: 'https://cashkaro.com',
        conditions: 'Activate via CashKaro link prior to ordering.'
      }
    ],
    giftCards: [
      {
        id: 'gc-amz-voucher',
        provider: 'HDFC SmartBuy Gyftr',
        voucherFor: 'Amazon Shopping Voucher',
        discountPercent: 3.0,
        savingsAmount: 730,
        method: 'Buy Amazon Shopping voucher via Gyftr with reward points card'
      }
    ],
    priceMatch: [
      {
        platform: 'Reliance Digital',
        policySummary: 'Best Price Match against Amazon Appario listing',
        howToClaim: 'Show active Amazon prime in-stock listing.'
      }
    ],
    upcomingSale: {
      saleName: 'Amazon Prime Day / Freedom Sale',
      expectedDate: '3 months away',
      expectedDiscount: 'Lowest past price ₹23,990',
      verdict: 'BUY_NOW',
      verdictReason: 'With ₹2,000 clip coupon + ₹2,500 bank discount + CashKaro, net price is ₹23,633 which is all-time low!'
    },
    bestBankSaving: 2500,
    bestCouponSaving: 2000,
    bestCashbackSaving: 857,
    bestGiftCardSaving: 0,
    finalStackedPrice: 23633,
    totalSavings: 11357,
    savingsPercentage: 32.5,
    verdictText: 'Solid Jugaad! Tick the hidden ₹2,000 green coupon box on Amazon + pay with SBI Credit Card for ₹23,633 final price!',
    verdictBadge: 'STEAL DEAL',
    groundingSources: [
      { title: 'Amazon India Audio Catalog', url: 'https://www.amazon.in' },
      { title: 'Sony India Official Store', url: 'https://shopatsc.com' }
    ],
    searchQuery: 'Sony WH-1000XM5',
    timestamp: 'Just now'
  },

  'samsung galaxy s24': {
    id: 'deal-samsung-s24',
    productTitle: 'Samsung Galaxy S24 5G (8GB RAM, 128GB, Amber Yellow)',
    category: 'Smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    mrp: 74999,
    lowestBasePrice: 62999,
    bestPlatform: 'Flipkart',
    platforms: [
      {
        platform: 'Flipkart',
        price: 62999,
        originalPrice: 74999,
        deliveryDays: 'Delivery in 2 Days',
        url: 'https://www.flipkart.com',
        sellerRating: '4.7 ★ Flashstar Retail',
        inStock: true
      },
      {
        platform: 'Amazon',
        price: 63999,
        originalPrice: 74999,
        deliveryDays: 'Tomorrow by 11 AM',
        url: 'https://www.amazon.in',
        sellerRating: '4.6 ★ STPL Exclusive',
        inStock: true
      },
      {
        platform: 'Samsung Store',
        price: 64999,
        originalPrice: 74999,
        deliveryDays: 'Samsung Corporate Delivery',
        url: 'https://www.samsung.com/in',
        sellerRating: 'Samsung Official',
        inStock: true,
        specialNote: 'Free Wireless Charger Pad worth ₹2,999'
      }
    ],
    bankOffers: [
      {
        id: 'bo-hdfc-s24',
        bankName: 'HDFC Bank',
        cardType: 'Credit Card',
        discountAmount: 5000,
        minPurchase: 55000,
        description: 'Flat ₹5,000 Instant Discount on HDFC Credit Cards',
        conditions: 'Automatic deduction at checkout card entry.',
        expiryDate: 'Ongoing',
        platforms: ['Flipkart', 'Samsung Store']
      }
    ],
    coupons: [
      {
        id: 'cp-samsung-student',
        code: 'STUDENT_UNIDAYS',
        discountText: 'Extra 8% Off via Samsung Student Advantage Portal',
        discountAmount: 4800,
        platform: 'Samsung Store',
        minOrder: 40000,
        conditions: 'Login with your college .edu / .ac.in email or Unidays ID',
        verifiedToday: true
      }
    ],
    cashbacks: [
      {
        id: 'cb-s24-ck',
        name: 'EarnKaro / CashKaro',
        cashbackText: '2% Flat Bank Transferable Cashback',
        estimatedReturn: 1160,
        payoutTime: '72 hrs confirmation',
        url: 'https://cashkaro.com',
        conditions: 'Order through affiliate gateway'
      }
    ],
    giftCards: [],
    priceMatch: [
      {
        platform: 'Croma',
        policySummary: 'Tata Neu 5% Reward Coins on Croma online/store',
        howToClaim: 'Pay via Tata Neu HDFC Credit Card'
      }
    ],
    upcomingSale: {
      saleName: 'Big Billion Days',
      expectedDate: 'October Sale',
      expectedDiscount: 'Could drop to ₹54,999',
      verdict: 'MODERATE',
      verdictReason: 'Good baseline discount currently; if you have a student ID, the Samsung portal route right now beats most public sales.'
    },
    bestBankSaving: 5000,
    bestCouponSaving: 4800,
    bestCashbackSaving: 1160,
    bestGiftCardSaving: 0,
    finalStackedPrice: 53199,
    totalSavings: 21800,
    savingsPercentage: 29.1,
    verdictText: 'Crazy Savings! Use Samsung Student Advantage (8% off) + HDFC Card (₹5,000 off) for ₹53,199 total price!',
    verdictBadge: 'STEAL DEAL',
    groundingSources: [
      { title: 'Samsung India Shop & Student Advantage', url: 'https://www.samsung.com/in' },
      { title: 'Flipkart Mobile Store', url: 'https://www.flipkart.com' }
    ],
    searchQuery: 'Samsung Galaxy S24',
    timestamp: 'Just now'
  }
};
