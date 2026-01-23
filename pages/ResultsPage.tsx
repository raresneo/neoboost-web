import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../components/Footer';
import { TransformationSection } from '../components/sections/TransformationSection';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const ResultsPage = () => {
    return (
        <div className="bg-[#020202] min-h-screen text-white">
            <Helmet>
                <title>Rezultate Clienți & Transformări Reale | NeoBoost Oradea</title>
                <meta name="description" content="Vezi transformările reale ale clienților NeoBoost Oradea. Slăbire, tonifiere și corecția posturii prin tehnologia EMS Wireless. Rezultate validate prin măsurători bio-metrice." />
                <link rel="canonical" href="https://neoboost.ro/rezultate" />
            </Helmet>

            <main className="pt-32">
                <ScrollReveal className="text-center px-6 mb-12">
                    <p className="mono-font text-xs tracking-[0.3em] text-[#3A86FF] uppercase font-bold mb-4">
                        POVĂȘTI DE SUCCES
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black impact-font uppercase leading-none mb-6">
                        TRANSFORMĂRI <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>REALE.</span>
                    </h1>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Nu promitem miracole peste noapte. Promitem rezultate măsurabile pentru cei care respectă planul. Iată ce au reușit clienții noștri.
                    </p>
                </ScrollReveal>

                {/* Reusing the Transformation Section directly */}
                <div className="-mt-20">
                    {/* Negative margin to pull it up if needed, or just let it flow naturally. TransformationSection has its own padding. */}
                    <TransformationSection />
                </div>
            </main>

            <Footer />
        </div>
    );
};
