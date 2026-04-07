
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
  level?: string;      // New Gamification Field
  achievement?: string; // New Gamification Field
  type?: 'text' | 'video' | 'photo'; // New Mixed Media Field
  videoUrl?: string;
  coverImage?: string;
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
    title: "Unde a început",
    description: "Luigi Galvani descoperă că mușchii răspund la impulsuri electrice ⚡. Prima sclipire a EMS-ului.",
    icon: <Microscope size={20} />,
    image: "/ems_1780.webp"
  },
  {
    year: "1960",
    title: "Secretul sovieticilor",
    description: "Rușii folosesc electrostimularea pe sportivi și obțin creșteri de 40% în forță 💪. Tehnologia era ținută secret 🤫.",
    icon: <Medal size={20} />,
    image: "/ems_1960.webp"
  },
  {
    year: "2010",
    title: "Primele săli EMS",
    description: "Apar primele studiouri comerciale, dar cu echipamente greoaie: cabluri 🔌, costum ud 💧, disconfort.",
    icon: <Dumbbell size={20} />,
    image: "/ems_2010.webp"
  },
  {
    year: "2024+",
    title: "Cum arătă azi",
    description: "La NeoBoost avem costum uscat, wireless, fără cabluri 🚀. Te echipezi în 30 secunde și ești gata ⏱️.",
    icon: <Zap size={20} />,
    isNeo: true,
    image: "/powerbox_lifestyle.webp",
    details: [
      { name: "PowerBox", description: "Unitatea de control care se prinde magnetic pe costum 🧲. Super ușoară." },
      { name: "Costumul Uscat", description: "Al tău personal. Nu-l împărți cu nimeni și nu trebuie umezit 🌵." },
      { name: "Tableta de control", description: "Unde antrenorul tău ajustează intensitatea pentru fiecare grupă de mușchi 📱." }
    ]
  }
];

export const EMS_STEPS = [
  {
    id: "01",
    title: "Stăm de vorbă 🗣️",
    description: "Aflăm ce ți-ai dori (slăbire, spate, energie? 🔋) și dacă ai vreo condiție medicală de care să ținem cont.",
    icon: <Users size={20} />
  },
  {
    id: "02",
    title: "Te echipăm 👕",
    description: "Primești hainele speciale, îmbraci costumul și setăm intensitatea să fie confortabilă pentru tine ✨.",
    icon: <Shirt size={20} />
  },
  {
    id: "03",
    title: "Antrenamentul (30 min) ⏱️",
    description: "Faci exerciții simple ghidate de antrenor în timp ce costumul îți lucrează mușchii. Nu e Șoc, nu doare 💆.",
    icon: <Zap size={20} />
  },
  {
    id: "04",
    title: "După antrenament 🎉",
    description: "Discutăm cum te-ai simțit, ce-am observat noi și când ne vedem următoarea dată 📅.",
    icon: <CheckCheck size={20} />
  }
];



export const EMS_OBJECTIVES = [
  { title: "Slăbire & Metabolism 🔥", level: 95, color: "#3A86FF", icon: <Flame size={16} /> },
  { title: "Tonifiere Musculară 💪", level: 90, color: "#3A86FF", icon: <Target size={16} /> },
  { title: "Sănătatea Coloanei 🦴", level: 85, color: "#3A86FF", icon: <Accessibility size={16} /> },
  { title: "Performanță Atletică 🏃", level: 80, color: "#3A86FF", icon: <Zap size={16} /> },
  { title: "Recuperare Medicală 🏥", level: 75, color: "#3A86FF", icon: <ShieldCheck size={16} /> }
];

export const EMS_PROTOCOL = {
  title: "Tehnologia Drysuit EMS 🧬",
  subtitle: "Standardul de Elită în Antrenamentul EMS Wireless",
  description: "NeoBoost redefinește stimularea musculară prin eliminarea barierei de apă 🚫💧. Tehnologia noastră Electrical Muscle Stimulation permite antrenamente dinamice, fără cabluri, pe un costum complet uscat.",
  comparisons: [
    {
      label: "Uscat vs Umed",
      visionBody: "Fără apă 🌵. Fără senzație de rece. Confort și igienă maximă.",
      others: "Necesită umezire 🚿. Disconfort termic. Pregătire lentă.",
      icon: <Wind className="w-5 h-5" />
    },
    {
      label: "Mobilitate",
      visionBody: "Wireless Total 📡. Libertate 100% pentru mișcări complexe.",
      others: "Limitat de cabluri 🔗 sau stații fixe. Mișcări restricționate.",
      icon: <ZapOff className="w-5 h-5" />
    },
    {
      label: "Material Hi-Tech",
      visionBody: "Fibre de carbon integrate 🔬. Antibacterian și respirabil.",
      others: "Neopren greu sau materiale sintetice standard.",
      icon: <Layers className="w-5 h-5" />
    }
  ],
  techDetails: [
    "Fibre de argint și carbon integrate direct în țesătură pentru conductivitate optimă pe pielea uscată ⚡.",
    "Power Box lateral cu algoritmi de frecvență variabilă pentru a preveni adaptarea musculară 🧠.",
    "Sistem de compresie anatomică ce garantează contactul perfect al celor 20 de electrozi 🎯."
  ]
};

export const TECH_COMPONENTS = [
  {
    id: "drysuit",
    title: "Costumul NeoBoost Drysuit 👔",
    description: "Inima sistemului nostru ❤️. Creat dintr-o țesătură inteligentă care nu necesită umezire. Electrozii transmit impulsuri direct pe pielea uscată, oferind libertate totală. Acest sistem permite antrenorului personal să corecteze postura în timp real 👀.",
    image: "/studio_session_1.webp",
    video: "https://youtube.com/shorts/Zm-QlF8dA4M",
    features: ["Antibacterian 🛡️", "Fără cabluri ✂️", "Compresie Anatomică 📐"]
  },
  {
    id: "powerbox",
    title: "Power Box NeoBoost 🔋",
    description: "Unitatea centrală wireless care se atașează magnetic 🧲. Generează impulsuri complexe pentru 20 de grupe musculare simultan via Bluetooth.",
    image: "/powerbox_lifestyle.webp",
    video: "https://youtube.com/shorts/zelq4lbvDnw",
    features: ["Bluetooth Low Energy 📶", "Baterie Li-Ion ⚡", "Contact Magnetic 🔗"]
  },
  {
    id: "control",
    title: "Interfața de Control 📱",
    description: "Aplicație intuitivă utilizată de antrenor pentru a calibra intensitatea în timp real. Permite monitorizarea progresului și ajustarea programului pe loc 📊.",
    image: "/tablet_combo.webp",
    video: "https://youtube.com/shorts/HhxM2OteZNE",
    features: ["20 de Canale 🎚️", "Presetări Inteligente 🧠", "Feedback Biometric 💓"]
  }
];

