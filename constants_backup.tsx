
import React from 'react';
import { Package, Location, FAQItem } from './types';
import {
  Clock, Zap, Target, ShieldCheck, HeartPulse, Sparkles, Smartphone, Wind,
  Droplets, RefreshCw, Cpu, Activity, WashingMachine, ShieldAlert, ZapOff,
  Layers, Flame, HelpCircle, Dumbbell, UserCheck, Accessibility, Calendar,
  Quote, History, Microscope, Medal, Briefcase, Shirt, Link, PlayCircle, CheckCheck, Crown, Baby, Users
} from 'lucide-react';

export const BRAND = {
  name: "NeoBoost",
  oldName: "Neodynamix",
  location: "Oradea, Bihor, România",
  address: "Ramada Oradea / GetFit Oradea",
  schedule: "Luni–Vineri 07:00–21:00, Sâmbătă 10:00–14:00",
  phone: "+40 769 124 019",
  email: "contact@neoboost.ro",
  trial: "Primă Sesiune Gratuită",
  googleMapsLink: "https://www.google.com/search?q=neoboost+oradea+recenzii",
  color: "#3A86FF",
  socials: {
    instagram: "https://instagram.com/neoboost.oradea",
    facebook: "https://facebook.com/neoboost.oradea"
  }
};

export interface NeoPackage extends Package {
  sessionCount: string;
  idealFor?: string;
  pricePerSession?: string;
  isRecommended?: boolean;
}

export interface NeoFAQItem extends FAQItem {
  icon: React.ReactNode;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  imageUrl: string;
  link: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isNeo?: boolean;
  image?: string;
  details?: { name: string; description: string; icon?: React.ReactNode }[];
}

export const EMS_MILESTONES: Milestone[] = [
  {
    year: "1780",
    title: "Geneza",
    description: "Luigi Galvani descoperă bioelectricitatea. Începutul studiului impulsurilor nervoase.",
    icon: <Microscope size={20} />,
    image: "/ems_1780.png"
  },
  {
    year: "1960",
    title: "Știința",
    description: "Cercetătorii ruși folosesc EMS pentru atleții olimpici, obținând creșteri de 40% în forță.",
    icon: <Medal size={20} />,
    image: "/ems_1960.png"
  },
  {
    year: "2010",
    title: "Standard",
    description: "Apar primele sisteme comerciale, dar limitate de cabluri și necesitatea apei.",
    icon: <Dumbbell size={20} />,
    image: "/ems_2010.png"
  },
  {
    year: "2024+",
    title: "Revoluția",
    description: "NeoBoost introduce Drysuit Wireless: libertate totală fără apă sau fire.",
    icon: <Zap size={20} />,
    isNeo: true,
    image: "/powerbox_lifestyle.png",
    details: [
      { name: "PowerBox (Cassette)", description: "Creierul sistemului. Ultra-ușor, atașare magnetică, fără fire." },
      { name: "DrySuit (Costum)", description: "A doua piele. Igienic, personal, nu necesită umezire." },
      { name: "Control Unit (Tablet)", description: "Centrul de Comandă. Ajustare precisă în timp real." }
    ]
  }
];

export const EMS_STEPS = [
  {
    id: "01",
    title: "Discuție inițială",
    description: "Fiecare ședință începe cu o scurtă discuție despre obiectivul tău și eventualele limitări medicale.",
    icon: <Users size={20} />
  },
  {
    id: "02",
    title: "Echipare & Calibrare",
    description: "Îmbraci costumul EMS peste hainele speciale, iar antrenorul îți setează intensitatea în funcție de cum te simți.",
    icon: <Shirt size={20} />
  },
  {
    id: "03",
    title: "Antrenament 30 min",
    description: "Faci exerciții simple, ghidate 1-la-1, în timp ce impulsurile electrice ușoare îți activează mușchii.",
    icon: <Zap size={20} />
  },
  {
    id: "04",
    title: "Feedback & Plan",
    description: "Discutăm cum te-ai simțit, oferim recomandări și programăm următoarea ședință pentru consistență.",
    icon: <CheckCheck size={20} />
  }
];

export const EMS_OBJECTIVES = [
  { title: "Slăbire & Metabolism", level: 95, color: "#3A86FF", icon: <Flame size={16} /> },
  { title: "Tonifiere Musculară", level: 90, color: "#3A86FF", icon: <Target size={16} /> },
  { title: "Sănătatea Coloanei", level: 85, color: "#3A86FF", icon: <Accessibility size={16} /> },
  { title: "Performanță Atletică", level: 80, color: "#3A86FF", icon: <Zap size={16} /> },
  { title: "Recuperare Medicală", level: 75, color: "#3A86FF", icon: <ShieldCheck size={16} /> }
];

export const EMS_PROTOCOL = {
  title: "Tehnologia Drysuit EMS",
  subtitle: "Standardul de Elită în Antrenamentul EMS Wireless",
  description: "NeoBoost redefinește stimularea musculară prin eliminarea barierei de apă. Tehnologia noastră Electrical Muscle Stimulation permite antrenamente dinamice, fără cabluri, pe un costum complet uscat.",
  comparisons: [
    {
      label: "Uscat vs Umed",
      visionBody: "Fără apă. Fără senzație de rece. Confort și igienă maximă.",
      others: "Necesită umezire. Disconfort termic. Pregătire lentă.",
      icon: <Wind className="w-5 h-5" />
    },
    {
      label: "Mobilitate",
      visionBody: "Wireless Total. Libertate 100% pentru mișcări complexe.",
      others: "Limitat de cabluri sau stații fixe. Mișcări restricționate.",
      icon: <ZapOff className="w-5 h-5" />
    },
    {
      label: "Material Hi-Tech",
      visionBody: "Fibre de carbon integrate. Antibacterian și respirabil.",
      others: "Neopren greu sau materiale sintetice standard.",
      icon: <Layers className="w-5 h-5" />
    }
  ],
  techDetails: [
    "Fibre de argint și carbon integrate direct în țesătură pentru conductivitate optimă pe pielea uscată.",
    "Power Box lateral cu algoritmi de frecvență variabilă pentru a preveni adaptarea musculară.",
    "Sistem de compresie anatomică ce garantează contactul perfect al celor 20 de electrozi."
  ]
};

export const TECH_COMPONENTS = [
  {
    id: "drysuit",
    title: "Costumul NeoBoost Drysuit",
    description: "Inima sistemului nostru. Creat dintr-o țesătură inteligentă care nu necesită umezire. Electrozii transmit impulsuri direct pe pielea uscată, oferind libertate totală. Acest sistem permite antrenorului personal să corecteze postura în timp real.",
    image: "/studio_session_1.jpg",
    features: ["Antibacterian", "Fără cabluri", "Compresie Anatomică"]
  },
  {
    id: "powerbox",
    title: "Power Box NeoBoost",
    description: "Unitatea centrală wireless care se atașează magnetic. Generează impulsuri complexe pentru 20 de grupe musculare simultan via Bluetooth.",
    image: "/powerbox_lifestyle.png",
    features: ["Bluetooth Low Energy", "Baterie Li-Ion", "Contact Magnetic"]
  },
  {
    id: "control",
    title: "Interfața de Control",
    description: "Aplicație intuitivă utilizată de antrenor pentru a calibra intensitatea în timp real. Permite monitorizarea progresului și ajustarea programului pe loc.",
    image: "/tablet_combo.jpg",
    features: ["20 de Canale", "Presetări Inteligente", "Feedback Biometric"]
  }
];

