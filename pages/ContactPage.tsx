import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, MessageCircle, Instagram, Facebook, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { RevealText } from '../components/ui/RevealText';
import { BRAND } from '../constants';

const schedule = [
    { day: "Luni – Vineri", hours: "07:00 – 21:00" },
    { day: "Sâmbătă", hours: "10:00 – 14:00" },
    { day: "Duminică", hours: "Închis" }
];

const contactCards = [
    {
        icon: <Phone className="w-6 h-6" />,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        title: "Telefon & WhatsApp",
        value: BRAND.phone,
        action: () => window.open(`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=Salut! Am câteva întrebări despre antrenamentul EMS.`, '_blank'),
        cta: "Trimite WhatsApp"
    },
    {
        icon: <MapPin className="w-6 h-6" />,
        color: "text-brand",
        bg: "bg-brand/10",
        title: "Adresă studio",
        value: "Calea Aradului nr. 9, Hotel Ramada, Oradea",
        action: () => window.open('https://maps.google.com/?q=Hotel+Ramada+Oradea', '_blank'),
        cta: "Deschide în Maps"
    },
    {
        icon: <Instagram className="w-6 h-6" />,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        title: "Instagram",
        value: "@neoboost_ems_oradea",
        action: () => window.open('https://www.instagram.com/neoboost_ems_oradea', '_blank'),
        cta: "Urmărește-ne"
    }
];

export const ContactPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Helmet>
                <title>Contact NeoBoost Oradea – Program & Locație | EMS Studio</title>
                <meta name="description" content="Contactează NeoBoost Oradea. Suntem la Hotel Ramada, Calea Aradului 9. Program: Luni-Vineri 07-21, Sâmbătă 10-14. Tel: +40 769 124 019." />
            </Helmet>

            {/* HERO */}
            <div className="pt-32 pb-16 border-b border-[var(--border-subtle)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
                <div className="container mx-auto px-6 lg:px-24 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-widest uppercase mb-8">
                            <MapPin size={12} />
                            <span>Oradea, Calea Aradului</span>
                        </div>
                        <RevealText
                            text="CONTACT."
                            as="h1"
                            mode="char"
                            stagger={0.05}
                            delay={0.1}
                            className="font-display font-black text-[var(--text-primary)] text-5xl md:text-8xl leading-[0.9] tracking-tighter uppercase italic mb-6 justify-start"
                        />
                        <p className="text-[var(--text-secondary)] text-xl leading-relaxed">
                            Suntem gata să te ajutăm să atingi obiectivele tale fitness. Scrie-ne, sună-ne sau vino direct la studio.
                        </p>
                    </div>
                </div>
            </div>

            {/* CONTACT CARDS */}
            <div className="py-20">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="grid md:grid-cols-3 gap-6 mb-20">
                        {contactCards.map((card, i) => (
                            <div key={i} className="bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-subtle)] p-8 hover:border-brand/30 transition-all hover:shadow-xl hover:shadow-brand/5">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${card.bg} ${card.color} mb-6`}>
                                    {card.icon}
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">{card.title}</p>
                                <p className="text-[var(--text-primary)] font-bold text-lg mb-6 leading-snug">{card.value}</p>
                                <button
                                    onClick={card.action}
                                    className={`inline-flex items-center gap-2 text-sm font-bold ${card.color} hover:opacity-80 transition-opacity uppercase tracking-widest border-b border-current pb-0.5`}
                                >
                                    {card.cta}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* MAP + SCHEDULE */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* MAP EMBED */}
                        <div className="rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-xl aspect-[4/3] bg-[var(--bg-secondary)]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.5!2d21.924!3d47.065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47464f60db8d5bab%3A0x8d1a2f9c0e4f0000!2sHotel%20Ramada%20Oradea!5e0!3m2!1sro!2sro!4v1"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="NeoBoost EMS Oradea – Locație"
                            />
                        </div>

                        {/* SCHEDULE + INFO */}
                        <div>
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Clock className="text-brand" size={20} />
                                    <h2 className="text-xl font-black font-display text-[var(--text-primary)] uppercase">Program</h2>
                                </div>
                                <div className="space-y-3">
                                    {schedule.map((s, i) => (
                                        <div key={i} className={`flex justify-between items-center py-4 px-5 rounded-xl border ${i === 2 ? 'border-[var(--border-subtle)] opacity-50' : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)]'}`}>
                                            <span className="font-bold text-[var(--text-primary)]">{s.day}</span>
                                            <span className={`font-mono text-sm font-bold ${i === 2 ? 'text-[var(--text-muted)]' : 'text-brand'}`}>{s.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-subtle)] p-6 mb-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <MapPin className="text-brand shrink-0" size={18} />
                                    <p className="text-[var(--text-primary)] font-bold">Cum ajungi</p>
                                </div>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                    Suntem la <strong className="text-[var(--text-primary)]">Hotel Ramada, Calea Aradului nr. 9, Oradea</strong>. Parcare disponibilă în față la hotel. Accesibil cu transportul în comun sau cu mașina.
                                </p>
                            </div>

                            <Button
                                size="lg"
                                variant="energy"
                                className="w-full justify-center"
                                onClick={() => window.open(`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=Salut! Vreau să programez o ședință gratuită.`, '_blank')}
                            >
                                <MessageCircle size={18} />
                                Programează acum pe WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