// Merged Benefits & Solutions Data
export const UNIFIED_BENEFITS = [
  {
    id: "slabire",
    title: "Slăbire care ține",
    subtitle: "ARZI ȘI DUPĂ CE PLECI 🔥",
    icon: <Flame className="w-8 h-8" />,
    desc: "Nu te înfometa 🍔🚫. Pune-ți corpul să ardă singur. După 30 de minute aici, metabolismul tău rămâne ridicat până la 3 zile ⏳.",
    image: "/Antrenament Metabolic.webp",
    content: {
      intro: "Nu credem în diete de înfometare. Credem în a-ți accelera metabolismul 🚀 astfel încât corpul să ardă grasimi chiar și când dormi 😴.",
      science: "Se cheamă efectul EPOC – corpul consuma oxigen suplimentar după antrenament și arde calorii pentru a se reface. Noi îl declanșăm la maxim 💯.",
      mechanisms: [
        "Metabolism accelerat chiar și în zilele de pauză 🛋️.",
        "Consum de 400-600 calorii pe ședință 🔥.",
        "Scăderea grăsimii de pe burtă (viscerală) 📉."
      ],
      expectations: "Vei vedea circumferințele scăzând fără să pierzi forță. Hainele vor sta altfel 👗."
    },
    cta: "Vreau să slăbesc",
    badge: "🔥 TOP REZULTATE"
  },
  {
    id: "dureri",
    title: "Gata cu durerile de spate",
    subtitle: "SPATE PUTERNIC, NU DUREROS 🦴",
    icon: <ShieldCheck className="w-8 h-8" />,
    desc: "Dacă te doare spatele în fiecare dimineață 🌅, nu e de la bătrânețe. E de la mușchi slabi. Noi îi întărim fără să forțăm coloana.",
    image: "/DSC04030.webp",
    content: {
      intro: "Durerile de spate vin de cele mai multe ori de la mușchi care nu-și fac treaba. Nu punem mai multă presiune pe coloană, ci întărim mușchii care o susțin 🏗️.",
      science: "Studiile arată că 88% dintre oamenii cu dureri lombare cronice au scăpat de ele după 6 săptămâni de EMS 📊.",
      mechanisms: [
        "Activăm mușchii profunzi din jurul coloanei 🎯.",
        "Postura se corectează natural 🧍.",
        "Tensiunile și contracturile se relaxează 😌."
      ],
      expectations: "După primele ședințe simți diferența. După 2 luni, durerile pot dispărea complet ✨."
    },
    cta: "Vreau spate fără dureri",
    badge: "✅ 88% SUCCES"
  },
  {
    id: "tonifiere",
    title: "Piele fermă, nu lăsată",
    subtitle: "SCULPTĂM, NU UMFLĂM 🍑",
    icon: <Target className="w-8 h-8" />,
    desc: "Nu vrei mușchi mari 🦍. Vrei o siluetă conturată și piele care nu atârnă. Tonifiere musculară EMS targetează zonele unde ai nevoie de lifting.",
    image: "/Ems Pilates.webp",
    content: {
      intro: "Fermitatea nu vine din volum, ci din densitate musculară. Targetăm zonele unde ai nevoie de lifting – fese, abdomen, brațe 💪.",
      science: "Impulsurile stimulează circulația și producția de colagen 🧬. Pielea mai netedă, celulita mai puțin vizibilă.",
      mechanisms: [
        "Drenaj limfatic îmbunătățit 🌊.",
        "Tonifierea zonelor încăpățânate 🎯.",
        "Efect de lifting fără intervenție 💉🚫."
      ],
      expectations: "După o lună, pielea e mai fermă la atingere. Formele mai conturate ✨."
    },
    cta: "Vreau să mă tonifiez"
  },
  {
    id: "performanta",
    title: "Forță fără greutăți mari",
    subtitle: "MAI RAPID, MAI PUTERNIC 🐆",
    icon: <Zap className="w-8 h-8" />,
    desc: "Mulți sportivi folosesc EMS ca să câștige forță fără să-și uzeze genunchii și spatele 🛡️.",
    image: "/Ionut Maris-program forta jpg.webp",
    content: {
      intro: "Nu trebuie să ridici 100 kg ca să devii mai puternic. EMS activează fibrele musculare rapide – cele responsabile de explozivitate 💥.",
      science: "Corpul păstrează o rezervă de forță pe care nu o accesează ușor. EMS te ajută să ajungi la ea fără riscuri 🔓.",
      mechanisms: [
        "Recrutare musculară de 90%+ din fibre 📈.",
        "Crești viteza de reacție ⚡.",
        "Reduci riscul de accidentări prin echilibru muscular ⚖️."
      ],
      expectations: "Vei fi mai rapid, mai puternic și corpul tău va răspunde mai bine la efort 🏆."
    },
    cta: "Vreau să performez"
  },
  {
    id: "timp",
    title: "Nu ai timp? Perfect.",
    subtitle: "30 MIN = 90 MIN SALĂ ⏳",
    icon: <Clock className="w-8 h-8" />,
    desc: "2 ore pe zi la sală e un lux 💎. Aici faci într-o jumătate de oră cât alții într-o săptămână.",
    image: "/DSC04229.webp",
    content: {
      intro: "Trăim în secolul vitezei 🚅. Nu-ți mai bate capul cu sală, trafic, dușuri... Vii la noi 30 min și gata.",
      science: "Luăm volumul de muncă a 4 zile de sală și-l comprimăm în 2 ședințe pe săptămână 📉.",
      mechanisms: [
        "Antrenament full-body la fiecare ședință 🏋️‍♂️.",
        "Zero timp pierdut cu așteptat ⏱️.",
        "Efect hormonal similar cu antrenamentul clasic 🧬."
      ],
      expectations: "Mai mult timp pentru ce contează, cu un corp mai fit decât oricind ✨."
    },
    cta: "Vreau eficiență",
    badge: "⚡ ECONOMISEȘTI TIMP"
  },
  {
    id: "uscat",
    title: "Costum uscat. Fără apă. Fără frig.",
    subtitle: "TEHNOLOGIE WIRELESS 📡",
    icon: <Wind className="w-8 h-8" />,
    desc: "La alte studiouri te udă și ți-e frig 🥶. La noi, costumul e uscat, personal și wireless. Te echipezi în 30 de secunde.",
    image: "/studio_session_1.webp",
    content: {
      intro: "Tehnologia noastră nu are nevoie de apă ca să conducă impulsurile. E mai confortabil și mai igienic ✨.",
      science: "Fibrele de carbon din costum conduc impulsul direct pe pielea uscată. E viitorul EMS-ului 🚀.",
      mechanisms: [
        "Nicio senzație de frig sau umezeală ☀️.",
        "Te echipezi în 30 de secunde ⏱️.",
        "Mobilitate 100% fără cabluri 🤸."
      ],
      expectations: "O experiență plăcută care nu te face să tremuri de frig."
    },
    cta: "Vreau să încerc"
  }
];

export const MONTHLY_PACKAGES: NeoPackage[] = [
  {
    title: "STARTER 🌱",
    sessionCount: "4",
    duration: "1 ȘEDINȚĂ / SĂPTĂMÂNĂ",
    price: "460 RON",
    stripePriceId: "price_1Sn26zJAtuHj34DejlSl8LTE",
    pricePerSession: "115",
    idealFor: "Începători sau întreținere",
    features: [
      "Plan Alimentar Inclus 🥗",
      "Abonament Sală (Acces Gratuit) 🏋️",
      "Măsurători & Analiză Corporală 📊",
      "Coaching & Suport 🤝",
      "Corectarea posturii 🧘"
    ]
  },
  {
    title: "PROGRESS 🚀",
    sessionCount: "8",
    duration: "2 ȘEDINȚE / SĂPTĂMÂNĂ",
    price: "710 RON",
    stripePriceId: "price_1Sn27EJAtuHj34De3fuwYpS6",
    pricePerSession: "89",
    idealFor: "Slăbire și tonifiere rapidă",
    isRecommended: true,
    features: [
      "Plan Alimentar Inclus 🥗",
      "Abonament Sală (Acces Gratuit) 🏋️",
      "Măsurători & Analiză Corporală 📊",
      "Coaching & Suport 🤝",
      "Rezultate vizibile rapid ✨"
    ]
  },
  {
    title: "TRANSFORM 🔥",
    sessionCount: "10",
    duration: "MIX: 2 SĂPT x 2 / 2 SĂPT x 3",
    price: "850 RON",
    stripePriceId: "price_1Sn27VJAtuHj34Deu1Rg7QZm",
    pricePerSession: "85",
    isPremium: true,
    idealFor: "Transformare intensivă",
    features: [
      "Plan Alimentar Inclus 🥗",
      "Abonament Sală (Acces Gratuit) 🏋️",
      "Măsurători & Analiză Corporală 📊",
      "Coaching & Suport 🤝",
      "Arderea grăsimilor accelerată 🔥"
    ]
  },
  {
    title: "ELITE 👑",
    sessionCount: "12",
    duration: "3 ȘEDINȚE / SĂPTĂMÂNĂ",
    price: "900 RON",
    stripePriceId: "price_1Sn27lJAtuHj34De1oDYCy22",
    pricePerSession: "75",
    idealFor: "Performanță maximă",
    features: [
      "Plan Alimentar Inclus 🥗",
      "Abonament Sală (Acces Gratuit) 🏋️",
      "Măsurători & Analiză Corporală 📊",
      "Coaching & Suport 🤝",
      "Definire musculară avansată 💪"
    ]
  }
];

export const QUARTERLY_PACKAGES: NeoPackage[] = [
  {
    title: "Health Pro",
    sessionCount: "12 + 4 BONUS",
    duration: "4 LUNI (3 PLĂTITE + 1 CADOU)",
    price: "1150 RON",
    stripePriceId: "price_1T92idJAtuHj34DejqLt3FVH",
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
    idealFor: "Reconstrucție totală și performanță",
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
    name: "Hotel Ramada 🏨",
    address: "Calea Aradului nr. 9, Oradea",
    description: "Un spațiu premium, relaxant, echipat cu cele mai noi stații de antrenament NeoBoost ✨.",
    perks: ["Parcare privată 🅿️", "Zonă de relaxare 🛋️", "Atmosferă exclusivistă 🥂"],
    calendlyUrl: "https://calendly.com/neoboost-ramada",
    gallery: [
      "/sala ramada.jpg",
      "/ramada_ems_1.webp",
      "/ramada_ems_2.webp",
      "/ramada_ems_3.webp",
      "/ramada_ems_4.webp",
      "/ramada_ems_5.webp",
      "/ramada_ems_6.webp",
      "/ramada_ems_7.webp",
      "/ramada_ems_8.webp"
    ]
  },
  {
    id: "getfit",
    name: "Sala GetFit 🏋️",
    address: "Lotus Center, Nufărului, Oradea",
    description: "O locație energică, plină de lumină naturală, ideală pentru antrenamente dinamice ⚡.",
    perks: ["Locație centrală 📍", "Lumină naturală ☀️", "Acces facil 🚶"],
    calendlyUrl: "https://calendly.com/neoboost-getfit",
    gallery: [
      "/Ionut_Maris_Get_fit.webp",
      "/Sala_Get_fit.webp",
      "/Ionut_Maris_1.webp",
      "/Ionut_Maris_2.webp",
      "/Ionut_Maris_3.webp",
      "/getfit.webp",
      "/getfit_ems_1.webp",
      "/getfit_ems_2.webp",
      "/getfit_ems_3.webp"
    ]
  }
];