// Merged Benefits & Solutions Data
export const UNIFIED_BENEFITS = [
  {
    id: "slabire",
    title: "Slăbire & Metabolism",
    subtitle: "ARDERE CALORICĂ ACCELERATĂ",
    icon: <Flame className="w-8 h-8" />,
    desc: "Arzi 500+ Kcal în 30 min. Metabolism accelerat timp de 72h după antrenament.",
    image: "/DSC03924.jpg",
    content: {
      intro: "Vrei să slăbești eficient? EMS accelerează arderea caloriilor prin activarea simultană a 90% din musculatură. Nu este magie, este un consum caloric masiv într-un timp scurt.",
      science: "Fenomenul EPOC (Excess Post-exercise Oxygen Consumption): corpul continuă să ardă calorii pentru a se recupera după impulsurile intense.",
      mechanisms: [
        "Metabolismul bazal crește datorită activării fibrelor musculare profunde.",
        "Consum caloric ridicat în timpul și după sesiune.",
        "Reducerea țesutului adipos visceral."
      ],
      expectations: "Rezultate vizibile în 4-6 săptămâni cu 2 sesiuni/săptămână și nutriție echilibrată."
    },
    cta: "Programează o Evaluare"
  },
  {
    id: "dureri",
    title: "Adio Dureri de Spate",
    subtitle: "POSTURĂ & STABILITATE",
    icon: <ShieldCheck className="w-8 h-8" />,
    desc: "Întărește musculatura paravertebrală profundă care susține coloana. Scapă de dureri.",
    image: "/DSC04030.jpg",
    content: {
      intro: "Durerile de spate sunt adesea cauzate de o musculatură slabă. EMS ajunge acolo unde exercițiile clasice nu pot: la mușchii stabilizatori profunzi.",
      science: "Stimularea electrică activează direct mușchii multifizi și erectori spinali, creând un 'corset' natural de susținere.",
      mechanisms: [
        "Decompresia coloanei vertebrale prin întărire musculară.",
        "Corectarea asimetriilor posturale.",
        "Eliminarea contracturilor musculare dureroase."
      ],
      expectations: "Reducerea semnificativă a durerilor după doar 3-4 sesiuni."
    },
    cta: "Scapă de Dureri Azi"
  },
  {
    id: "tonifiere",
    title: "Tonifiere & Celulită",
    subtitle: "PIELE FERMĂ & ASPECT SCULPTAT",
    icon: <Target className="w-8 h-8" />,
    desc: "Redă fermitatea pielii și sculptează formele corpului. Reduce aspectul de coajă de portocală.",
    image: "/DSC07624.jpg",
    content: {
      intro: "Obține acel aspect 'fit' și tonifiat. Impulsurile electrice stimulează intens circulația și fibrele musculare, netezind pielea.",
      science: "Activarea circulației limfatice și sanguine ajută la eliminarea toxinelor și reducerea retenției de apă, atacând direct celulita.",
      mechanisms: [
        "Drenaj limfatic accelerat.",
        "Creșterea tonusului pielii prin vascularizare.",
        "Definire musculară fără hipertrofie exagerată."
      ],
      expectations: "Piele mai fermă și reducere în centimetri în zonele problemă."
    },
    cta: "Începe Tonifierea"
  },
  {
    id: "performanta",
    title: "Forță & Explozivitate",
    subtitle: "PERFORMANȚĂ ATLETICĂ",
    icon: <Zap className="w-8 h-8" />,
    desc: "Crește forța și explozivitatea fără a uza articulațiile. Recrutare musculară maximă.",
    image: "/DSC07811.jpg",
    content: {
      intro: "Pentru sportivi amatori sau pro. EMS îți permite să îți depășești limitele genetice prin recrutarea fibrelor rapide (Type II).",
      science: "Sistemul nervos învață să recruteze mai multe unități motorii simultan, crescând forța pură fără a pune presiune pe tendoane.",
      mechanisms: [
        "Recrutarea a 90% din fibrele musculare.",
        "Îmbunătățirea vitezei de reacție.",
        "Antrenament de forță fără greutăți mari."
      ],
      expectations: "Creșterea explozivității și a forței maxime în câteva săptămâni."
    },
    cta: "Crește Performanța"
  },
  {
    id: "timp",
    title: "Eficiență Maximă",
    subtitle: "30 MINUTE = 90 MINUTE SALĂ",
    icon: <Clock className="w-8 h-8" />,
    desc: "Rezultate superioare în timp record. Ideal pentru oamenii ocupați care vor eficiență.",
    image: "/DSC04229.jpg",
    content: {
      intro: "Timpul este cea mai prețioasă resursă. Cu NeoBoost, transformi orele pierdute la sală în 30 de minute intense și eficiente.",
      science: "Densitatea antrenamentului este cheia. Prin stimularea simultană a tuturor grupelor musculare, volumul de muncă este comprimat extrem.",
      mechanisms: [
        "Lucru simultan Agonist-Antagonist.",
        "Pauze minime, intensitate maximă.",
        "Stimulare metabolică ridicată."
      ],
      expectations: "Mai mult timp liber pentru tine, fără a sacrifica rezultatele fizice."
    },
    cta: "Salvează Timp"
  },
  {
    id: "uscat",
    title: "Confort Drysuit",
    subtitle: "TEHNOLOGIE FĂRĂ APĂ",
    icon: <Wind className="w-8 h-8" />, // Using Wind instead of TShirt for 'Airy/Comfort' feel if Shirt not avail
    desc: "Fără apă, fără senzație de rece. Igienic, personal și extrem de confortabil.",
    image: "/studio_session_1.jpg",
    content: {
      intro: "Uită de costumele reci și ude. Tehnologia noastră Drysuit folosește materiale antibacteriene care nu necesită umezire.",
      science: "Conductivitatea este asigurată de fibre speciale de carbon, eliminând disconfortul termic și bariera psihologică a echipamentului ud.",
      mechanisms: [
        "Senzație plăcută pe piele.",
        "Echipare rapidă (sub 30 secunde).",
        "Libertate totală de mișcare wireless."
      ],
      expectations: "O experiență de antrenament premium, curată și plăcută."
    },
    cta: "Încearcă Drysuit"
  }
];

