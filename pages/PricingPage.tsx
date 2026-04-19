import React, { useState } from 'react';
import { RevealText } from '../components/ui/RevealText';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { BRAND, MONTHLY_PACKAGES } from '../constants';
import { Button } from '../components/ui/Button';
import { EligibilityDisclaimer } from '../components/ui/EligibilityDisclaimer';

export const PricingPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handleCheckout = async (priceId: string, amount: number, productName: string) => {
        try {
            setIsLoading(priceId);
            const apiUrl = typeof window !== 'undefined' ? window.location.origin : '';

            const res = await fetch(`${apiUrl}/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: null,
                    priceId,
                    amount,
                    productName,
                    interval: 'month',
                    intervalCount: 1
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
            alert('A apărut o problemă de conexiune. Te rugăm să încerci din nou sau pe WhatsApp.');
            setIsLoading(null);
        }
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[var(--bg-primary)]">
            <Helmet>
                <title>Prețuri și Pachete EMS ORADEA | NeoBoost</title>
                <meta name="description" content="Descoperă pachetele NeoBoost EMS adaptate obiectivelor tale. Alege pachetul de început, transformare sau menținere și programează-te acum." />
            </Helmet>

            <div className="container mx-auto px-6 lg:px-24">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <RevealText
                        text="Prețuri și pachete EMS NeoBoost Oradea"
                        as="h1"
                        delay={0.2}
                        className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-6 leading-tight uppercase italic justify-center"
                    />
                    <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed px-4 md:px-0">
                        Am gândit pachetele NeoBoost astfel încât să poți testa în siguranță antrenamentul EMS, să vezi rezultate reale și apoi să le menții pe termen lung.
                    </p>
                </div>

                {/* Premium Cross-Sell Banner */}
                <div className="max-w-5xl mx-auto mb-16 px-4">
                    <div className="relative group cursor-pointer" onClick={() => window.location.href = '/oferta-3-plus-1'}>
                        <div className="absolute inset-0 bg-brand/5 blur-3xl group-hover:bg-brand/15 transition-all rounded-[2.5rem]"></div>
                        <div className="relative bg-white/40 backdrop-blur-2xl border border-brand/20 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-premium overflow-hidden">
                            <div className="absolute -right-10 -top-10 p-8 opacity-[0.03] rotate-12 pointer-events-none">
                                <span className="text-[12rem] font-black italic tracking-tighter">3+1</span>
                            </div>

                            <div className="relative z-10 flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-widest mb-4 border border-brand/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                                    </span>
                                    Ofertă Exclusivă Online
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-gray-900 impact-font uppercase italic leading-none mb-3">
                                    TRANSFORMARE <span className="text-brand">3 + 1 GRATUIT</span>
                                </h3>
                                <p className="text-gray-600 text-base font-medium max-w-xl">Plătești 3 luni și primești a 4-a lună CADOU. Cea mai eficientă metodă pentru o schimbare radicală.</p>
                            </div>

                            <Button variant="primary" className="relative z-10 w-full md:w-auto px-12 py-5 shadow-2xl shadow-brand/30 uppercase text-xs font-black tracking-[0.2em] transform group-hover:scale-105 transition-transform">
                                VEZI DETALII OFERTĂ
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-fr">
                    {MONTHLY_PACKAGES.map((pkg, i) => (
                        <SpotlightCard
                            key={i}
                            spotlightColor="rgba(59, 130, 246, 0.08)"
                            className={`p-5 md:p-8 rounded-[2.5rem] flex flex-col transition-all duration-500 relative overflow-hidden group border ${pkg.isRecommended ? 'bg-white border-brand shadow-premium md:scale-105 z-10' : 'bg-white/50 backdrop-blur-sm border-gray-100 shadow-sm hover:border-brand/30'}`}
                        >
                            {pkg.isRecommended && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-white text-[10px] font-bold uppercase px-4 py-1.5 rounded-full shadow-lg tracking-widest border border-white">
                                    Recomandat
                                </div>
                            )}

                            <div className="absolute -right-4 -top-4 opacity-[0.03] pointer-events-none select-none overflow-hidden transition-opacity group-hover:opacity-[0.05]">
                                <span className="font-display font-black text-[8rem] md:text-[10rem] text-black italic tracking-tighter leading-none">
                                    {pkg.sessionCount.split(' ')[0]}
                                </span>
                            </div>

                            <h4 className="text-[var(--text-primary)] font-display font-bold text-xl mb-1 uppercase tracking-wide relative z-10">{pkg.title}</h4>
                            <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4 relative z-10">{pkg.sessionCount} Ședințe / lună</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-3xl font-bold text-[var(--text-primary)]">{pkg.price.replace(/ RON/i, '')}</span>
                                <span className="text-xs font-bold text-gray-400 uppercase">RON</span>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow relative z-10">
                                {pkg.features.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-3 text-sm font-medium text-gray-600 leading-relaxed">
                                        <CheckCircle2 size={16} className={`${pkg.isRecommended ? 'text-brand' : 'text-gray-400'} shrink-0 mt-0.5`} />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col gap-3 relative z-10 mt-auto">
                                {pkg.isRecommended && (
                                    <Button
                                        variant="primary"
                                        className="w-full justify-center font-bold uppercase tracking-widest text-xs shadow-lg shadow-brand/20"
                                        onClick={() => handleCheckout(pkg.stripePriceId, parseInt(pkg.price.replace(/[^0-9]/g, '')), pkg.title)}
                                        isLoading={isLoading === pkg.stripePriceId}
                                    >
                                        Cumpără Acum
                                    </Button>
                                )}
                                <button
                                    onClick={() => window.open(`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salut! Vreau să discut despre abonamentul ${pkg.title} (${pkg.sessionCount} ședințe/lună).`)}`, '_blank')}
                                    className="w-full py-3 border border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    💬 Discută despre abonament
                                </button>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>

                {/* Eligibility Disclaimer Section */}
                <div className="mt-16 sm:mt-24">
                    <EligibilityDisclaimer />
                </div>
            </div>
        </div>
    );
};