export const FAQS: NeoFAQItem[] = [
  {
    question: "Cât durează o ședință EMS?",
    answer: "O ședință completă durează aproximativ 30 de minute. Din acestea, 20–25 de minute sunt efectiv antrenament sub supravegherea antrenorului, iar restul timp este pentru evaluare, echipare și scurte recomandări la final.",
    icon: <Clock size={24} />
  },
  {
    question: "Câte ședințe îmi trebuie ca să văd rezultate?",
    answer: "Depinde de punctul de plecare și de obiectivul tău. Mulți clienți observă primele schimbări de tonus și energie după 4–6 ședințe, iar rezultate vizibile pe centimetri și greutate apar, în general, după 8–12 ședințe făcute constant. Antrenorul îți propune un plan realist încă de la început.",
    icon: <Target size={24} />
  },
  {
    question: "EMS mă ajută să slăbesc sau doar să îmi tonifiez mușchii?",
    answer: "EMS poate contribui atât la slăbire, cât și la tonifiere, pentru că antrenamentul este intens și activează un număr mare de fibre musculare într-un timp scurt. Rezultatul final depinde însă și de alimentație, somn și stil de viață. În studio, te ajutăm cu recomandări simple, ușor de aplicat, astfel încât ședințele să aibă efect maxim.",
    icon: <Flame size={24} />
  },
  {
    question: "Este dureros antrenamentul EMS? Ce simt în timpul ședinței?",
    answer: "Nu ar trebui să doară. În timpul ședinței simți contracții ferme ale mușchilor, ca un soi de „vibrație” intensă, dar controlată. Intensitatea se ajustează de către antrenor în funcție de cum te simți, astfel încât să fie provocator, dar suportabil. Dacă apare orice disconfort, intensitatea se reduce imediat.",
    icon: <Activity size={24} />
  },
  {
    question: "Pot să fac EMS dacă am probleme de sănătate?",
    answer: "Dacă știi că ai probleme de sănătate, e important să discuți înainte cu medicul tău și să îl întrebi dacă un astfel de antrenament este potrivit pentru tine. Există situații în care EMS nu este recomandat (de exemplu, pacemaker, anumite afecțiuni cardiace grave, intervenții chirurgicale recente etc.). Spune-i antrenorului despre orice diagnostic ai, ca să vadă dacă e nevoie de acordul unui medic înainte de a începe.",
    icon: <HeartPulse size={24} />
  },
  {
    question: "Ce trebuie să fac înainte și după o ședință EMS?",
    answer: "Înainte de ședință, ideal este să fii hidratat și să nu vii imediat după o masă foarte grea. Hainele de bază ți le recomandăm noi. După ședință, te ajută să bei apă, să ai o masă echilibrată și să lași corpului timp să se refacă. Antrenorul îți dă câteva repere simple pe care să le urmezi acasă.",
    icon: <Droplets size={24} />
  },
  {
    question: "Pot să combin EMS cu alte tipuri de sport?",
    answer: "Da, mulți clienți folosesc EMS ca supliment la alte activități (alergare, sală, sporturi de echipă). În funcție de nivelul tău, antrenorul îți poate sugera cum să combini antrenamentele astfel încât să nu exagerezi cu efortul și să eviți suprasolicitarea.",
    icon: <Layers size={24} />
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
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    level: "Level 12",
    achievement: "Waistline Warrior"
  },
  {
    name: "Mustafa Dalkilic",
    role: "Transformare (-18kg)",
    quote: "Echipa super serioasa si punctuala, locatia super curata. In 3 luni am ajuns de la 139 kg la 120.5! Recomand cu incredere, odata incercat provoaca dependenta.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Mustafa+Dalkilic&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    level: "Elite Member",
    achievement: "Transformare Totală (-18kg)"
  },
  {
    name: "Maria Marc",
    role: "Rezultate (-15kg)",
    quote: "Recomand cu încredere acest centru. Pe mine m-a ajutat sa slăbesc 15 kg în 7 luni. Personalul este dedicat și implicat în atingerea obiectivelor tale.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Maria+Marc&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    level: "Level 20",
    achievement: "Fat Loss Champion (-15kg)"
  },
  {
    name: "Denisa Bara",
    role: "Profesionalism",
    quote: "Personal profesionist, cu atitudine de mentor. Antrenorii nu sunt simple prezențe care doar “asistă”, ci se implica activ în corectarea posturii.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Denisa+Bara&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    level: "Level 8",
    achievement: "Posture Perfect"
  },
  {
    name: "Chirodea Mihai",
    role: "Client Fidel",
    quote: "Vin la acest studio de 4 luni si nu am regretat o zi. Pe langa antrenorii foarte prietenosi si seriosi, programul este exact ce aveam nevoie.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Chirodea+Mihai&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    level: "Level 15",
    achievement: "Consistent Player (4 Months)"
  },
  {
    name: "Boglarka Kiraly",
    role: "Experiență Premium",
    quote: "Imi place sa vin la Neo, sunt multumita de conditiile pe care le ofera. Imi plac echipamentele, antrenamentele EMS, echipa și tot centrul in sine.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Boglarka+Kiraly&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    level: "Level 5",
    achievement: "Premium Explorer"
  }
];

export const MIXED_REVIEWS: Testimonial[] = [
  // New Review - Ramona S.
  {
    name: "Ramona S.",
    role: "Tonus & Energie",
    quote: "Chiar după prima ședință, am simțit un tonus crescut. Peste tot.",
    rating: 5,
    imageUrl: "/ramona_review.webp",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    level: "New Member",
    achievement: "Tonus Instant",
    type: 'photo'
  },
  // Video Review 1 (The big one)
  {
    name: "NeoBoost Experience",
    role: "Video Review",
    quote: "Vezi cum arată o experiență completă la NeoBoost.",
    rating: 5,
    imageUrl: "/logo_white.webp", // Fallback avatar
    link: "#",
    type: 'video',
    videoUrl: "https://youtu.be/OYasZekHcpM",
    coverImage: "/neo_review_thumb.webp" // Real thumbnail from video
  },
  // Existing Top Testimonial
  {
    name: "Mustafa Dalkilic",
    role: "Transformare (-18kg)",
    quote: "Echipa super serioasa si punctuala. In 3 luni am ajuns de la 139 kg la 120.5! Recomand cu incredere.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Mustafa+Dalkilic&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    level: "Elite Member",
    achievement: "Transformare Totală (-18kg)",
    type: 'text'
  },

  // Existing Text
  {
    name: "Maria Marc",
    role: "Rezultate (-15kg)",
    quote: "Recomand cu încredere. M-a ajutat sa slăbesc 15 kg în 7 luni. Personal dedicat.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Maria+Marc&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    level: "Level 20",
    achievement: "Fat Loss Champion (-15kg)",
    type: 'text'
  },
  // Video Review 3 (Short testimonial)
  {
    name: "Mihai Chirodea",
    role: "Video Testimonial",
    quote: "Recomand cu încredere! O experiență excelentă.",
    rating: 5,
    imageUrl: "/logo_white.webp",
    link: "#",
    type: 'video',
    videoUrl: "https://youtube.com/shorts/gBknGdftwMk",
    coverImage: "/review_mihai_thumb.webp", // Start with this until we confirm youtube thumb logic
  },
  {
    name: "Doamna Florina",
    role: "Video Testimonial",
    quote: "Rezultate vizibile și o atmosferă plăcută.",
    rating: 5,
    imageUrl: "/logo_white.webp",
    link: "#",
    type: 'video',
    videoUrl: "https://youtu.be/qZhqcljdwBs",
    coverImage: "/review_florina_thumb.webp", // Real thumbnail from video
  },
  {
    name: "Bortis Madalina",
    role: "Video Testimonial",
    quote: "Experiența mea la NeoBoost a fost una de neuitat.",
    rating: 5,
    imageUrl: "/logo_white.webp",
    link: "#",
    type: 'video',
    videoUrl: "https://youtube.com/shorts/XFP4uZVMa8w",
    coverImage: "/logo_white.webp", // Temporarily using logo until thumbnail is generated/provided
  },
  // Existing Text
  // Existing Text
  {
    name: "Patricia Lata",
    role: "Slăbire Localizată",
    quote: "A fost foarte fain, am slăbit din zona abdomenului. Antrenamentele scurte și eficiente.",
    rating: 5,
    imageUrl: "https://ui-avatars.com/api/?name=Patricia+Lata&background=3A86FF&color=fff&size=128",
    link: "https://www.google.com/search?q=neoboost+oradea+recenzii",
    type: 'text'
  }
];

