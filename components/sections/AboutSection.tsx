import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ScrollTextReveal } from '../ui/ScrollTextReveal';
import { FlashCardStack } from '../ui/FlashCardStack';
import { Check, Heart, Users, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextScramble } from '../ui/TextScramble';
import { SpotlightCard } from '../ui/SpotlightCard';
import { TimeSavedCalculator } from '../ui/TimeSavedCalculator';

export const AboutSection = () => {
    return (
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 md:px-24 relative z-10">

                {/* 1. CONCEPTUL NEOBOOST */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase italic leading-[0.9] mb-8">
                            <TextScramble text="CE FACEM DIFERIT LA" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">NEOBOOST</span>
                        </h2>
                        <h3 className="text-2xl text-[var(--accent-primary)] font-bold mb-6">
                            Nu suntem o sală. Suntem antrenorul tău personal din Oradea. 🤝
                        </h3>
                        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                            Ai fost la sală? Atunci știi cum e: te pierzi printre aparate, nu știi ce să faci, nimeni nu te întreabă dacă faci bine mișcarea. La noi nu există asta. 🙅‍♂️
                        </p>
                        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                            Aici ai un <strong className="text-blue-600 font-black">antrenor personal dedicat</strong> la fiecare ședință. Știe cum te cheamă, ce obiectiv ai, ce te doare și pe ce trebuie să lucrăm. Te corectează dacă greșești postura. Îți ajustează intensitatea în timp real. Combinăm <strong className="text-blue-600 font-black">antrenamente EMS Oradea</strong> cu nutriție personalizată și coaching pentru mindset. Nu vindem abonamente. Vindem rezultate. 📈
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="px-8 py-4 bg-[var(--accent-primary)] hover:bg-blue-700 text-white font-bold rounded-lg uppercase tracking-wider transition-all text-center">
                                Programează o consultație gratuită
                            </Link>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200} className="relative">
                        <div className="relative rounded-3xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl group">
                            <img
                                src="/neoboost_culture_handshake.webp"
                                alt="NeoBoost Community"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Darker gradient for better text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white font-black italic text-xl uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide leading-tight">
                                    "ANTRENEAZĂ-TE ALĂTURI DE NOI ȘI OBȚINE REZULTATE PE CARE LE POȚI VEDEA ȘI SIMȚI."
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* 2. VIZIUNE, MISIUNE, VALORI */}
                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    <SpotlightCard className="bg-[var(--bg-tertiary)] p-8 rounded-2xl border border-[var(--border-subtle)] hover:border-blue-500/30 transition-all text-left">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-500">
                            <Users size={24} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-4 text-white">Viziunea</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            Vrem să trăiești o viață plină. Nu una în care te tragi pe margine pentru că ești obosit, te doare spatele sau nu-ți mai recunoști corpul în oglindă.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard className="bg-[var(--bg-tertiary)] p-8 rounded-2xl border border-[var(--border-subtle)] hover:border-red-500/30 transition-all text-left">
                        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-500">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-4 text-white">Misiunea</h3>
                        <ScrollTextReveal className="text-[var(--text-secondary)] leading-relaxed text-lg">
                            Misiunea noastră este aceea de a schimba percepția oamenilor față de mișcare. De la ”ceva ce trebuie să faci” la ”ceva ce abia aștepți să faci”. Tehnologia EMS ne permite să oferim rezultate maxime în timp minim.
                        </ScrollTextReveal>
                    </SpotlightCard>

                    <SpotlightCard className="bg-[var(--bg-tertiary)] p-8 rounded-2xl border border-[var(--border-subtle)] hover:border-purple-500/30 transition-all text-left">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-500">
                            <Heart size={24} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-4 text-white">Valorile</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <Check size={18} className="text-green-500 mt-1 shrink-0" />
                                <span className="text-[var(--text-secondary)]"><strong className="text-white">Experiență WOW</strong> – Fiecare antrenament e diferit. Nu te plictisești.</span>
                            </li>
                            <li className="flex gap-3">
                                <Check size={18} className="text-green-500 mt-1 shrink-0" />
                                <span className="text-[var(--text-secondary)]"><strong className="text-white">Spirit de familie</strong> – Nu ești un număr. Te cunoaștem pe nume.</span>
                            </li>
                            <li className="flex gap-3">
                                <Check size={18} className="text-green-500 mt-1 shrink-0" />
                                <span className="text-[var(--text-secondary)]"><strong className="text-white">Autenticitate</strong> – Vii așa cum ești. Pleci mai bun.</span>
                            </li>
                        </ul>
                    </SpotlightCard>
                </div>

                {/* 3. EVOLUTION TIMELINE */}
                <div className="mb-16 md:mb-32">
                    <div className="text-center mb-12 md:mb-16">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-6xl font-display font-bold uppercase italic leading-[0.9] text-glow mb-4">
                                <TextScramble text="EVOLUȚIA" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">NEOBOOST</span>
                            </h2>
                            <p className="text-[var(--text-secondary)] uppercase tracking-widest text-xs md:text-sm">
                                DE LA GARAJ LA COMUNITATE
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* 2015: DYNAMIX START */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-right md:text-left">
                            <div className="md:text-right">
                                <h3 className="text-3xl font-bold uppercase text-white">2015: Începuturile <span className="text-[var(--text-muted)] text-xl block mt-2">O valiзă și un vis</span></h3>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-r-2 md:border-l-0 md:border-r-2 border-white/20 pr-6 md:pl-0">
                                    Totul a început cu o valiзă și un apartament. Mergeam la clienți acasă, în sufragerie, și îi antrenam. Zero studio, zero reputație – doar rezultate și încredere câștigată om cu om.
                                </p>
                            </div>
                        </div>

                        <div className="relative min-h-[400px] flex items-center justify-center">
                            {/* Flash Card Stack Implementation */}
                            <FlashCardStack images={[
                                {
                                    src: "/history_2016_mobile_2.webp",
                                    alt: "2015: Antrenamente la domiciliu",
                                    caption: "2015: Cu valiza la clienți în sufragerie.",
                                    year: "2015"
                                },
                                {
                                    src: "/history_2016_mobile_1.webp",
                                    alt: "Echipamentul Compact",
                                    caption: "Investiția inițială: Aparatul compact.",
                                    year: "2015"
                                }
                            ]} />
                        </div>
                    </ScrollReveal>

                    {/* 2016: MOMENT ZERO (HOTEL ELITE) - SEPARATE SECTION */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center mt-24">
                        <div className="order-2 md:order-1 relative group">
                            <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl">
                                <img
                                    src="/history_2016_logo.webp"
                                    alt="2016 Hotel Elite Moment Zero"
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-blue-500 font-black text-xl">2016</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6 text-left">
                            <div className="md:text-left">
                                <h3 className="text-3xl font-bold uppercase text-white">2016: Primul Studio Real <span className="text-[var(--text-muted)] text-xl block mt-2">Hotel Elite, Oradea</span></h3>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-l-2 border-blue-500 pl-6">
                                    Primul studio real. Aici am testat și rafinat metoda care ne definește astăzi. Clienții au început să vorbească. Noi am continuat să livrăm.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                    {/* 2017: WIRELESS ERA */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative group">
                            <div className="absolute inset-0 bg-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl">
                                <img
                                    src="/history_2017_logo.webp"
                                    alt="2017 Wireless Era"
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-purple-500 font-black text-xl">2017</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <h3 className="text-3xl font-bold uppercase text-white">2017: Wireless <span className="text-[var(--text-muted)] text-xl block mt-2">Libertate de Mișcare</span></h3>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-l-2 border-purple-500 pl-6">
                                Am introdus tehnologia wireless. Primele echipamente aveau 'personalitate proprie' – se mai stricau. Dar am învățat rapid. Tot pentru experiența clientului.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 2018: CONSOLIDAREA (PRIMARIEI) */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-right md:text-left">
                            <div className="md:text-right">
                                <h3 className="text-3xl font-bold uppercase text-white">Consolidarea <span className="text-[var(--text-muted)] text-xl block mt-2">Maturizarea Conceptului</span></h3>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-r-2 md:border-l-0 md:border-r-2 border-blue-500 pr-6 md:pl-0">
                                    După lecțiile din 2017, anul 2018 a fost despre stabilitate și rafinarea metodei.
                                    În aceeași locație de pe Primăriei, am început să definim standardele care aveau să devină fundația NeoBoost.
                                    Eram încă la început, dar viziunea devenea tot mai clară.
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl">
                                <img
                                    src="/history_2018_logo.webp"
                                    alt="2018 Str. Primariei"
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-blue-500 font-black text-xl">2018</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* 2021: ALUMINEI (HYBRID GYM) */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-right md:text-left">
                            <div className="md:text-right">
                                <h3 className="text-3xl font-bold uppercase text-white">2020-2024: NeoDynamix <span className="text-[var(--text-muted)] text-xl block mt-2">Hybrid Gym</span></h3>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-r-2 md:border-l-0 md:border-r-2 border-white/20 pr-6 md:pl-0">
                                    Brandul a devenit <strong>NeoDynamix</strong>. Am combinat EMS cu antrenamente funcționale clasice – conceptul Hybrid Gym. Metodologia s-a maturizat.
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl">
                                <img
                                    src="/history_2021_hybrid_workout.webp"
                                    alt="2021 Hybrid Gym Workout"
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-red-500 font-black text-xl">2021 HIBRID</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* 2023: OUTDOOR & ANYWHERE */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative group">
                            <div className="absolute inset-0 bg-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl">
                                <img
                                    src="/history_2023_outdoor.webp"
                                    alt="2023 Outdoor Training"
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-cyan-500 font-black text-xl">2023</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <h3 className="text-3xl font-bold uppercase text-white">2023: Libertate Totală <span className="text-[var(--text-muted)] text-xl block mt-2">Antrenamente Oriunde & Oricând</span></h3>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-l-2 border-cyan-500 pl-6">
                                În 2023, am spart barierele studioului. Am început să ținem antrenamente oriunde - în parc, la birou, sau chiar în confortul casei tale.
                                O abordare flexibilă, adaptată stilului tău de viață, fără a compromite calitatea antrenamentului.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 2025: NEOBOOST x GETFIT */}
                    {/* 2025: NEOBOOST & EXPANSION */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-right md:text-left">
                            <div className="md:text-right">
                                <h3 className="text-3xl font-bold uppercase text-white">2025: NeoBoost <span className="text-[var(--text-muted)] text-xl block mt-2">Expansiune</span></h3>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-r-2 md:border-l-0 md:border-r-2 border-white/20 pr-6 md:pl-0">
                                    Astăzi suntem <strong>NeoBoost</strong>. Două locații premium în Oradea – Ramada și GetFit. Un ecosistem complet de fitness premium Oradea, nutriție personalizată și tehnologie. Și abia am început. 🚀
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl">
                                <img
                                    src="/history_2025_expansion_new.webp"
                                    alt="2025 NeoBoost Expansion"
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-red-500 font-black text-xl">2025</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* 2025: NEOBOOST x GETFIT STRATEGIC PARTNERSHIP */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative group">
                            <div className="absolute inset-0 bg-yellow-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl">
                                <img
                                    src="/history_2025_getfit.webp"
                                    alt="2025 NeoBoost x GetFit Partnership"
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-yellow-500 font-black text-xl">GETFIT</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6 text-left">
                            <div className="md:text-left">
                                <h3 className="text-3xl font-bold uppercase text-white">Parteneriat Strategic <span className="text-[var(--text-muted)] text-xl block mt-2">NeoBoost x GetFit (Ian. 2025)</span></h3>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-l-2 border-yellow-500 pl-6">
                                    O premieră absolută: integrarea tehnologiei EMS într-o sală convențională.
                                    Alături de <strong>GetFit</strong>, am deschis granițele fitness-ului modern, oferind o experiență hibridă unică membrilor noștri.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* 2025: RAMADA (CALEA ARADULUI) */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative group">
                            <div className="absolute inset-0 bg-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl">
                                <img
                                    src="/history_2025_ramada_new.webp"
                                    alt="2025 Calea Aradului Ramada"
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-purple-500 font-black text-xl">MAR. 2025</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <h3 className="text-3xl font-bold uppercase text-white">Martie 2025: Calea Aradului <span className="text-[var(--text-muted)] text-xl block mt-2">Sediu Premium @ Ramada</span></h3>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-l-2 border-purple-500 pl-6">
                                Expansiunea continuă cu o nouă locație de top. În Martie 2025, am inaugurat studioul din incinta <strong>Ramada Hotel</strong>.
                                O locație premium, accesibilă, unde standardele NeoBoost întâlnesc eleganța și confortul unui hotel de 4 stele.
                                Povestea merge mai departe!
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* PRESENT: TEAM & COMMUNITY */}
                    <ScrollReveal className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-transparent)] shadow-2xl">
                                <img
                                    src="/history_present_team.webp"
                                    alt="NeoBoost Prezent"
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 font-black text-xl">PREZENT</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <h3 className="text-3xl font-bold uppercase text-white">Echipa & Comunitatea <span className="text-[var(--text-muted)] text-xl block mt-2">Rezultate & Feedback 5 Stele</span></h3>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-l-2 border-green-500 pl-6">
                                Astăzi, NeoBoost este despre oameni. O echipă frumoasă, dedicată, și o comunitate care crește zi de zi.
                                Feedback-urile voastre minunate sunt motorul nostru. Continuăm să construim, să inovăm și să oferim aceleași rezultate WOW, într-o atmosferă de familie. ❤️
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Placeholder for Garage/Future */}
                    <div className="text-center pt-12 opacity-50">
                        <p className="text-sm uppercase tracking-widest text-[var(--text-muted)]">...povestea continuă</p>
                    </div>
                </div>

                {/* 4. ANTRENAMENTELE & METODOLOGIE */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <ScrollReveal>
                            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase italic leading-[0.9] text-glow">
                                <TextScramble text="TRAIN YOUR" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">SUPERPOWER!</span>
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <h3 className="text-3xl font-bold uppercase mb-6 text-white">Antrenamentele <span className="text-blue-500">EMS Oradea</span></h3>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                                Antrenamentele EMS de la NeoBoost sunt dovedite științific.
                                <strong className="text-white"> 30 de minute de EMS = 90 de minute de antrenament convențional.</strong>
                            </p>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                                Lucrăm cu propria greutate, TRX, gantere – iar impulsurile electrice accelerează metabolismul, topesc grăsimea și tonifică musculatura. Rapid și eficient.
                            </p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-4">
                                    <div className="text-4xl font-black text-[var(--border-visible)]">01</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">Faci mișcare cu zâmbetul pe buze</h4>
                                        <p className="text-[var(--text-muted)]">Atmosfera pe care o creăm te face să uiți de efort. Mișcarea poate crea dependență!</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="text-4xl font-black text-[var(--border-visible)]">02</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">Ai susținerea unor specialiști</h4>
                                        <p className="text-[var(--text-muted)]">Înveți să te alimentezi corect și să te bucuri de un stil de viață sănătos pe termen lung.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="text-4xl font-black text-[var(--border-visible)]">03</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">Ești parte dintr-o comunitate unită</h4>
                                        <p className="text-[var(--text-muted)]">Un grup de susținere care te încurajează la fiecare pas. Aici îți faci noi prieteni!</p>
                                    </div>
                                </li>
                            </ul>
                        </ScrollReveal>

                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <ScrollReveal delay={100} className="space-y-4">
                                    <div className="bg-[var(--bg-tertiary)] p-6 rounded-2xl border border-[var(--border-subtle)] text-center">
                                        <div className="text-4xl font-black text-blue-500 mb-2">10+</div>
                                        <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Ani Experiență EMS</div>
                                    </div>
                                    <div className="bg-[var(--bg-tertiary)] p-6 rounded-2xl border border-[var(--border-subtle)] text-center">
                                        <div className="text-4xl font-black text-red-500 mb-2">15k+</div>
                                        <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Membri comunitate</div>
                                    </div>
                                </ScrollReveal>
                                <ScrollReveal delay={200} className="space-y-4 mt-8">
                                    <div className="bg-[var(--bg-tertiary)] p-6 rounded-2xl border border-[var(--border-subtle)] text-center">
                                        <div className="text-4xl font-black text-purple-500 mb-2">100%</div>
                                        <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Rezultate Reale</div>
                                    </div>
                                    <div className="bg-[var(--bg-tertiary)] p-6 rounded-2xl border border-[var(--border-subtle)] text-center">
                                        <div className="text-4xl font-black text-green-500 mb-2">17+</div>
                                        <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Ani Experiență Sport</div>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Time Calculator Widget */}
                            <ScrollReveal delay={300}>
                                <TimeSavedCalculator />
                            </ScrollReveal>
                        </div>
                    </div>
                </div>

                {/* 5. CALL TO ACTION - FORMULA */}
                <ScrollReveal className="text-center bg-[var(--bg-secondary)] rounded-3xl p-12 border border-[var(--border-subtle)]">
                    <h3 className="text-2xl md:text-4xl font-bold uppercase mb-8">
                        FORMULA NEOBOOST: <br />
                        <span className="text-blue-500">REZULTATE REALE</span> + <span className="text-red-500">EXPERIENȚĂ WOW</span> = <span className="text-green-500">SUCCES</span>
                    </h3>

                    <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-2xl mx-auto">
                        Nu știi de unde să începi? Programează o sesiune de consultație gratuită cu noi!
                        Vom discuta despre obiectivele tale și vom crea un plan personalizat.
                    </p>

                    <Link to="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-bold text-lg rounded-full shadow-lg shadow-blue-900/20 transform hover:-translate-y-1 transition-all">
                        ÎNSCRIE-TE LA O CONSULTAȚIE GRATUITĂ
                    </Link>
                </ScrollReveal>

            </div>
        </section >
    );
};

