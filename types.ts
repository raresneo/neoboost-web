
export interface Package {
  title: string;
  duration: string;
  price: string;
  stripePriceId?: string;
  features: string[];
  isPremium?: boolean;
}

export interface Location {
  name: string;
  address: string;
  description: string;
  perks: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
