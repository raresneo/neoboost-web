import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Target, Zap, Users, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { RevealText } from '../components/ui/RevealText';
import { BRAND } from '../constants';

const values = [
    {
        icon: <Target className="w-6 h-6" />,
        color: "text-brand",
        bg: "bg-brand/10",
        title: "Rezultate reale",
        description: "Nu promitem minuni. Promitem progres constant, vizibil, bazat pe știință și pe efortul tău."
    },
    {
        icon: <Heart className="w-6 h-6" />,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        title: "Personalizare totală",
        description: "Fiecare client e unic. Fiecare program e construit în jurul obiectivelor, limitărilor și ritmului tău."
    },
    {
        icon: <Users className="w-6 h-6" />,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        title: "1-la-1 cu antrenor",
        description: "Nu ești lăsat singur nicio secundă. Antrenorul ghidează, motivează și ajustează fiecare ședință."
    },
    {
        icon: <Award className="w-6 h-6" />,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        title: "Tehnologie wireless",
        description: "Folosim echipament EMS wireless de ultimă generație — fără fire, fără restricții, fără compromisuri."
    }
];

const stats = [
    { value: "500+", label: "Clienți mulțumiți" },
    { value: "30 min", label: "Per ședință eficientă" },
    { value: "1-la-1", label: "Antrenament personal" },
    { value: "5★", label: "Rating Google" }
];

export const DespreNoiPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Helmet>
                <title>Despre NeoBoost – EMS Studio Oradea | Povestea Noastră</title>
                <meta name="description" content="Descoperă povestea NeoBoost Oradea. Studio EMS wireless cu antrenori certificați, program 1-la-1 și rezultate dovedite. Prima ședință gratuită." />
            </Helmet>

            {/* HERO */}
            <div className="pt-32 pb-20 border-b border-[var(--border-subtle)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-brand/5 pointer-events-none" />
                <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-brand/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-24 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-widest uppercase mb-8">
                            <Zap size={12} />
                            <span>EMS Studio · Oradea</span>
                        </div>

                        <RevealText
                            text="DESPRE NOI."
                            as="h1"
                            mode="char"
                            stagger={0.05}
                            delay={0.1}
                            className="font-display font-black text-[var(--text-primary)] text-5xl md:text-8xl leading-[0.9] tracking-tighter uppercase italic mb-8 justify-start"
                        />

                        <p className="text-[var(--text-secondary)] text-xl md:text-2xl leading-relaxed max-w-3xl">
                            NeoBoost este primul studio EMS wireless din Oradea. Am pornit cu o idee simplă: <span className="text-[var(--text-primary)] font-bold">să ajutăm oamenii să arate și să se simtă mai bine</span>, fără să le pierdem timpul.
                        </p>
                    </div>
                </div>
            </div>

            {/* STATS BAR */}
            <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border-subtle)]">
                        {stats.map((stat, i) => (
                            <div key={i} className="py-10 px-8 text-center">
                                <p className="text-3xl md:text-4xl font-black font-display text-[var(--text-primary)] italic">{stat.value}</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* STORY SECTION */}
            <div className="py-24">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                        <div>
                            <p className="text-[10px] font-black tracking-[0.5em] text-brand uppercase mb-4">Povestea noastră</p>
                            <RevealText
                                text="De ce am fondat NeoBoost."
                                as="h2"
                                delay={0.1}
                                className="text-4xl md:text-5xl font-black font-display text-[var(--text-primary)] uppercase italic mb-8"
                            />
                            <div className="space-y-4 text-[var(--text-secondary)] text-lg leading-relaxed">
                                <p>
                                    Am văzut prea mulți oameni renunțând la sănătate din lipsă de timp. Salile clasice cer ore întregi, programe rigide și multă motivație pe care nu toți o au în fiecare zi.
                                </p>
                                <p>
                                    Soluția? Tehnologia EMS (electrostimulare musculară) — care comprimă un antrenament eficient în <strong className="text-[var(--text-primary)]">30 de minute</strong>, ghidat 1-la-1 de un antrenor dedicat.
                                </p>
                                <p>
                                    Am deschis NeoBoost în Oradea cu un singur obiectiv: să fie locul unde rezultatele vorbesc de la sine, unde fiecare client se simte văzut și sprijinit.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                                <img
                                    src="/ramada.webp"
                                    alt="NeoBoost Studio Oradea"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-xl">
                                <p className="text-xs font-black uppercase tracking-widest text-brand mb-1">Studio EMS</p>
                                <p className="text-[var(--text-primary)] font-bold">Oradea · Hotel Ramada</p>
                            </div>
                        </div>
                    </div>

                    {/* VALUES GRID */}
                    <div>
                        <div className="text-center mb-16">
                            <p className="text-[10px] font-black tracking-[0.5em] text-brand uppercase mb-4">Valorile noastre</p>
                            <RevealText
                                text="Ce ne definește."
                                as="h2"
                                delay={0.1}
                                className="text-4xl md:text-5xl font-black font-display text-[var(--text-primary)] uppercase italic"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((val, i) => (
                                <div key={i} className="bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-subtle)] p-8 hover:border-brand/30 transition-all">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${val.bg} ${val.color} mb-6`}>
                                        {val.icon}
                                    </div>
                                    <h3 className="font-display font-black text-[var(--text-primary)] text-lg uppercase mb-3">{val.title}</h3>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{val.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* MISSION STATEMENT */}
            <div className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
                <div className="container mx-auto px-6 lg:px-24 text-center max-w-4xl">
                    <p className="text-[10px] font-black tracking-[0.5em] text-brand uppercase mb-6">Misiunea noastră</p>
                    <blockquote className="text-3xl md:text-4xl font-display font-black text-[var(--text-primary)] italic leading-tight mb-10">
                        "Să facem sănătatea accesibilă oricui, indiferent de timp, vârstă sau nivel de pregătire."
                    </blockquote>
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
                        Credem că fiecare om merită să se simtă bine în corpul lui. De aceea, fiecare program NeoBoost este construit în jurul nevoilor reale ale clientului, nu în jurul unui tipar generic.
                    </p>
                    <Button
                        size="lg"
                        variant="energy"
                        onClick={() => window.open(`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=Salut! Vreau să aflu mai multe despre NeoBoost și să programez o ședință gratuită.`, '_blank')}
                    >
                        Vino să ne cunoști
                    </Button>
                </div>
            </div>
        </div>
    );
};