export const MONTHLY_PACKAGES: NeoPackage[] = [
  {
    title: "STARTER",
    sessionCount: "4",
    duration: "MINIM 1 ȘEDINȚĂ / SĂPTĂMÂNĂ",
    price: "460 RON",
    stripePriceId: "price_1Sn26zJAtuHj34DejlSl8LTE",
    pricePerSession: "115",
    idealFor: "Începători sau revenire după pauză",
    features: [
      "Menținerea tonusului muscular",
      "Corectarea posturii coloanei",
      "Reducerea durerilor de spate",
      "Boost de energie săptămânal",
      "Evaluare corporală inițială"
    ]
  },
  {
    title: "PROGRESS",
    sessionCount: "8",
    duration: "2 ȘEDINȚE / SĂPTĂMÂNĂ",
    price: "710 RON",
    stripePriceId: "price_1Sn27EJAtuHj34De3fuwYpS6",
    pricePerSession: "89",
    idealFor: "Slăbire și tonus vizibil în 2-3 luni",
    isRecommended: true,
    features: [
      "Ardere accelerată a grăsimilor",
      "Creștere vizibilă masă musculară",
      "Reducerea celulitei",
      "Flexibilitate în programare",
      "Monitorizare progres"
    ]
  },
  {
    title: "TRANSFORM",
    sessionCount: "10",
    duration: "2-3 ȘEDINȚE / SĂPTĂMÂNĂ",
    price: "850 RON",
    stripePriceId: "price_1Sn27VJAtuHj34Deu1Rg7QZm",
    pricePerSession: "85",
    isPremium: true,
    idealFor: "Schimbare majoră de formă",
    features: [
      "Transformare corporală intensă",
      "Antrenor Personal Dedicat",
      "Creștere semnificativă a forței",
      "Reducerea stresului",
      "Prioritate la programări",
      "Consiliere nutrițională"
    ]
  },
  {
    title: "ELITE",
    sessionCount: "12",
    duration: "3 ȘEDINȚE / SĂPTĂMÂNĂ",
    price: "900 RON",
    stripePriceId: "price_1Sn27lJAtuHj34De1oDYCy22",
    pricePerSession: "75",
    idealFor: "Sportivi și foarte motivați",
    features: [
      "Rezultate maxime în timp minim",
      "Definiție musculară avansată",
      "Sesiuni de recuperare incluse",
      "Suport nutrițională prioritar",
      "Analiză corporală periodică"
    ]
  }
];

export const QUARTERLY_PACKAGES: NeoPackage[] = [
  {
    title: "Health Pro",
    sessionCount: "12 + 4 BONUS",
    duration: "4 LUNI (3 PLĂTITE + 1 CADOU)",
    price: "1150 RON",
    stripePriceId: "price_1SojGiJAtuHj34DefHEYPwsL",
    idealFor: "Sănătate și postură pe termen lung",
    features: [
      "Consolidare postură",
      "Ameliorarea durerilor cronice",
      "Freeze abonament (1 săptămână)",
      "Plan nutrițional de bază",
      "Evaluări periodice"
    ]
  },
  {
    title: "Sculpt Pro",
    sessionCount: "24 + 8 BONUS",
    duration: "4 LUNI (3 PLĂTITE + 1 CADOU)",
    price: "1850 RON",
    stripePriceId: "price_1SojH4JAtuHj34DeHlplwGdS",
    isPremium: true,
    idealFor: "Sculptare și definire sustenabilă",
    features: [
      "Protocol intensiv de sculptare",
      "Rezultate sustenabile",
      "Freeze abonament (3 săptămâni)",
      "Acces în ambele locații",
      "Consiliere nutrițională VIP"
    ]
  },
  {
    title: "Master Body",
    sessionCount: "36 + 12 BONUS",
    duration: "4 LUNI (3 PLĂTITE + 1 CADOU)",
    price: "2400 RON",
    stripePriceId: "price_1SojHNJAtuHj34DedHtbAwp6",
    idealFor: "Reconstruction totală și performanță",
    features: [
      "Reconstrucție corporală totală",
      "Performanță atletică maximă",
      "Freeze flexibil",
      "Analiză corporală 3D",
      "Echipament personalizat"
    ]
  }
];

export const LOCATIONS: Location[] = [
  {
    id: "ramada",
    name: "Hotel Ramada",
    address: "Calea Aradului nr. 9, Oradea",
    description: "Un spațiu premium, relaxant, echipat cu cele mai noi stații de antrenament NeoBoost.",
    perks: ["Parcare privată", "Zonă de relaxare", "Atmosferă exclusivistă"],
    calendlyUrl: "https://calendly.com/neoboost-ramada",
    gallery: [
      "/ramada.jpg",
      "/ramada_ems_1.jpg",
      "/ramada_ems_2.jpg",
      "/ramada_ems_3.jpg",
      "/ramada_ems_4.jpg",
      "/ramada_ems_5.jpg",
      "/ramada_ems_6.jpg",
      "/ramada_ems_7.jpg",
      "/ramada_ems_8.jpg"
    ]
  },
  {
    id: "getfit",
    name: "Sala GetFit",
    address: "Lotus Center, Nufărului, Oradea",
    description: "O locație energică, plină de lumină naturală, ideală pentru antrenamente dinamice.",
    perks: ["Locație centrală", "Lumină naturală", "Acces facil"],
    calendlyUrl: "https://calendly.com/neoboost-getfit",
    gallery: [
      "/getfit.jpg",
      "/getfit_ems_1.jpg",
      "/getfit_ems_2.jpg",
      "/getfit_ems_3.jpg",
      "/getfit_ems_4.jpg",
      "/getfit_ems_5.jpg",
      "/getfit_ems_6.jpg",
      "/getfit_ems_7.jpg",
      "/getfit_ems_8.jpg",
      "/getfit_ems_9.jpg"
    ]
  }
];

