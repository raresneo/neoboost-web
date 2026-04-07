import React from 'react';
import { Clock, Gift, Target, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { BRAND } from '../../constants';

export const FreeSessionSection = () => {
    return (
        <section id="sedinta-gratuita" className="py-20 bg-gradient-to-b from-white to-blue-50/30">
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                                Începe transformarea
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase italic mb-6">
                                Ședința <span className="text-blue-600">Gratuită</span>.
                                <span className="block text-2xl md:text-3xl text-gray-400 mt-2 not-italic font-medium">
                                    Ce te așteaptă la NeoBoost?
                                </span>
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Nu te costă nimic să încerci. Vrem să simți pe pielea ta eficiența electrostimulării musculare înainte să iei o decizie.
                            </p>
                        </div>

                        {/* The 4 Steps / Pillars */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Card 1: Durata */}
                            <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-100/50 hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                                    <Clock size={24} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 uppercase mb-3">30 Minute Total</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Include discuția inițială despre obiective, echiparea cu costumul special și antrenamentul demonstrativ. Simplu și rapid.
                                </p>
                            </div>

                            {/* Card 2: Ce primesti */}
                            <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-100/50 hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6">
                                    <Gift size={24} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 uppercase mb-3">Totul Inclus</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Primești echipament complet (costum dry-suit, lenjerie de unică folosință). Nu ai nevoie de geantă de sală. Doar vino.
                                </p>
                            </div>

                            {/* Card 3: Senzatia */}
                            <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-100/50 hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                                    <Target size={24} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 uppercase mb-3">Activare 90%</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Vei simți cum lucrează fiecare grupă musculară simultan. Este intens, dar complet controlabil și fără impact pe articulații.
                                </p>
                            </div>

                            {/* Card 4: Planul */}
                            <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-100/50 hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mb-6">
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 uppercase mb-3">Plan Personalizat</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    La final, antrenorul îți va propune pachetul ideal pentru obiectivul tău (slăbire, tonifiere sau dureri de spate).
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <a
                                href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Aș vrea o discuție de 10 minute să văd dacă antrenamentul EMS mi se potrivește.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-500/30"
                            >
                                <MessageCircle size={18} />
                                Află dacă ți se potrivește
                            </a>
                            <p className="mt-4 text-xs text-gray-400 font-medium">
                                *Locuri limitate. Doar 5 ședințe gratuite disponibile zilnic.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
