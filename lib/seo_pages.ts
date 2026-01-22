export type SeoIntent = 'local' | 'commercial' | 'informational';

export interface SeoPageConfig {
    slug: string;
    keyword: string; // The "H1" keyword
    intent: SeoIntent;
    cluster: string;
    title: string;
    description: string;
    priority: 'H' | 'M' | 'L';
    secondaryKeywords: string[]; // For metadata
}

export const SEO_PAGES: SeoPageConfig[] = [
    // 1. Antrenament Cluster (Local)
    {
        slug: 'antrenament-ems-oradea',
        keyword: 'Antrenament EMS Oradea',
        intent: 'local',
        cluster: 'antrenament',
        title: 'Antrenament EMS Oradea — Sala Fitness NeoBoost',
        description: 'Cel mai eficient antrenament din Oradea. 20 de minute de EMS echivalează cu 4 ore de fitness clasic. Studio central, parcare gratuită.',
        priority: 'H',
        secondaryKeywords: [
            'antrenament EMS lângă mine',
            'EMS training Oradea',
            'EMS edzés Nagyvárad',
            'EMS pentru femei Oradea',
            'antrenamente EMS Oradea',
            'EMS pentru bărbați',
            'EMS pentru spate Oradea',
            'EMS personalizat Oradea',
            'antrenament EMS 20 minute',
            'EMS fitness lângă mine',
            'antrenament EMS 2x săptămână',
            'antrenament EMS eficace',
            'EMS pentru începători',
            'antrenament EMS personal',
            'antrenament EMS grup'
        ]
    },

    // 2. Slăbire Cluster (Commercial)
    {
        slug: 'slabire-ems',
        keyword: 'Slăbire Rapidă cu EMS',
        intent: 'commercial',
        cluster: 'slăbire',
        title: 'Slăbire EMS în Oradea — Arzi Grăsime Rapid',
        description: 'Program specializat de slăbire cu electrostimulare. Elimină celulita și țesutul adipos în ședințe scurte de 20 de minute.',
        priority: 'H',
        secondaryKeywords: [
            'EMS slăbire Oradea',
            'slăbire cu EMS Oradea',
            'EMS weight loss Oradea',
            'beneficii EMS slăbire',
            'EMS remodelare corporală',
            'EMS slăbire rapidă',
            'slăbire EMS 2 luni',
            'beneficii EMS pentru slăbire',
            'EMS ardere grăsimi',
            'EMS transformare corporală',
            'EMS slăbire femei',
            'EMS slăbire abdomen',
            'EMS slăbire grăsimi',
            'slăbire cu EMS femei',
            'EMS slăbire abdomen Oradea',
            'slăbire EMS 15kg',
            'EMS ardere calorii'
        ]
    },

    // 3. Sesiune / Trial Cluster (Informational/Commercial) -> Using Informational layout with strong CTAs
    {
        slug: 'sesiune-ems',
        keyword: 'Sesiune EMS NeoBoost',
        intent: 'informational',
        cluster: 'sesiune',
        title: 'Prima Sesiune EMS — Ghid Complet & Ofertă',
        description: 'Cum decurge prima ta sesiune EMS? Află tot ce trebuie să știi despre echipament, senzatii și rezultate. Rezervă o sesiune de probă.',
        priority: 'H',
        secondaryKeywords: [
            'sesiune EMS Oradea',
            'prima sesiune EMS gratuit',
            'sesiuni EMS săptămânale',
            'sesiune EMS prima dată',
            'sesiune EMS 45 minute',
            'sesiune EMS gratuită',
            'sesiune EMS cu antrenor',
            'sesiune EMS 30 min',
            'prima vizită EMS'
        ]
    },

    // 4. Preturi Cluster (Commercial)
    {
        slug: 'pret-ems',
        keyword: 'Prețuri & Oferte EMS',
        intent: 'commercial',
        cluster: 'pret',
        title: 'Prețuri EMS Oradea — Abonamente și Ședințe',
        description: 'Lista completă de prețuri pentru antrenamentele EMS NeoBoost. Abonamente lunare, pachete flexibile și oferte speciale.',
        priority: 'H',
        secondaryKeywords: [
            'EMS preț Oradea',
            'preț sesiune EMS',
            'EMS session price',
            'cost sesiune EMS',
            'promoție EMS Oradea',
            'preț abonament EMS',
            'cost EMS lunar',
            'EMS preț promoțional',
            'preț EMS starter',
            'EMS Oradea oferte',
            'preț sesiune EMS Oradea',
            'EMS preț pachet 8',
            'preț EMS transform',
            'EMS preț sesiune single',
            'preț pachet EMS 4'
        ]
    },

    // 5. Studio Cluster (Local)
    {
        slug: 'studio-ems-oradea',
        keyword: 'Studio NeoBoost Oradea',
        intent: 'local',
        cluster: 'studio',
        title: 'Studio EMS Premium în Oradea — Locații și Facilități',
        description: 'NeoBoost te așteaptă în locații premium din Oradea (Ramada, GetFit). Studiouri moderne, tehnologie wireless și condiții de 5 stele.',
        priority: 'H',
        secondaryKeywords: [
            'studio EMS Oradea',
            'EMS studio Nagyvárad',
            'studio EMS lângă mine',
            'EMS Oradea centru',
            'studio EMS Bihor',
            'EMS lângă mine Oradea',
            'studio EMS modern Oradea',
            'studio EMS profesionist',
            'EMS Oradea locație',
            'EMS Bihor studio',
            'studio EMS Oradea centru',
            'studio EMS tehnologie',
            'studio EMS premium',
            'EMS Oradea adresă'
        ]
    },

    // 6. General/Brand Cluster (Local/Informational)
    {
        slug: 'ems-oradea',
        keyword: 'EMS în Oradea',
        intent: 'local',
        cluster: 'general',
        title: 'EMS Oradea — Revoluția Fitness-ului Scurt și Eficient',
        description: 'Antrenează-te inteligent cu NeoBoost EMS Oradea. Tehnologie de ultimă generație pentru oameni ocupați care vor rezultate.',
        priority: 'H',
        secondaryKeywords: [
            'EMS fitness Oradea'
        ]
    },

    // 7. Abonamente Cluster (Commercial)
    {
        slug: 'abonamente-ems',
        keyword: 'Abonamente EMS',
        intent: 'commercial',
        cluster: 'abonamente',
        title: 'Abonamente EMS Oradea — Pachete Flexibile',
        description: 'Alege abonamentul care ți se potrivește. De la pachete Starter la transformări complete de 3 luni. Flexibilitate și rezultate.',
        priority: 'H',
        secondaryKeywords: [
            'abonament EMS Oradea',
            'pachet EMS 4 sedinte',
            'abonament 8 sedinte EMS',
            'pachet starter EMS',
            'abonament progress EMS',
            'pachet 10 sedinte EMS',
            'abonament EMS elite',
            'pachet EMS progress',
            'abonament lunar EMS',
            'pachet transform EMS',
            'abonament EMS 710 RON',
            'pachet EMS 850 RON',
            'abonament EMS starter 460'
        ]
    },

    // 8. Educational "Ce este" (Informational)
    {
        slug: 'ce-este-ems',
        keyword: 'Ce este EMS?',
        intent: 'informational',
        cluster: 'general',
        title: 'Ce este Antrenamentul EMS? — Totul despre Electrostimulare',
        description: 'EMS (Electrical Muscle Stimulation) explicat pe înțelesul tuturor. Cum funcționează, care sunt beneficiile științifice și de ce este sigur.',
        priority: 'M',
        secondaryKeywords: [
            'ce este EMS Oradea',
            'beneficii EMS zilnice',
            'diferenta ems fitness',
            'EMS pentru wellness',
            'EMS beneficii sănătate'
        ]
    },

    // 9. Programare Cluster (Commercial)
    {
        slug: 'program-ems',
        keyword: 'Programări & Orar',
        intent: 'commercial',
        cluster: 'program',
        title: 'Programare EMS Oradea — Rezervă Locul Tău',
        description: 'Program flexibil 07:00 - 21:00. Rezervă-ți sesiunea de 20 de minute online sau telefonic. NeoBoost se adaptează orarului tău.',
        priority: 'H',
        secondaryKeywords: [
            'program EMS Oradea',
            'programare EMS Oradea',
            'EMS Oradea program',
            'program EMS flexibil',
            'programare sesiune EMS',
            'programare online EMS',
            'program EMS Oradea ore'
        ]
    },

    // 10. Tonifiere Cluster (Commercial/Info)
    {
        slug: 'tonifiere-ems',
        keyword: 'Tonifiere Musculară',
        intent: 'commercial',
        cluster: 'tonifiere',
        title: 'Tonifiere Corporală cu EMS — Fermitate în 8 Săptămâni',
        description: 'Obține un corp tonifiat și piele fermă fără ore nesfârșite la sală. EMS activează 90% din fibrele musculare pentru definiție rapidă.',
        priority: 'M',
        secondaryKeywords: [
            'EMS tonifiere musculară',
            'EMS pentru tonus muscular',
            'tonifiere cu EMS',
            'beneficii EMS spate',
            'EMS pentru postură',
            'tonifiere musculară EMS'
        ]
    },

    // 11. Rezultate/Recenzii (Informational)
    {
        slug: 'rezultate-ems',
        keyword: 'Rezultate & Recenzii',
        intent: 'informational',
        cluster: 'rezultate',
        title: 'Rezultate EMS Oradea — Povești Reale ale Clienților',
        description: 'Vezi transformările clienților NeoBoost. Poze înainte și după, recenzii autentice și studii de caz despre eficiența EMS.',
        priority: 'H',
        secondaryKeywords: [
            'rezultate EMS după 8 sedinte',
            'EMS Oradea recenzii',
            'recenzii clienți EMS',
            'EMS slăbire rezultate',
            'EMS Oradea recenzii clienți',
            'recenzii EMS Oradea'
        ]
    },

    // 12. Comparatie (Informational)
    {
        slug: 'ems-vs-sala',
        keyword: 'EMS vs Sală Clasică',
        intent: 'informational',
        cluster: 'comparatie',
        title: 'EMS vs Fitness Clasic — Care este diferența?',
        description: 'De ce să alegi EMS în locul sălii tradiționale? Comparație detaliată: timp, eficiență, costuri și rezultate.',
        priority: 'M',
        secondaryKeywords: [
            'EMS vs sala Oradea',
            'EMS vs fitness clasic'
        ]
    },

    // 13. Contact (Local)
    {
        slug: 'contact',
        keyword: 'Contact NeoBoost',
        intent: 'local', // Using local layout as it's cleaner for contact info
        cluster: 'contact',
        title: 'Contact NeoBoost EMS Oradea — Telefon și Locație',
        description: 'Intră în legătură cu noi. Telefon, WhatsApp, locații fizice în Oradea. Suntem aici să îți răspundem la orice întrebare.',
        priority: 'M',
        secondaryKeywords: [
            'EMS Oradea contact',
            'EMS Oradea telefon'
        ]
    }
];
