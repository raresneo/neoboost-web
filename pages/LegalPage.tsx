import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MoveUpRight } from 'lucide-react';

// --- Legal Page Component ---
export const LegalPage: React.FC = () => {
    const { type = 'privacy' } = useParams<{ type: 'privacy' | 'terms' | 'rules' }>();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    const content = {
        privacy: {
            title: "Politică de Confidențialitate",
            sections: [
                {
                    h: "1. Introducere",
                    p: "La NeoBoost (denumit în continuare „noi”, „site-ul” sau „studioul”), confidențialitatea datelor dumneavoastră este o prioritate. Această politică explică modul în care colectăm, utilizăm și protejăm informațiile dumneavoastră personale în conformitate cu Regulamentul General privind Protecția Datelor (GDPR)."
                },
                {
                    h: "2. Datele pe care le colectăm",
                    p: "Colectăm informații necesare pentru a vă oferi serviciile noastre, inclusiv: nume, prenume, adresă de email, număr de telefon (pentru programări și contact), date de plată (procesate securizat prin Stripe) și date tehnice (adresa IP, tipul browserului) prin intermediul fișierelor de tip cookie."
                },
                {
                    h: "3. Scopul colectării",
                    p: "Utilizăm aceste date pentru: prelucrarea programărilor pentru sesiunile EMS, procesarea plăților pentru abonamente, comunicarea detaliilor despre serviciile noastre și, doar cu acordul dumneavoastră explicit, pentru trimiterea de oferte promoționale."
                },
                {
                    h: "4. Partajarea datelor",
                    p: "Nu vindem și nu închiriem datele dumneavoastră către terți. Datele pot fi accesate de furnizori de servicii esențiale precum Stripe (procesare plăți) și Supabase (stocare baze de date), care respectă standarde stricte de securitate."
                },
                {
                    h: "5. Drepturile dumneavoastră",
                    p: "Conform legii, aveți dreptul de a solicita accesul la datele dumneavoastră, rectificarea acestora, ștergerea („dreptul de a fi uitat”), restricționarea prelucrării sau portabilitatea datelor. Pentru orice solicitare, ne puteți contacta la admin@neo-boost.com."
                },
                {
                    h: "6. Securitate",
                    p: "Implementăm măsuri tehnice și organizatorice avansate (criptare SSL, stocare securizată) pentru a proteja datele împotriva accesului neautorizat sau pierderii accidentale."
                }
            ]
        },
        terms: {
            title: "Termeni și Condiții",
            sections: [
                {
                    h: "1. Condiții Generale",
                    p: "Prin accesarea site-ului și utilizarea serviciilor NeoBoost, sunteți de acord cu acești termeni. Serviciile noastre sunt destinate persoanelor cu vârsta peste 18 ani (sau minori cu acord parental)."
                },
                {
                    h: "2. Rezervări și Anulări",
                    p: "Rezervările pentru sesiunile EMS se fac online sau telefonic. Anularea unei ședințe trebuie făcută cu cel puțin 12 ore înainte, în caz contrar ședința fiind considerată efectuată."
                },
                {
                    h: "3. Plata și Pachete",
                    p: "Plata se face în avans pentru pachetele de ședințe. Pachetele au o valabilitate limitată conform descrierii fiecărui abonament (30 de zile pentru pachete lunare)."
                },
                {
                    h: "4. Valabilitatea abonamentului și ședințele neefectuate",
                    p: "Abonamentele lunare se consumă în intervalul de valabilitate de 30 de zile de la data activării. Ședințele incluse trebuie programate și efectuate în acest interval. Ședințele neefectuate în perioada de valabilitate se pierd și nu se reportează automat în luna următoare. Această regulă există pentru ca planificarea sălii și disponibilitatea sloturilor să rămână predictibile pentru toți clienții."
                },
                {
                    h: "5. Recuperarea ședințelor",
                    p: "Recuperarea ședințelor este o excepție, nu un drept automat. În interiorul perioadei de valabilitate, ședințele ratate într-o săptămână pot fi recuperate în săptămânile următoare. În situații neprevăzute justificate (problemă de sănătate, plecare din localitate) se poate acorda o perioadă suplimentară de o săptămână pentru recuperare, chiar și după expirare, pe baza unui document justificativ (adeverință medicală, document de călătorie). Excepția poate fi folosită o singură dată la 3 luni, iar aprobarea rămâne la latitudinea administratorului."
                },
                {
                    h: "6. Politica de returnare a banilor",
                    p: "Abonamentele și pachetele de ședințe NeoBoost sunt servicii care se activează la data achiziției și nu sunt eligibile pentru returnarea sau rambursarea sumelor achitate, integral sau parțial, odată ce serviciul a început să fie prestat. Aceasta include situațiile în care clientul renunță la antrenamente din proprie inițiativă, nu se prezintă la ședințele programate sau nu consumă toate ședințele în perioada de valabilitate. Singura excepție este exercitarea dreptului legal de retragere în condițiile prevăzute la secțiunea 9. În afara acestei situații, sumele achitate nu se rambursează și nu se convertesc în bani, ci pot fi valorificate exclusiv sub formă de servicii, în condițiile secțiunilor 7 și 8."
                },
                {
                    h: "7. Alternative la returnare",
                    p: "Pentru situațiile în care clientul nu poate continua antrenamentele, oferim, la cerere și în limita disponibilității, următoarele soluții echivalente în valoare: transferul ședințelor neefectuate către un alt tip de antrenament din oferta noastră, transferul acestora către o altă persoană nominalizată de client, sau prelungirea perioadei de valabilitate a abonamentului. Aceste soluții se acordă ca gest comercial, nu ca obligație contractuală, iar aprobarea rămâne la latitudinea administratorului."
                },
                {
                    h: "8. Întreruperea din motive medicale",
                    p: "Prin întrerupere din motive medicale se înțelege exclusiv situația în care un medic recomandă în scris încetarea sau suspendarea antrenamentelor de tip EMS. Simpla invocare a unor dureri, a unui disconfort după antrenament sau a unei senzații neplăcute nu constituie, în sine, motiv medical în sensul prezentei secțiuni: disconfortul muscular ori senzația neobișnuită la primele ședințe sunt reacții normale de adaptare, iar în astfel de cazuri soluția este ajustarea intensității și a programului împreună cu antrenorul. Beneficiul prevăzut aici se acordă numai la prezentarea unui document medical care poartă data, numele și parafa medicului emitent și care indică explicit contraindicația. Pe baza acestui document, clientul are dreptul la înghețarea abonamentului pe durata recomandării medicale sau la transferul ședințelor neefectuate către un alt tip de antrenament compatibil cu starea sa. Siguranța clientului are prioritate față de continuitatea abonamentului. Nici în acest caz nu se efectuează rambursări în bani, valoarea rămasă fiind păstrată integral la dispoziția clientului sub formă de servicii."
                },
                {
                    h: "9. Dreptul de retragere pentru contractele încheiate la distanță",
                    p: "Conform Ordonanței de Urgență nr. 34/2014, consumatorul beneficiază de un termen de 14 zile calendaristice pentru retragerea din contractele încheiate la distanță sau în afara spațiilor comerciale, termen care curge de la data încheierii contractului. Prin achiziționarea unui abonament și prin programarea sau efectuarea primei ședințe în interiorul acestui termen, clientul solicită în mod expres începerea prestării serviciului înainte de expirarea perioadei de retragere și ia la cunoștință faptul că, potrivit art. 16 din aceeași ordonanță, își pierde dreptul de retragere după prestarea integrală a serviciului. În cazul retragerii în interiorul termenului de 14 zile, pentru un serviciu prestat doar parțial, clientul datorează contravaloarea proporțională a ceea ce i-a fost furnizat până la momentul comunicării retragerii, iar diferența se restituie în termen de 14 zile de la data la care am fost informați, folosind aceeași modalitate de plată. După expirarea termenului de 14 zile, dreptul de retragere nu mai poate fi exercitat, aplicându-se secțiunile 6, 7 și 8."
                },
                {
                    h: "10. Neprezentarea la ședință",
                    p: "Ședința la care clientul nu se prezintă și pe care nu a anulat-o cu cel puțin 12 ore înainte este considerată efectuată și se scade din abonament. Sala, echipamentul și antrenorul sunt rezervate nominal pentru intervalul respectiv, motiv pentru care slotul nu poate fi valorificat altfel."
                },
                {
                    h: "11. Reclamații și soluționarea disputelor",
                    p: "Orice reclamație legată de serviciile noastre poate fi transmisă la admin@neo-boost.com și primește răspuns în termen de maximum 14 zile calendaristice. Ne angajăm să analizăm fiecare situație individual și să căutăm o soluție echitabilă. În cazul în care nu se ajunge la un acord, consumatorul se poate adresa Autorității Naționale pentru Protecția Consumatorilor (ANPC, anpc.ro) sau poate folosi platforma europeană de soluționare online a litigiilor."
                }
            ]
        },
        rules: {
            title: "Regulament Intern",
            sections: [
                {
                    h: "1. Echipamentul și Igiena",
                    p: "Utilizarea echipamentului furnizat de NeoBoost este obligatorie. Vă rugăm să veniți cu încălțăminte de schimb curată pentru zona de antrenament."
                },
                {
                    h: "2. Siguranța la Antrenament",
                    p: "Este obligatoriu să informați antrenorul despre orice problemă de sănătate sau contraindicație medicală înainte de începerea sesiunii EMS."
                },
                {
                    h: "3. Comportament",
                    p: "NeoBoost promovează un mediu de respect reciproc. Ne rezervăm dreptul de a refuza accesul persoanelor cu un comportament neadecvat."
                }
            ]
        }
    };

    const current = content[type];

    return (
        <div className="min-h-screen bg-white text-gray-900 relative z-50">
            <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm">
                <Link
                    to="/"
                    className="relative overflow-hidden flex items-center gap-3 text-blue-600 hover:text-black bg-blue-50 hover:bg-blue-100 transition-all px-6 py-3 rounded-lg border border-blue-100 font-bold text-xs uppercase tracking-[0.2em] group"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <MoveUpRight size={16} className="rotate-[225deg] group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                        ÎNAPOI
                    </span>
                </Link>
                <div className="mono-font text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                    LEGAL / {current.title}
                </div>
            </div>

            <div className="pt-32 pb-20 container mx-auto px-6 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-black impact-font text-gray-900 mb-12 uppercase tracking-tight">{current.title}</h1>
                <div className="space-y-12">
                    {current.sections.map((s, i) => (
                        <div key={i} className="space-y-4">
                            <h2 className="text-xl font-black impact-font text-blue-600 uppercase border-l-2 border-blue-600 pl-4">{s.h}</h2>
                            <p className="text-gray-500 leading-relaxed font-light">{s.p}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
