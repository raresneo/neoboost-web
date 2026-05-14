import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Zap, Clock, UserCheck, Target, ArrowRight, Dumbbell, Heart, Activity, Timer } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { RevealText } from '../components/ui/RevealText';
import { BRAND } from '../constants';

const steps = [
    {
        number: "01",
        title: "Consultație inițială",
        description: "Discuți cu antrenorul despre obiectivul tău, nivelul de activitate și eventuale limitări medicale. Totul e personalizat."
    },
    {
        number: "02",
        title: "Echipare EMS",
        description: "Îmbraci costumul EMS profesional. Antrenorul setează intensitatea impulsurilor în funcție de tine — confortabil dar eficient."
    },
    {
        number: "03",
        title: "Antrenament ghidat",
        description: "30 de minute de exerciții simple, guidate pas cu pas. Electrostimularea activează 90% din fibrele musculare simultan."
    },
    {
        number: "04",
        title: "Recomandări personale",
        description: "La final primești sfaturi despre frecvența ședințelor, nutriție și stilul de viață ca să maximizezi rezultatele."
    }
];

const services = [
    {
        icon: <Zap className="w-8 h-8" />,
        color: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-500",
        title: "EMS Funcțional",
        subtitle: "Tonifiere & Slăbire",
        description: "Antrenamentul EMS clasic, ideal pentru slăbire, tonifiere și creștere de masă musculară. 30 de minute înlocuiesc 2-3 ore de sală clasică.",
        features: ["Activare 90% fibre musculare", "Ardere calorii intensă", "Tonifiere uniformă", "Fără suprasolicitare articulară"]
    },
    {
        icon: <Heart className="w-8 h-8" />,
        color: "from-rose-500/20 to-rose-500/5",
        iconColor: "text-rose-500",
        title: "EMS Kineto",
        subtitle: "Recuperare & Reabilitare",
        description: "Program specializat pentru recuperare după accidente, dureri de spate, hernii de disc sau reabilitare musculară. Lucrăm cu protocoale kinetoterapeutice.",
        features: ["Protocol de recuperare individualizat", "Redus dureri cronice", "Reconsolidare musculară", "Supervizare specializată"]
    },
    {
        icon: <Activity className="w-8 h-8" />,
        color: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-500",
        title: "EMS Performance",
        subtitle: "Sportivi & Performanță",
        description: "Antrenament EMS adaptat pentru sportivi activi care vor să-și crească performanța, să reducă timpul de recuperare și să prevină accidentările.",
        features: ["Creștere forță explozivă", "Recuperare accelerată", "Prevenție accidentări", "Complement sport existent"]
    },
    {
        icon: <Timer className="w-8 h-8" />,
        color: "from-amber-500/20 to-amber-500/5",
        iconColor: "text-amber-500",
        title: "Ședință de probă",
        subtitle: "Prima ședință gratuită",
        description: "Vino să testezi fără obligații. Prima ședință este complet gratuită — vei vedea cum funcționează EMS și dacă ți se potrivește, înainte de orice decizie.",
        features: ["Fără costuri", "Fără abonament forțat", "Evaluare personalizată", "Răspuns la toate întrebările"]
    }
];

const benefits = [
    "Persoane ocupate care nu au timp de antrenamente lungi",
    "Mame care vor să revină în formă după sarcină",
    "Persoane sedentare care vor să reînceapă mișcarea",
    "Cei cu dureri de spate sau probleme articulare",
    "Sportivi care vor să-și crească performanța",
    "Oricine vrea rezultate vizibile în timp scurt"
];

