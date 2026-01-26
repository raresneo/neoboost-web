
export interface Package {
  title: string;
  duration: string;
  price: string;
  stripePriceId?: string;
  features: string[];
  isPremium?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  description: string;
  perks: string[];
  calendlyUrl?: string;
  gallery?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  imageUrl: string;
  link: string;
}

export interface ExtendedProgram {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  tagColor: string;
  iconId: string;
  duration: string;
  idealFor: string;
  benefit: string;
  description: string;
  content: string;
  price?: string;
  stripePriceId?: string;

  // Extended fields for landing pages
  forWho: {
    ideal: string[];
    notFor: string[];
  };

  workoutDetails: {
    duration: string;
    frequency: string;
    format: string;
    structure: string[];
  };

  includes: string[];

  pricing: {
    specialPrice?: string;
    referencePackages: boolean;
    details: string;
  };

  bonuses: string[];

  reward3Plus1: {
    enabled: boolean;
    conditions: string[];
    description: string;
  };

  participationConditions: string[];

  freeConsultation: {
    title: string;
    description: string;
    calendlyLink: string;
  };

  afterConsultation: string;

  testimonials?: Testimonial[];
  faq?: FAQItem[];

  // SEO
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

