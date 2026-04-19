import React, { useState } from 'react';
import { CheckCheck, Zap, Star, MessageCircle, CreditCard, Gift, CalendarCheck, Target, ArrowRight } from 'lucide-react';
import { QUARTERLY_PACKAGES, TESTIMONIALS, BRAND } from '../constants';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/Button';
import { TypingHeading } from '../components/ui/TypingHeading';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { FlashcardReveal } from '../components/ui/FlashcardReveal';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { Footer } from '../components/Footer';
import { useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

const STEPS = [
    {
        icon: <Target size={28} />,
        title: "1. Alege pachetul",
        description: "Health Pro, Sculpt Pro sau Master Body — selectezi frecvența potrivită stilului tău de viață."
    },
    {
        icon: <CalendarCheck size={28} />,
        title: "2. Fii constant 3 luni",
        description: "Urmează planul împreună cu antrenorul tău. Ne ocupăm noi să-ți urmărim progresul și să te ținem responsabil."
    },
    {
        icon: <Gift size={28} />,
        title: "3. Luna 4 e pe noi",
        description: "Ai fost serios? Primești luna a 4-a cadou. Zero costuri suplimentare — recompensăm disciplina."
    }
];

const CONDITIONS = [
    "Prezență minim 80% la ședințele programate",
    "Respectarea planului stabilit cu antrenorul",
    "Completarea check-in-urilor și măsurătorilor periodice",
    "Atingerea obiectivelor realiste stabilite la început"
];

export const OfertaTreiPlusUnuPage: React.FC = () => {
    const { onOpenBooking } = useOutletContext<{
        session: Session | null;
        onOpenBooking: () => void;
    }>();

    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handleWhatsApp = (pkgTitle: string) => {
        const msg = `Salut! Vreau să aflu dacă pachetul ${pkgTitle} (oferta 3+1) mi se potrivește. Putem discuta?`;
        window.open(`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const handleDirectPurchase = async (pkg: any) => {
        try {
            setIsLoading(pkg.stripePriceId);
            const price = parseInt(pkg.price.replace(/\D/g, ''));
            const apiUrl = typeof window !== 'undefined' ? window.location.origin : '';

            const res = await fetch(`${apiUrl}/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: null,
                    priceId: pkg.stripePriceId,
                    amount: price,
                    productName: `${pkg.title} (Oferta 3+1)`,
                    interval: 'month',
                    intervalCount: 4
                })
            });

            if (!res.ok) throw new Error(`Server error ${res.status}`);
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Eroare la procesare. Te rugăm să ne contactezi pe WhatsApp.');
                setIsLoading(null);
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            handleWhatsApp(pkg.title);
            setIsLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
            <SEO
                title="Oferta Specială 3+1 Gratuit — Abonament EMS Oradea | NeoBoost"
                description="Plătești 3 luni de antrenament EMS, primești a 4-a lună CADOU. Pachete de la 1150 RON. Sănătate, sculptare sau transformare completă — tu alegi."
                canonical="/oferta-3-plus-1"
            />

            {/* ═══ HERO ═══ */}
            <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-6 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-500/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-purple-500/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/50 px-5 py-2 rounded-full mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            <span className="text-blue-600 text-[10px] font-black tracking-[0.25em] uppercase">Ofertă Specială — Exclusiv Online</span>
                        </div>
                    </ScrollReveal>

                    {/* Headline */}
                    <FlashcardReveal direction="bottom">
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black impact-font text-gray-900 mb-6 leading-[0.9] uppercase tracking-tighter">
                            DISCIPLINA <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '2px #3A86FF' }}>SE PREMIAZĂ.</span>
                        </h1>
                    </FlashcardReveal>

                    <FlashcardReveal direction="bottom" delay={200}>
                        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                            Angajează-te <span className="text-gray-900 font-black">3 luni plătite</span> la antrenamentul EMS și noi îți oferim{' '}
                            <span className="text-blue-600 font-black border-b-2 border-blue-500">A 4-A LUNĂ CADOU</span>.
                            Rezultate reale, premiate.
                        </p>
                    </FlashcardReveal>

                    <FlashcardReveal direction="bottom" delay={400}>
                        <button
                            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group px-10 py-5 bg-blue-600 text-white font-black uppercase text-sm tracking-widest rounded-full hover:bg-blue-700 transition-all shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_50px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 inline-flex items-center gap-3"
                        >
                            VEZI PACHETELE
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </FlashcardReveal>
                </div>
            </section>

            {/* ═══ CUM FUNCȚIONEAZĂ (3 pași) ═══ */}
            <section className="py-20 md:py-28 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-6 lg:px-24">
                    <ScrollReveal className="text-center mb-16">
                        <TypingHeading
                            text="Simplu ca 1-2-3."
                            highlightText="1-2-3."
                            highlightColor="text-blue-600"
                            className="text-3xl md:text-5xl font-black impact-font text-gray-900 uppercase italic mb-4"
                        />
                        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Cum funcționează oferta</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {STEPS.map((step, i) => (
                            <FlashcardReveal key={i} direction="bottom" delay={i * 150}>
                                <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 text-center group">
                                    {/* Step number backdrop */}
                                    <div className="absolute -top-4 -right-2 text-[6rem] font-black impact-font text-gray-50 pointer-events-none select-none leading-none group-hover:text-blue-50 transition-colors">
                                        {i + 1}
                                    </div>

                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-wide text-gray-900 mb-3">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </FlashcardReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ PACHETE ═══ */}
            <section id="packages" className="py-20 md:py-28 scroll-mt-32">
                <div className="container mx-auto px-6 lg:px-24">
                    <ScrollReveal className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6">
                            <Gift size={14} />
                            <span>Pachete 3+1</span>
                        </div>
                        <TypingHeading
                            text="Alege Pachetul Tău."
                            highlightText="Tău."
                            highlightColor="text-blue-600"
                            className="text-4xl md:text-6xl font-black impact-font text-gray-900 uppercase italic mb-6"
                        />
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Fiecare pachet include ședințe bonus gratuite. Alege frecvența care ți se potrivește.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {QUARTERLY_PACKAGES.map((pkg, i) => {
                            const [mainSessions, bonusPart] = pkg.sessionCount.split('+').map(s => s.trim());
                            const bonusSessions = bonusPart?.replace(' BONUS', '') || '0';
                            const originalPrice = Math.round(parseInt(pkg.price.replace(/\D/g, '')) * 1.33);

                            return (
                                <FlashcardReveal key={i} direction="bottom" delay={i * 150}>
                                    <SpotlightCard
                                        spotlightColor="rgba(59, 130, 246, 0.08)"
                                        className={`relative p-8 rounded-[2rem] flex flex-col min-h-[620px] transition-all duration-500 ${pkg.isPremium
                                            ? 'bg-white border-2 border-blue-500 shadow-[0_20px_60px_-10px_rgba(59,130,246,0.2)] md:scale-105 z-10'
                                            : 'bg-white border border-gray-100 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:border-blue-200'
                                            }`}
                                    >
                                        {/* Premium badge */}
                                        {pkg.isPremium && (
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase px-5 py-1.5 rounded-full shadow-lg tracking-widest border-2 border-white">
                                                Recomandat
                                            </div>
                                        )}

                                        {/* Big number background */}
                                        <div className="absolute -top-4 -right-4 text-[8rem] font-black impact-font text-gray-50 pointer-events-none select-none leading-none">
                                            {mainSessions}
                                        </div>

                                        {/* Header */}
                                        <div className="relative z-10 mb-6">
                                            <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em] block mb-2">{pkg.idealFor}</span>
                                            <h3 className="text-3xl font-black impact-font text-gray-900 uppercase mb-4">{pkg.title}</h3>

                                            <div className="flex items-end gap-2 mb-2">
                                                <span className="text-5xl font-black impact-font text-gray-900 leading-none">{mainSessions}</span>
                                                <div className="flex flex-col mb-1">
                                                    <span className="text-2xl font-black text-blue-600 leading-none">+{bonusSessions}</span>
                                                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">BONUS</span>
                                                </div>
                                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-2 mb-1">ȘEDINȚE</span>
                                            </div>

                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{pkg.duration}</p>
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-3 mb-8 flex-grow relative z-10">
                                            {pkg.features.map((feat, fi) => (
                                                <li key={fi} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                                    <CheckCheck size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Pricing */}
                                        <div className="relative z-10 mt-auto">
                                            <div className="flex items-end gap-2 mb-6">
                                                <span className="text-sm text-gray-300 line-through font-bold">{originalPrice} RON</span>
                                                <span className="text-4xl font-black impact-font text-gray-900 leading-none">{pkg.price.replace(' RON', '')}</span>
                                                <span className="text-sm font-bold text-blue-600 mb-0.5">RON</span>
                                            </div>

                                            <div className="grid gap-3">
                                                <div className="relative w-full">
                                                    <button
                                                        onClick={() => handleDirectPurchase(pkg)}
                                                        disabled={isLoading === pkg.stripePriceId}
                                                        className={`w-full py-4 font-black uppercase text-sm tracking-widest flex items-center justify-center gap-2 rounded-xl transition-all shadow-md active:scale-95 bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 hover:shadow-blue-500/40`}
                                                    >
                                                        {isLoading === pkg.stripePriceId ? 'Se procesează...' : (
                                                            <><CreditCard size={16} /> CUMPĂRĂ ACUM</>
                                                        )}
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => handleWhatsApp(pkg.title)}
                                                    className="w-full py-4 border border-gray-200 text-gray-600 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                                                >
                                                    <MessageCircle size={16} /> AFLĂ DACĂ ȚI SE POTRIVEȘTE
                                                </button>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </FlashcardReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══ CONDIȚII ═══ */}
            <section className="py-20 md:py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-6 lg:px-24 max-w-4xl">
                    <ScrollReveal className="text-center mb-12">
                        <TypingHeading
                            text="Condiții de eligibilitate."
                            highlightText="eligibilitate."
                            highlightColor="text-blue-600"
                            className="text-3xl md:text-4xl font-black impact-font text-gray-900 uppercase italic mb-4"
                        />
                        <p className="text-gray-500 text-sm max-w-xl mx-auto">
                            Luna cadou se acordă automat la îndeplinirea condițiilor de mai jos. Simplu și transparent.
                        </p>
                    </ScrollReveal>

                    <FlashcardReveal direction="bottom">
                        <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
                            <ul className="space-y-5">
                                {CONDITIONS.map((cond, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-black text-sm">
                                            {i + 1}
                                        </div>
                                        <span className="text-gray-700 font-medium leading-relaxed">{cond}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                                <p className="text-sm text-blue-800 font-medium leading-relaxed">
                                    <strong>📋 Notă:</strong> Antrenamentul EMS nu este recomandat persoanelor cu stimulator cardiac, femeilor însărcinate, persoanelor cu epilepsie sau tromboză. Discutăm detaliile la prima evaluare.
                                </p>
                            </div>
                        </div>
                    </FlashcardReveal>
                </div>
            </section>

            {/* ═══ TESTIMONIALE ═══ */}
            <section className="py-20 md:py-28 border-t border-gray-100">
                <div className="container mx-auto px-6 lg:px-24 max-w-6xl">
                    <ScrollReveal className="text-center mb-12">
                        <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill="currentColor" />
                            ))}
                        </div>
                        <TypingHeading
                            text="Ce spun membrii NeoBoost."
                            highlightText="NeoBoost."
                            highlightColor="text-blue-600"
                            className="text-3xl md:text-5xl font-black impact-font text-gray-900 uppercase italic"
                        />
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {TESTIMONIALS.slice(0, 3).map((t, i) => (
                            <FlashcardReveal key={i} direction="bottom" delay={i * 100}>
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-blue-100 transition-all group relative overflow-hidden">
                                    <div className="absolute -top-4 -right-4 text-8xl text-gray-100 impact-font opacity-0 group-hover:opacity-100 transition-opacity">"</div>
                                    <p className="text-gray-500 italic text-sm leading-relaxed mb-6 relative z-10">"{t.quote}"</p>
                                    <div className="flex items-center gap-3 relative z-10">
                                        <img src={t.imageUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                                            <span className="text-[10px] text-blue-600 uppercase tracking-widest font-bold">{t.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </FlashcardReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA FINAL ═══ */}
            <section className="py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-5xl font-black impact-font text-gray-900 uppercase italic mb-6">
                            Ai întrebări? <span className="text-blue-600">Răspundem imediat.</span>
                        </h2>
                        <p className="text-gray-500 mb-10 text-lg">
                            Scrie-ne pe WhatsApp — răspundem în câteva minute. Zero obligații, zero presiune.
                        </p>
                        <a
                            href={`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Salut! Am câteva întrebări despre oferta 3+1 Gratuit.')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 bg-green-500 text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-105 active:scale-95"
                        >
                            <MessageCircle size={20} />
                            Scrie-ne pe WhatsApp
                        </a>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </div>
    );
};
