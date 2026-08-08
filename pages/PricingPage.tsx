import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { Gift, ArrowRight } from 'lucide-react';
import { QUARTERLY_PACKAGES } from '../constants';
import { Section, Heading, PackageGrid, PrimaryCta, WhatsappCta } from '../components/home';
import { PricingPlans } from '../components/home/PricingPlans';
import { EligibilityDisclaimer } from '../components/ui/EligibilityDisclaimer';
import { Footer } from '../components/Footer';

export const PricingPage: React.FC = () => {
    const navigate = useNavigate();
    const ctx = useOutletContext<{ session: Session | null; onOpenBooking: () => void }>();
    const session = ctx?.session ?? null;

    return (
        <main className="min-h-screen bg-[var(--bg-primary)] pt-24">
            <Helmet>
                <title>Prețuri și Abonamente EMS Oradea | NeoBoost</title>
                <meta
                    name="description"
                    content="Prețuri transparente pentru antrenamentul EMS în Oradea. Grup mic de maximum 2 persoane sau Exclusive 1 la 1, cu toată sala rezervată pentru tine. Ședințe de 30 de minute, de la 460 RON pe lună. Prima ședință gratuită."
                />
                <link rel="canonical" href="https://neo-boost.com/preturi" />
            </Helmet>

            {/* Hero */}
            <Section>
                <Heading
                    eyebrow="Prețuri transparente"
                    title={<>Investește în tine,<br />nu în abonamente uitate</>}
                    sub="Toate pachetele includ plan alimentar, acces la sală și analiză corporală. Ședința durează 30 de minute. Testează gratuit, apoi alege ritmul și formatul care ți se potrivesc."
                />

                {/* 3+1 cross-sell banner */}
                <button
                    onClick={() => navigate('/oferta-3-plus-1')}
                    className="group mb-14 flex w-full flex-col items-center justify-between gap-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--accent-primary)]/30 bg-[var(--bg-secondary)] p-7 text-left transition-colors hover:border-[var(--accent-primary)] md:flex-row md:p-9"
                >
                    <div className="flex items-center gap-5">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                            <Gift size={26} />
                        </span>
                        <div>
                            <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent-primary)]">
                                Ofertă exclusivă online
                            </p>
                            <h3 className="font-display text-2xl font-black uppercase italic text-[var(--text-primary)] md:text-3xl">
                                Transformare <span className="text-[var(--accent-primary)]">3 + 1 gratuit</span>
                            </h3>
                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Plătești 3 luni, a 4-a e cadou. Cea mai eficientă metodă pentru o schimbare reală.
                            </p>
                        </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--accent-primary)] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform group-hover:translate-x-0.5">
                        Vezi oferta <ArrowRight size={16} />
                    </span>
                </button>

                {/* Abonamente lunare: comută între grup mic și Exclusive 1 la 1 */}
                <PricingPlans />

                <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <PrimaryCta onClick={ctx?.onOpenBooking}>Rezervă ședința gratuită</PrimaryCta>
                    <WhatsappCta text="Salut! Vreau să aflu dacă mi se potrivește Standard sau Exclusive.">
                        Întreabă un antrenor
                    </WhatsappCta>
                </div>
            </Section>

            {/* Quarterly / long-term */}
            <Section tint>
                <Heading
                    eyebrow="Pe termen lung"
                    title={<>Pachete trimestriale 3+1</>}
                    sub="Pentru rezultate sustenabile: 3 luni plătite, una cadou, cu sesiuni bonus și freeze de abonament."
                />
                <PackageGrid packages={QUARTERLY_PACKAGES} session={session} unit="ședințe" />
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <PrimaryCta onClick={ctx?.onOpenBooking}>Rezervă ședința gratuită</PrimaryCta>
                    <WhatsappCta text="Salut! Vreau să aflu care pachet mi se potrivește.">
                        Întreabă un antrenor
                    </WhatsappCta>
                </div>
            </Section>

            <Section>
                <EligibilityDisclaimer />
            </Section>

            <Footer />
        </main>
    );
};
