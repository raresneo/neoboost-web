import React from 'react';
import { TypingHeading } from '../components/ui/TypingHeading';
import { CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/Button';

export const ServicesPage: React.FC = () => {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-[var(--bg-primary)]">
            <Helmet>
                <title>Servicii EMS ORADEA – Cum funcționează | NeoBoost</title>
                <meta name="description" content="Află cum funcționează antrenamentul EMS la NeoBoost Oradea. Ședințe de 30 de minute cu antrenor personal pentru rezultate vizibile." />
            </Helmet>

            <div className="container mx-auto px-6 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <TypingHeading
                        text="Antrenament EMS în Oradea – cum funcționează NeoBoost"
                        highlightText="NeoBoost"
                        highlightColor="text-brand"
                        className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-8 leading-tight uppercase italic"
                    />

                    <p className="text-[var(--text-secondary)] text-xl leading-relaxed mb-16">
                        La NeoBoost folosești antrenamentul EMS (electrostimulare musculară) ca să obții în 20–30 de minute efectul unui antrenament clasic mult mai lung. Lucrezi 1-la-1 cu un antrenor, într-un studio modern din Oradea, iar ședințele sunt adaptate nivelului și obiectivului tău.
                    </p>

                    <div className="space-y-16">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-6">Ce este EMS și de ce funcționează</h2>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                                EMS înseamnă că mușchii tăi sunt activați cu ajutorul unor impulsuri electrice controlate, în timp ce faci exerciții simple, ghidate. Impulsurile ajung în profunzimea fibrelor musculare și fac ca fiecare mișcare să fie mult mai eficientă. Astfel, într-o sesiune scurtă, mușchii lucrează intens, fără să fie nevoie să petreci ore întregi în sală.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-6">Cum decurge o ședință EMS la NeoBoost</h2>
                            <ul className="space-y-4">
                                {[
                                    "Discuți câteva minute cu antrenorul despre obiectivul tău (slăbire, tonifiere, revenire după pauză etc.).",
                                    "Îmbraci echipamentul EMS, iar antrenorul setează intensitatea în funcție de cum te simți.",
                                    "Faci 20–30 de minute de exerciții simple, dar eficiente, ghidate pas cu pas.",
                                    "La final, primești recomandări despre frecvența ședințelor și mici ajustări în stilul de viață, ca să vezi rezultate mai repede."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <CheckCircle2 className="text-brand shrink-0 mt-1" size={24} />
                                        <span className="text-[var(--text-secondary)] text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-6">Pentru cine este potrivit antrenamentul EMS</h2>
                            <ul className="space-y-4">
                                {[
                                    "Persoane foarte ocupate, care nu au timp de antrenamente lungi.",
                                    "Oameni care vor să slăbească și să își remodeleze corpul într-un mod controlat.",
                                    "Mame care vor să revină treptat în formă după sarcină, fără promisiuni nerealiste.",
                                    "Persoane sedentare care vor să reînceapă mișcarea cu ajutorul unui antrenor.",
                                    "Cei care vor mai multă fermitate, postură mai bună și energie în viața de zi cu zi."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <CheckCircle2 className="text-brand shrink-0 mt-1" size={24} />
                                        <span className="text-[var(--text-secondary)] text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-6">Ce rezultate poți aștepta (realist)</h2>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                                Rezultatele diferă de la persoană la persoană, dar în general clienții simt mai mult tonus și energie după primele ședințe. Pe măsură ce continui antrenamentele și respecți recomandările, poți observa o reducere a centimetrilor în zonele cu probleme, îmbunătățirea fermității pielii și o postură mai bună. La NeoBoost preferăm să promitem mai puțin și să livrăm mai mult, de aceea vorbim cu tine deschis despre ce este realist pentru cazul tău.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-6">Cât de des poți face EMS?</h2>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                                De obicei, antrenamentele EMS se fac de 1–2 ori pe săptămână, astfel încât corpul să aibă timp să se refacă între ședințe. Frecvența exactă o stabilești împreună cu antrenorul, în funcție de obiectiv, stil de viață și nivelul tău actual de pregătire fizică.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6 border-t border-[var(--border-subtle)]">
                                <Button size="lg" variant="energy" onClick={() => window.open('https://calendly.com/neoboost-getfit', '_blank')}>
                                    Programează prima vizită gratuită
                                </Button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
