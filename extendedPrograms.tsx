import { ExtendedProgram } from './types';
import { PROGRAMS } from './constants';

// Extended program data with all landing page sections
export const EXTENDED_PROGRAMS: ExtendedProgram[] = [
    {
        ...PROGRAMS[0], // 6 Week Kickstart
        forWho: {
            ideal: [
                "Pentru tine dacă vrei să slăbești 2–4 kg într-un mod controlat și sănătos",
                "Dacă ești \"time-poor\" și nu ai timp de ore întregi în sală",
                "Dacă vrei un reset de disciplină și o pauză de la mâncatul emoțional",
                "Dacă ai nevoie de responsabilitate și urmărire (nu doar un abonament nefolosit)"
            ],
            notFor: [
                "Cei care caută \"pastila magică\" fără pic de efort",
                "Cei care nu pot respecta 3 ședințe pe săptămână timp de 6 săptămâni",
                "Cei care nu sunt dispuși să țină un jurnal alimentar simplu"
            ]
        },
        workoutDetails: {
            duration: "6 săptămâni",
            frequency: "3 ședințe pe săptămână (sau 2, în varianta light)",
            format: "EMS (Electrostimulare Musculară) – 30 de minute per ședință",
            structure: [
                "Eficient: Activăm 90% din musculatură simultan",
                "Sigur: Fără greutăți mari care să îți pună presiune pe articulații",
                "Structurat: 3 ședințe pe săptămână pentru consistență maximă"
            ]
        },
        includes: [
            "18 sesiuni EMS (variantă 3/săpt) SAU 12 sesiuni EMS (variantă 2/săpt)",
            "Nutriție personalizată: Plan simplu, jurnal alimentar cu feedback real",
            "Monitorizare: Măsurători la start și la fiecare 2 săptămâni",
            "Comunitate: Grup de suport WhatsApp pentru motivație zilnică",
            "Mini-workshop: \"Cum oprim mâncatul emoțional\"",
            "Bonus: Ghid video \"3 exerciții acasă pentru spate puternic\""
        ],
        pricing: {
            specialPrice: "Preț special (detalii pe WhatsApp)",
            referencePackages: true,
            details: "Programul Kickstart are un preț special, dar iată structura noastră standard pentru referință"
        },
        bonuses: [
            "Ghid \"3 exerciții acasă pentru spate puternic\"",
            "Acces prioritar la evenimentele comunității NeoBoost",
            "Consultare Nutriție Express"
        ],
        reward3Plus1: {
            enabled: true,
            conditions: [
                "Ai prezență minim 80–90%",
                "Completezi jurnalul alimentar",
                "Vii la check-in și măsurători",
                "Atingi obiectivul realist stabilit împreună (kg/cm)"
            ],
            description: "Dacă după acest program decizi să continui și cumperi un pachet de 3 luni, iar pe parcursul celor 3 luni îndeplinești condițiile de mai sus, primești încă 1 lună CADOU."
        },
        participationConditions: [
            "Disponibilitate pentru 3 antrenamente/săptămână (cca 45 min cu tot cu schimbat)",
            "Seriozitate în completarea jurnalului alimentar",
            "Sinceritate legată de starea de sănătate (acord medical dacă e cazul)"
        ],
        freeConsultation: {
            title: "PRIMUL PAS? CONSULTAȚIE GRATUITĂ",
            description: "Nu cumperi nimic \"orb\". Ne vedem la studio (Ramada sau Lotus): Facem o analiză corporală detaliată, Discutăm obiectivele tale specifice, Vedem dacă Kickstart este potrivit pentru tine.",
            calendlyLink: "https://calendly.com/neoboost-oradea/30min"
        },
        afterConsultation: "Dacă ne potrivim, stabilim orarul și începem prima ședință. Dacă nu, pleci oricum cu sfaturi valoroase despre corpul tău.",
        seo: {
            title: "6 Week Kickstart - Slăbește 2-4 kg în 6 Săptămâni",
            description: "Program EMS intensiv de 6 săptămâni pentru slăbire sănătoasă. Antrenamente de 30 minute, nutriție personalizată și recompensă 3+1 lună cadou. Oradea.",
            keywords: ["slăbire rapidă", "EMS Oradea", "antrenament 30 minute", "pierdere în greutate", "program fitness 6 săptămâni"]
        }
    },
    {
        ...PROGRAMS[1], // Fit Mamma
        forWho: {
            ideal: [
                "Pentru proaspete mămici care au acordul medicului pentru mișcare",
                "Dacă vrei să îți corectezi postura și să întărești zona core",
                "Dacă ai nevoie de energie și un moment doar pentru tine",
                "Dacă eviți sălile aglomerate și vrei intimitate"
            ],
            notFor: [
                "Cele care caută slăbire drastică imediat după naștere",
                "Cele care nu au încă avizul medicului (obligatoriu)",
                "Cele care vor antrenamente de intensitate extremă (HIIT) din prima zi"
            ]
        },
        workoutDetails: {
            duration: "8 săptămâni",
            frequency: "2 ședințe pe săptămână",
            format: "EMS 30 min + exerciții funcționale low-impact",
            structure: [
                "Focus: Core, respirație, mobilitate, activare fesieri",
                "Totul controlat, fără sărituri riscante",
                "Adaptare progresivă la nevoile post-natale"
            ]
        },
        includes: [
            "16 sesiuni personalizate (EMS + Funcțional)",
            "Screening inițial: Evaluare respirație și diastază (bază)",
            "Nutriție: Ghid simplu pentru energie, fără diete restrictive (mai ales dacă alăptezi)",
            "Comunitate: Alte mămici care te înțeleg",
            "Educație: Cum să fii consistentă cu un bebe acasă"
        ],
        pricing: {
            specialPrice: "Preț special (detalii pe WhatsApp)",
            referencePackages: true,
            details: "Programul Fit Mamma are un preț special, dar iată structura noastră standard pentru referință"
        },
        bonuses: [
            "Mini-ghid \"Energie în primele 10 minute ale zilei\"",
            "Checklist recuperare post-partum"
        ],
        reward3Plus1: {
            enabled: true,
            conditions: [
                "Menții prezența (min 80%)",
                "Completezi jurnalul simplificat",
                "Atingi obiectivul de recuperare/postură stabilit"
            ],
            description: "Dacă după programul de 8 săptămâni continui cu un pachet de 3 luni și îndeplinești condițiile, primești încă 1 lună CADOU. Recompensăm procesul și grija față de corp, nu doar cântarul."
        },
        participationConditions: [
            "Acord medical (dacă nașterea a fost recentă sau au fost complicații)",
            "Disponibilitate 2 ore pe săptămână",
            "Deschidere spre o abordare \"slow & steady\""
        ],
        freeConsultation: {
            title: "PRIMUL PAS? CONSULTAȚIE GRATUITĂ",
            description: "Vino să discutăm. Vedem exact în ce stadiu ești și cum te putem ajuta în siguranță. Măsurăm compoziția corporală doar dacă e relevant și sigur.",
            calendlyLink: "https://calendly.com/neoboost-oradea/30min"
        },
        afterConsultation: "Stabilim orarul care să se potrivească cu programul bebelușului (pe cât posibil) și începem ușor.",
        seo: {
            title: "Fit Mamma - Program Post-Natal EMS Sigur",
            description: "Program EMS special pentru mămici. Recuperare post-natală, întărire core, energie. 8 săptămâni, 2 ședințe/săptămână. Oradea.",
            keywords: ["fitness post-natal", "recuperare după naștere", "EMS mămici", "core post-partum", "Oradea"]
        }
    },
    {
        ...PROGRAMS[2], // Semi-Private
        forWho: {
            ideal: [
                "Pentru cei care vor ghidaj atent la un preț mai bun decât 1-la-1",
                "Pentru cupluri sau prieteni care vor să se antreneze împreună",
                "Pentru cei care se motivează mai bine într-un grup mic",
                "Pentru cei care au nevoie de programare fixă (sloturi rezervate)"
            ],
            notFor: [
                "Cei care preferă să se \"ascundă\" în mulțimea unei clase de aerobic",
                "Cei care anulează des pe ultima sută de metri (afectează grupul)",
                "Cei care vor să se antreneze complet singuri"
            ]
        },
        workoutDetails: {
            duration: "Flexibil",
            frequency: "2-3 ședințe pe săptămână",
            format: "Semi-Private EMS (30 min) SAU Semi-Private Funcțional (45 min)",
            structure: [
                "Grup de maxim 2-3 persoane",
                "Antrenorul corectează fiecare mișcare",
                "Intensitate adaptată individual"
            ]
        },
        includes: [
            "Evaluare inițială detaliată",
            "Antrenamente în grup de 2-3 persoane",
            "Plan de progres: Nu facem mișcare la întâmplare",
            "Tracking: Monitorizăm prezența, efortul (RPE) și rezultatele",
            "Reguli clare de rezervare: Sistemul funcționează ceas"
        ],
        pricing: {
            referencePackages: true,
            details: "Prețurile sunt identice cu pachetele standard, dar beneficiezi de atenție semi-personalizată"
        },
        bonuses: [
            "Priority Scheduling: Ai prioritate la rezervarea orelor preferate",
            "Sesiune de Recalibrare: La fiecare 4 săptămâni analizăm progresul"
        ],
        reward3Plus1: {
            enabled: true,
            conditions: [
                "Ești prezent la >90% din sesiuni",
                "Respecți jurnalul alimentar",
                "Atingi obiectivul stabilit (kg, cm, forță)"
            ],
            description: "Dacă alegi un pachet de 3 luni (oricare plan) și îndeplinești condițiile, îți oferim a 4-a lună CADOU."
        },
        participationConditions: [
            "Respectarea programărilor (grupul depinde de tine)",
            "Atitudine pozitivă și respectuoasă față de colegi",
            "Consistență"
        ],
        freeConsultation: {
            title: "PRIMUL PAS? CONSULTAȚIE GRATUITĂ",
            description: "Hai să ne cunoaștem. Vedem dacă ești compatibil cu grupurile existente sau formăm un grup nou.",
            calendlyLink: "https://calendly.com/neoboost-oradea/30min"
        },
        afterConsultation: "Îți propunem sloturile disponibile și tipul de antrenament potrivit.",
        seo: {
            title: "Semi-Private Training - Antrenament în Grup Mic",
            description: "Antrenament EMS sau Funcțional în grupuri de 2-3 persoane. Atenție personalizată la preț optim. Oradea.",
            keywords: ["antrenament grup mic", "semi-private EMS", "fitness cupluri", "antrenament prieteni", "Oradea"]
        }
    },
    {
        ...PROGRAMS[3], // 8-Week Transformation
        forWho: {
            ideal: [
                "Pentru cei care vor totul: eficiența EMS și plăcerea mișcării clasice",
                "Pentru cei blocați la un anumit platou de slăbire",
                "Dacă vrei să arăți \"fit\", nu doar \"slab\"",
                "Dacă poți dedica 3 ore pe săptămână pentru tine"
            ],
            notFor: [
                "Cei care vor doar să stea pe un aparat fără să se miște",
                "Cei care nu pot veni de 3 ori pe săptămână"
            ]
        },
        workoutDetails: {
            duration: "8 săptămâni",
            frequency: "3 ședințe pe săptămână",
            format: "2 x EMS (30 min) + 1 x Funcțional (45 min)",
            structure: [
                "Intensitate metabolică și tonifiere profundă (EMS)",
                "Mobilitate, forță, cardio clasic (Funcțional)",
                "Total: 24 de antrenamente intense și variate"
            ]
        },
        includes: [
            "Nutriție personalizată: Plan adaptat pentru susținerea efortului hibrid",
            "Măsurători complete: Start, Săptămâna 4, Final",
            "Jurnal alimentar: Feedback săptămânal de la antrenor",
            "Comunitate: Grup dedicat transformării"
        ],
        pricing: {
            specialPrice: "Costul se discută la sediu, bazat pe obiective",
            referencePackages: true,
            details: "Programul Hybrid are un preț special adaptat intensității"
        },
        bonuses: [
            "Ghid \"Proteină & Porții\" – cum să mănânci corect",
            "Mini-workshop \"Obiceiurile invizibile\" (Somn, Pași, Stres)"
        ],
        reward3Plus1: {
            enabled: true,
            conditions: [
                "Ai bifat prezența și jurnalul",
                "Ai atins obiectivul de recompoziție (cm/kg) stabilit la început"
            ],
            description: "Vrei să continui după cele 8 săptămâni? Dacă cumperi un abonament de 3 luni și îndeplinești condițiile, ai o lună extra din partea noastră. Este modul nostru de a premia munca, nu genetica."
        },
        participationConditions: [
            "Angajament pentru 8 săptămâni",
            "Respectarea structurii 2+1 (EMS+Funcțional)",
            "Echilibru în alimentație"
        ],
        freeConsultation: {
            title: "PRIMUL PAS? CONSULTAȚIE GRATUITĂ",
            description: "Facem analiza corporală. Vedem raportul grăsime/mușchi. Stabilim ținta.",
            calendlyLink: "https://calendly.com/neoboost-oradea/30min"
        },
        afterConsultation: "Primești planul, orarul și intrăm în sală.",
        seo: {
            title: "8-Week Transformation - Recompoziție Corporală Hybrid",
            description: "Program intensiv 8 săptămâni: 2xEMS + 1xFuncțional/săptămână. Arzi grăsime și construiești mușchi simultan. Oradea.",
            keywords: ["transformare corporală", "recompoziție", "program hybrid", "EMS + funcțional", "Oradea"]
        }
    },
    {
        ...PROGRAMS[4], // 30-Day Lifestyle
        forWho: {
            ideal: [
                "Pentru cei care vor să \"reînceapă\" după o pauză lungă",
                "Dacă te simți lipsit de energie și rigid",
                "Dacă vrei un angajament scurt înainte de a decide pe termen lung",
                "Oameni foarte ocupați (low friction)"
            ],
            notFor: [
                "Cei care așteaptă să devină atleți olimpici într-o lună",
                "Cei care nu vor să schimbe nimic în alimentație"
            ]
        },
        workoutDetails: {
            duration: "30 de zile",
            frequency: "2 ședințe pe săptămână",
            format: "8 ședințe EMS (30 min) SAU 8 ședințe Funcțional (45 min)",
            structure: [
                "Protocol Zilnic de 10 Minute acasă (obligatoriu)",
                "Jurnal Alimentar Simplu: Doar 3 reguli de bază",
                "Check-in Săptămânal: Scurt și la obiect"
            ]
        },
        includes: [
            "8 ședințe la alegere (EMS sau Funcțional)",
            "Protocol Zilnic de 10 Minute (Mers / Respirație / Mobilitate)",
            "Jurnal Alimentar Simplu",
            "Check-in Săptămânal",
            "Comunitate WhatsApp: Nu ești singur"
        ],
        pricing: {
            referencePackages: true,
            details: "Preț special pentru programul de 30 zile"
        },
        bonuses: [
            "Plan de Menținere: Ce faci în următoarele 14 zile după ce termini programul"
        ],
        reward3Plus1: {
            enabled: true,
            conditions: [
                "Respectă procesul",
                "Atinge obiectivul inițial"
            ],
            description: "Dacă decizi să transformi acest \"trial\" într-un stil de viață și iei un pachet de 3 luni, beneficiezi de 1 lună CADOU. Simplu. Corect."
        },
        participationConditions: [
            "Completezi check-in-ul săptămânal",
            "Respecți cele 3 reguli alimentare"
        ],
        freeConsultation: {
            title: "PRIMUL PAS? CONSULTAȚIE GRATUITĂ",
            description: "Hai să vedem de unde plecăm. Fără presiune.",
            calendlyLink: "https://calendly.com/neoboost-oradea/30min"
        },
        afterConsultation: "Alegi Opțiunea A sau B și începem a doua zi.",
        seo: {
            title: "30-Day Lifestyle - Reset de Obiceiuri în 30 Zile",
            description: "Program scurt de 30 zile pentru reset mental și fizic. 8 ședințe + protocol zilnic. Disciplină și energie. Oradea.",
            keywords: ["reset fitness", "30 zile", "obiceiuri sănătoase", "energie", "disciplină", "Oradea"]
        }
    },
    {
        ...PROGRAMS[5], // On-Boarding
        forWho: {
            ideal: [
                "Pentru oricine este nou la NeoBoost",
                "Dacă vrei să înveți CUM să te antrenezi și CUM să mănânci înainte să cumperi un abonament lung",
                "Dacă vrei claritate și structură"
            ],
            notFor: [
                "Cei care vor doar \"o ședință de probă\" (acesta este un proces, nu o vizită)",
                "\"Turiștii\" de fitness care schimbă sala în fiecare lună"
            ]
        },
        workoutDetails: {
            duration: "14 zile",
            frequency: "2-4 ședințe în total",
            format: "Mix de învățare și execuție: EMS și/sau Funcțional",
            structure: [
                "Scopul nu este epuizarea, ci însușirea tehnicii",
                "Setarea intensității corecte",
                "Învățarea fundamentelor"
            ]
        },
        includes: [
            "Consultație Inițială Extinsă",
            "Analiză Corporală (Generic): Vedem cifrele reale",
            "Sesiuni EMS de calibrare",
            "Sesiune Educațională (15 min): Bazele nutriției și recuperării",
            "Setare Obiective și Calendar: Știi exact ce faci în următoarele 3 luni"
        ],
        pricing: {
            specialPrice: "Întreabă pe WhatsApp",
            referencePackages: true,
            details: "Preț special pentru pachetul Start Smart"
        },
        bonuses: [
            "Ghid de programare: Cum să îți faci timp când nu ai timp",
            "Reguli de consistență: Mentalitatea care te ține în joc"
        ],
        reward3Plus1: {
            enabled: true,
            conditions: [
                "Respectă planul creat aici",
                "Atinge obiectivul"
            ],
            description: "Dacă \"absolvi\" On-Boarding-ul și intri într-un abonament de 3 luni, a 4-a lună este din partea casei. Un start bun merită premiat."
        },
        participationConditions: [
            "Dorința de a învăța",
            "Prezență la toate sesiunile din cele 14 zile"
        ],
        freeConsultation: {
            title: "PRIMUL PAS? CONSULTAȚIE GRATUITĂ",
            description: "Analizăm, discutăm, planificăm.",
            calendlyLink: "https://calendly.com/neoboost-oradea/30min"
        },
        afterConsultation: "Primești kit-ul de bun venit (digital), regulile casei și intrăm în pâine.",
        seo: {
            title: "Start Smart On-Boarding - Fundație Solidă în 14 Zile",
            description: "Program de introducere NeoBoost. Învață tehnica corectă, setează obiective, primește plan personalizat. 14 zile. Oradea.",
            keywords: ["început fitness", "onboarding EMS", "program începători", "evaluare corporală", "Oradea"]
        }
    },
    {
        ...PROGRAMS[6], // VIP
        forWho: {
            ideal: [
                "Antreprenori, manageri, persoane publice care au nevoie de discreție",
                "Cei cu un program extrem de volatil care necesită flexibilitate maximă",
                "Cei care vor cea mai înaltă calitate a serviciului, fără compromisuri",
                "Accesibil doar pe bază de recomandare sau aplicație directă (evaluată)"
            ],
            notFor: [
                "Cei care caută \"cea mai ieftină sală din oraș\"",
                "Cei care nu respectă timpul antrenorului",
                "Cei nehotărâți"
            ]
        },
        workoutDetails: {
            duration: "Custom",
            frequency: "Flexibil, adaptat programului tău",
            format: "Complet personalizat: EMS, Funcțional, Recuperare, Stretching asistat",
            structure: [
                "Totul se învârte în jurul tău",
                "Adaptare zilnică la nevoile tale",
                "Atenție 100% dedicată"
            ]
        },
        includes: [
            "Acces Exclusiv: Sloturi blocate doar pentru tine",
            "Concierge Fitness: Ne ocupăm de programări, prosoape, echipament, apă, suplimente",
            "Discreție Totală: Spațiu privat în locațiile noastre",
            "Monitorizare Avansată: Analiză corporală, postură, stres"
        ],
        pricing: {
            specialPrice: "Disponibile doar la cerere, după interviu",
            referencePackages: true,
            details: "VIP Experience depășește pachetele standard prin nivelul de serviciu adăugat"
        },
        bonuses: [
            "Produse de hidratare și recuperare incluse",
            "Acces direct la Head Coach"
        ],
        reward3Plus1: {
            enabled: true,
            conditions: [
                "Respecți protocolul agreat",
                "Atingi obiectivele de sănătate"
            ],
            description: "Chiar și la nivel VIP, credem în meritocrație. Dacă îndeplinești condițiile, primești o lună de menținere cadou. Excelența se recompensează."
        },
        participationConditions: [
            "Recomandare din partea unui membru existent SAU interviu de acceptare",
            "Respectarea codului de conduită NeoBoost"
        ],
        freeConsultation: {
            title: "APLICĂ PENTRU CONSULTAȚIE",
            description: "Discutăm confidențial despre nevoile tale.",
            calendlyLink: "https://calendly.com/neoboost-oradea/30min"
        },
        afterConsultation: "Dacă suntem compatibili, îți deschidem accesul la calendarul VIP.",
        seo: {
            title: "VIP Experience - Fitness Premium pe Invitație",
            description: "Experiență fitness exclusivă pentru antreprenori și manageri. Discreție, flexibilitate, atenție dedicată. Doar pe invitație. Oradea.",
            keywords: ["fitness VIP", "antrenament exclusiv", "personal training premium", "discreție", "Oradea"]
        }
    }
];

// Helper function to get extended program by ID
export const getExtendedProgram = (id: string): ExtendedProgram | undefined => {
    return EXTENDED_PROGRAMS.find(p => p.id === id);
};