export const ServicesPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Helmet>
                <title>Servicii EMS Oradea – Cum Funcționează | NeoBoost</title>
                <meta name="description" content="Descoperă serviciile EMS NeoBoost Oradea: antrenament funcțional, kineto, performance. Prima ședință gratuită. Rezultate în 30 de minute ghidat 1-la-1." />
            </Helmet>

            {/* HERO SECTION */}
            <div className="relative pt-32 pb-24 overflow-hidden border-b border-[var(--border-subtle)]">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-blue-500/5 pointer-events-none" />
                <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-24 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-widest uppercase mb-8">
                            <Zap size={12} />
                            <span>Wireless EMS · Oradea</span>
                        </div>

                        <RevealText
                            text="SERVICII EMS."
                            as="h1"
                            mode="char"
                            stagger={0.04}
                            delay={0.1}
                            className="font-display font-black text-[var(--text-primary)] text-5xl md:text-8xl leading-[0.9] tracking-tighter uppercase italic mb-6 justify-start"
                        />

                        <p className="text-[var(--text-secondary)] text-xl md:text-2xl leading-relaxed max-w-2xl mb-10">
                            La NeoBoost îți oferim ședințe EMS <span className="text-[var(--text-primary)] font-bold">1-la-1 cu antrenor personal</span>, adaptate obiectivului tău. Slăbire, tonifiere, recuperare sau performanță — totul în 30 de minute.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                variant="energy"
                                onClick={() => window.open(`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=Salut! Vreau să programez o ședință de probă gratuită.`, '_blank')}
                            >
                                Rezervă ședință gratuită
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => document.getElementById('servicii-detalii')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Descoperă serviciile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* SERVICES GRID */}
            <div id="servicii-detalii" className="py-24 scroll-mt-24">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="text-center mb-16">
                        <p className="text-[10px] font-black tracking-[0.5em] text-brand uppercase mb-4">Ce oferim</p>
                        <RevealText
                            text="Tipuri de antrenament."
                            as="h2"
                            delay={0.1}
                            className="text-4xl md:text-5xl font-black font-display text-[var(--text-primary)] uppercase italic"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {services.map((svc, i) => (
                            <div key={i} className={`relative rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] overflow-hidden p-8 hover:border-brand/30 transition-all hover:shadow-xl hover:shadow-brand/5`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${svc.color} pointer-events-none`} />
                                <div className="relative z-10">
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--bg-primary)] ${svc.iconColor} mb-6 shadow-sm`}>
                                        {svc.icon}
                                    </div>
                                    <div className="mb-4">
                                        <p className={`text-xs font-black uppercase tracking-widest ${svc.iconColor} mb-1`}>{svc.subtitle}</p>
                                        <h3 className="text-2xl font-display font-black text-[var(--text-primary)] uppercase">{svc.title}</h3>
                                    </div>
                                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{svc.description}</p>
                                    <ul className="space-y-2">
                                        {svc.features.map((f, fi) => (
                                            <li key={fi} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                                <CheckCircle2 size={16} className="text-brand shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS TIMELINE */}
            <div className="py-24 bg-[var(--bg-secondary)] border-t border-b border-[var(--border-subtle)]">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="text-center mb-16">
                        <p className="text-[10px] font-black tracking-[0.5em] text-brand uppercase mb-4">Cum decurge</p>
                        <RevealText
                            text="O ședință pas cu pas."
                            as="h2"
                            delay={0.1}
                            className="text-4xl md:text-5xl font-black font-display text-[var(--text-primary)] uppercase italic"
                        />
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {steps.map((step, i) => (
                            <div key={i} className="relative">
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full h-px border-t-2 border-dashed border-[var(--border-subtle)] z-0" style={{ width: 'calc(100% - 2rem)', left: 'calc(50% + 1.5rem)' }} />
                                )}
                                <div className="relative z-10 bg-[var(--bg-primary)] rounded-2xl p-6 border border-[var(--border-subtle)] hover:border-brand/30 transition-all">
                                    <span className="font-display font-black text-5xl text-brand/20 leading-none block mb-4">{step.number}</span>
                                    <h3 className="font-display font-bold text-[var(--text-primary)] text-lg mb-2">{step.title}</h3>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FOR WHO */}
            <div className="py-24">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-[10px] font-black tracking-[0.5em] text-brand uppercase mb-4">Pentru cine</p>
                            <RevealText
                                text="EMS se potrivește oricui."
                                as="h2"
                                delay={0.1}
                                className="text-4xl md:text-5xl font-black font-display text-[var(--text-primary)] uppercase italic mb-8"
                            />
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                                Indiferent că ești sportiv activ, mamă ocupată sau cineva care nu a mai făcut mișcare de ani de zile — antrenamentul EMS se adaptează la tine, nu invers.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-brand/30 transition-all">
                                    <CheckCircle2 size={20} className="text-brand shrink-0" />
                                    <span className="text-[var(--text-secondary)] font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
                <div className="container mx-auto px-6 lg:px-24 text-center">
                    <p className="text-[10px] font-black tracking-[0.5em] text-brand uppercase mb-4">Hai să începem</p>
                    <h2 className="text-4xl md:text-5xl font-black font-display text-[var(--text-primary)] uppercase italic mb-6">
                        Prima ședință e gratuită.
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-10">
                        Nu te obligăm la nimic. Vino, testează și decide după ce ai simțit cum funcționează EMS pe propriul corp.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="energy"
                            onClick={() => window.open(`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=Salut! Vreau să programez prima ședință EMS gratuită.`, '_blank')}
                        >
                            Rezervă acum pe WhatsApp
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => window.open(`tel:${BRAND.phone}`, '_self')}
                        >
                            Sună-ne: {BRAND.phone}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