export const BENEFIT_ARTICLES = [
  {
    id: "ems-benefice-sau-periculoase",
    title: "EMS – Benefice sau Periculoase?",
    subtitle: "ADEVĂRUL DIN SPATELE MITURILOR",
    image: "/DSC08275.webp",
    infographic: "/info_myths.webp",
    intro: "Antrenamentele EMS au devenit tot mai populare, dar o dată cu ele au apărut și miturile. Unii le consideră 'pentru leneși', alții 'periculoase'. Scopul acestui articol este de a răspunde întrebării 'Sunt antrenamentele EMS periculoase?' aducând argumente reale, transparente și validate științific.",
    mechanisms: [
      {
        title: "Mit: 'Fentează' Mușchiul",
        desc: "ADEVĂR: Greșit. Impulsul electric este doar declanșatorul. Contracția musculară este reală, physiologică și extrem de intensă. Nu 'păcălești' efortul, îl amplifici."
      },
      {
        title: "Mit: 'Periculos pentru Inimă'",
        desc: "ADEVĂR: Impulsurile de joasă frecvență folosite în EMS (4-85 Hz) activează doar musculatura scheletică, nu organele interne sau inima. Este o tehnologie sigură, validată FDA și CE."
      },
      {
        title: "Mit: 'Doar pentru Leneși'",
        desc: "ADEVĂR: Te provocăm la o sesiune! Densitatea efortului este uriașă. În 20 de minute, execuți echivalentul a 150-200 de repetări clasice, sub tensiune constantă."
      }
    ],
    science: "Meta-analiza Kemmler et al. (Uni Erlangen) confirmă siguranța totală a protocolului WB-EMS standardizat, fără efecte adverse cardiovasculare la persoanele sănătoase.",
    expectations: "O înțelegere clară a tehnologiei: EMS este o unealtă de potențare a efortului, nu un înlocuitor al mișcării. Este sigură, eficientă și omologată la nivel UE.",
    seo: {
      title: "Sunt Antrenamentele EMS Periculoase? | Mituri și Adevăr ORADEA",
      description: "Adevărul despre antrenamentele EMS. Demontăm miturile despre riscuri, tahicardie și eficiență. Citește studiile științifice și opinia specialiștilor NeoBoost.",
      keywords: ["ems periculos", "riscuri ems", "mituri electrostimulare", "ems oradea pareri", "tahicardie ems", "beneficii ems"]
    }
  },
  {
    id: "pubmed-science-analysis",
    title: "Dovezi PubMed 2026",
    subtitle: "ANALIZĂ CLINICĂ & META-STUDII",
    image: "/DSC04229.webp",
    infographic: "/info_pubmed.webp",
    intro: "O analiză transparentă, bazată pe dovezile biomedicale recente (2023-2026). Separăm marketingul de știință și îți prezentăm concluziile din 'Journal of Clinical Medicine' și ghidurile internaționale de siguranță pentru WB-EMS.",
    mechanisms: [
      {
        title: "Slăbire vs HIIT (2023)",
        desc: "STUDIU: Meta-analiza pe 1100+ participanți arată rezultate similare cu HIIT în reducerea grăsimii corporale, însă cu un timp de antrenament redus la sfert."
      },
      {
        title: "Dureri de Spate (2025)",
        desc: "STUDIU: Revizuire sistematică recentă confirmă EMS ca 'terapie de primă linie' pentru durerile lombare cronice, comparabilă cu fizioterapia complexă."
      },
      {
        title: "Longevitate & Sarcopenie",
        desc: "STUDIU: Pentru persoanele >60 ani, EMS este 'extrem de eficient' în stoparea pierderii masei musculare, menținând independența locomotorie."
      },
      {
        title: "Performanță Atleți (2026)",
        desc: "CONCLUZIE: La atleții de elită, EMS este un supliment excelent pentru putere și viteză, dar nu înlocuiește antrenamentul specific sportului."
      },
      {
        title: "Siguranță & CK",
        desc: "PROTOCOALE: Riscul de rabdomioliză este eliminat prin hidratare și creșterea graduală a intensității sub supervizare certificată (Standard NeoBoost)."
      }
    ],
    science: "Meta-analizele confirmă: WB-EMS este o unealtă validă clinic pentru compoziția corporală și sănătatea spatelui. Succesul depinde de protocolul de siguranță – exact punctul forte al NeoBoost.",
    expectations: "Rezultate realiste: EMS nu este magie, ci fiziologie accelerată. Vei obține beneficiile a 90 de minute de efort intens în 20-30 de minute, demonstrat clinic.",
    seo: {
      title: "EMS și Știința: Ce Spun Studiile PubMed 2026? | Analiză NeoBoost",
      description: "Analiză detaliată a studiilor recente despre EMS (slăbire, spate, riscuri). Vezi verdictul științific din 2026 despre eficiența electrostimulării.",
      keywords: ["studii ems pubmed", "ems stiinta", "beneficii ems medical", "riscuri ems studii", "ems sau sala", "neoboost stiinta"]
    }
  },
  {
    id: "slabire-rapida",
    title: "Slăbire Rapidă",
    subtitle: "Metabolism Accelerat & Arderea Grăsimilor",
    image: "/DSC03924.webp",
    infographic: "/info_weightloss.webp",
    intro: "Cum poți să slăbești eficient și să îți menții masa musculară? Tehnologia EMS la NeoBoost Oradea activează simultan 90% din musculatură, generând un consum caloric masiv și un efect metabolic prelungit (EPOC). Nu este magie, este fiziologie pură aplicată pentru rezultate rapide.",
    mechanisms: [
      {
        title: "Activare Metabolică Totală",
        desc: "EMS recrutează fibrele musculare profunde care sunt greu de activat prin antrenament convențional, crescând rata metabolică bazală."
      },
      {
        title: "Efectul Afterburn (EPOC)",
        desc: "Organismul continuă să ardă calorii timp de pana la 72 de ore după antrenament pentru a reface rezervele de energie și a repara țesutul muscular."
      },
      {
        title: "Deficit Caloric Fără Epuizare",
        desc: "Obții consumul caloric a 90 de minute de cardio în doar 30 de minute, protejând articulațiile și economisind timp."
      }
    ],
    science: "Studiile clinice demonstrează că antrenamentul EMS de tip Whole-Body (WB-EMS) este o metodă superioară pentru reducerea grăsimii viscerale și subcutanate comparativ cu antrenamentul convențional, datorită intensității metabolice ridicate.",
    expectations: "O reducere vizibilă a circumferinței taliei și a procentului de grăsime corporală în 4-6 săptămâni, cu doar 2 sesiuni pe săptămână, în condițiile unui deficit caloric moderat.",
    seo: {
      title: "Slăbire Inteligentă în Oradea | Activare Metabolică NeoBoost",
      description: "Nu doar slăbire, ci recompoziție corporală. Află cum tehnologia EMS NeoBoost Oradea arde calorii timp de 72h după antrenament. Știință, nu magie.",
      keywords: ["slabire inteligenta oradea", "ardere grasimi ems", "metabolism accelerat", "remodelare corporala", "fitness eficient oradea"]
    }
  },
  {
    id: "tonifiere-sculptare",
    title: "Tonifiere & Sculptare",
    subtitle: "Definire Musculară & Fermitate",
    image: "/DSC07624.webp",
    intro: "Obține un corp sculptat și ferm fără a dezvolta masă musculară excesivă. Programul de Tonifiere NeoBoost vizează densitatea musculară și eliminarea aspectului de coajă de portocală, oferindu-ți pielea fermă și formele definite pe care le dorești.",
    mechanisms: [
      {
        title: "Stimulare a Circulației",
        desc: "Impulsurile electrice îmbunătățesc masiv circulația sanguină și limfatică la nivelul pielii, ajutând la eliminarea toxinelor și reducerea celulitei."
      },
      {
        title: "Densitate Musculară",
        desc: "Creșterea tonusului muscular fără hipertrofie exagerată (creștere în volum), rezultând un aspect 'fit' și atletic."
      },
      {
        title: "Activare Gluteală & Abdominală",
        desc: "Focus specific pe zonele problemă (fese, abdomen, coapse) pentru ridicare și conturare rapidă."
      }
    ],
    science: "EMS îmbunătățește calitatea pielii și a țesutului conjunctiv prin creșterea producției de colagen și elastină, simultan cu tonifierea musculaturii subiacente.",
    expectations: "Piele mai fină și mai fermă după 4 săptămâni. Ridicarea feselor și definirea taliei devin vizibile rapid datorită activării musculare intense și localizate.",
    seo: {
      title: "Tonifiere și Sculptare Corporală Oradea | Eliminare Celulită EMS",
      description: "Sculptează-ți corpul și scapă de celulită cu antrenamentul EMS NeoBoost Oradea. Tonifiere musculară și piele fermă fără ore nesfârșite la sală.",
      keywords: ["tonifiere oradea", "sculptare corporala", "eliminare celulita oradea", "fese bombate", "abdomen plat", "fitness femei oradea"]
    }
  },
  {
    id: "terapie-spate",
    title: "Terapie Spate",
    subtitle: "Scapă de Dureri & Corectează Postura",
    image: "/DSC04030.webp",
    infographic: "/info_backpain.webp",
    intro: "Durerile de spate (lombare, cervicale) sunt boala secolului XXI. NeoBoost oferă singura soluție care activează direct musculatura profundă paravertebrală, creând un corset natural care susține coloana și elimină presiunea de pe discurile intervertebrale.",
    mechanisms: [
      {
        title: "Activare Profundă (Multifidus)",
        desc: "EMS ajunge la mușchii stabilizatori ai coloanei (M. Multifidus) care sunt aproape imposibil de antrenat voluntar prin exerciții clasice."
      },
      {
        title: "Decompresie Vertebrală",
        desc: "Prin întărirea mușchilor spatelui și abdomenului, se reduce presiunea gravitațională asupra vertebrelor și discurilor."
      },
      {
        title: "Relaxare și Detensionare",
        desc: "Impulsurile de joasă frecvență relaxează contracturile musculare dureroase, oferind un efect analgezic imediat."
      }
    ],
    science: "Cercetările Universității din Bayreuth (Germania) arată că 88% dintre participanți au scăpat de durerile cronice de spate după 6 săptămâni de antrenament EMS.",
    expectations: "Reducerea semnificativă a durerii încă de la prima ședință. Corectarea posturii și dispariția durerilor cronice după un ciclu de 10 ședințe.",
    seo: {
      title: "Tratament Dureri de Spate Oradea | Recuperare Posturală EMS",
      description: "Scapă de durerile de spate și corectează postura la NeoBoost Oradea. Terapie EMS pentru hernie de disc, scolioză și dureri lombare. Rezultate dovedite.",
      keywords: ["dureri spate oradea", "tratament hernie disc", "recuperare spate", "postura corecta", "kinetoterapie ems", "dureri lombare"]
    }
  },
  {
    id: "recuperare-post-natal",
    title: "Recuperare Post-Natal",
    subtitle: "Refacere Abdomen & Planșeu Pelvin",
    image: "/DSC09363.webp", // Using the FitMamma image
    intro: "Sarcina este o provocare majoră pentru corpul femeii. Programul Post-Natal NeoBoost este conceput special pentru mămici, vizând refacerea peretelui abdominal (diastază), întărirea planșeului pelvin și recâștigarea energiei, totul într-un mod sigur și blând.",
    mechanisms: [
      {
        title: "Închiderea Diastazei Abdominale",
        desc: "Activarea blândă și profundă a mușchiului Transvers Abdominal ajută la apropierea drepților abdominali fără a pune presiune intra-abdominală periculoasă."
      },
      {
        title: "Reeducare Perineală",
        desc: "Stimularea musculaturii planșeului pelvin previne și tratează incontinența urinară și prolapsul, probleme frecvente după naștere."
      },
      {
        title: "Timp Eficient pentru Mămici",
        desc: "Știm că timpul tău este limitat. 30 de minute sunt suficiente pentru a-ți recăpăta corpul și energia, fără a lipsi mult de lângă bebe."
      }
    ],
    science: "EMS este singura metodă care poate antrena eficient mușchii abdominali profunzi și planșeul pelvin simultan, fără a necesita mișcări solicitante sau greutăți, fiind standardul de aur în recuperarea post-natală modernă.",
    expectations: "Recâștigarea tonusului abdominal și reducerea diastazei în 6-8 săptămâni. Îmbunătățirea semnificativă a controlului pelvin și a posturii.",
    seo: {
      title: "Recuperare După Naștere Oradea | Fitness Post-Natal Diastază",
      description: "Recuperare rapidă și sigură după naștere la NeoBoost Oradea. Tratează diastaza abdominală și întărește podeaua pelvină cu antrenamente EMS specializate.",
      keywords: ["recuperare dupa nastere", "fitness mamici oradea", "diastaza abdominala exercitii", "slabire dupa sarcina", "exercitii kegel ems"]
    }
  },
  {
    id: "costum-ems-cum-functioneaza",
    title: "Costumul EMS: Cum Funcționează",
    subtitle: "CE REZULTATE POȚI OBȚINE CU ANTRENAMENTUL EMS",
    image: "/DSC08275.webp",
    video: "https://youtube.com/shorts/Zm-QlF8dA4M",
    intro: "Antrenamentul EMS (Electrical Muscle Stimulation) folosește un costum special care trimite impulsuri electrice către mușchi. În loc să lucrezi 90 de minute la sală, o ședință durează 30 de minute și activează peste 90% din fibrele musculare. Dar cum se simte de fapt? Și pentru cine are sens?",
    mechanisms: [
      {
        title: "Ce este costumul EMS?",
        desc: "Costumul EMS arată ca un echipament de compresie – se îmbracă peste lenjeria sportivă și aderă la corp. În material sunt integrați electrozi care trimit impulsuri electrice controlate către piept, spate, zona lombară, brațe, umeri, abdomen (inclusiv mușchii profunzi), fesieri, coapse și gambe. Antrenorul ajustează intensitatea separat pentru fiecare zonă, direct de pe tabletă."
      },
      {
        title: "Cât durează o ședință?",
        desc: "O ședință completă durează 30 de minute: te echipezi cu costumul (2-3 minute), antrenorul calibrează intensitatea, execuți exerciții simple – genuflexiuni, fandări, plank – amplificate de stimularea electrică, apoi stretching și relaxare. Nu ai nevoie de duș după. Poți veni în pauza de masă și te întorci la birou."
      },
      {
        title: "Rezultate în 4-6 săptămâni",
        desc: "Tonifiere vizibilă pe abdomen și brațe. Îmbunătățirea posturii (mușchii profunzi ai spatelui se întăresc). Reducerea durerilor lombare. După 2-3 luni: scădere în greutate, creșterea masei musculare, metabolismul rămâne activ 48-72 ore după ședință."
      },
      {
        title: "Pentru cine este potrivit?",
        desc: "Persoane cu program încărcat, cei care vor să slăbească dar nu suportă cardio-ul lung, persoane cu dureri de spate, sportivi care vor antrenament suplimentar fără suprasolicitare articulară, mame care vor să revină la forma fizică (după avizul medicului)."
      },
      {
        title: "Cine NU ar trebui să folosească EMS?",
        desc: "Nu este recomandat pentru persoane cu stimulator cardiac, femei însărcinate, persoane cu epilepsie sau cazuri medicale specifice – discută întâi cu medicul."
      },
      {
        title: "Costumul NeoBoost: Ce îl face diferit?",
        desc: "Echipament wireless – fără cabluri. Te miști liber, faci exerciții funcționale, iar antrenorul controlează intensitatea în timp real. Costumul nu necesită umezire, ceea ce înseamnă mai mult confort și igienă. Fiecare client are costum alocat personal, curățat și igienizat după fiecare utilizare."
      }
    ],
    science: "Studiile arată că EMS-ul activează simultan mai multe fibre musculare decât antrenamentul convențional. Rezultatele depind de frecvență, alimentație și obiectivele tale. Nu există soluții magice – dar EMS-ul reduce timpul necesar pentru a ajunge acolo.",
    expectations: "Cel mai simplu mod de a afla dacă EMS-ul e pentru tine: încerci o ședință gratuită. 30 de minute, fără obligații. Simți cum funcționează, discuți cu antrenorul despre obiectivele tale și decizi dacă are sens pentru tine.",
    seo: {
      title: "Costumul EMS: Cum Funcționează și Ce Rezultate Poți Obține | NeoBoost Oradea",
      description: "Află cum funcționează costumul EMS, ce rezultate poți obține și pentru cine este potrivit antrenamentul EMS. Ghid complet de la NeoBoost Oradea.",
      keywords: ["costum ems", "cum functioneaza ems", "rezultate ems", "antrenament ems oradea", "electrozi musculari", "costum antrenament electric", "neoboost"]
    }
  },
  {
    id: "tehnologie-specificatii-complete",
    title: "Tehnologia Noastră: De Ce Contează Detaliile?",
    subtitle: "SPECIFICAȚII TEHNICE EXPLICATE PE ÎNȚELESUL TĂU",
    image: "/DSC07624.webp",
    video: "https://youtube.com/shorts/zelq4lbvDnw",
    intro: "Nu toate sistemele EMS sunt la fel. Diferența dintre un antrenament mediocru și unul excelent stă în detaliile tehnice invizibile: tipul de curent, frecvența și modul în care costumul comunică cu mușchii tăi. Iată ce se află 'sub capotă' la NeoBoost și de ce este cea mai sigură opțiune pentru corpul tău.",
    mechanisms: [
      {
        title: "Secretul Confortului: Curentul Bipolar",
        desc: "Spre deosebire de tehnologiile vechi, noi folosim curent bipolar. Asta înseamnă că impulsul nu 'înțeapă' și nu irită pielea, ci se simte ca o contracție naturală, profundă. Elimina acumularea de sarcini electrice sub electrozi, permițând sesiuni mai lungi fără niciun disconfort."
      },
      {
        title: "Frecvențe Inteligente pentru Fiecare Obiectiv",
        desc: "Sistemul nostru își schimbă 'limba' în funcție de ce vrei să obții: Frecvențe joase (1-50 Hz) pentru relaxare și circulație, Medii (50-85 Hz) pentru tonifiere și antrenament standard, și Înalte (85-120 Hz) pentru forță brută și hipertrofie."
      },
      {
        title: "Libertate Totală: Wireless & Uscat",
        desc: "Cel mai mare avantaj? Nu te udăm cu apă rece și nu te legăm cu fire de un aparat. Costumul nostru uscat, cu electrozi de compresie, îți permite să te miști liber, să faci genuflexiuni, sărituri sau TRX, în timp ce unitatea de control (mică cât un pachet de cărți) stă discret la șold."
      }
    ],
    science: "Controlăm independent 10 canale musculare (20 de electrozi) care acoperă 90% din masa musculară a corpului. De la brațe și trapez, până la abdomenul inferior și gambe, fiecare grupă primește exact intensitatea de care are nevoie, monitorizată în timp real prin Bluetooth.",
    expectations: "O experiență de antrenament fluidă, fără senzații neplăcute, fără cabluri care să te încurce și fără șocul termic al costumului ud. Doar tu, mișcarea și o activare musculară pe care o vei simți zile întregi.",
    seo: {
      title: "Tehnologie EMS Oradea: Wireless și Costum Uscat | NeoBoost",
      description: "Descoperă tehnologia NeoBoost: EMS wireless, costum uscat, curent bipolar sigur. Fără cabluri, fără apă, doar rezultate. Vezi diferențele tehnice.",
      keywords: ["ems wireless oradea", "costum ems uscat", "tehnologie ems", "curent bipolar ems", "diferente aparate ems", "neoboost tehnologie"]
    }
  },
  {
    id: "ems-dureri-cronice-spate-stiinta",
    title: "EMS în Tratamentul Durerilor Cronice de Spate",
    subtitle: "CE SPUNE ȘTIINȚA: STUDII CLINICE ȘI DOVEZI",
    image: "/DSC04030.webp",
    infographic: "/info_backpain.webp",
    intro: "Durerea cronică de spate afectează aproximativ 20% din populația globală și reprezintă principala cauză de ani trăiți cu dizabilitate la nivel mondial. În acest context, terapiile non-invazive precum EMS câștigă teren ca alternativă la tratamentele farmacologice. Acest articol prezintă dovezile științifice din studiile clinice publicate în reviste medicale de prestigiu.",
    mechanisms: [
      {
        title: "Mecanismul de Acțiune: Activarea Mușchiului Multifidus",
        desc: "Durerea cronică lombară este asociată cu deficite morfologice și funcționale ale mușchiului multifidus – stabilizator esențial al coloanei vertebrale. EMS activează mușchii profunzi stabilizatori spinali în timpul încărcării coloanei și reduce infiltrația grasă la nivelul L5-S1, conform studiilor RCT pe 10 săptămâni."
      },
      {
        title: "Meta-analiză Frontiers in Pain Research (2024)",
        desc: "O analiză sistematică a 14 studii a evaluat efectul electroterapiilor transcutanate: EMS s-a dovedit superior controlului pasiv pentru reducerea durerii și similar cu intervențiile active (exerciții, fizioterapie). Dovezi limitate dar pozitive pentru eficacitate."
      },
      {
        title: "Studiu WB-EMS: Reducere Semnificativă a Durerii",
        desc: "Participanți: Adulți cu durere lombară cronică nespecifică. Intervenție: 6 săptămâni WB-EMS. Rezultat: Reducere semnificativă a durerii comparativ cu grupul de control (MD = 0.67, p = 0.028). Publicat în J Pain Res. 2018."
      },
      {
        title: "Russian Current: Eficacitate la Femei",
        desc: "Studiu pe femei cu durere lombară cronică: Grupul EMS a avut semnificativ mai puțină durere la post-intervenție (p = 0.0483). Batistella et al., J Bodyw Mov Ther. 2020."
      },
      {
        title: "NMES + Exerciții Core: Sinergie Terapeutică",
        desc: "Combinația NMES + exerciții a redus semnificativ dizabilitatea măsurată prin ODI comparativ cu exercițiile singure. Studiu Dimer da Luz et al., 2019 – dovadă că EMS potențează efectele terapiei clasice."
      },
      {
        title: "Parametri Optimi de Stimulare",
        desc: "Frecvență: 50-85 Hz (tonifiere/forță). Durată impuls: 300-400 μs. Timp on/off: 4-6s contracție / 4s pauză. Sesiuni: 2-3/săptămână. Durată program: Minim 6-10 săptămâni. Acești parametri sunt validați în literatura medicală pentru durerea lombară."
      },
      {
        title: "Avantaje: Non-invaziv și Complementar",
        desc: "Fără medicamente, fără efecte secundare sistemice. Activare musculară profundă – ajunge la mușchi greu de antrenat voluntar. Potrivit pentru pacienți cu mobilitate redusă. Complementar exercițiilor – potențează efectele antrenamentului clasic."
      },
      {
        title: "Limitări și Contraindicații",
        desc: "Dovezile sunt încă limitate – sunt necesare studii mai mari. Rezultatele variază în funcție de protocol și echipament. Nu înlocuiește exercițiile active și fizioterapia. Contraindicat în: sarcină, stimulator cardiac, epilepsie, leziuni acute."
      }
    ],
    science: "Meta-analiza Kemmler et al. (Universitatea Erlangen) confirmă siguranța totală a protocolului WB-EMS standardizat, fără efecte adverse cardiovasculare la persoanele sănătoase. Cercetările actuale sugerează că EMS poate fi o intervenție utilă în managementul durerii cronice de spate, în special ca adjuvant la programele de exerciții și pentru pacienții care nu pot efectua exerciții convenționale.",
    expectations: "EMS oferă o opțiune non-invazivă cu potențial terapeutic demonstrat științific. Poate fi utilă pentru activarea mușchilor stabilizatori profunzi și ca supliment la terapia convențională. Nu este o soluție miraculoasă, ci o unealtă validată clinic care funcționează cel mai bine în combinație cu exercițiile și un program structurat de recuperare.",
    seo: {
      title: "EMS pentru Dureri de Spate: Studii Clinice și Dovezi Științifice 2024",
      description: "Analiză științifică completă: ce spun studiile PubMed despre EMS în tratamentul durerilor cronice de spate. Meta-analize, parametri optimi, eficacitate clinică.",
      keywords: ["ems dureri spate studii", "electrostimulare lombară pubmed", "ems vs tens durere spate", "studii clinice ems 2024", "parametri ems durere lombară", "multifidus ems", "whole body ems back pain"]
    }
  },
  {
    id: "ems-masaj-recuperare",
    title: "Masaj și Recuperare cu EMS: Știința Relaxării",
    subtitle: "RECUPERARE ACTIVĂ, DRENAJ LIMFATIC ȘI DETENSIONARE",
    image: "/ems_massage_hero.webp",
    infographic: "/info_backpain.webp",
    intro: "EMS nu este doar despre antrenament intens. Tehnologia noastră include programe avansate de recuperare care folosesc frecvențe specifice pentru a relaxa musculatura, a accelera eliminarea acidului lactic și a îmbunătăți circulația limfatică. Este 'arma secretă' a atleților de elită pentru refacere rapidă.",
    mechanisms: [
      {
        title: "Programul 1: Relaxare (100Hz Constant)",
        desc: "Un masaj profund și constant care detensionează fibrele musculare contractate. Ideal pentru eliminarea nodurilor (trigger points) și relaxarea generală după o zi stresantă la birou."
      },
      {
        title: "Programul 2: Drenaj Limfatic (Pompă Musculară)",
        desc: "Folosește o secvență de activare ritmică ce imită acțiunea pompei musculare naturale. Ajută la eliminarea retenției de apă, reducerea senzației de 'picioare grele' și acelerarea transportului limfatic."
      },
      {
        title: "Programul 3: Capilarizare (7Hz - Frecvență Joasă)",
        desc: "Frecvențele foarte joase cresc semnificativ fluxul sanguin în capilare, aducând mai mult oxigen și nutrienți la țesuturi. Este echivalentul unei sesiuni de recuperare activă, fără efort articular."
      },
      {
        title: "Eliminarea Acidului Lactic",
        desc: "Studiile arată că recuperarea activă cu EMS accelerează eliminarea lactatului din mușchi mult mai repede decât odihna pasivă, reducând febra musculară."
      },
      {
        title: "Reducerea Cortizolului",
        desc: "Sesiunile de masaj EMS induc o stare de relaxare parasimpatică, contribuind la scăderea nivelului de cortizol (hormonul stresului) și îmbunătățirea calității somnului."
      },
      {
        title: "Fără Presiune Mecanică",
        desc: "Spre deosebire de masajul manual care poate fi dureros pe zonele inflamate, masajul EMS acționează din interiorul mușchiului, fără a pune presiune pe piele sau oase."
      }
    ],
    science: "Cercetările în medicina sportivă demonstrează că 20 de minute de recuperare EMS pot echivala cu 60 de minute de masaj manual în ceea ce privește creșterea fluxului sanguin local. Este o metodă eficientă, igienică și rapidă de a-ți menține corpul funcțional și fără dureri.",
    expectations: "O senzație imediată de ușurare și relaxare. Picioarele se simt mai ușoare, tensiunea din umeri dispare, iar starea generală de bine se instalează rapid. Mulți clienți folosesc programul de masaj ca o recompensă după antrenament sau ca o sesiune separată de relaxare.",
    seo: {
      title: "Masaj și Drenaj Limfatic EMS Oradea | Recuperare Activă",
      description: "Recuperare rapidă cu programele de masaj EMS NeoBoost: Drenaj Limfatic, Relaxare Musculară și Capilarizare. Știința din spatele recuperării active.",
      keywords: ["masaj ems oradea", "drenaj limfatic ems", "recuperare sportiva oradea", "masaj anticelulitic ems", "detensionare musculara", "programe masaj costum ems"]
    }
  },
  {
    id: "motivatie-neurostiinta-obiective",
    title: "Motivație vs. Disciplină: Neuroștiința Obiceiurilor",
    subtitle: "CUM SĂ-ȚI HACK-UIEȘTI CREIERUL PENTRU SUCCES",
    image: "/motivation_neuroscience_hero.webp",
    intro: "De ce ne pierdem motivația după 2 săptămâni? Răspunsul nu e 'lenea', ci neurobiologia. Descoperă cum să folosești Dopamina și principiile din Atomic Habits pentru a transforma sportul într-un automatism, nu o corvoadă.",
    mechanisms: [
      {
        title: "Regula de 2 Minute (Atomic Habits)",
        desc: "James Clear spune că un obicei nou trebuie să dureze sub 2 minute la început. EMS durează doar 20 de minute – mult sub pragul de 'fricțiune mentală' al unei ore de sală clasică."
      },
      {
        title: "Dopamina și Anticiparea",
        desc: "Creierul eliberează dopamină la anticiparea recompensei. EMS oferă rezultate vizibile rapid (tonifiere, energie), hrănind acest ciclu de feedback pozitiv și motivându-te să revii."
      },
      {
        title: "Identitate vs. Obiective",
        desc: "Nu te antrena 'ca să slăbești X kg'. Antrenează-te 'pentru că ești o persoană activă'. EMS te ajută să îți construiești această identitate cu un angajament de timp minim."
      },
      {
        title: "Sistem > Scop",
        desc: "'Nu te ridici la nivelul obiectivelor tale, ci cazi la nivelul sistemelor tale.' EMS este un sistem optimizat: programare fixă, antrenor care te așteaptă, eficiență maximă."
      },
      {
        title: "Neuroplasticitate",
        desc: "Repetiția (chiar și o dată pe săptămână la intensitate mare) creează noi căi neuronale. Cu cât 'frecarea' e mai mică, cu atât calea se bătătorește mai repede."
      },
      {
        title: "Small Wins (Mici Victorii)",
        desc: "Sentimentul de a fi terminat un antrenament greu eliberează endorfine și crește încrederea în sine (self-efficacy). Aceasta se transferă și în alte arii ale vieții."
      }
    ],
    science: "Andrew Huberman (Stanford Neurobiology) explică faptul că 'fricțiunea limbică' este inamicul nr. 1 al obiceiurilor noi. Când ești obosit sau stresat, creierul limbic spune 'NU'. EMS reduce această fricțiune la minim absolut: nu trebuie să îți pregătești geanta (ai totul la noi), nu pierzi timp, ai un antrenor dedicat. Este 'hack-ul' perfect pentru creierul modern suprasolicitat.",
    expectations: "Vei înceta să te mai bazezi pe 'voință' (o resursă epuizabilă) și vei începe să funcționezi pe baza unui sistem automatizat. Vei simți o claritate mentală crescută post-antrenament și satisfacția profundă că ai grijă de tine eficient, fără să sacrifici timp prețios.",
    seo: {
      title: "Motivație Sport și Neuroștiință | Atomic Habits Oradea",
      description: "Află cum să îți menții motivația folosind neuroștiința și principii din Atomic Habits. EMS ca sistem de disciplină cu fricțiune redusă. Huberman Lab & James Clear.",
      keywords: ["motivatie sala", "atomic habits sport", "neurostiinta obiective", "dopamina sport", "disciplina ems", "james clear regula 2 minute", "huberman lab habits"]
    },
    habitLoop: {
      cue: "Calendar & Programare Fixă: Știi exact când vii (Marți & Joi, 18:00). Antrenorul te așteaptă.",
      craving: "Nevoia de Energie & Fără Dureri: Vrei să scapi de rigiditatea de la birou și să te simți revigorat.",
      response: "20 Minute de EMS (Fricțiune Zero): Doar 20 min, echipament inclus. Cel mai ușor 'pas' pentru un antrenament complet.",
      reward: "Endorfine & Shake Proteic: Te simți fantastic imediat. Primești shake-ul delicios. Dopamina confirmă obiceiul."
    }
  },
  {
    id: "ems-vs-hiit-science",
    title: "EMS + HIIT: Combinația Supremă",
    subtitle: "CUM SE POTENȚEAZĂ RECIPROC",
    image: "/ems-hiit-training.webp",
    // video: "https://www.youtube.com/embed/XFP4uZVMa8w",
    intro: "Nu trebuie să alegi între ele – secretul atleților de top este combinația. Află cum integrarea unei ședințe de EMS în rutina ta de HIIT poate sparge platourile, activând fibre musculare pe care antrenamentul clasic nu le poate atinge voluntar.",
    mechanisms: [
      {
        title: "Potențare Reciprocă",
        desc: "HIIT antrenează excelent sistemul cardio-respirator ('motorul'), în timp ce EMS maximizează contracția musculară ('puterea'). Împreună, obții un corp care nu doar arată bine, ci este și performant."
      },
      {
        title: "Activare Deep-Muscle",
        desc: "EMS recrutează fibrele musculare profunde și de stabilizare. Când te întorci la antrenamentul HIIT, vei avea un 'corset' muscular mai puternic, permițându-ți să te antrenezi mai intens și mai sigur."
      },
      {
        title: "Zero Impact, Intensitate Maximă",
        desc: "EMS îți permite să menții o intensitate musculară uriașă în zilele de pauză de la HIIT, fără a pune presiune suplimentară pe articulațiile deja solicitate de sărituri sau alergare."
      },
      {
        title: "Recuperare Activă",
        desc: "Folosirea programelor de capilarizare EMS după sesiunile grele de HIIT accelerează eliminarea lactatului și reduce febra musculară, permițându-ți să te antrenezi mai des și mai eficient."
      },
      {
        title: "Corecția Dezechilibrelor",
        desc: "HIIT poate accentua asimetriile musculare. EMS le corectează, izolând și întărind partea mai slabă a corpului pentru un echilibru perfect."
      }
    ],
    science: "Cercetările arată că 'Concurrent Training' (EMS + Cardio/HIIT) duce la creșterea VO2max și a forței explozive mai rapid decât oricare metodă separată. EMS acționează ca un 'amplificator' pentru rezultatele tale din sală.",
    expectations: "O explozie de performanță. Vei observa că poți alerga mai repede, sări mai sus și rezista mai mult la efort, având în același timp o musculatură mai densă și mai definită.",
    seo: {
      title: "EMS și HIIT: Cum se combină pentru rezultate maxime? | NeoBoost Oradea",
      description: "Află cum EMS potențează antrenamentele HIIT. Combinația ideală pentru slăbire, performanță și recuperare. Nu alege, combină-le inteligent.",
      keywords: ["ems si hiit", "combinatie ems cardio", "potentare musculara", "antrenament hibrid oradea", "recuperare sportiva", "performanta sportiva ems"]
    },
    hiitEffect: {
      cardio: "Antrenamentul HIIT crește capacitatea cardiovasculară și VO2max. Inima pompează puternic.",
      muscle: "Sesiunea EMS activează 90% din fibrele musculare, inclusiv cele profunde, pe care HIIT nu le atinge.",
      metabolic: "Combinația declanșează un efect EPOC masiv. Arzi calorii până la 48h după antrenament."
    }
  }
];

