
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
}

export const EMS_MILESTONES: Milestone[] = [

  {
    year: "1960",
    title: "Performanță Olimpică",
    description: "Oamenii de știință din URSS utilizează EMS pentru a crește forța atleților olimpici cu până la 40%.",
    icon: <Medal size={20} />
  },
  {
    year: "1990",
    title: "Standard Medical",
    description: "EMS devine un instrument esențial în kinetoterapie pentru recuperarea post-traumatică rapidă.",
    icon: <Briefcase size={20} />
  },
  {
    year: "2010",
    title: "Fitness Comercial",
    description: "Apar primele studiouri EMS de masă, folosind însă sisteme rigide cu cabluri și costume umede.",
    icon: <Dumbbell size={20} />
  },
  {
    year: "2024+",
    title: "Revoluția NeoBoost",
    description: "Tehnologie Wireless, Drysuit și antrenament eficient de 30 de minute, minim o dată pe săptămână în Oradea.",
    icon: <Zap size={20} />,
    isNeo: true
  }
];

export const EMS_STEPS = [
  {
    id: "01",
    title: "Echipare Drysuit",
    description: "Te îmbraci în costumul tehnic special. Spre deosebire de sistemele vechi, acesta este complet uscat și antibacterian.",
    icon: <Shirt size={20} />
  },
  {
    id: "02",
    title: "Conectare Wireless",
    description: "Atașăm unitatea centrală Power Box pe lateralul costumului. Fără cabluri care să îți limiteze mișcarea.",
    icon: <Link size={20} />
  },
  {
    id: "03",
    title: "Calibrare Personalizată",
    description: "Antrenorul configurează intensitatea pe fiecare grupă musculară în funcție de obiectivele și pragul tău de confort.",
    icon: <Smartphone size={20} />
  },
  {
    id: "04",
    title: "Antrenament Activ",
    description: "30 de minute de exerciții funcționale asistate. Musculatura este activată bio-electric la capacitate maximă.",
    icon: <PlayCircle size={20} />
  },
  {
    id: "05",
    title: "Rezultate Afterburn",
    description: "Corpul continuă să ardă calorii intens în următoarele 48h. Protocolul tău de transformare a început.",
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

export const IMS_PROTOCOL = {
  title: "Tehnologia Drysuit IMS",
  subtitle: "Standardul de Elită în Antrenamentul EMS Wireless",
  description: "NeoBoost redefinește stimularea musculară prin eliminarea barierei de apă. Tehnologia noastră Integrated Muscle Stimulation permite antrenamente dinamice, fără cabluri, pe un costum complet uscat.",
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

export const BENEFITS = [
  {
    icon: <Wind className="w-8 h-8" />,
    title: "De ce să aleg Drysuit?",
    description: "Pentru că meriți confort. Spre deosebire de tehnologia veche, costumul nostru este complet uscat. Nu te udăm, nu îți este frig, pur și simplu te echipezi în 30 de secunde și începi."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Cum mă ajută Wireless?",
    description: "Libertate totală. Fără cabluri care să te țină legat de aparat, putem face exerciții dinamice, sărituri sau mișcări complexe pentru rezultate mai bune."
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Am nevoie de antrenor?",
    description: "Da, și îl ai inclus. Antrenorul tău personal reglează fin intensitatea pe tabletă și se asigură că execuți corect fiecare mișcare. Nu ești niciodată singur."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Igienă Garantată",
    description: "Toate costumele trec printr-un protocol riguros de spălare și dezinfectare profesională după fiecare utilizare."
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
    question: "Chiar funcționează în doar 20 de minute?",
    answer: "Da, și iată de ce: într-o sală normală lucrezi fiecare grupă musculară pe rând. La NeoBoost, impulsul EMS activează toate cele 20 de grupe musculare simultan, la fiecare contracție. Practic, faci 4 ore de contracții în 20 de minute.",
    icon: <Zap size={24} />
  },
  {
    question: "Voi slăbi dacă fac doar EMS?",
    answer: "Vei slăbi dacă ești în deficit caloric, iar EMS accelerază masiv acest proces. Arzi calorii în timpul antrenamentului, dar marele secret este efectul 'Afterburn': metabolismul tău rămâne ridicat 48h după sesiune pentru a reface fibrele musculare.",
    icon: <Flame size={24} />
  },
  {
    question: "Este curentul periculos pentru inimă?",
    answer: "Nu. Folosim joasă frecvență care lucrează strict pe musculatura scheletică. Nu afectează inima sau organele interne. Totuși, dacă ai stimulator cardiac (pacemaker), nu putem face antrenamentul.",
    icon: <ShieldCheck size={24} />
  },
  {
    question: "Mă vor durea mușchii după?",
    answer: "Probabil vei simți o febră musculară plăcută, semn că antrenamentul a fost eficient și corpul se transformă. Este dovada că ai activat mușchi pe care nu i-ai mai folosit de mult.",
    icon: <Activity size={24} />
  },
  {
    question: "De ce costă mai mult decât o sală normală?",
    answer: "Pentru că nu plătești doar accesul la aparate. Plătești tehnologia de vârf, intimitatea studioului și, cel mai important, antrenorul personal care stă cu tine secundă de secundă. Este un serviciu premium, totul inclus.",
    icon: <Crown size={24} />
  },
  {
    question: "Trebuie să îmi aduc haine de schimb?",
    answer: "Nu! Îți oferim noi tot echipamentul necesar. Tu trebuie să vii doar cu încălțăminte sport curată. Este ideal dacă vii în pauza de masă sau între întâlniri.",
    icon: <Shirt size={24} />
  },
  {
    question: "Cât de repede văd rezultate?",
    answer: "Clienții noștri simt diferența de tonus după 3-4 ședințe. Rezultatele vizibile (haine mai largi, siluetă definită) apar de obicei după un abonament intensiv de 8 săptămâni (Starter sau Progress).",
    icon: <Calendar size={24} />
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
    intro: "În contextul antrenamentelor EMS (Electrical Muscle Stimulation), „slăbire rapidă” trebuie înțeleasă ca o accelerare a cheltuielii energetice și a adaptărilor metabolice atunci când EMS este integrat întrun program coerent.",
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
    intro: "Durerea lombară nespecifică este una dintre cele mai comune probleme. Intervențiile moderne pun accent pe mișcare progresivă și pe recâștigarea încrederii în corp.",
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
    intro: "„Tonifierea” este o combinație între creșterea masei musculare și reducerea stratului adipos. EMS poate susține componenta de forță/hipertrofie, mai ales când este combinat cu exerciții active.",
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
    intro: "EMS poate fi o unealtă utilă pentru dezvoltarea forței dacă este folosită corect. Nu există „fără risc”, există reducerea riscului prin dozaj și tehnică.",
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
    description: "Simplu, eficient, măsurabil. Programul ideal pentru cei ocupați care vor să scadă în greutate sănătos și să fie recompensați pentru efort.",
    content: "6 Week Kickstart (EMS)\n\nSLĂBEȘTE 2–4 KG ÎN 6 SĂPTĂMÂNI ȘI TE RECOMPENSĂM!\n\n2–4 kilograme în 6 săptămâni (realist, în funcție de punctul de start și consistență).\n\nEști gata să faci o schimbare?\nDacă te-ai săturat de promisiuni goale și vrei un sistem care chiar funcționează pentru oameni ocupați, acesta este momentul tău. Simplu, eficient, măsurabil.\n\n[WHATSAPP_LINK]\n\nPENTRU CINE ESTE PROGRAMUL?\n✔️ Pentru tine dacă vrei să slăbești 2–4 kg într-un mod controlat și sănătos.\n✔️ Dacă ești \"time-poor\" și nu ai timp de ore întregi în sală.\n✔️ Dacă vrei un reset de disciplină și o pauză de la mâncatul emoțional.\n✔️ Dacă ai nevoie de responsabilitate și urmărire (nu doar un abonament nefolosit).\n\nNU ESTE PENTRU...\n❌ Cei care caută \"pastila magică\" fără pic de efort.\n❌ Cei care nu pot respecta 3 ședințe pe săptămână timp de 6 săptămâni.\n❌ Cei care nu sunt dispuși să țină un jurnal alimentar simplu.\n\nCUM SUNT ANTRENAMENTELE?\nProgramul se bazează pe EMS (Electrostimulare Musculară) – 30 de minute per ședință.\n- Eficient: Activăm 90% din musculatură simultan.\n- Sigur: Fără greutăți mari care să îți pună presiune pe articulații.\n- Structurat: 3 ședințe pe săptămână (sau 2, în varianta light) pentru consistență maximă.\n\nCE INCLUDE PROGRAMUL?\n- 18 sesiuni EMS (variantă 3/săpt) SAU 12 sesiuni EMS (variantă 2/săpt).\n- Nutriție personalizată: Plan simplu, jurnal alimentar cu feedback real.\n- Monitorizare: Măsurători la start și la fiecare 2 săptămâni.\n- Comunitate: Grup de suport WhatsApp pentru motivație zilnică.\n- Mini-workshop: \"Cum oprim mâncatul emoțional\".\n- Bonus: Ghid video \"3 exerciții acasă pentru spate puternic\".\n\nBONUS EXCLUSIV!\n- Ghid video pentru sănătatea spatelui\n- Acces prioritar la evenimente NeoBoost\n- Consultanță Nutriție Express\n\nRECOMPENSA 3+1 LUNĂ CADOU\nDacă după acest program decizi să continui și cumperi un pachet de 3 luni, iar pe parcursul celor 3 luni menții prezența și atingi obiectivele punctate împreună, primești încă 1 lună CADOU. Recompensăm disciplina!"
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
    description: "Revenire blândă și sigură în propriul corp. Ne concentrăm pe refacerea posturii și a tonusului într-un mediu privat și suportiv.",
    content: "Fit Mamma (EMS + postnatal safe)\n\nRECÂȘTIGĂ-ȚI ENERGIA ȘI POSTURA DUPĂ NAȘTERE – ȘI TE RECOMPENSĂM!\n\nRevenire blândă, controlată, fără presiune.\n\nEști gata să faci o schimbare?\nȘtim cum e. Timp puțin, oboseală multă. Fit Mamma nu e despre \"slăbit rapid\", ci despre a te simți din nou puternică în propriul corp.\n\n[WHATSAPP_LINK]\n\nPENTRU CINE ESTE PROGRAMUL?\n✔️ Pentru proaspete mămici care au acordul medicului pentru mișcare.\n✔️ Dacă vrei să îți corectezi postura și să întărești zona core.\n✔️ Dacă ai nevoie de energie și un moment doar pentru tine.\n✔️ Dacă eviți sălile aglomerate și vrei intimitate.\n\nCUM SUNT ANTRENAMENTELE?\n- Durată: 8 săptămâni.\n- Structură: 2 ședințe pe săptămână.\n- Format: EMS 30 min + exerciții funcționale low-impact.\n- Focus: Core, respirație, mobilitate, activare fesieri. Totul controlat, fără sărituri riscante.\n\nCE INCLUDE PROGRAMUL?\n- 16 sesiuni personalizate (EMS + Funcțional).\n- Screening inițial: Evaluare respirație și diastază (bază).\n- Nutriție: Ghid simplu pentru energie, fără diete restrictive.\n- Comunitate: Alte mămici care te înțeleg.\n- Educație: Cum să fii consistentă cu un bebe acasă.\n\nRECOMPENSA 3+1 LUNĂ CADOU\nDacă după programul de 8 săptămâni continui cu un pachet de 3 luni și menții prezența, primești încă 1 lună CADOU. Recompensăm grija față de corp, nu doar cântarul."
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
    description: "Eficiența unui antrenor personal la preț de grup. Ideal pentru cei care vor ghidaj atent și motivația unei echipe restrânse într-o sală de fitness modernă.",
    content: "Semi-Private Training\n\nEFICIENȚA UNUI ANTRENOR PERSONAL, ÎN GRUP MIC – ȘI TE RECOMPENSĂM!\n\nAtenție premium, cost optimizat, comunitate restrânsă.\n\nEști gata să faci o schimbare?\nVrei atenția unui antrenor personal, dar îți place energia unui grup mic? Semi-Private este soluția ideală: max 2-3 persoane, focus maxim pe tine.\n\n[WHATSAPP_LINK]\n\nPENTRU CINE ESTE PROGRAMUL?\n✔️ Pentru cei care vor ghidaj atent la un preț mai bun decât 1-la-1.\n✔️ Pentru cupluri sau prieteni care vor să se antreneze împreună.\n✔️ Pentru cei care se motivează mai bine într-un grup mic.\n✔️ Pentru cei care au nevoie de programare fixă.\n\nCUM SUNT ANTRENAMENTELE? (2 Opțiuni)\nA) Semi-Private EMS (30 min): Intensitate, tehnologie, rapiditate.\nB) Semi-Private Funcțional (45 min): Mișcare naturală, forță, condiție fizică în sala de fitness.\nIndiferent de opțiune, antrenorul este acolo să corecteze fiecare mișcare.\n\nCE INCLUDE PROGRAMUL?\n- Evaluare inițială detaliată.\n- Antrenamente cu instructor dedicat în grup de 2-3 persoane.\n- Plan de progres: Nu facem mișcare la întâmplare.\n- Tracking: Monitorizăm prezența și rezultatele.\n- Reguli clare de rezervare: Sistemul funcționează ceas.\n\nRECOMPENSA 3+1 LUNĂ CADOU\nDacă alegi un pachet de 3 luni și sunteți prezenți constant la sesiuni, vă oferim a 4-a lună CADOU. Fitness-ul e mai bun în echipă!"
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
    description: "Amestecul ideal între Tehnologie EMS (x2/săpt) și Antrenament Funcțional (x1/săpt) pentru rezultate estetice și funcționale complete.",
    content: "8-Week Transformation (Hybrid)\n\nRECOMPOZIȚIE CORPORALĂ ÎN 8 SĂPTĂMÂNI – ȘI TE RECOMPENSĂM!\n\nMixul perfect: Tehnologie EMS + Antrenament Funcțional Clasic.\n\nEști gata să faci o schimbare?\nVrei rezultate vizibile? Combinația Hybrid atacă grăsimea și construiește mușchi în același timp. Este protocolul nostru cel mai complet.\n\n[WHATSAPP_LINK]\n\nPENTRU CINE ESTE PROGRAMUL?\n✔️ Pentru cei care vor totul: eficiența EMS și plăcerea mișcării clasice.\n✔️ Pentru cei blocați la un anumit platou de slăbire.\n✔️ Dacă vrei să arăți \"fit\", nu doar \"slab\".\n✔️ Dacă poți dedica 3 ore pe săptămână pentru tine.\n\nCUM SUNT ANTRENAMENTELE?\nRitm: 3 ședințe pe săptămână.\n- 2 x EMS (30 min): Intensitate metabolică, tonifiere profundă.\n- 1 x Funcțional (45 min): Mobilitate, forță, cardio clasic.\nTotal: 24 de antrenamente intense și variate în 8 săptămâni.\n\nCE INCLUDE PROGRAMUL?\n- Nutriție personalizată: Plan adaptat pentru susținerea efortului hibrid.\n- Măsurători complete: Start, Săptămâna 4, Final.\n- Jurnal alimentar: Feedback săptămânal de la antrenor.\n- Comunitate: Grup dedicat transformării.\n\nRECOMPENSA 3+1 LUNĂ CADOU\nVrei să continui după cele 8 săptămâni? Dacă alegi un abonament de 3 luni și atingi obiectivele stabilite, ai o lună extra cadou. Excelența se premiază!"
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
    description: "Fără promisiuni exagerate. Doar disciplină, energie și o rutină sănătoasă recâștigată într-o singură lună de focus total.",
    content: "30-day Lifestyle Transformation\n\nRESET DE OBICEIURI ÎN 30 DE ZILE – ȘI TE RECOMPENSĂM!\n\nFără promisiuni exagerate. Doar disciplină, energie și o rutină sănătoasă recâștigată.\n\nEști gata să faci o schimbare?\nUneori ai nevoie doar de un impuls scurt să ieși din inerție. 30 de zile sunt suficiente să simți diferența.\n\n[WHATSAPP_LINK]\n\nPENTRU CINE ESTE PROGRAMUL?\n✔️ Pentru cei care vor să \"reînceapă\" după o pauză lungă.\n✔️ Dacă te simți lipsit de energie și rigid.\n✔️ Dacă vrei un angajament scurt înainte de a decide pe termen lung.\n✔️ Oameni foarte ocupați (low friction).\n\nCUM SUNT ANTRENAMENTELE?\nLa alegere, un singur traseu pentru simplitate:\n- Opțiunea A: 8 ședințe EMS (30 min)\n- Opțiunea B: 8 ședințe Funcțional (45 min)\n\nCE INCLUDE PROGRAMUL?\n- Protocol Zilnic de 10 Minute (acasă).\n- Jurnal Alimentar Simplu: 3 reguli de bază.\n- Check-in Săptămânal: Scurt și la obiect.\n- Comunitate WhatsApp: Nu ești singur.\n\nRECOMPENSA 3+1 LUNĂ CADOU\nDacă decizi să transformi acest restart de 30 de zile într-un stil de viață și alegi un pachet de 3 luni, beneficiezi de 1 lună CADOU."
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
    description: "Scoatem haosul din început. 14 zile pentru a afla exact cum funcționează corpul tău înainte de a începe un abonament lung.",
    content: "Pachet On-Boarding (Start Smart)\n\nSTART INTELIGENT: 14 ZILE SĂ SETĂM SISTEMUL – ȘI TE RECOMPENSĂM!\n\nScoatem haosul din început. Evaluare, planificare, testare.\n\nEști gata să faci o schimbare?\nMajoritatea renunță la sală pentru că încep haotic. Start Smart este fundația ta solidă.\n\n[WHATSAPP_LINK]\n\nPENTRU CINE ESTE PROGRAMUL?\n✔️ Pentru oricine este nou la NeoBoost.\n✔️ Dacă vrei să înveți CUM să te antrenezi înainte să cumperi un abonament lung.\n✔️ Dacă vrei claritate și structură.\n\nCUM SUNT ANTRENAMENTELE?\nMix de învățare și execuție: 2–4 ședințe EMS sau Funcțional. Scopul este însușirea tehnicii și setarea intensității corecte.\n\nCE INCLUDE PROGRAMUL?\n- Consultație Inițială Extinsă.\n- Analiză Corporală Detaliată.\n- Sesiuni de calibrare.\n- Sesiune Educațională (15 min).\n- Setare Obiective și Calendar.\n\nRECOMPENSA 3+1 LUNĂ CADOU\nDacă absolvi etapa On-Boarding și intri într-un abonament de 3 luni, a 4-a lună este oferită GRATUIT. Un start bun merită premiat!"
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
    description: "Experiență premium pentru cei care prețuiesc timpul și calitatea supremă. Spațiu privat, antrenor dedicat și prioritate absolută.",
    content: "Invitation-Only Experience (VIP)\n\nEXPERIENȚĂ PREMIUM, DISCREȚIE ȘI REZULTATE – PE BAZĂ DE INVITAȚIE\n\nNu pentru toată lumea. Doar pentru cei care prețuiesc timpul și calitatea supremă.\n\nEști gata să faci o schimbare?\nDacă cauți un mediu privat, fără aglomerație, cu programare prioritară și atenție 100% dedicată, ai ajuns unde trebuie.\n\n[WHATSAPP_LINK]\n\nPENTRU CINE ESTE PROGRAMUL?\n✔️ Antreprenori, manageri, persoane publice care au nevoie de discreție.\n✔️ Cei cu un program extrem de volatil.\n✔️ Cei care vor cea mai înaltă calitate a serviciului.\n✔️ Accesibil doar pe bază de recomandare sau aplicație.\n\nCUM SUNT ANTRENAMENTELE?\nComplet personalizate. EMS, Funcțional, Recuperare, Stretching asistat. Totul se învârte în jurul tău.\n\nCE INCLUDE PROGRAMUL?\n- Acces Exclusiv: Sloturi blocate doar pentru tine.\n- Concierge Fitness: Ne ocupăm de tot (prosoape, echipament, apă).\n- Discreție Totală: Spațiu privat.\n- Monitorizare Avansată: Postură, stres, parametri bio.\n\nRECOMPENSA 3+1 LUNĂ CADOU\nExcelența se recompensează. Dacă atingi obiectivele de sănătate stabilite, primești o lună de menținere CADOU."
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
      muscle: { start: 30.1, end: 35.6, unit: "%" }
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
      muscle: { start: 105, end: 100, unit: "cm", label: "Spate" }
    },
    aspectRatio: "aspect-[4/5]",
    // Combined image split logic: Zoom 200% and shift
    styleBefore: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '0% 0%', objectFit: 'cover' },
    styleAfter: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '100% 0%', objectFit: 'cover' },
    quote: "Mi-am recăpătat talia după sarcină. E incredibil (-9cm în talie!)."
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
      muscle: { start: 80, end: 72, unit: "cm", label: "Talie" }
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
    imageBefore: "/emanuel_h_aligned.png",
    imageAfter: "/emanuel_h_aligned.png",
    metrics: {
      weight: { start: 107, end: 80, unit: "cm", label: "Talie" },
      bodyFat: { start: 115, end: 88, unit: "cm", label: "Abdomen" },
      muscle: { start: 115, end: 102, unit: "cm", label: "Bazin" }
    },
    aspectRatio: "aspect-[4/5]",
    // Combined image split logic
    // Using AI-aligned image, no scale needed
    styleBefore: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '0% 0%', objectFit: 'cover' },
    styleAfter: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '100% 0%', objectFit: 'cover' },
    quote: "Minus 27cm în talie și abdomen. Cifrele vorbesc de la sine."
  },
  {
    id: 5,
    name: "Dani P.",
    duration: "2 Luni",
    package: "Master Body",
    imageBefore: "/dani_p.png",
    imageAfter: "/dani_p.png",
    metrics: {
      weight: { start: 116, end: 106, unit: "kg", label: "Greutate" },
      bodyFat: { start: 25, end: 17, unit: "%", label: "Grăsime" },
      muscle: { start: 39, end: 41.5, unit: "%", label: "Muschi" }
    },
    aspectRatio: "aspect-[9/16]",
    // Combined image split logic
    styleBefore: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '0% 0%', objectFit: 'cover' },
    styleAfter: { width: '200%', height: '100%', maxWidth: 'none', objectPosition: '100% 0%', objectFit: 'cover' },
    quote: "Rezultate validate în doar 2 luni. Scădere masivă în greutate și creștere musculară."
  }
];
