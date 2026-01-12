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
        <h2 className="text-4xl md:text-6xl font-black impact-font uppercase tracking-tighter mb-12">
            CE INCLUDE PROGRAMUL?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            {includes.map((item, idx) => (
                <div key={idx} className="glass-block p-6 border-[#3A86FF]/20 rounded-2xl flex items-start gap-4">
                    <Package size={24} className="text-[#3A86FF] flex-shrink-0 mt-1" />
                    <span className="text-white/90 leading-relaxed">{item}</span>
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
}

export const PricingSection: React.FC<PricingSectionProps> = ({ specialPrice, referencePackages, details }) => (
    <section className="py-20">
        <h2 className="text-4xl md:text-6xl font-black impact-font uppercase tracking-tighter mb-12">
            PREȚURI & OPȚIUNI
        </h2>

        {specialPrice && (
            <div className="glass-block p-10 border-[#3A86FF]/30 rounded-3xl mb-8 text-center">
                <p className="text-2xl font-bold text-[#3A86FF] mb-2">PREȚ SPECIAL PROGRAM</p>
                <p className="text-xl text-white/80">{specialPrice}</p>
            </div>
        )}

        <p className="text-lg text-white/70 mb-8">{details}</p>

        {referencePackages && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MONTHLY_PACKAGES.map((pkg, idx) => (
                    <div key={idx} className={`glass-block p-8 rounded-2xl border-2 ${pkg.isRecommended ? 'border-[#3A86FF]' : 'border-white/10'} relative`}>
                        {pkg.isRecommended && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3A86FF] text-black px-4 py-1 rounded-full text-xs font-black uppercase">
                                Recomandat
                            </div>
                        )}
                        <h3 className="text-2xl font-black impact-font uppercase mb-2">{pkg.title}</h3>
                        <p className="text-sm text-white/60 mb-4">{pkg.duration}</p>
                        <p className="text-4xl font-black text-[#3A86FF] mb-6">{pkg.price}</p>
                        <ul className="space-y-2 text-sm text-white/70">
                            {pkg.features.slice(0, 3).map((feature, i) => (
                                <li key={i}>• {feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        )}
    </section>
);

// Bonuses Section
export const BonusesSection: React.FC<{ bonuses: string[] }> = ({ bonuses }) => (
    <section className="py-20">
        <h2 className="text-4xl md:text-6xl font-black impact-font uppercase tracking-tighter mb-12">
            BONUS EXCLUSIV!
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
            {bonuses.map((bonus, idx) => (
                <div key={idx} className="glass-block p-8 border-[#3A86FF]/20 rounded-2xl text-center">
                    <Gift size={32} className="text-[#3A86FF] mx-auto mb-4" />
                    <p className="text-white/90 leading-relaxed">{bonus}</p>
                </div>
            ))}
        </div>
    </section>
);

// Conditions Section
export const ConditionsSection: React.FC<{ conditions: string[] }> = ({ conditions }) => (
    <section className="py-20">
        <h2 className="text-4xl md:text-6xl font-black impact-font uppercase tracking-tighter mb-12">
            CONDIȚII DE PARTICIPARE
        </h2>
        <div className="glass-block p-10 border-[#3A86FF]/20 rounded-3xl">
            <ol className="space-y-4">
                {conditions.map((condition, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-white/90 text-lg leading-relaxed">
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
        <div className="glass-block p-12 md:p-16 border-[#3A86FF]/30 rounded-[3rem] text-center">
            <Calendar size={48} className="text-[#3A86FF] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black impact-font uppercase tracking-tighter mb-6">
                {title}
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto">
                {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href={calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#3A86FF] text-black px-10 py-5 rounded-2xl font-black impact-font text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(58,134,255,0.3)]"
                >
                    <Calendar size={24} />
                    REZERVĂ UN LOC
                </a>
                <a
                    href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez consultația gratuită.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black impact-font text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(37,211,102,0.3)]"
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
        <div className="glass-block p-8 border-[#3A86FF]/20 rounded-2xl">
            <h3 className="text-2xl font-black impact-font uppercase text-[#3A86FF] mb-4">
                CE SE ÎNTÂMPLĂ DUPĂ CONSULTAȚIE?
            </h3>
            <p className="text-lg text-white/80 leading-relaxed">{text}</p>
        </div>
    </section>
);

// Location Section
export const LocationSection: React.FC = () => (
    <section className="py-20">
        <h2 className="text-4xl md:text-6xl font-black impact-font uppercase tracking-tighter mb-12">
            UNDE NE GĂSEȘTI?
        </h2>
        <div className="glass-block p-10 border-[#3A86FF]/20 rounded-3xl">
            <div className="flex items-start gap-4 mb-6">
                <MapPin size={32} className="text-[#3A86FF] flex-shrink-0" />
                <div>
                    <h3 className="text-2xl font-black impact-font uppercase text-white mb-2">
                        NEOBOOST ORADEA
                    </h3>
                    <p className="text-lg text-white/80 mb-4">
                        <strong>Locații:</strong> Ramada și Lotus<br />
                        <strong>Program:</strong> L–V 07:00–21:00, S 10:00–14:00, D închis
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href={BRAND.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#3A86FF] hover:text-white transition-colors"
                        >
                            <MapPin size={20} />
                            Vezi pe Google Maps
                        </a>
                        <a
                            href={`tel:${BRAND.phone}`}
                            className="inline-flex items-center gap-2 text-[#3A86FF] hover:text-white transition-colors"
                        >
                            📞 {BRAND.phone}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