export const FAQS: NeoFAQItem[] = [
  {
    question: "Ce este antrenamentul EMS?",
    answer: "Antrenamentul EMS folosește un costum special care trimite impulsuri electrice ușoare către mușchi, în timp ce faci exerciții simple alături de un antrenor. Astfel, se activează mai multe grupe musculare în același timp și obții un antrenament intens în doar 30 de minute.",
    icon: <Zap size={24} />
  },
  {
    question: "Cât durează o ședință și cât de des vin la antrenament?",
    answer: "O ședință de antrenament EMS durează aproximativ 30 de minute. Majoritatea clienților vin de 1–2 ori pe săptămână, în funcție de obiectiv (slăbire, tonifiere, revenire după pauză etc.).",
    icon: <Clock size={24} />
  },
  {
    question: "De ce merită să investești în antrenamentul EMS?",
    answer: "Investești în cel mai de preț activ al tău: timpul. În doar 30 de minute obții beneficiile a 4 ore de sală convențională, protejându-ți articulațiile și coloana. Este soluția ideală pentru viața modernă, oferindu-ți energie, tonus și sănătate fără a sacrifica zeci de ore pe drumuri și antrenamente ineficiente.",
    icon: <Crown size={24} />
  },
  {
    question: "De ce merită să investești în antrenamente personalizate?",
    answer: "Pentru siguranță, motivație și rezultate garantate. Nu închiriezi doar un aparat, ci angajezi un expert care se asigură că fiecare mișcare este corectă și eficientă. Antrenorul tău adaptează fiecare sesiune la nivelul tău de energie și la obiectivele tale, eliminând riscul de accidentare și plafonare.",
    icon: <Users size={24} />
  },
  {
    question: "Ce rezultate pot să aștept de la antrenamentul EMS?",
    answer: "Vei vedea rezultate vizibile în câteva săptămâni, cu 1–2 antrenamente EMS pe săptămână și o alimentație echilibrată. Clienții noștri raportează slăbire, tonifiere accelerată și reducerea durerilor de spate, printr-un stil de viață consistent, nu prin magie.",
    icon: <Target size={24} />
  },
  {
    question: "Este antrenamentul EMS sigur?",
    answer: "Da, tehnologia este folosită de decenii în recuperare medicală. Impulsurile sunt de joasă frecvență și lucrează musculatura fără a pune presiune pe articulații. Antrenorul tău certificat supraveghează permanent intensitatea.",
    icon: <ShieldCheck size={24} />
  },
  {
    question: "Pentru cine este potrivit antrenamentul EMS?",
    answer: "Este ideal pentru persoanele ocupate care vor eficiență maximă, pentru cei care vor să slăbească sau să se tonifieze rapid, dar și pentru cei care au dureri de spate sau articulații sensibile și nu pot ridica greutăți mari.",
    icon: <UserCheck size={24} />
  },
  {
    question: "Cine NU ar trebui să facă antrenament EMS?",
    answer: "Antrenamentul EMS nu este recomandat persoanelor cu stimulator cardiac (pacemaker), femeilor însărcinate, persoanelor cu epilepsie, tromboză sau boli cardiovasculare severe. Dacă ai dubii, cel mai bine este să discuți cu medicul tău înainte și să ne spui la prima ședință.",
    icon: <ShieldAlert size={24} />
  },
  {
    question: "Pot să fac antrenament și fără costumul EMS?",
    answer: "Da. Dacă preferi să începi fără costum sau ai recomandare medicală să eviți electrostimularea, poți alege antrenamente funcționale clasice, fără costum. Lucrăm cu greutatea corpului și accesorii, adaptate nivelului tău.",
    icon: <Dumbbell size={24} />
  },
  {
    question: "Ce se întâmplă în prima mea ședință la NeoBoost?",
    answer: "Prima ședință începe cu o discuție despre obiectivele tale. Apoi te echipăm cu costumul, facem o calibrare ușoară și trecem prin 15-30 de minute de exerciții. La final, discutăm cum te-ai simțit și îți propunem planul potrivit.",
    icon: <HelpCircle size={24} />
  }
];

export const GYM_VS_EMS = [
  {
    feature: "Timp Necesar",
    gym: "90-120 Minute / Sesiune",
    ems: "DOAR 30 MINUTE",
    icon: <Clock size={20} />
  },
  {
    feature: "Rezultate Echivalente",
    gym: "4-5 Antrenamente / Săpt.",
    ems: "Minim 1 Antrenament / Săpt.",
    icon: <Zap size={20} />
  },
  {
    feature: "Activare Musculară",
    gym: "Mușchi izolați (~40%)",
    ems: "Tot corpul simultan (90%+)",
    icon: <Layers size={20} />
  },
  {
    feature: "Confort & Igienă",
    gym: "Săli aglomerate",
    ems: "Studio privat, costume sterile",
    icon: <UserCheck size={20} />
  },
  {
    feature: "Impact Articular",
    gym: "Risc de accidentare",
    ems: "Impact zero asupra articulațiilor",
    icon: <ShieldCheck size={20} />
  }
];

export const EMS_SOLUTIONS = [
  {
    id: "weight-loss",
    title: "Slăbire & Metabolism",
    description: "Arde calorii la intensitate maximă și elimină țesutul adipos.",
    science: "Efectul Afterburn (EPOC) menține metabolismul ridicat până la 3 zile după antrenament, arzând grăsimile chiar și în repaus.",
    icon: <Flame size={32} className="text-[#00F5FF]" />
  },
  {
    id: "back-pain",
    title: "Adio Dureri de Spate",
    description: "Rezolvă problema de la rădăcină prin întărirea corsetului muscular.",
    science: "Impulsurile ajung la mușchii paravertebrali profunzi, imposibil de activat prin exerciții clasice, stabilizând coloana vertebrală.",
    icon: <Accessibility size={32} className="text-[#00F5FF]" />
  },
  {
    id: "toning",
    title: "Tonifiere & Celulită",
    description: "Redă fermitatea pielii și sculptează formele corpului.",
    science: "Stimularea electrică îmbunătățește circulația limfatică și fluxul sanguin, reducând aspectul de coajă de portocală.",
    icon: <Target size={32} className="text-[#00F5FF]" />
  },
  {
    id: "performance",
    title: "Forță & Explozivitate",
    description: "Atinge-ți potențialul genetic maxim în timp record.",
    science: "EMS recrutează fibrele musculare rapide (Type 2) de la prima contracție, crescând forța pură fără a uza articulațiilor.",
    icon: <Zap size={32} className="text-[#00F5FF]" />
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Patricia Lata",
    role: "Slăbire Localizată",
    quote: "A fost foarte fain, am slăbit din zona abdomenului. Antrenamentele scurte și eficiente. Antrenorii foarte implicați și atenți.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Patricia+Lata&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii"
  },
  {
    name: "Mustafa Dalkilic",
    role: "Transformare (-18kg)",
    quote: "Echipa super serioasa si punctuala, locatia super curata. In 3 luni am ajuns de la 139 kg la 120.5! Recomand cu incredere, odata incercat provoaca dependenta.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Mustafa+Dalkilic&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii"
  },
  {
    name: "Maria Marc",
    role: "Rezultate (-15kg)",
    quote: "Recomand cu încredere acest centru. Pe mine m-a ajutat sa slăbesc 15 kg în 7 luni. Personalul este dedicat și implicat în atingerea obiectivelor tale.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Maria+Marc&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii"
  },
  {
    name: "Denisa Bara",
    role: "Profesionalism",
    quote: "Personal profesionist, cu atitudine de mentor. Antrenorii nu sunt simple prezențe care doar “asistă”, ci se implica activ în corectarea posturii.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Denisa+Bara&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii"
  },
  {
    name: "Chirodea Mihai",
    role: "Client Fidel",
    quote: "Vin la acest studio de 4 luni si nu am regretat o zi. Pe langa antrenorii foarte prietenosi si seriosi, programul este exact ce aveam nevoie.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Chirodea+Mihai&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii"
  },
  {
    name: "Boglarka Kiraly",
    role: "Experiență Premium",
    quote: "Imi place sa vin la Neo, sunt multumita de conditiile pe care le ofera. Imi plac echipamentele, antrenamentele EMS, echipa și tot centrul in sine.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Boglarka+Kiraly&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii"
  }
];