export const PROGRAM_ZONES = [
  {
    id: 'functional',
    title: 'EMS Functional',
    subtitle: 'Mișcare & Performanță',
    description: 'Circuite dinamice cu greutatea corpului, TRX și accesorii. Dezvoltă mobilitatea, coordonarea și rezistența în regim de efort intens.',
    video: 'https://youtube.com/shorts/r2-J_O0jrUU', // Updated per user request
    image: 'https://img.youtube.com/vi/r2-J_O0jrUU/maxresdefault.jpg',
    icon: <Activity size={20} />,
    features: ['Mobilitate', 'Coordonare', 'Rezistență'],
    color: 'from-orange-400 to-red-500',
    cta: 'Vreau Functional',
    stats: {
      forță: 70,
      cardio: 90,
      tonifiere: 80,
      postură: 60,
      energie: 95
    },
    technical: {
      currents: "Impuls Continuu / Frecvență Variabilă",
      timeline: "Rezultate imediate (Tonus/Energie)",
      mechanism: "Recrutare în lanțuri cinetice complexe"
    }
  },
  {
    id: 'bodybuilding',
    title: 'EMS Bodybuilding',
    subtitle: 'Hipertrofie & Forță',
    description: 'Antrenament focusat pe creșterea masei musculare și definire. Combinația perfectă între contracții voluntare și impulsuri electrice pentru pompare maximă.',
    video: 'https://youtube.com/shorts/_4qCyTWiBl8', // Updated per user request
    image: 'https://img.youtube.com/vi/_4qCyTWiBl8/maxresdefault.jpg',
    icon: <Dumbbell size={20} />,
    features: ['Hipertrofie', 'Forță Pură', 'Definire'],
    color: 'from-blue-500 to-indigo-600',
    cta: 'Vreau Bodybuilding',
    stats: {
      forță: 100,
      cardio: 40,
      tonifiere: 90,
      postură: 50,
      energie: 70
    },
    technical: {
      currents: "Modulat 85Hz / Adâncime 350µs",
      timeline: "Hipertrofie în 6-8 săptămâni",
      mechanism: "Tensiune mecanică pe fibrele Type II"
    }
  },
  {
    id: 'kineto',
    title: 'EMS Kinetoterapie',
    subtitle: 'Recuperare Medicală',
    description: 'Terapie prin mișcare asistată pentru corectarea posturii, tratarea durerilor de spate și reabilitare post-traumatică.',
    video: 'https://youtu.be/lT5WX3PaReo',
    // rotation: 'left', // Internal note: needs -90deg rotation
    image: 'https://img.youtube.com/vi/lT5WX3PaReo/maxresdefault.jpg', // Confirmed Kineto image
    icon: <ShieldCheck size={20} />,
    features: ['Hernie de disc', 'Postură', 'Fără Dureri'],
    color: 'from-cyan-400 to-blue-500',
    cta: 'Vreau Kineto',
    stats: {
      forță: 50,
      cardio: 30,
      tonifiere: 50,
      postură: 100,
      energie: 60
    },
    technical: {
      currents: "Impuls Bifazic Simetric / TENS",
      timeline: "Analgezie rapidă (Gate Control)",
      mechanism: "Blocarea durerii & Decompresie"
    }
  },
  {
    id: 'metabolic', // New category replacing 'fitness'
    title: 'EMS Metabolic',
    subtitle: 'Slăbire & Ardere Grăsimi',
    description: 'Antrenament intens pentru activarea metabolismului și arderea caloriilor (efect EPOC). Ideal pentru slăbire rapidă și tonifiere.',
    video: 'https://youtube.com/shorts/LRdKs1NpS5g', // Updated per user request
    image: 'https://img.youtube.com/vi/LRdKs1NpS5g/maxresdefault.jpg', // Confirmed Metabolic image
    icon: <Flame size={20} />,
    features: ['Slăbire Rapidă', 'Metabolism', 'Cardio'],
    color: 'from-green-400 to-emerald-500',
    cta: 'Vreau Metabolic',
    stats: {
      forță: 60,
      cardio: 100,
      tonifiere: 70,
      postură: 40,
      energie: 90
    },
    technical: {
      currents: "Burst 100Hz / Cardio Boost",
      timeline: "Activare metabolism: Imediat",
      mechanism: "Consum oxigen post-efort (EPOC)"
    }
  }
];

