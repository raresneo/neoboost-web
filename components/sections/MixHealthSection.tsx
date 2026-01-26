import React, { useState } from 'react';
import { Milk, Sparkles, Zap, Leaf, ArrowRight, X, FlaskConical } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const MixHealthSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className={`relative w-screen h-screen shrink-0 overflow-hidden transition-all duration-700 ${isExpanded ? 'bg-white text-black' : 'bg-[#050a14] text-white'}`}>

            {/* BACKGROUND: Distinct "Science/Lab" feel when expanded */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isExpanded ? 'opacity-10' : 'opacity-20'}`}>
                {/* Abstract molecule/DNA pattern or just clean noise */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
            </div>

            {/* EXPANDED CONTENT VIEW */}
            <div className={`absolute inset-0 z-20 overflow-y-auto duration-700 transition-all ${isExpanded ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'}`}>
                <div className="container mx-auto px-6 md:px-24 py-24 min-h-screen flex flex-col justify-center">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                        className="absolute top-10 right-10 flex items-center gap-2 px-6 py-2 rounded-full border border-black/10 hover:bg-black/5 transition-colors uppercase font-bold text-xs tracking-widest"
                    >
                        <X size={16} /> Închide
                    </button>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-[#00F0FF]/10 text-[#008080] rounded-full">
                                    <FlaskConical size={24} />
                                </div>
                                <span className="text-[#008080] font-bold uppercase tracking-[0.2em] text-sm">MYX Nutrition Science</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-black">
                                HRANĂ.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008080] to-[#00F0FF]">CELULARĂ.</span>
                            </h2>

                            <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-xl font-medium">
                                Nu amesteca antrenamentul cu nutriția - fiecare are rolul său. MYX este linia noastră de suport metabolic, creată în laborator pentru a maximiza regenerarea după ședințele EMS.
                            </p>

                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-[#f0f9fa] border border-[#d0eef0] flex gap-5 hover:scale-[1.01] transition-transform">
                                    <div className="p-3 bg-white rounded-xl shadow-sm h-fit text-[#008080]"><Milk size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg uppercase mb-1 text-slate-800">Iso-Whey MYX</h4>
                                        <p className="text-sm text-slate-500">Absorbție ultra-rapidă. Zero zahăr. Ideal imediat după efort.</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-[#f0f9fa] border border-[#d0eef0] flex gap-5 hover:scale-[1.01] transition-transform">
                                    <div className="p-3 bg-white rounded-xl shadow-sm h-fit text-[#008080]"><Zap size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg uppercase mb-1 text-slate-800">Energy Matrix</h4>
                                        <p className="text-sm text-slate-500">Electroliți și BCAA pentru hidratare celulară și focus mental.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Visual */}
                        <div className="relative aspect-[4/5] lg:h-[70vh]">
                            <div className="absolute inset-0 bg-[#f0f9fa] rounded-3xl -rotate-2 transform transition-transform"></div>
                            <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl relative bg-white">
                                <img
                                    src="/proteina personalizata2.jpg"
                                    className="w-full h-full object-cover object-center"
                                    alt="MYX Nutrition Product"
                                />
                                {/* Clean Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <p className="text-6xl font-black text-slate-900/10 absolute -top-16 -left-4 select-none">PURE</p>
                                    <h3 className="text-2xl font-black text-slate-800">MYX SERIES</h3>
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-1">Lot. 2024 / Oradea</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* TEASER / COVER VIEW */}
            <div
                onClick={() => setIsExpanded(true)}
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer group transition-all duration-700 ${isExpanded ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
            >
                {/* Horizontal Split Layout for Teaser */}
                <div className="flex flex-col md:flex-row w-full h-full">
                    {/* Left: Dark Side */}
                    <div className="w-full md:w-1/2 h-full bg-[#050a14] flex items-center justify-center md:justify-end md:pr-12 relative border-r border-white/5">
                        <div className="text-right z-10 max-w-sm px-6">
                            <h2 className="text-[12vw] md:text-8xl font-black impact-font text-white leading-[0.8] mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00F0FF] transition-all duration-500">
                                MYX.
                            </h2>
                            <p className="mono-font text-[#00F0FF] tracking-[0.3em] text-xs font-bold uppercase mb-8">
                                Nutrition Division
                            </p>
                            <div className="inline-flex items-center gap-3 text-white/40 group-hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                                Explorează Gama <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Light Side (Image or Contrast) */}
                    <div className="w-full md:w-1/2 h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors z-10"></div>
                        <img
                            src="/proteina personalizata2.jpg"
                            className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                            alt="MYX Teaser"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050a14] md:via-[#050a14]/50"></div>
                    </div>
                </div>

                {/* Center "Link" Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-black rounded-full border border-[#00F0FF] flex items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.3)] group-hover:scale-125 transition-transform duration-500 z-20">
                    <FlaskConical className="text-white group-hover:rotate-12 transition-transform duration-500" size={32} />
                </div>
            </div>

        </section>
    );
};