export const BENEFIT_ARTICLES = [
  {
    id: "slabire-rapida",
    title: "Slăbire Rapidă",
    subtitle: "Fără dietă extremă",
    image: "/DSC03924.jpg",
    intro: "Vrei să slăbești eficient? EMS accelerează arderea caloriilor prin activarea simultană a 90% din musculatură. Nu este magie, este un consum caloric masiv într-un timp scurt.",
    mechanisms: [
      {
        title: "Recrutare musculară amplificată",
        desc: "EMS poate activa simultan un număr mare de unități motorii, inclusiv fibre cu prag mai înalt, ceea ce crește solicitarea musculară pentru un timp relativ scurt."
      },
      {
        title: "Cost energetic și EPOC",
        desc: "După efort, organismul menține un consum crescut de oxigen (EPOC), asociat cu refacerea rezervelor energetice, termoreglare și reparare tisulară."
      },
      {
        title: "Compoziție corporală",
        desc: "Menținerea/creșterea masei slabe în timpul unui proces de slăbire este un predictor important pentru rezultate estetice și funcționale."
      }
    ],
    science: "Studiile indică faptul că EMS, folosit ca adjuvant, poate îmbunătăți parametri precum forța și, în unele contexte, compoziția corporală, mai ales la persoane sedentare sau în programe structurate.",
    target: ["Persoane cu program încărcat", "Începători care vor un start ghidat", "Persoane care doresc un stimul de forță cu impact articular redus"],
    expectations: "Un obiectiv realist este îmbunătățirea compoziției corporale în 4–8 săptămâni, cu monitorizare. Slăbirea „rapidă” fără ajustări alimentare este rar sustenabilă.",
    seo: {
      title: "Slăbire Rapidă și Sănătoasă în Oradea | NeoBoost EMS",
      description: "Află cum tehnologia EMS accelerează metabolismul și arde calorii eficient. Slăbire rapidă, dar controlată, în Oradea. Studii și explicații științifice.",
      keywords: ["slăbire rapidă oradea", "slăbire ems", "metabolism accelerat", "ardere calorii", "pierdere greutate oradea"]
    }
  },
  {
    id: "dureri-spate",
    title: "Adio Dureri de Spate",
    subtitle: "Fără frică de mișcare",
    image: "/DSC04030.jpg",
    intro: "Scapă de dureri prin stabilitate. EMS activează musculatura profundă care susține coloana vertebrală, zonă dificil de lucrat prin exerciții convenționale.",
    mechanisms: [
      {
        title: "Creșterea capacității musculare",
        desc: "Întărirea musculaturii stabilizatoare poate reduce „costul” postural al activităților zilnice."
      },
      {
        title: "Modulare neuromusculară",
        desc: "Stimularea electrică poate îmbunătăți recrutarea și coordonarea în anumite contexte."
      },
      {
        title: "Reducerea fricii de mișcare",
        desc: "Expunerea gradată la efort, într-un cadru controlat, poate scădea kineziofobia și poate îmbunătăți funcția."
      }
    ],
    science: "Durerea nu este întotdeauna un indicator al „distrugerii” țesutului; pentru mulți oameni, încărcarea progresivă este benefică. Protocolul contează: intensitate, poziții, exerciții.",
    expectations: "Mulți clienți raportează îmbunătățiri funcționale în câteva săptămâni, dar obiectivul principal este: mai multă funcție, mai puțină evitare, mai mult control.",
    seo: {
      title: "Scapă de Durerile de Spate în Oradea | Kineto & EMS NeoBoost",
      description: "Soluții moderne pentru durerile de spate (lombare) în Oradea. Întărirea musculaturii paravertebrale prin EMS și mișcare controlată. Fără durere.",
      keywords: ["dureri de spate oradea", "tratament dureri spate", "kinetoterapie ems", "hernie de disc exercitii", "dureri lombare oradea"]
    }
  },
  {
    id: "tonifiere",
    title: "Tonifiere",
    subtitle: "Fără rușine la sală",
    image: "/DSC07624.jpg",
    intro: "Obține fermitate rapid. Impulsurile electrice stimulează intens fibrele musculare, oferindu-ți acel aspect 'fit' și tonifiat, fără ore nesfârșite de cardio.",
    mechanisms: [
      {
        title: "Activare musculară intensă",
        desc: "Utilă pentru persoane care nu au aderență la antrenamente lungi."
      },
      {
        title: "Stimul de forță cu control fin",
        desc: "Intensitatea se poate ajusta pe grupe musculare specific."
      },
      {
        title: "Componenta psihologică",
        desc: "Bariera majoră nu este fiziologia, ci contextul. Un cadru privat reduce stresul și crește probabilitatea de a menține rutina."
      }
    ],
    science: "Consistența este predictorul principal al „tonifierii”. EMS oferă un cadru de antrenament eficient și privat.",
    expectations: "Rezultate vizibile apar, de regulă, în 4–8 săptămâni, în funcție de frecvență, somn și alimentație.",
    seo: {
      title: "Tonifiere Musculară și Fermitate | Sala Fitness NeoBoost Oradea",
      description: "Tonifiere vizibilă și reducere celulită în Oradea. Antrenamente scurte și intense pentru un corp ferm. Tehnologie EMS pentru activare profundă.",
      keywords: ["tonifiere oradea", "sala fitness oradea", "reducere celulita", "corp ferm", "fitness femei oradea"]
    }
  },
  {
    id: "forta-performanta",
    title: "Forță & Performanță",
    subtitle: "Fără risc de accidentare",
    image: "/DSC07811.jpg",
    intro: "Dezvoltă forță pură fără a pune presiune pe articulații. EMS recrutează fibrele musculare rapide pentru o explozivitate și o putere greu de egalat.",
    mechanisms: [
      {
        title: "Recrutare de unități motorii",
        desc: "EMS poate crește activarea musculară și poate completa antrenamentul de forță."
      },
      {
        title: "Încărcare articulară redusă",
        desc: "Unele protocoale EMS pot oferi stimul muscular cu sarcini externe reduse, protejând articulațiile."
      },
      {
        title: "Transfer funcțional",
        desc: "Când EMS este combinat cu mișcări multiarticulare, adaptările pot fi relevante pentru viața reală și sport."
      }
    ],
    science: "Progresia graduală a intensității și recuperarea sunt cheia pentru performanță fără accidentări.",
    target: ["Persoane care vor să crească forța", "Sportivi amatori care folosesc EMS ca supliment"],
    expectations: "Creșteri ale forței pure și explozive, cu recuperare mai rapidă între sesiuni.",
    seo: {
      title: "Forță și Performanță Sportivă | Antrenament Personal Oradea",
      description: "Crește-ți forța și explozivitatea fără risc de accidentare. Antrenament personal EMS pentru performanță sportivă în Oradea. Recuperare rapidă.",
      keywords: ["antrenament forta oradea", "performanta sportiva", "recuperare sportivi", "personal trainer oradea"]
    }
  }
];

