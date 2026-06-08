// Export all program landing page sections
export { ForWhoSection } from './ForWhoSection';
export { WorkoutDetailsSection } from './WorkoutDetailsSection';
export { Reward3Plus1Section } from './Reward3Plus1Section';

// Additional inline sections for efficiency
import React from 'react';
import { Package, Gift, FileCheck, Calendar, MapPin, MessageCircle } from 'lucide-react';
import { MONTHLY_PACKAGES, BRAND } from '../../../constants';

// Includes Section
export const IncludesSection: React.FC<{ includes: string[] }> = ({ includes }) => (
    <section className="py-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-12 text-gray-900">
            CE INCLUDE PROGRAMUL?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            {includes.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-6 border border-gray-200 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <Package size={24} className="text-[#3A86FF] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 leading-relaxed font-medium">{item}</span>
                </div>
            ))}
        </div>
    </section>
);

// Pricing Section
interface PricingSectionProps {
    specialPrice?: string;
    referencePackages: boolean;
    details: string;
    onOpenForm?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ specialPrice, referencePackages, details, onOpenForm }) => (
    <section className="py-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-12 text-gray-900">
            PREȚURI & OPȚIUNI
        </h2>

        {specialPrice && (
            <div className="bg-[#3A86FF]/5 p-10 border border-[#3A86FF]/20 rounded-3xl mb-8 text-center">
                <p className="text-2xl font-bold text-[#3A86FF] mb-2">PREȚ SPECIAL PROGRAM</p>
                <p className="text-xl text-gray-800 font-bold">{specialPrice}</p>
            </div>
        )}

        <p className="text-lg text-gray-600 mb-8 font-medium">{details}</p>

        {referencePackages && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MONTHLY_PACKAGES.map((pkg, idx) => (
                    <div key={idx} className={`p-8 rounded-2xl border-2 ${pkg.isRecommended ? 'border-[#3A86FF] bg-white shadow-xl scale-105 z-10' : 'border-gray-100 bg-gray-50 text-gray-500'} relative flex flex-col`}>
                        {pkg.isRecommended && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3A86FF] text-white px-4 py-1 rounded-full text-xs font-black uppercase shadow-lg">
                                Recomandat
                            </div>
                        )}
                        <h3 className={`text-2xl font-display font-bold uppercase mb-1 ${pkg.isRecommended ? 'text-gray-900 mt-6' : 'text-gray-700'}`}>{pkg.title}</h3>
                        <p className="text-[10px] mono-font text-[#3A86FF] font-black uppercase tracking-widest mb-4 opacity-80">{pkg.duration}</p>

                        <div className="mb-6">
                            {pkg.sessionCount.includes('+') ? (
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-display font-bold ${pkg.isRecommended ? 'text-gray-900' : 'text-gray-700'}`}>{pkg.sessionCount.split('+')[0]}</span>
                                    <span className="text-2xl font-display font-bold text-[#3A86FF]">+{pkg.sessionCount.split('+')[1]}</span>
                                    <span className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Ședințe</span>
                                </div>
                            ) : (
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-4xl font-display font-bold ${pkg.isRecommended ? 'text-gray-900' : 'text-gray-700'}`}>{pkg.sessionCount}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Ședințe</span>
                                </div>
                            )}
                        </div>
                        <p className="text-4xl font-black text-[#3A86FF] mb-6">{pkg.price}</p>
                        <ul className="space-y-2 text-sm text-gray-600 mb-8 flex-grow">
                            {pkg.features.slice(0, 3).map((feature, i) => (
                                <li key={i}>• {feature}</li>
                            ))}
                        </ul>

                        <button
                            onClick={onOpenForm}
                            className={`w-full py-3 rounded-xl font-bold uppercase text-sm transition-all ${pkg.isRecommended
                                ? 'bg-[#3A86FF] text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#3A86FF] hover:text-[#3A86FF]'
                                }`}
                        >
                            Alege Pachetul
                        </button>
                    </div>
                ))}
            </div>
        )}
    </section>
);

