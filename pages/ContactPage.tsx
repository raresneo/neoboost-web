import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, MessageCircle, Instagram } from 'lucide-react';
import { BRAND } from '../constants';
import { Section, Heading, WhatsappCta, waLink } from '../components/home';
import { Footer } from '../components/Footer';

const schedule = [
    { day: 'Luni – Vineri', hours: '07:00 – 21:00' },
    { day: 'Sâmbătă', hours: '10:00 – 14:00' },
    { day: 'Duminică', hours: 'Închis', closed: true },
];

const contactCards = [
    {
        icon: <Phone className="h-6 w-6" />, title: 'Telefon & WhatsApp', value: BRAND.phone,
        href: waLink('Salut! Am câteva întrebări despre antrenamentul EMS.'), cta: 'Trimite WhatsApp',
    },
    {
        icon: <MapPin className="h-6 w-6" />, title: 'Adresă studio', value: 'Calea Aradului nr. 9, Hotel Ramada, Oradea',
        href: 'https://maps.google.com/?q=Hotel+Ramada+Oradea', cta: 'Deschide în Maps',
    },
    {
        icon: <Instagram className="h-6 w-6" />, title: 'Instagram', value: '@neoboost.oradea',
        href: BRAND.socials.instagram, cta: 'Urmărește-ne',
    },
];

export const ContactPage: React.FC = () => (
    <main className="min-h-screen bg-[var(--bg-primary)]">
        <Helmet>
            <title>Contact NeoBoost Oradea – Program & Locație | EMS Studio</title>
            <meta name="description" content="Contactează NeoBoost Oradea. Suntem la Hotel Ramada, Calea Aradului 9. Program: Luni-Vineri 07-21, Sâmbătă 10-14. Tel: +40 769 124 019." />
            <link rel="canonical" href="https://neo-boost.com/contact" />
        </Helmet>

        {/* HERO */}
        <Section>
            <div className="max-w-3xl">
                <div className="hero-rise mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3.5 py-1.5">
                    <MapPin size={13} className="text-[var(--accent-primary)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Oradea · Calea Aradului</span>
                </div>
                <h1 className="hero-rise font-display text-5xl font-black uppercase italic leading-[0.95] tracking-tight text-[var(--text-primary)] md:text-7xl" style={{ animationDelay: '60ms' }}>
                    Hai să<br /><span className="text-[var(--accent-primary)]">vorbim</span>
                </h1>
                <p className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl" style={{ animationDelay: '140ms' }}>
                    Scrie-ne, sună-ne sau vino direct la studio. Răspundem pe WhatsApp în câteva minute.
                </p>
            </div>
        </Section>

        {/* CONTACT CARDS */}
        <Section tint className="!pt-0">
            <div className="grid gap-5 md:grid-cols-3">
                {contactCards.map((c) => (
                    <a
                        key={c.title}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7 transition-all duration-150 hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-lg)]"
                    >
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                            {c.icon}
                        </div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">{c.title}</p>
                        <p className="mt-1 flex-1 text-lg font-bold leading-snug text-[var(--text-primary)]">{c.value}</p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[var(--accent-primary)]">
                            {c.cta} →
                        </span>
                    </a>
                ))}
            </div>

            {/* MAP + SCHEDULE */}
            <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
                <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.5!2d21.924!3d47.065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47464f60db8d5bab%3A0x8d1a2f9c0e4f0000!2sHotel%20Ramada%20Oradea!5e0!3m2!1sro!2sro!4v1"
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" title="NeoBoost EMS Oradea – Locație"
                    />
                </div>
                <div>
                    <div className="mb-3 flex items-center gap-2.5">
                        <Clock size={18} className="text-[var(--accent-primary)]" />
                        <h2 className="font-display text-xl font-black uppercase text-[var(--text-primary)]">Program</h2>
                    </div>
                    <div className="space-y-2.5">
                        {schedule.map((s) => (
                            <div key={s.day} className={`flex items-center justify-between rounded-xl border border-[var(--border-subtle)] px-5 py-4 ${s.closed ? 'opacity-50' : 'bg-[var(--bg-primary)]'}`}>
                                <span className="font-bold text-[var(--text-primary)]">{s.day}</span>
                                <span className={`font-mono text-sm font-bold ${s.closed ? 'text-[var(--text-muted)]' : 'text-[var(--accent-primary)]'}`}>{s.hours}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6">
                        <div className="mb-2 flex items-center gap-2.5">
                            <MapPin size={18} className="shrink-0 text-[var(--accent-primary)]" />
                            <p className="font-bold text-[var(--text-primary)]">Cum ajungi</p>
                        </div>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                            Suntem la <strong className="text-[var(--text-primary)]">Hotel Ramada, Calea Aradului nr. 9, Oradea</strong>.
                            Parcare disponibilă în fața hotelului. Accesibil cu mașina sau transportul în comun.
                        </p>
                    </div>
                    <div className="mt-6">
                        <WhatsappCta text="Salut! Vreau să programez o ședință gratuită." className="w-full">
                            Programează pe WhatsApp
                        </WhatsappCta>
                    </div>
                </div>
            </div>
        </Section>

        <Footer />
    </main>
);
