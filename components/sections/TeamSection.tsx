import React, { memo, useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { FlashcardReveal } from '../ui/FlashcardReveal';
import { DualToneImage } from '../ui/DualToneImage';
import { Instagram, Linkedin, Quote, ChevronDown, ChevronUp, Fingerprint, Activity, Zap, Heart } from 'lucide-react';

const TEAM = [
    {
        id: 'rares-pantis',
        name: 'Rareș Pantiș',
        role: 'Fondator & Head Coach',
        signatureSkill: 'Visionary Architecture',
        image: '/rares_pantis.webp',
        quote: "Viziunea mea este să ofer oamenilor timp. Timp pentru ei, pentru sănătate, într-o lume care ne fură fiecare secundă.",
        description: "Povestea mea începe cu o valiză și un vis. Am strâns fiecare leu ca antrenor pentru a cumpăra primul aparat EMS. Căram echipamentul dintr-un apartament în altul, construind totul pas cu pas. Am ajuns să gestionez singur 40 de clienți activi, moment în care am realizat că pentru a ajuta mai mulți oameni, trebuie să cresc. Așa s-a născut prima echipă. Astăzi, NeoBoost nu mai este despre 'one-man show', ci despre o comunitate de peste 5.000 de oameni fericiți și o echipă unită de empatie și viziune.",
        socials: { instagram: 'https://www.instagram.com/pantis.rares?igsh=a2FzMTk1Nmpsdzhi&utm_source=qr', linkedin: 'https://www.linkedin.com/in/pantis-rares-99ba21242/' },
        type: 'founder'
    },
    {
        id: 'rares-silvasan',
        name: 'Rareș Silvășan',
        role: 'EMS Trainer',
        signatureSkill: 'Precision Mechanics',
        image: '/rares_silvasan_new.webp',
        quote: "Succesul vine din implicare, răbdare și motivație constantă. Împreună transformăm obiectivele în realitate.",
        description: "Sunt un antrenor dedicat, pasionat de sport și de progresul fiecărui client. Deși am început recent pregătirea specifică pentru culturism, am o experiență solidă în fitness și EMS, fiind activ implicat în tot ce înseamnă viața acestui studio. Mă remarc prin răbdare – îți voi explica fiecare exercițiu până îl stăpânești perfect – și prin adaptabilitate. Indiferent de nivelul tău, sunt aici să te motivez, să îți ofer un exemplu personal și să te inspir să îți depășești limitele. Îmi place să văd evoluția clienților mei și mă implic activ în susținerea lor, pas cu pas.",
        socials: { instagram: 'https://www.instagram.com/silvasan_rares?igsh=MWU0YjFicTA0ajBhcg==' },
        type: 'trainer'
    },
    {
        id: 'alex-cret',
        name: 'Alex Creț',
        role: 'Level 4 PT',
        signatureSkill: 'Calisthenics Specialist',
        image: '/alex_cret.webp',
        quote: "Corpul tău este cel mai bun echipament. Pentru mine, NeoBoost este o familie unde ne ridicăm unii pe alții.",
        description: "Cred cu tărie că propriul corp este cel mai bun 'aparat' pe care îl deținem. Ca specialist în Calisthenics, am învățat că forța adevărată vine din control și echilibru. La NeoBoost, combin această filozofie cu tehnologia EMS pentru a te ajuta să te miști mai bine și fără dureri. Fie vorba de recuperare sau de performanță, sunt aici să mă asigur că fiecare antrenament este sigur și eficient. Pentru mine, nu ești doar un client, ești un coechipier.",
        socials: { instagram: 'https://www.instagram.com/alexcretr?igsh=MXgxZ3QzbDFzeGp0NA==' },
        type: 'trainer'
    },
    {
        id: 'ionut-maris',
        name: 'Ionuț Mariș Hinsu',
        role: 'Level 4 PT',
        signatureSkill: 'Transformation Expert',
        image: '/ionut_maris.webp',
        storyImage: '/ionut_story_client.webp',
        quote: "Am slăbit 12kg la NeoBoost și mi-am schimbat viața. Sunt antrenorul care a fost în locul tău știe exact cum să te susțină.",
        description: "Povestea mea aici a început simplu: ca client. Eram lipsit de energie și nemulțumit de forma mea. Am reușit să slăbesc 12 kg și acea transformare mi-a schimbat complet perspectiva, motivându-mă să devin antrenor. Știu exact cum e să îți fie greu la început, știu cum e să vrei să renunți. De aceea, sunt aici să te susțin nu doar cu exerciții, ci și cu înțelegere. Dacă eu am reușit, te asigur că și tu poți.",
        socials: { instagram: 'https://www.instagram.com/maris_hinsu_ionut?igsh=MWxjd3EwODV2dXptMw==' },
        type: 'trainer'
    },
    {
        id: 'raluca-zaro',
        name: 'Raluca Zaro',
        role: 'Marketing Director',
        signatureSkill: 'Community Architect',
        image: '/raluca_zaro.webp',
        quote: "Branding autentic, bazat pe realitate, nu pe idealizări. Aici construim o cultură, nu doar o imagine.",
        description: "Misiunea mea la NeoBoost este să traduc tehnologia într-o limbă pe care o înțelegem cu toții: emoția. Cu un background în Psihologie, încerc să construiesc o comunitate reală, nu doar o imagine frumoasă pe Instagram. Vreau ca fiecare persoană care ne trece pragul sau ne vede online să simtă valorile noastre: căldura, onestitatea și dorința de a ajuta. Aici nu e vorba despre aparate, ci despre oamenii care le folosesc și poveștile lor.",
        socials: { instagram: 'https://www.instagram.com/raluca_zaro?igsh=MXVqM2p3ZnY0ajN1YQ==' },
        type: 'marketing'
    }
];

const BioText = ({ text, isActive, storyImage }: { text: string, isActive: boolean, storyImage?: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (!isActive) setIsExpanded(false);
    }, [isActive]);

    return (
        <div className={`mb-8 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 transition-colors duration-500 ${isActive ? 'text-[var(--text-secondary)]' : 'text-[var(--text-disabled)]'}`}>
            <p className={`transition-all duration-500 ${isExpanded ? '' : 'line-clamp-3'}`}>
                {text}
            </p>

            {isExpanded && storyImage && (
                <div className="mt-6 mb-2 animate-fade-in">
                    <div className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)] group">
                        <img src={storyImage} alt="Transformation Story" className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white uppercase tracking-wider">
                            Începutul Călătoriei
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`mt-3 text-xs uppercase font-bold tracking-widest flex items-center gap-1 transition-colors ${isActive ? 'text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]' : 'text-[var(--text-muted)] hover:text-[var(--accent-primary)]'}`}
            >
                {isExpanded ? (
                    <>Arată mai puțin <ChevronUp size={14} /></>
                ) : (
                    <>Arată mai mult <ChevronDown size={14} /></>
                )}
            </button>
        </div>
    );
};

