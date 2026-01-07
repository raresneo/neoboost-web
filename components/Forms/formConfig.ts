import { FormConfig } from './types';
import { BRAND } from '../../constants';

const WA_NUMBER = BRAND.phone.replace(/\s/g, '');

export const FORM_CONFIGS: Record<string, FormConfig> = {
    'kickstart': {
        programId: 'kickstart',
        title: 'Aplică pentru 6 Week Kickstart',
        steps: [
            { id: 'obiectiv', question: 'Care este obiectivul tău principal pentru următoarele 6 săptămâni?', type: 'text', placeholder: 'Ex: Să slăbesc 4kg, să am mai multă energie...' },
            { id: 'frecventa', question: 'Ce frecvență de antrenament este realistă pentru tine?', type: 'radio', options: ['2 ședințe pe săptămână', '3 ședințe pe săptămână', 'Doar 1 ședință (Întreținere)'] },
            { id: 'piedica', question: 'Care a fost principala piedică până acum?', type: 'text', placeholder: 'Ex: Lipsa de timp, lipsa motivației, programul haotic...' },
            { id: 'jurnal', question: 'Ești dispus(ă) să ții un jurnal alimentar simplu (4-6 zile/săpt)?', type: 'radio', options: ['Da, 100%', 'Voi încerca', 'Nu, prefer fără'] },
            { id: 'ems_experienta', question: 'Ai mai făcut antrenamente EMS până acum?', type: 'radio', options: ['Da', 'Nu'] },
            { id: 'contraindicatii', question: 'Ai contraindicații medicale majore?', subtext: 'Ex: stimulator cardiac, sarcină, epilepsie. Scrie "Nu" dacă ești apt.', type: 'text', placeholder: 'Nu / Da: ...' },
            { id: 'locatie', question: 'În ce locație preferi să te antrenezi?', type: 'radio', options: ['Hotel Ramada (Calea Aradului)', 'GetFit (Lotus Center)'] },
            { id: 'disponibilitate', question: 'Care este disponibilitatea ta generală?', type: 'text', placeholder: 'Ex: Luni-Miercuri după 17:00' },
            { id: 'start', question: 'Când ai dori să începi?', type: 'radio', options: ['Cât mai curând posibil', 'Săptămâna viitoare', 'Luna viitoare', 'Doar mă informez'] },
            { id: 'nume', question: 'Care este numele tău?', type: 'text', placeholder: 'Ex: Pop' },
            { id: 'prenume', question: 'Care este prenumele tău?', type: 'text', placeholder: 'Ex: Ion' },
            { id: 'telefon', question: 'Care este numărul tău de telefon?', type: 'text', placeholder: '07xx...' },
            { id: 'email', question: 'Care este adresa ta de email?', type: 'text', placeholder: 'nume@exemplu.com' },
            { id: 'observatii', question: 'Alte observații sau întrebări? (Opțional)', type: 'textarea', required: false }
        ],
        whatsappTemplate: `Bună, vreau să mă înscriu la: 6 Week Kickstart (EMS)%0A%0ANume: {nume} {prenume}%0ATelefon: {telefon}%0AEmail: {email}%0A%0ALocație preferată: {locatie}%0A%0ADisponibilitate (zile/interval): {disponibilitate}%0A%0ACând vreau să încep: {start}%0AObiectiv principal (6 săpt): {obiectiv}%0A%0AFrecvență realistă: {frecventa}%0A%0APiedica #1: {piedica}%0A%0AJurnal alimentar 4–6 zile/săpt: {jurnal}%0AExperiență EMS: {ems_experienta}%0A%0AContraindicații EMS: {contraindicatii}%0AObservații (opțional): {observatii}%0ATe rog să-mi spui pașii următori + ce sloturi sunt disponibile.`
    },
    'fit-mamma': {
        programId: 'fit-mamma',
        title: 'Detalii Program Fit Mamma',
        steps: [
            { id: 'luni_postpartum', question: 'Câte luni au trecut de la naștere?', type: 'text', placeholder: 'Ex: 6 luni' },
            { id: 'acord_medical', question: 'Ai acordul medicului pentru a începe mișcarea?', type: 'radio', options: ['Da', 'Nu încă', 'Urmează să întreb'] },
            { id: 'alaptare', question: 'Alăptezi în prezent?', type: 'radio', options: ['Da', 'Nu'] },
            { id: 'obiectiv', question: 'Care este obiectivul tău #1 acum?', type: 'text', placeholder: 'Ex: Recuperare abdomen, Slăbire, Energie...' },
            { id: 'limitare', question: 'Care este principala limitare fizică sau logistică?', type: 'text', placeholder: 'Ex: Dureri de spate, lipsă bonă...' },
            { id: 'frecventa', question: 'Ce frecvență este realistă pentru tine?', type: 'radio', options: ['2 ședințe / săptămână', '1 ședință / săptămână', 'Nu știu sigur'] },
            { id: 'ems_experienta', question: 'Ai experiență cu antrenamentele EMS?', type: 'radio', options: ['Da', 'Nu'] },
            { id: 'contraindicatii', question: 'Există alte contraindicații medicale?', type: 'text', placeholder: 'Scrie "Nu" dacă totul e ok' },
            { id: 'locatie', question: 'Locația preferată?', type: 'radio', options: ['Hotel Ramada (Calea Aradului)', 'GetFit (Lotus Center)'] },
            { id: 'disponibilitate', question: 'Când ai putea veni la antrenamente?', type: 'text', placeholder: 'Zile / Intervale orare' },
            { id: 'start', question: 'Când dorești să începi?', type: 'radio', options: ['Imediat', 'Săptămâna viitoare', 'Mai târziu'] },
            { id: 'nume', question: 'Numele tău:', type: 'text', placeholder: 'Pop' },
            { id: 'prenume', question: 'Prenumele tău:', type: 'text', placeholder: 'Maria' },
            { id: 'telefon', question: 'Telefon:', type: 'text', placeholder: '07xx...' },
            { id: 'email', question: 'Email:', type: 'text', placeholder: 'maria@email.com' },
            { id: 'observatii', question: 'Observații (Opțional)', type: 'textarea', required: false }
        ],
        whatsappTemplate: `Bună, vreau detalii pentru: Fit Mamma%0A%0ANume: {nume} {prenume}%0ATelefon: {telefon}%0AEmail: {email}%0A%0ALocație preferată: {locatie}%0A%0ADisponibilitate (zile/interval): {disponibilitate}%0A%0ACând vreau să încep: {start}%0APostpartum: {luni_postpartum}%0A%0AAcord medical (unde e cazul): {acord_medical}%0A%0AAlăptez: {alaptare}%0AObiectiv #1: {obiectiv}%0A%0ALimitarea principală acum: {limitare}%0A%0AFrecvență realistă: {frecventa}%0AExperiență EMS: {ems_experienta}%0A%0AContraindicații EMS: {contraindicatii}%0AObservații (opțional): {observatii}%0AVreau o consultație gratuită și o recomandare de program.`
    },
    'semi-private': {
        programId: 'semi-private',
        title: 'Aplică pentru Semi-Private',
        steps: [
            { id: 'cu_cine', question: 'Cu cine vei veni la antrenament?', type: 'radio', options: ['Singur(ă) - caut partener', 'Cu un prieten/ă', 'Cu partenerul/partenera'] },
            { id: 'format_preferat', question: 'Ce format de antrenament preferi?', type: 'radio', options: ['EMS (30 min)', 'Funcțional (45 min)', 'Mix'] },
            { id: 'nivel', question: 'Care este nivelul tău actual de fitness?', type: 'radio', options: ['Începător', 'Mediu', 'Avansat'] },
            { id: 'obiectiv', question: 'Care este obiectivul principal al grupului?', type: 'text', placeholder: 'Ex: Slăbire, Distracție, Tonifiere' },
            { id: 'slot_fix', question: 'Puteți stabili un slot orar fix săptămânal?', type: 'radio', options: ['Da, vrem program fix', 'Preferăm flexibil'] },
            { id: 'ems_experienta', question: 'Ai mai făcut EMS?', type: 'radio', options: ['Da', 'Nu'] },
            { id: 'contraindicatii', question: 'Contraindicații medicale?', type: 'text', placeholder: 'Scrie "Nu" sau detaliază' },
            { id: 'locatie', question: 'Locația preferată:', type: 'radio', options: ['Hotel Ramada', 'GetFit'] },
            { id: 'disponibilitate', question: 'Disponibilitatea voastră:', type: 'text', placeholder: 'Zilele și orele comune' },
            { id: 'start', question: 'Când începem?', type: 'radio', options: ['Săptămâna aceasta', 'Săptămâna viitoare', 'Viitorul apropiat'] },
            { id: 'nume', question: 'Numele tău:', type: 'text', placeholder: 'Popescu' },
            { id: 'prenume', question: 'Prenumele tău:', type: 'text', placeholder: 'Andrei' },
            { id: 'telefon', question: 'Telefon:', type: 'text', placeholder: '07xx...' },
            { id: 'email', question: 'Email:', type: 'text', placeholder: 'andrei@email.com' },
            { id: 'observatii', question: 'Alte detalii', type: 'textarea', required: false }
        ],
        whatsappTemplate: `Bună, vreau să încep: Semi-Private Training%0A%0ANume: {nume} {prenume}%0ATelefon: {telefon}%0AEmail: {email}%0A%0ALocație preferată: {locatie}%0A%0ADisponibilitate (zile/interval): {disponibilitate}%0A%0ACând vreau să încep: {start}%0AVin: {cu_cine}%0A%0APrefer: {format_preferat}%0A%0ANivel: {nivel}%0A%0AObiectiv: {obiectiv}%0A%0ASlot fix săptămânal: {slot_fix}%0AExperiență EMS (dacă e cazul): {ems_experienta}%0A%0AContraindicații EMS: {contraindicatii}%0AObservații (opțional): {observatii}%0ATe rog să-mi recomanzi varianta potrivită și să-mi propui 2–3 sloturi.`
    },
    '8-week-transform': {
        programId: '8-week-transform',
        title: 'Aplică pentru 8-Week Transformation',
        steps: [
            { id: 'accept_3x', question: 'Poți susține 3 antrenamente pe săptămână timp de 8 săptămâni?', type: 'radio', options: ['Da, îmi asum', 'Nu sunt sigur', 'Nu pot'] },
            { id: 'obiectiv', question: 'Care este obiectivul tău "Big Picture"?', type: 'text', placeholder: 'Ex: Vreau să arăt fit pentru nuntă...' },
            { id: 'problema', question: 'Care este cea mai mare problemă acum?', type: 'text', placeholder: 'Ex: Burtă, brațe moi, lipsă energie' },
            { id: 'tracking', question: 'Cum preferi să monitorizăm progresul?', type: 'radio', options: ['Kilograme (Cântar)', 'Centimetri (Măsurători)', 'Poze (Vizual)', 'Performanță Sportivă', 'Toate de mai sus'] },
            { id: 'jurnal', question: 'Ești dispus să ții jurnal alimentar 4-6 zile/săpt?', type: 'radio', options: ['Da, este esențial', 'Voi încerca', 'Nu prea'] },
            { id: 'ems_experienta', question: 'Experiență anterioară cu EMS?', type: 'radio', options: ['Da', 'Nu'] },
            { id: 'contraindicatii', question: 'Contraindicații Medicale?', type: 'text', placeholder: '...' },
            { id: 'locatie', question: 'Locație:', type: 'radio', options: ['Hotel Ramada', 'GetFit'] },
            { id: 'disponibilitate', question: 'Când te poți antrena?', type: 'text', placeholder: 'Intervale orare preferate' },
            { id: 'start', question: 'Data de start dorită:', type: 'text', placeholder: 'Ex: 1 Februarie' },
            { id: 'nume', question: 'Numele tău:', type: 'text', placeholder: 'Ionescu' },
            { id: 'prenume', question: 'Prenumele tău:', type: 'text', placeholder: 'Radu' },
            { id: 'telefon', question: 'Telefon:', type: 'text', placeholder: '07xx...' },
            { id: 'email', question: 'Email:', type: 'text', placeholder: 'radu@email.com' },
            { id: 'observatii', question: 'Alte mențiuni:', type: 'textarea', required: false }
        ],
        whatsappTemplate: `Bună, vreau detalii pentru: 8-Week Transformation (Hybrid)%0A%0ANume: {nume} {prenume}%0ATelefon: {telefon}%0AEmail: {email}%0A%0ALocație preferată: {locatie}%0A%0ADisponibilitate (zile/interval): {disponibilitate}%0A%0ACând vreau să încep: {start}%0APot face 3 ședințe/săpt timp de 8 săpt: {accept_3x}%0A%0AObiectiv principal: {obiectiv}%0A%0AProblema #1: {problema}%0A%0ATracking preferat: {tracking}%0A%0AJurnal alimentar 4–6 zile/săpt: {jurnal}%0AExperiență EMS: {ems_experienta}%0A%0AContraindicații EMS: {contraindicatii}%0AObservații (opțional): {observatii}%0AVreau consultația gratuită + recomandarea de structură (2 EMS + 1 funcțional).`
    },
    '30-day-lifestyle': {
        programId: '30-day-lifestyle',
        title: 'Aplică pentru 30-Day Lifestyle',
        steps: [
            { id: 'haos', question: 'Pe o scară de la 1 la 10, cât de haotic este programul tău acum?', type: 'radio', options: ['1-3 (Organizată)', '4-7 (Mediu)', '8-10 (Haos Total)'] },
            { id: 'traseu', question: 'Ce traseu de antrenament preferi?', type: 'radio', options: ['8 ședințe EMS', '8 ședințe Funcțional', 'Nu știu, decideți voi'] },
            { id: 'obicei', question: 'Care este obiceiul #1 pe care vrei să-l repari?', type: 'text', placeholder: 'Ex: Mâncatul seara, lipsa de somn...' },
            { id: '10_minute', question: 'Poți dedica 10 minute zilnic acasă (dimineața)?', type: 'radio', options: ['Da', 'Nu'] },
            { id: 'frecventa', question: 'Frecvența realistă la sală:', type: 'radio', options: ['2x pe săptămână', '3x pe săptămână'] },
            { id: 'ems_experienta', question: 'Experiență EMS:', type: 'radio', options: ['Da', 'Nu'] },
            { id: 'contraindicatii', question: 'Contraindicații:', type: 'text', placeholder: 'Nu / Da...' },
            { id: 'rezultat_30zile', question: 'Ce vrei să fie diferit peste 30 de zile?', type: 'text', placeholder: 'Cum vrei să te simți?' },
            { id: 'locatie', question: 'Locație:', type: 'radio', options: ['Hotel Ramada', 'GetFit'] },
            { id: 'disponibilitate', question: 'Disponibilitate:', type: 'text', placeholder: '...' },
            { id: 'start', question: 'Când începem?', type: 'radio', options: ['Săptămâna aceasta', 'De lunea viitoare'] },
            { id: 'nume', question: 'Nume:', type: 'text', placeholder: 'Pop' },
            { id: 'prenume', question: 'Prenume:', type: 'text', placeholder: 'Vasile' },
            { id: 'telefon', question: 'Telefon:', type: 'text', placeholder: '07xx...' },
            { id: 'email', question: 'Email:', type: 'text', placeholder: 'vasile@email.com' },
            { id: 'observatii', question: 'Observații:', type: 'textarea', required: false }
        ],
        whatsappTemplate: `Bună, vreau să încep: 30-day Lifestyle Transformation%0A%0ANume: {nume} {prenume}%0ATelefon: {telefon}%0AEmail: {email}%0A%0ALocație preferată: {locatie}%0A%0ADisponibilitate (zile/interval): {disponibilitate}%0A%0ACând vreau să încep: {start}%0AProgram haotic (1–10): {haos}%0A%0ATraseu preferat: {traseu}%0A%0AObiceiul #1 de reparat: {obicei}%0A%0APot face zilnic 10 minute: {10_minute}%0A%0AFrecvență realistă: {frecventa}%0AExperiență EMS (dacă e cazul): {ems_experienta}%0A%0AContraindicații EMS: {contraindicatii}%0ACe vreau să fie diferit peste 30 zile: {rezultat_30zile}%0ATe rog să-mi spui pașii următori și ce sloturi sunt disponibile.`
    },
    'on-boarding': {
        programId: 'on-boarding',
        title: 'Start Smart Onboarding',
        steps: [
            { id: 'blocaj', question: 'Ce te-a oprit să începi până acum?', type: 'text', placeholder: 'Ex: Nu știu ce să fac, mi-e frică de febră...' },
            { id: 'ems_experienta', question: 'Ai mai încercat EMS?', type: 'radio', options: ['Da', 'Nu', 'Am auzit doar'] },
            { id: 'pachet', question: 'Ce pachet de onboarding preferi?', type: 'radio', options: ['2 ședințe (Test)', '4 ședințe (Complet 14 zile)'] },
            { id: 'programare', question: 'Preferi o programare fixă sau flexibilă?', type: 'radio', options: ['Slot Fix (Recomandat)', 'Flexibil'] },
            { id: 'obiectiv', question: 'Care este obiectivul tău principal?', type: 'text' },
            { id: 'contraindicatii', question: 'Contraindicații medicale:', type: 'text', placeholder: 'Nu / Da...' },
            { id: 'locatie', question: 'Locație:', type: 'radio', options: ['Hotel Ramada', 'GetFit'] },
            { id: 'disponibilitate', question: 'Disponibilitate pentru primele sesiuni:', type: 'text' },
            { id: 'start', question: 'Când vrei să programăm prima evaluare?', type: 'text' },
            { id: 'nume', question: 'Nume:', type: 'text' },
            { id: 'prenume', question: 'Prenume:', type: 'text' },
            { id: 'telefon', question: 'Telefon:', type: 'text' },
            { id: 'email', question: 'Email:', type: 'text' },
            { id: 'observatii', question: 'Alte detalii:', type: 'textarea', required: false }
        ],
        whatsappTemplate: `Bună, vreau: Start Smart Onboarding (14 zile)%0A%0ANume: {nume} {prenume}%0ATelefon: {telefon}%0AEmail: {email}%0A%0ALocație preferată: {locatie}%0A%0ADisponibilitate (zile/interval): {disponibilitate}%0A%0ACând vreau să încep: {start}%0ACe m-a oprit până acum: {blocaj}%0A%0AExperiență EMS: {ems_experienta}%0A%0APachet onboarding: {pachet}%0A%0APrefer programare: {programare}%0A%0AObiectiv: {obiectiv}%0A%0AContraindicații EMS: {contraindicatii}%0AObservații (opțional): {observatii}%0AVreau consultația gratuită și să setăm calendarul pe 14 zile.`
    },
    'vip': {
        programId: 'vip',
        title: 'Invitation-Only Experience (VIP)',
        steps: [
            { id: 'sursa', question: 'Cum ai aflat de experiența VIP?', type: 'radio', options: ['Recomandare membru', 'Invitație', 'Partener', 'Social Media'] },
            { id: 'vip_definitie', question: 'Ce înseamnă un serviciu VIP pentru tine?', type: 'text', placeholder: 'Ex: Discreție, flexibilitate, totul inclus...' },
            { id: 'format_preferat', question: 'Ce format preferi?', type: 'radio', options: ['1:1 (Exclusiv)', 'Semi-Private (Grup mic)'] },
            { id: 'frecventa', question: 'Câte ședințe pe săptămână îți poți asuma?', type: 'radio', options: ['2', '3', '4+'] },
            { id: 'obiectiv_90zile', question: 'Care este obiectivul tău pe următoarele 90 de zile?', type: 'text' },
            { id: 'ems_experienta', question: 'Experiență EMS:', type: 'radio', options: ['Da', 'Nu'] },
            { id: 'contraindicatii', question: 'Contraindicații:', type: 'text' },
            { id: 'disponibilitate', question: 'Care este intervalul orar preferat?', type: 'text', placeholder: 'Ex: Dimineața 07:00 - 09:00' },
            { id: 'locatie', question: 'Locația preferată (VIP area):', type: 'radio', options: ['Hotel Ramada (VIP Studio)'] },
            { id: 'start', question: 'Când ai dori să începi?', type: 'text' },
            { id: 'nume', question: 'Nume:', type: 'text' },
            { id: 'prenume', question: 'Prenume:', type: 'text' },
            { id: 'telefon', question: 'Telefon:', type: 'text' },
            { id: 'email', question: 'Email:', type: 'text' }
        ],
        whatsappTemplate: `Bună, sunt interesat(ă) de: Invitation-Only Experience (VIP)%0A%0ANume: {nume} {prenume}%0ATelefon: {telefon}%0AEmail: {email}%0A%0AAm ajuns prin: {sursa}%0ACe înseamnă VIP pentru mine: {vip_definitie}%0A%0APrefer: {format_preferat}%0A%0ACâte ședințe/săpt îmi asum: {frecventa}%0A%0AObiectiv pe 90 zile: {obiectiv_90zile}%0AExperiență EMS: {ems_experienta}%0A%0AContraindicații EMS: {contraindicatii}%0ADisponibilitate (zile/interval): {disponibilitate}%0A%0ALocație preferată: {locatie}%0A%0ACând vreau să încep: {start}%0ATe rog să-mi spui pașii următori.`
    }
};