const QuoteIcon = () => (
    <svg className="w-8 h-8 text-[var(--accent-primary)] mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21L14.017 18C14.017 16.896 14.321 15.923 14.929 15.081C15.536 14.24 16.353 13.567 17.379 13.064V12.871C17.062 12.923 16.745 12.949 16.429 12.949C15.321 12.949 14.364 12.607 13.557 11.924C12.75 11.24 12.347 10.283 12.347 9.053C12.347 7.747 12.793 6.649 13.684 5.76C14.576 4.87 15.659 4.425 16.935 4.425C18.211 4.425 19.294 4.87 20.185 5.76C21.077 6.649 21.523 7.747 21.523 9.053C21.523 11.082 20.841 13.536 19.477 16.417C18.113 19.298 16.293 20.826 14.017 21ZM4.95301 21L4.95301 18C4.95301 16.896 5.25701 15.923 5.86501 15.081C6.47301 14.24 7.28901 13.567 8.31501 13.064V12.871C7.99801 12.923 7.68101 12.949 7.36501 12.949C6.25701 12.949 5.30001 12.607 4.49201 11.924C3.68501 11.24 3.28101 10.283 3.28101 9.053C3.28101 7.747 3.72701 6.649 4.61801 5.76C5.51001 4.87 6.59301 4.425 7.86901 4.425C9.14501 4.425 10.228 4.87 11.119 5.76C12.011 6.649 12.457 7.747 12.457 9.053C12.457 11.082 11.775 13.536 10.411 16.417C9.04801 19.298 7.22901 20.826 4.95301 21Z" />
    </svg>
);