export const PROGRAMS = [
  {
    id: "kickstart",
    title: "6 Week Kickstart",
    subtitle: "SLĂBEȘTE 2–4 KG ȘI TE RECOMPENSĂM!",
    image: "/DSC00193.jpg",
    tag: "SLĂBIRE RAPIDĂ",
    tagColor: "bg-green-500",
    iconId: "zap",
    duration: "6 SĂPTĂMÂNI",
    idealFor: "Slăbire & Restart",
    benefit: "2–4 kg în 6 săptămâni",
    price: "1250 RON",
    stripePriceId: "price_1Sn27VJAtuHj34Deu1Rg7QZm", // Reusing Transform package ID for now
    description: "Slăbește sănătos 2–4 kg în 6 săptămâni. Un program structurat pentru oameni ocupați, cu recompense reale pentru disciplină.",
    content: "6 Week Kickstart (EMS)\n\nSLĂBEȘTE 2–4 KG ÎN 6 SĂPTĂMÂNI ȘI TE RECOMPENSĂM!\n\nProgramul ideal pentru cei care vor rezultate vizibile, rapid și sănătos.\n\nEști gata să faci o schimbare?\nAi nevoie de un start puternic? Kickstart este soluția completă: antrenament, nutriție simplă și responsabilitate.\n\n[WHATSAPP_LINK]\n\nBENEFICII CHEIE:\n✔️ Scazi 2–4 kg (grăsime, nu doar apă).\n✔️ Înveți să mănânci corect, fără să te înfometezi.\n✔️ Te simți mai energic și mai ușor.\n\nCE INCLUDE?\n- 18 Sesiuni EMS (30 min) – Activare metabolică maximă.\n- Plan Nutrițional Personalizat – Simplu și sustenabil.\n- Monitorizare Biometrică – Vedem progresul clar.\n- Grup de Suport – Motivație zilnică.\n\nBONUS: RECOMPENSA 3+1\nTe ții de treabă? Dacă continui cu un abonament de 3 luni, a 4-a lună este din partea noastră. Premiem seriozitatea!"
  },
  {
    id: "fit-mamma",
    title: "Fit Mamma",
    subtitle: "RECÂȘTIGĂ-ȚI ENERGIA DUPĂ NAȘTERE",
    image: "/DSC09363.jpg", // Confirmed female cinematic shot
    tag: "POST-NATAL SAFE",
    tagColor: "bg-pink-400",
    iconId: "baby",
    duration: "8 SĂPTĂMÂNI",
    idealFor: "Mămici Post-Natal",
    benefit: "Core, Postură & Energie",
    price: "1150 RON",
    stripePriceId: "price_1SojGiJAtuHj34DefHEYPwsL", // Reusing Health Pro ID
    description: "Energie și tonus după naștere. Reface postura și zona abdominală într-un ritm blând, controlat și sigur.",
    content: "Fit Mamma (Post-Natal Safe)\n\nRECÂȘTIGĂ-ȚI ENERGIA ȘI CORPUL DUPĂ NAȘTERE\n\nUn program special conceput pentru mămici: blând cu articulațiile, eficient pentru tonus.\n\nEști gata să faci o schimbare?\nȘtim că timpul tău este prețios. Fit Mamma îți oferă momentul tău de respiro și reconstrucție fizică.\n\n[WHATSAPP_LINK]\n\nBENEFICII CHEIE:\n✔️ Întărirea zonei 'Core' și a spatelui.\n✔️ Corectarea posturii afectate de sarcină.\n✔️ Mai multă energie pentru tine și bebe.\n\nCE INCLUDE?\n- 16 Sesiuni Hibrid (EMS + Funcțional) – Adaptate post-natal.\n- Evaluare Diastază & Postură – Siguranța primează.\n- Ghid de Nutriție pentru Energie – Fără diete restrictive.\n- Comunitate de Mămici – Nu ești singură în această călătorie.\n\nBONUS: RECOMPENSA 3+1\nContinuitatea contează. Alege un pachet de 3 luni după program și primești o lună cadou!"
  },
  {
    id: "semi-private",
    title: "Semi-Private Training",
    subtitle: "ATENȚIE PREMIUM, COST OPTIMIZAT",
    image: "/DSC01081.jpg",
    tag: "ANTRENOR PERSONAL GRUP",
    tagColor: "bg-blue-400",
    iconId: "users",
    duration: "FLEXIBIL",
    idealFor: "Cupluri / Prieteni",
    benefit: "Focus 1:1 la jumătate de preț",
    price: "500 RON / Pers",
    stripePriceId: "price_1Sn26zJAtuHj34DejlSl8LTE", // Reusing Starter ID
    description: "Antrenament personal la preț de grup. Împarte sesiunea cu 1-2 persoane și bucură-te de atenție premium și cost optimizat.",
    content: "Semi-Private Training\n\nANTRENAMENT PERSONAL, ÎN GRUP MIC\n\nBucură-te de atenția unui antrenor personal, împărțind costul cu încă o persoană.\n\nEști gata să faci o schimbare?\nIdeal pentru cupluri, prieteni sau pur și simplu pentru a te motiva alături de cineva, fără a pierde calitatea ghidajului.\n\n[WHATSAPP_LINK]\n\nBENEFICII CHEIE:\n✔️ Atenție 1:1 la un preț redus.\n✔️ Motivație extra din partea grupului.\n✔️ Flexibilitate în programare.\n\nCE INCLUDE?\n- Antrenamente EMS sau Funcționale în grup de 2-3.\n- Evaluare și Monitorizare pentru fiecare participant.\n- Acces la facilitățile Premium NeoBoost.\n\nBONUS: RECOMPENSA 3+1\nAntrenați-vă constant timp de 3 luni și a 4-a lună este gratuită pentru amândoi!"
  },
  {
    id: "8-week-transform",
    title: "8-Week Transformation",
    subtitle: "RECOMPOZIȚIE CORPORALĂ HYBRID",
    image: "/DSC03990.jpg",
    tag: "Protocol Complet",
    tagColor: "bg-purple-500",
    iconId: "muscle",
    duration: "8 SĂPTĂMÂNI",
    idealFor: "Transformare Vizibilă",
    benefit: "Arzi grăsime + Construiești mușchi",
    price: "1750 RON",
    stripePriceId: "price_1SojH4JAtuHj34DeHlplwGdS", // Reusing Sculpt Pro ID
    description: "Transformare totală. Combinația ideală de EMS și Antrenament Funcțional pentru a arde grăsime și a defini musculatura.",
    content: "8-Week Transformation (Hybrid)\n\nRECOMPOZIȚIE CORPORALĂ COMPLETĂ\n\nCel mai complex protocol NeoBoost: Tehnologie EMS + Forță Funcțională.\n\nEști gata să faci o schimbare?\nDacă vrei rezultate maxime, ai nevoie de abordarea Hybrid. Atacăm grăsimea și construim mușchi simultan.\n\n[WHATSAPP_LINK]\n\nBENEFICII CHEIE:\n✔️ Scădere în greutate și definire musculară.\n✔️ Creșterea rezistenței și a forței.\n✔️ Corp atletic și funcțional.\n\nCE INCLUDE?\n- 24 Sesiuni Intense (2x EMS + 1x Funcțional / săpt).\n- Plan Nutrițional pentru Recompoziție.\n- Monitorizare Biometrică Completă (Start, Mijloc, Final).\n- Suport prioritar din partea antrenorilor.\n\nBONUS: RECOMPENSA 3+1\nTransformarea continuă! După cele 8 săptămâni, intră într-un abonament de 3 luni și primești o lună cadou."
  },
  {
    id: "30-day-lifestyle",
    title: "30-day Lifestyle",
    subtitle: "RESET DE OBICEIURI ȘI ENERGIE",
    image: "/DSC04229.jpg",
    tag: "HACKING RUTINĂ",
    tagColor: "bg-orange-500",
    iconId: "calendar",
    duration: "30 DE ZILE",
    idealFor: "Energie & Disciplină",
    benefit: "Reset Mental și Fizic",
    price: "710 RON",
    stripePriceId: "price_1Sn27EJAtuHj34De3fuwYpS6", // Reusing Progress Package (8 sessions) - Perfect Match
    description: "Reset rapid. 30 de zile de disciplină și mișcare pentru a-ți recăpăta energia și ritmul de viață sănătos.",
    content: "30-day Lifestyle Reset\n\nRECÂȘTIGĂ-ȚI RITMUL ÎN 30 DE ZILE\n\nUn impuls scurt și puternic pentru a ieși din inerție și a-ți reactiva corpul.\n\nEști gata să faci o schimbare?\nNu ai nevoie de ani de zile să te simți bine. În 30 de zile poți schimba totul.\n\n[WHATSAPP_LINK]\n\nBENEFICII CHEIE:\n✔️ Energie de la prima oră a dimineții.\n✔️ Somn mai odihnitor.\n✔️ Tonus muscular îmbunătățit.\n\nCE INCLUDE?\n- 8 Sesiuni la alegere (EMS sau Funcțional).\n- Protocol de 'Rutină de Dimineață'.\n- Ghid de Nutriție Simplificat.\n- Check-in săptămânal.\n\nBONUS: RECOMPENSA 3+1\nTransformă reset-ul în stil de viață. Continuă cu un pachet de 3 luni și primești o lună gratuit."
  },
  {
    id: "on-boarding",
    title: "On-Boarding (Start Smart)",
    subtitle: "FUNDAȚIE SOLIDĂ ÎN 14 ZILE",
    image: "/DSC07054.jpg",
    tag: "START INTELIGENT",
    tagColor: "bg-cyan-400",
    iconId: "target",
    duration: "14 ZILE",
    idealFor: "Noi Clienți",
    benefit: "Evaluare, Planificare, Testare",
    price: "250 RON",
    stripePriceId: "price_1Sn26zJAtuHj34DejlSl8LTE", // Reusing Starter for now (or needs separate)
    description: "Start inteligent. 14 zile de evaluare și învățare pentru a te asigura că pornești corect la drum cu NeoBoost.",
    content: "On-Boarding (Start Smart)\n\nFUNDAȚIA SUCCESULUI TĂU\n\n14 Zile în care învățăm despre corpul tău și setăm planul perfect.\n\nEști gata să faci o schimbare?\nNu ghici, planifică. Start Smart este garanția că investiția ta va da roade.\n\n[WHATSAPP_LINK]\n\nBENEFICII CHEIE:\n✔️ Înțelegi exact de ce are nevoie corpul tău.\n✔️ Înveți tehnica corectă de execuție.\n✔️ Stabilești obiective realiste.\n\nCE INCLUDE?\n- Consultație și Analiză Corporală Avansată.\n- 2-4 Sesiuni de Calibrare și Învățare.\n- Plan de Acțiune Personalizat.\n\nBONUS: RECOMPENSA 3+1\nIntră direct într-un abonament de 3 luni după On-Boarding și primești a 4-a lună CADOU."
  },
  {
    id: "vip",
    title: "Invitation-Only (VIP)",
    subtitle: "PREMIUM EXCLUSIV PE INVITAȚIE",
    image: "/DSC04717.jpg",
    tag: "CONCIERGE FITNESS",
    tagColor: "bg-yellow-500",
    iconId: "crown",
    duration: "CUSTOM",
    idealFor: "Discreție & Prioritate",
    benefit: "Atenție 100% dedicată",
    price: "CUSTOM",
    // No stripePriceId for VIP - Enquiry Only
    description: "Experiență exclusivistă. Discreție totală, program flexibil și servicii complete de tip concierge pentru cei mai exigenți clienți.",
    content: "Invitation-Only (VIP)\n\nFITNESS LA CEL MAI ÎNALT NIVEL\n\nServicii de concierge fitness, intimitate totală și rezultate excepționale.\n\nEști gata să faci o schimbare?\nPentru cei care nu fac compromisuri. Timpul tău, regulile tale, expertiza noastră.\n\n[WHATSAPP_LINK]\n\nBENEFICII CHEIE:\n✔️ Programare prioritară și flexibilă.\n✔️ Spațiu complet privat.\n✔️ Servicii All-Inclusive (echipament, prosoape, shake-uri).\n\nCE INCLUDE?\n- Antrenament 100% Personalizat (Orice tip).\n- Monitorizare continuă a sănătății și performanței.\n- Acces direct la Head Coach.\n\nBONUS: RECOMPENSA 3+1\nExcelența este standardul. Menține standardul timp de 3 luni și primești o lună de menținere cadou."
  }
];

