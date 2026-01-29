import React, { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { FlashcardReveal } from '../ui/FlashcardReveal';
import { DualToneImage } from '../ui/DualToneImage';
import { Instagram, Linkedin, Quote, ChevronDown, ChevronUp } from 'lucide-react';

const TEAM = [
    {
        id: 'rares-pantis',
        name: 'Rareș Pantiș',
        role: 'Fondator & Head Coach',
        image: '/rares_pantis.jpg',
        quote: "Viziunea mea este să ofer oamenilor timp. Timp pentru ei, pentru sănătate, într-o lume care ne fură fiecare secundă.",
        description: "Povestea mea începe în 2016 cu o idee simplă: să fac fitnessul mai eficient, mai accesibil, mai... uman. Am pornit cu entuziasm, dar parcursul nu a fost liniar. De la nopți nedormite creând site-uri la 2 dimineața și antrenamente ținute pe stomacul gol, am învățat ce înseamnă reziliența. Tranziția către NeoBoost a marcat maturizarea acestei viziuni: am lăsat în urmă 'one-man show-ul' pentru a construi o echipă și strategii care au dus la o comunitate de peste 15.000 de oameni. Astăzi, nu mai e vorba doar de fitness, ci de a oferi ceva ce n-a mai fost făcut în acest domeniu: un serviciu născut din pură empatie și compasiune. Vreau să construiesc ceva care contează cu adevărat pentru tine.",
        socials: { instagram: 'https://www.instagram.com/pantis.rares?igsh=a2FzMTk1Nmpsdzhi&utm_source=qr', linkedin: '#' },
        type: 'founder'
    },
    {
        id: 'rares-silvasan',
        name: 'Rareș Silvășan',
        role: 'EMS Trainer',
        image: '/rares_silvasan_new.png',
        quote: "Succesul vine din implicare, răbdare și motivație constantă. Împreună transformăm obiectivele în realitate.",
        description: "Sunt un antrenor dedicat, pasionat de sport și de progresul fiecărui client. Deși am început recent pregătirea specifică pentru culturism, am o experiență solidă în fitness și EMS, fiind activ implicat în tot ce înseamnă viața acestui studio. Mă remarc prin răbdare – îți voi explica fiecare exercițiu până îl stăpânești perfect – și prin adaptabilitate. Indiferent de nivelul tău, sunt aici să te motivez, să îți ofer un exemplu personal și să te inspir să îți depășești limitele. Îmi place să văd evoluția clienților mei și mă implic activ în susținerea lor, pas cu pas.",
        socials: { instagram: 'https://www.instagram.com/silvasan_rares?igsh=MWU0YjFicTA0ajBhcg==' },
        type: 'trainer'
    },
    {
        id: 'alex-cret',
        name: 'Alex Creț',
        role: 'Level 4 PT & Calisthenics Specialist',
        image: '/alex_cret.jpg',
        quote: "Corpul tău este cel mai bun echipament. Pentru mine, NeoBoost este o familie unde ne ridicăm unii pe alții.",
        description: "Cred cu tărie că propriul corp este cel mai bun 'aparat' pe care îl deținem. Ca specialist în Calisthenics, am învățat că forța adevărată vine din control și echilibru. La NeoBoost, combin această filozofie cu tehnologia EMS pentru a te ajuta să te miști mai bine și fără dureri. Fie vorba de recuperare sau de performanță, sunt aici să mă asigur că fiecare antrenament este sigur și eficient. Pentru mine, nu ești doar un client, ești un coechipier.",
        socials: { instagram: 'https://www.instagram.com/alexcretr?igsh=MXgxZ3QzbDFzeGp0NA==' },
        type: 'trainer'
    },
    {
        id: 'ionut-maris',
        name: 'Ionuț Mariș Hinsu',
        role: 'Level 4 PT & Transformation Coach',
        image: '/ionut_maris.jpg',
        quote: "Am slăbit 12kg la NeoBoost și mi-am schimbat viața. Sunt antrenorul care a fost în locul tău știe exact cum să te susțină.",
        description: "Povestea mea aici a început simplu: ca client. Eram lipsit de energie și nemulțumit de forma mea. Am reușit să slăbesc 12 kg și acea transformare mi-a schimbat complet perspectiva, motivându-mă să devin antrenor. Știu exact cum e să îți fie greu la început, știu cum e să vrei să renunți. De aceea, sunt aici să te susțin nu doar cu exerciții, ci și cu înțelegere. Dacă eu am reușit, te asigur că și tu poți.",
        socials: { instagram: 'https://www.instagram.com/maris_hinsu_ionut?igsh=MWxjd3EwODV2dXptMw==' },
        type: 'trainer'
    },
    {
        id: 'raluca-zaro',
        name: 'Raluca Zaro',
        role: 'Marketing Director',
        image: '/raluca_zaro.png',
        quote: "Branding autentic, bazat pe realitate, nu pe idealizări. Aici construim o cultură, nu doar o imagine.",
        description: "Misiunea mea la NeoBoost este să traduc tehnologia într-o limbă pe care o înțelegem cu toții: emoția. Cu un background în Psihologie, încerc să construiesc o comunitate reală, nu doar o imagine frumoasă pe Instagram. Vreau ca fiecare persoană care ne trece pragul sau ne vede online să simtă valorile noastre: căldura, onestitatea și dorința de a ajuta. Aici nu e vorba despre aparate, ci despre oamenii care le folosesc și poveștile lor.",
        socials: { instagram: 'https://www.instagram.com/raluca_zaro?igsh=MXVqM2p3ZnY0ajN1YQ==' },
        type: 'marketing'
    }
];

const BioText = ({ text, isActive }: { text: string, isActive: boolean }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Reset expansion when active member changes (optional, keeps UI clean)
    useEffect(() => {
        if (!isActive) setIsExpanded(false);
    }, [isActive]);

    return (
        <div className={`mb-8 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 transition-colors duration-500 ${isActive ? 'text-[var(--text-secondary)]' : 'text-[var(--text-disabled)]'}`}>
            <p className={`transition-all duration-500 ${isExpanded ? '' : 'line-clamp-3'}`}>
                {text}
            </p>
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

export const TeamSection = () => {
    const [activeMember, setActiveMember] = useState<string | null>(null);
    const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
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
                rootMargin: '-40% 0px -40% 0px',
                threshold: 0.5
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
                <div className="text-center mb-24">
                    <ScrollReveal>
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-[var(--text-primary)] uppercase italic leading-[0.9] text-glow">
                            CINE SUNTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">NOI?</span>
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Culture Manifesto */}
                <div className="mb-32 max-w-4xl mx-auto text-center relative">
                    <ScrollReveal>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-50"></div>

                        <h3 className="text-2xl md:text-3xl font-light text-[var(--text-primary)] mb-8 mt-12 tracking-wide">
                            Mai mult decât o echipă. <span className="font-bold text-[var(--accent-primary)]">O Cultură.</span>
                        </h3>

                        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-12">
                            La NeoBoost, nu angajăm doar antrenori. Construim o <span className="text-[var(--text-primary)] font-medium">familie</span> unită de aceleași valori: empatie, reziliență și dorința obsesivă de a oferi valoare.
                            Fiecare membru al echipei este aici pentru că înțelege că tehnologia fără umanitate este doar o mașinărie.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-[var(--border-subtle)] pt-12">
                            <div className="p-6 bg-[var(--bg-tertiary)] rounded-2xl backdrop-blur-sm border border-[var(--border-subtle)] hover:border-blue-500/30 transition-colors shadow-lg">
                                <h4 className="text-[var(--text-primary)] font-bold text-xl mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    Empatie Radicală
                                </h4>
                                <p className="text-sm text-[var(--text-muted)]">Nu antrenăm corpuri, lucrăm cu oameni. Înțelegem lupte, frici și visuri.</p>
                            </div>
                            <div className="p-6 bg-[var(--bg-tertiary)] rounded-2xl backdrop-blur-sm border border-[var(--border-subtle)] hover:border-red-500/30 transition-colors shadow-lg">
                                <h4 className="text-[var(--text-primary)] font-bold text-xl mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    Evoluție Continuă
                                </h4>
                                <p className="text-sm text-[var(--text-muted)]">Nimeni nu stagnează. Fiecare zi este o oportunitate de a deveni mai buni cu 1%.</p>
                            </div>
                            <div className="p-6 bg-[var(--bg-tertiary)] rounded-2xl backdrop-blur-sm border border-[var(--border-subtle)] hover:border-purple-500/30 transition-colors shadow-lg">
                                <h4 className="text-[var(--text-primary)] font-bold text-xl mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                    Unitate
                                </h4>
                                <p className="text-sm text-[var(--text-muted)]">Succesul unuia este succesul tuturor. Ne ridicăm unii pe alții.</p>
                            </div>
                        </div>
                    </ScrollReveal>
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
                                    <div className={`w-full lg:w-5/12 relative aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--border-visible)] shadow-2xl transition-all duration-700 ${activeMember === member.id ? 'grayscale-0 scale-100 ring-2 ring-[var(--accent-primary)]/50' : 'grayscale scale-95'}`}>
                                        <DualToneImage
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                            intensity={"none"}
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <div className="w-full lg:w-7/12 text-center lg:text-left">
                                        <h3 className={`text-4xl md:text-6xl font-black italic uppercase mb-2 transition-colors duration-500 text-glow ${activeMember === member.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-disabled)]'}`}>
                                            {member.name}
                                        </h3>
                                        <div className={`text-xl font-bold uppercase tracking-widest mb-6 ${activeMember === member.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`}>
                                            {member.role}
                                        </div>

                                        {/* BIO DESCRIPTION with SHOW MORE */}
                                        <BioText text={member.description} isActive={activeMember === member.id} />

                                        <div className="relative mb-10 inline-block lg:block">
                                            <Quote className={`absolute -top-4 -left-6 opacity-20 ${activeMember === member.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`} size={48} />
                                            <p className={`text-xl md:text-2xl font-light italic leading-relaxed relative z-10 ${activeMember === member.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
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