// Bonuses Section
export const BonusesSection: React.FC<{ bonuses: string[] }> = ({ bonuses }) => (
    <section className="py-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-12 text-gray-900">
            BONUS EXCLUSIV!
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
            {bonuses.map((bonus, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-white p-8 border border-blue-100 rounded-2xl text-center shadow-sm">
                    <Gift size={32} className="text-[#3A86FF] mx-auto mb-4" />
                    <p className="text-gray-700 leading-relaxed font-medium">{bonus}</p>
                </div>
            ))}
        </div>
    </section>
);

// Conditions Section
export const ConditionsSection: React.FC<{ conditions: string[] }> = ({ conditions }) => (
    <section className="py-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-12 text-gray-900">
            CONDIȚII DE PARTICIPARE
        </h2>
        <div className="bg-gray-50 p-10 border border-gray-200 rounded-3xl shadow-sm">
            <ol className="space-y-4">
                {conditions.map((condition, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-700 text-lg leading-relaxed">
                        <span className="text-[#3A86FF] font-black text-2xl flex-shrink-0">{idx + 1}.</span>
                        <span>{condition}</span>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

// Consultation Section
interface ConsultationSectionProps {
    title: string;
    description: string;
    calendlyLink: string;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ title, description, calendlyLink }) => (
    <section className="py-20">
        <div className="bg-gray-900 p-12 md:p-16 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
            {/* Decorative blob for contrast */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#3A86FF]/20 rounded-full blur-[60px] pointer-events-none"></div>

            <Calendar size={48} className="text-[#3A86FF] mx-auto mb-6 relative z-10" />
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-6 text-white relative z-10">
                {title}
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto relative z-10">
                {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                    href={calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#3A86FF] text-white px-10 py-5 rounded-2xl font-display font-bold text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(58,134,255,0.3)]"
                >
                    <Calendar size={24} />
                    REZERVĂ UN LOC
                </a>
                <a
                    href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez consultația gratuită.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-display font-bold text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(37,211,102,0.3)]"
                >
                    <MessageCircle size={24} />
                    DISCUTĂ PE WHATSAPP
                </a>
            </div>
        </div>
    </section>
);

// After Consultation Section
export const AfterConsultationSection: React.FC<{ text: string }> = ({ text }) => (
    <section className="py-12">
        <div className="bg-blue-50 p-8 border border-blue-100 rounded-2xl">
            <h3 className="text-2xl font-display font-bold uppercase text-[#3A86FF] mb-4">
                CE SE ÎNTÂMPLĂ DUPĂ CONSULTAȚIE?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">{text}</p>
        </div>
    </section>
);

// Location Section
export const LocationSection: React.FC = () => (
    <section className="py-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-12 text-[#3A86FF]">
            ALEGE LOCAȚIA TA
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white overflow-hidden border border-gray-100 group rounded-3xl shadow-lg hover:shadow-xl transition-all">
                <div className="relative aspect-video">
                    <img src="/ramada.webp" alt="Ramada Oradea" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                </div>
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin className="text-[#3A86FF]" size={20} />
                        <h3 className="text-2xl font-display font-bold uppercase text-gray-900">HOTEL RAMADA</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed italic">
                        Calea Aradului nr. 9. Atmosferă exclusivistă, liniște și acces premium. Ideal pentru cei care vor maximă discreție.
                    </p>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-black uppercase text-[#3A86FF] tracking-widest mb-1">PROGRAM</p>
                        <p className="text-xs text-gray-700">L–V 07:00–21:00, S 10:00–14:00</p>
                    </div>
                </div>
            </div>

            <div className="bg-white overflow-hidden border border-gray-100 group rounded-3xl shadow-lg hover:shadow-xl transition-all">
                <div className="relative aspect-video">
                    <img src="/getfit.webp" alt="GetFit Oradea" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                </div>
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin className="text-[#3A86FF]" size={20} />
                        <h3 className="text-2xl font-display font-bold uppercase text-gray-900">SALA GETFIT</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed italic">
                        Lotus Center, Nufărului. Lumină naturală din abundență, energie dinamică și acces ultra-facil în cel mai mare centru comercial.
                    </p>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-black uppercase text-[#3A86FF] tracking-widest mb-1">PROGRAM</p>
                        <p className="text-xs text-gray-700">L–V 07:00–21:00, S 10:00–14:00</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