export const RICH_TRANSFORMATIONS = [
  {
    id: "alex-d",
    name: "ALEX D.",
    program: "MASTER BODY",
    duration: "2 LUNI ȘI JUMĂTATE",
    quote: "Rezultatele vorbesc de la sine. Grăsimea s-a topit, iar masa musculară a crescut vizibil. Nu am crezut că 30 min pot face asta.",
    images: {
      before: "/transformation_real_before.jpg",
      after: "/transformation_real_after.png",
      isCombined: false
    },
    stats: [
      { label: "WEIGHT", start: 106.3, end: 93.4, change: "-12.9", unit: "kg", color: "text-blue-500" },
      { label: "BODY FAT", start: 38.5, end: 24.1, change: "-14.4", unit: "%", color: "text-green-500" },
      { label: "MUSCLE", start: 30.1, end: 35.6, change: "+5.5", unit: "%", color: "text-purple-500" },
      { label: "METABOLISM", start: 1850, end: 2100, change: "+250", unit: "kcal", color: "text-orange-500" }
    ]
  },
  {
    id: "maria-t",
    name: "MARIA T.",
    program: "WEIGHT LOSS",
    duration: "4 LUNI",
    quote: "M-am simțit mai ușoară încă din prima lună. Talia s-a subțiat vizibil, fără diete extreme.",
    images: {
      combined: "/transformation_3.png",
      isCombined: true,
      styleBefore: { objectPosition: '0% center' },
      styleAfter: { objectPosition: '100% center' }
    },
    stats: [
      { label: "WEIGHT", start: 62.6, end: 58.5, change: "-4.1", unit: "kg", color: "text-blue-500" },
      { label: "ABDOMEN", start: 95, end: 86, change: "-9", unit: "cm", color: "text-blue-400" },
      { label: "WAIST", start: 80, end: 72, change: "-8", unit: "cm", color: "text-pink-500" },
      { label: "METABOLISM", start: 1380, end: 1550, change: "+170", unit: "kcal", color: "text-orange-500" }
    ]
  },
  {
    id: "andreea-m",
    name: "ANDREEA M.",
    program: "FIT MAMMA",
    duration: "2 LUNI",
    quote: "După sarcină, talia mea arată din nou bine. Chiar funcționează! Mușchii profunzi s-au activat imediat.",
    images: {
      combined: "/transformation_female_real_combined.jpg",
      isCombined: true,
      styleBefore: { objectPosition: '0% center' },
      styleAfter: { objectPosition: '100% center' }
    },
    stats: [
      { label: "WAIST", start: 70, end: 61, change: "-9", unit: "cm", color: "text-pink-500" },
      { label: "ABDOMEN", start: 77, end: 66, change: "-11", unit: "cm", color: "text-blue-400" },
      { label: "BACK", start: 105, end: 100, change: "-5", unit: "cm", color: "text-purple-500" }
    ]
  },
  {
    id: "emanuel-h",
    name: "EMANUEL H.",
    program: "MASTER BODY",
    duration: "7 LUNI",
    quote: "Minus 27cm în talie și abdomen. Cifrele vorbesc de la sine. EMS este viitorul antrenamentului eficient.",
    images: {
      combined: "/emanuel_h_aligned.png",
      isCombined: true,
      styleBefore: { objectPosition: '0% center', transform: 'scale(1.08)' },
      styleAfter: { objectPosition: '100% center' }
    },
    stats: [
      { label: "WAIST", start: 107, end: 80, change: "-27", unit: "cm", color: "text-blue-500" },
      { label: "ABDOMEN", start: 115, end: 88, change: "-27", unit: "cm", color: "text-red-500" },
      { label: "HIPS", start: 115, end: 102, change: "-13", unit: "cm", color: "text-purple-500" }
    ]
  },
  {
    id: "dani-p",
    name: "DANI P.",
    program: "MASTER BODY",
    duration: "2 LUNI",
    quote: "Am slăbit mult și am pus mușchi rapid. În 2 luni se vede diferența clar. Recomand programul Hybrid.",
    images: {
      combined: "/dani_p_aligned.png",
      isCombined: true,
      styleBefore: { objectPosition: '10% center', transform: 'scale(1.1)' },
      styleAfter: { objectPosition: '90% center', transform: 'scale(1.1)' }
    },
    stats: [
      { label: "WEIGHT", start: 116, end: 106, change: "-10", unit: "kg", color: "text-blue-500" },
      { label: "BODY FAT", start: 25, end: 17, change: "-8", unit: "%", color: "text-green-500" },
      { label: "MUSCLE", start: 39, end: 41.5, change: "+2.5", unit: "%", color: "text-purple-500" }
    ]
  }
];