const TeamSectionInternal = () => {
    const [activeMember, setActiveMember] = useState<string | null>(null);
    const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!activeMember && TEAM.length > 0) {
            setActiveMember(TEAM[0].id);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveMember(entry.target.getAttribute('data-id'));
                    }
                });
            },
            {
                root: null,
                rootMargin: '-20% 0px -20% 0px',
                threshold: 0.3
            }
        );

        observerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-24 bg-[var(--bg-primary)] relative z-20 border-t border-[var(--border-subtle)] transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-24 relative z-30">

                {/* Header */}
                <div className="text-center mb-32">
                    <ScrollReveal>
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-[var(--text-primary)] uppercase italic leading-[0.9] text-glow">
                            CINE SUNTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">NOI?</span>
                        </h2>
                    </ScrollReveal>
                </div>

                {/* --- NEOBOOST DNA: DISTINCTIVE VALUES SECTION --- */}
                <div className="mb-40 relative">
                    {/* Decorative DNA Background Path */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[var(--border-subtle)] -z-10 hidden lg:block"></div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <ScrollReveal>
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-8 rounded-3xl relative overflow-hidden group hover:border-[var(--accent-primary)]/50 transition-all duration-500">
                                <div className="absolute top-0 right-0 p-24 bg-blue-600/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-colors"></div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Heart size={32} className="text-blue-500" />
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase text-white mb-4">Contează <br /> cum te simți</h3>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                        Nu suntem aici să te uităm la ceas. Vrem să știm cum te simți, ce te doare, ce te motivează. Lucrăm cu oameni, nu cu corpuri.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-8 rounded-3xl relative overflow-hidden group hover:border-[var(--accent-primary)]/50 transition-all duration-500 shadow-2xl shadow-blue-900/10 lg:-mt-12 lg:mb-12">
                                <div className="absolute top-0 right-0 p-24 bg-red-600/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/10 transition-colors"></div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Zap size={32} className="text-red-500" />
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase text-white mb-4">Fiecare <br /> detaliu contează</h3>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                        Nu ne mulțumim cu "merge și-așa". Căutăm micile ajustări care fac diferența: unghiul corect, respirația potrivită, intensitatea perfectă.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-8 rounded-3xl relative overflow-hidden group hover:border-[var(--accent-primary)]/50 transition-all duration-500">
                                <div className="absolute top-0 right-0 p-24 bg-purple-600/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/10 transition-colors"></div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Activity size={32} className="text-purple-500" />
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase text-white mb-4">Fără <br /> bălării</h3>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                        Nu-ți promitem luna de pe cer. Îți spunem clar ce poți obține și ce presupune. Tot ce facem e măsurabil și bazat pe știință.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="flex flex-col gap-32">
                    {TEAM.map((member, idx) => (
                        <div
                            key={member.id}
                            ref={el => observerRefs.current[idx] = el}
                            data-id={member.id}
                            className={`group transition-all duration-700 ${activeMember === member.id ? 'opacity-100' : 'opacity-80'}`}
                        >
                            <FlashcardReveal direction={idx % 2 === 0 ? 'left' : 'right'}>
                                <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>

                                    {/* Image */}
                                    <div className={`w-full lg:w-5/12 relative aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--border-visible)] shadow-2xl transition-all duration-700 ${activeMember === member.id ? 'scale-100 ring-2 ring-[var(--accent-primary)]/50' : 'scale-95 opacity-80'}`}>
                                        <DualToneImage
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                            intensity={"none"}
                                            loading="lazy"
                                        />

                                        {/* Signature Skill Overlay */}
                                        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 border border-white/10 rounded-xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-3">
                                                <Fingerprint size={20} className="text-[var(--accent-primary)]" />
                                                <div>
                                                    <p className="text-[10px] uppercase text-white/50 tracking-widest font-bold">Signature Skill</p>
                                                    <p className="text-white text-xs font-bold uppercase">{member.signatureSkill}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="w-full lg:w-7/12 text-center lg:text-left">
                                        <h3 className={`text-4xl md:text-6xl font-black italic uppercase mb-2 transition-colors duration-500 text-glow ${activeMember === member.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-disabled)]'}`}>
                                            {member.name}
                                        </h3>
                                        <div className={`text-xl font-bold uppercase tracking-widest mb-6 ${activeMember === member.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`}>
                                            {member.role}
                                        </div>

                                        {/* Mobile Signature Badge (Visible always on mobile) */}
                                        <div className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-full mb-6">
                                            <Fingerprint size={14} className="text-[var(--accent-primary)]" />
                                            <span className="text-[10px] font-bold uppercase text-white">{member.signatureSkill}</span>
                                        </div>

                                        {/* BIO DESCRIPTION with SHOW MORE */}
                                        <BioText
                                            text={member.description}
                                            isActive={activeMember === member.id}
                                            storyImage={member.id === 'ionut-maris' ? '/ionut_story_client.webp' : undefined}
                                        />

                                        <div className="relative mb-10 inline-block lg:block">
                                            <div className={`absolute -top-4 -left-6 opacity-20 ${activeMember === member.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`}>
                                                <Quote size={48} />
                                            </div>
                                            <p className={`text-xl md:text-2xl font-light italic leading-relaxed relative z-10 pl-6 ${activeMember === member.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                                                "{member.quote}"
                                            </p>
                                        </div>

                                        <div className="flex justify-center lg:justify-start gap-4">
                                            {member.socials.instagram && (
                                                <a href={member.socials.instagram} className={`p-3 rounded-full border border-[var(--border-subtle)] transition-all ${activeMember === member.id ? 'text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}>
                                                    <Instagram size={20} />
                                                </a>
                                            )}
                                            {member.socials.linkedin && (
                                                <a href={member.socials.linkedin} className={`p-3 rounded-full border border-[var(--border-subtle)] transition-all ${activeMember === member.id ? 'text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}>
                                                    <Linkedin size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </FlashcardReveal>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export const TeamSection = memo(TeamSectionInternal);