export const PROGRAMS = [
  {
    id: "kickstart",
    title: "6 Week Kickstart",
    subtitle: "SLĂBEȘTE 2–4 KG ȘI TE RECOMPENSĂM!",
    image: "/DSC00193.webp",
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
    image: "/DSC09363.webp", // Confirmed female cinematic shot
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
    image: "/DSC01081.webp",
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
    image: "/DSC03990.webp",
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
    image: "/DSC04229.webp",
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
    image: "/DSC07054.webp",
    tag: "START INTELIGENT",
    tagColor: "bg-cyan-400",
    iconId: "target",
    duration: "14 ZILE",
    idealFor: "Noi Clienți",
    benefit: "Evaluare, Planificare, Testare",
    price: "250 RON",
    stripePriceId: "price_1Sn26zJAtuHj34DejlSl8LTE", // Reusing Starter for now (or needs separate)
    description: "Start inteligent. 14 zile de evaluare și învățare pentru a te asigura că pornești corect la drum cu NeoBoost.",
    content: "On-Boarding (Start Smart)\n\nFUNDAȚIA SUCCESULUI TĂU\n\n14 Zile în care învățăm despre corpul tău și setăm planul perfect.\n\nEști gata să faci o schimbare?\nNu ghici, planifică. Start Smart este garanția că investiția ta va da roade.\n\n[WHATSAPP_LINK]\n\nBENEFICII CHEIE:\n✔️ Înțelegi exact de ce are nevoie corpul tău.\n✔️ Înveți tehnica corectă de execuție.\n✔️ Stabilești obiective realiste.\n\nCE INCLUDE?\n- Consultație și Analiză Corporală Avansată.\n- 2-4 Sesiuni de Calibrare și Învățare.\n- Plan de Acțiune Personalizat.\n\nBONUS: RECOMPENSA 3+1\nIntră direct întrun abonament de 3 luni după On-Boarding și primești a 4-a lună CADOU."
  },
  {
    id: "vip",
    title: "Invitation-Only (VIP)",
    subtitle: "PREMIUM EXCLUSIV PE INVITAȚIE",
    image: "/DSC04717.webp",
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
    id: "maria-t",
    name: "MARIA T.",
    program: "WEIGHT LOSS",
    duration: "4 LUNI",
    quote: "M-am simțit mai ușoară încă din prima lună. Talia s-a subțiat vizibil, fără diete extreme.",
    images: {
      combined: "/transformation_3.webp",
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
      combined: "/transformation_female_real_combined.webp",
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
      combined: "/emanuel_h_aligned.webp",
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
      combined: "/dani_p_aligned.webp",
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
    id: 2,
    name: "Andreea M.",
    duration: "2 Luni",
    package: "Fit Mamma",
    imageBefore: "/andreea_m_fixed.webp",
    imageAfter: "/andreea_m_fixed.webp",
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
    imageBefore: "/transformation_3.webp",
    imageAfter: "/transformation_3.webp",
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
    imageBefore: "/emanuel_h.webp",
    imageAfter: "/emanuel_h.webp",
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
    imageBefore: "/dani_p_aligned.webp",
    imageAfter: "/dani_p_aligned.webp",
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

export const USER_JOURNEY = [
  {
    level: "Level 1",
    title: "Inițiere",
    duration: "Săptămâna 1-2",
    description: "Te obișnuiești cu impulsurile și înveți mișcările de bază. Corpul începe să se adapteze.",
    reward: "First Spark Badge ⚡"
  },
  {
    level: "Level 5",
    title: "Consolidare",
    duration: "Luna 2-3",
    description: "Metabolismul este accelerat. Vezi primele rezultate vizibile în oglindă și la haine.",
    reward: "Habit Hero 🏆"
  },
  {
    level: "Level 10",
    title: "Transformare",
    duration: "Luna 6+",
    description: "Ești versiunea ta 2.0. Tonus, forță, și o postură impecabilă. E stilul tău de viață.",
    reward: "Master Elite 👑"
  }
];