export const TRANSFORMATIONS = [
  {
    id: 1,
    name: "Alex D.",
    duration: "2 Luni și jumătate",
    package: "Master Body",
    imageBefore: "/transformation_real_before.jpg",
    imageAfter: "/transformation_real_after.png",
    metrics: {
      weight: { start: 106.3, end: 93.4, unit: "kg" },
      bodyFat: { start: 38.5, end: 24.1, unit: "%" },
      muscle: { start: 30.1, end: 35.6, unit: "%" },
      bmr: { start: 1850, end: 2100, unit: "kcal", label: "Metabolism" },
      amr: { start: 2400, end: 2850, unit: "kcal", label: "Activ" }
    },
    aspectRatio: "aspect-square",
    // Manual alignment for pixel-perfect comparison
    styleBefore: { objectPosition: 'center top' },
    styleAfter: { objectPosition: 'center top' },
    quote: "Rezultatele vorbesc de la sine. Grăsimea s-a topit, iar masa musculară a crescut vizibil."
  },
  {
    id: 2,
    name: "Andreea M.",
    duration: "2 Luni",
    package: "Fit Mamma",
    imageBefore: "/andreea_m_fixed.jpg",
    imageAfter: "/andreea_m_fixed.jpg",
    metrics: {
      weight: { start: 70, end: 61, unit: "cm", label: "Talie" },
      bodyFat: { start: 77, end: 66, unit: "cm", label: "Abdomen" },
      muscle: { start: 105, end: 100, unit: "cm", label: "Spate" },
      bmr: { start: 1450, end: 1620, unit: "kcal", label: "Metabolism" },
      amr: { start: 1800, end: 2200, unit: "kcal", label: "Activ" }
    },
    aspectRatio: "aspect-[4/5]",
    // Combined image split logic: Zoom 200% and shift
    styleBefore: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '0% 0%', objectFit: 'cover' },
    styleAfter: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '100% 0%', objectFit: 'cover' },
    quote: "După sarcină, talia mea arată din nou bine. Chiar funcționează."
  },
  {
    id: 3,
    name: "Maria T.",
    duration: "4 Luni",
    package: "Weight Loss",
    imageBefore: "/transformation_3.png",
    imageAfter: "/transformation_3.png",
    metrics: {
      weight: { start: 62.6, end: 58.5, unit: "kg", label: "Greutate" },
      bodyFat: { start: 95, end: 86, unit: "cm", label: "Abdomen" },
      muscle: { start: 80, end: 72, unit: "cm", label: "Talie" },
      bmr: { start: 1380, end: 1550, unit: "kcal", label: "Metabolism" },
      amr: { start: 1700, end: 2100, unit: "kcal", label: "Activ" }
    },
    aspectRatio: "aspect-[4/5]",
    // Combined image split logic
    styleBefore: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '0% 0%', objectFit: 'cover' },
    styleAfter: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '100% 0%', objectFit: 'cover' },
    quote: "M-am simțit mai ușoară încă din prima lună. Talia s-a subțiat vizibil, fără diete extreme."
  },
  {
    id: 4,
    name: "Emanuel H.",
    duration: "7 Luni",
    package: "Master Body",
    imageBefore: "/emanuel_h.png",
    imageAfter: "/emanuel_h.png",
    metrics: {
      weight: { start: 107, end: 80, unit: "cm", label: "Talie" },
      bodyFat: { start: 115, end: 88, unit: "cm", label: "Abdomen" },
      muscle: { start: 115, end: 102, unit: "cm", label: "Bazin" },
      bmr: { start: 1900, end: 2250, unit: "kcal", label: "Metabolism" },
      amr: { start: 2500, end: 3100, unit: "kcal", label: "Activ" }
    },
    aspectRatio: "aspect-[4/5]",
    // Combined image split logic
    // Scaling UP Before to match the "zoomed" look of After
    styleBefore: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '0% 0%', objectFit: 'cover', transform: 'scale(1.08)' },
    styleAfter: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '100% 0%', objectFit: 'cover' },
    quote: "Minus 27cm în talie și abdomen. Cifrele vorbesc de la sine."
  },
  {
    id: 5,
    name: "Dani P.",
    duration: "2 Luni",
    package: "Master Body",
    imageBefore: "/dani_p_aligned.png",
    imageAfter: "/dani_p_aligned.png",
    metrics: {
      weight: { start: 116, end: 106, unit: "kg", label: "Greutate" },
      bodyFat: { start: 25, end: 17, unit: "%", label: "Grăsime" },
      muscle: { start: 39, end: 41.5, unit: "%", label: "Muschi" },
      bmr: { start: 2100, end: 2450, unit: "kcal", label: "Metabolism" },
      amr: { start: 2800, end: 3400, unit: "kcal", label: "Activ" }
    },
    aspectRatio: "aspect-[9/16]",
    // Combined image split logic
    // Panning images away from center to separate subjects
    styleBefore: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '10% 0%', objectFit: 'cover', transform: 'scale(1.1)' },
    styleAfter: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '90% 0%', objectFit: 'cover', transform: 'scale(1.1)' },
    quote: "Am slăbit mult și am pus mușchi rapid. În 2 luni se vede diferența clar."
  }
];
