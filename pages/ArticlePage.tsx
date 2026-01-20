import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoveUpRight, Activity, Target } from 'lucide-react';
import { BENEFIT_ARTICLES } from '../constants';
import { SEO } from '../components/SEO';

export const ArticlePage: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const navigate = useNavigate();

    const article = BENEFIT_ARTICLES.find(a => a.id === articleId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [articleId]);

    if (!article) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Articolul nu a fost găsit</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-[#3A86FF] hover:underline"
                    >
                        Înapoi la pagina principală
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#3A86FF] selection:text-black">
            {/* SEO */}
            {article.seo && (
                <SEO
                    title={article.seo.title}
                    description={article.seo.description}
                    keywords={article.seo.keywords}
                    image={article.image}
                    url={`/articol/${article.id}`}
                    type="article"
                />
            )}

            {/* Fixed Navigation Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-[#3A86FF]/20 px-6 py-4 flex items-center justify-between shadow-[0_0_30px_rgba(0,245,255,0.1)]">
                <button
                    onClick={() => navigate('/')}
                    className="relative overflow-hidden flex items-center gap-3 text-[#3A86FF] hover:text-black bg-transparent hover:bg-[#3A86FF] transition-all px-6 py-3 rounded-lg border border-[#3A86FF]/30 hover:border-[#3A86FF] text-xs font-black uppercase tracking-[0.2em] group shadow-[0_0_15px_rgba(58,134,255,0.1)] hover:shadow-[0_0_30px_rgba(58,134,255,0.4)]"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <MoveUpRight size={16} className="rotate-[225deg] group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                        ÎNAPOI LA SITE
                    </span>
                </button>
                <div className="mono-font text-[#3A86FF]/60 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase hidden sm:block">
                    NEOBOOST / RESEARCH / {article.title}
                </div>
            </div>

            {/* Article Content */}
            <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
                {article.image && (
                    <div className="mb-12 overflow-hidden rounded-2xl border border-white/10 relative group h-[400px] w-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <h1 className="text-4xl md:text-6xl font-black impact-font text-white uppercase mb-2 shadow-sm">{article.title}</h1>
                            <p className="text-[#3A86FF] mono-font text-sm font-bold tracking-widest uppercase">{article.subtitle}</p>
                        </div>
                    </div>
                )}

                {!article.image && (
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-6xl font-black impact-font text-white uppercase mb-4">{article.title}</h1>
                        <p className="text-[#3A86FF] mono-font text-sm font-bold tracking-widest uppercase">{article.subtitle}</p>
                    </div>
                )}


                <div className="space-y-12">
                    <p className="text-xl text-white/80 leading-relaxed font-light first-letter:text-5xl first-letter:font-black first-letter:text-[#3A86FF] first-letter:mr-3 first-letter:float-left">
                        {article.intro}
                    </p>

                    {/* Mechanisms */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {article.mechanisms.map((mech, mIdx) => (
                            <div key={mIdx} className="bg-white/[0.02] border border-white/5 p-6 hover:border-[#3A86FF]/20 transition-colors duration-500 rounded-lg">
                                <h4 className="text-white font-bold impact-font uppercase mb-3 text-lg text-[#3A86FF]">{mech.title}</h4>
                                <p className="text-white/60 text-sm leading-relaxed">{mech.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Science & Expectations */}
                    <div className="grid md:grid-cols-2 gap-8 bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Activity size={20} className="text-[#3A86FF]" />
                                <h4 className="font-bold text-white uppercase text-sm tracking-wider">Ce spune știința</h4>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed pl-7 border-l-2 border-[#3A86FF]/20">
                                {article.science}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Target size={20} className="text-[#3A86FF]" />
                                <h4 className="font-bold text-white uppercase text-sm tracking-wider">Așteptări Corecte</h4>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed pl-7 border-l-2 border-[#3A86FF]/20">
                                {article.expectations}
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-[#3A86FF] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        <div className="relative z-10">
                            <h3 className="text-black text-3xl font-black impact-font uppercase mb-4">Vrei să testezi metoda NeoBoost?</h3>
                            <button
                                onClick={() => navigate('/oferta-speciala')}
                                className="bg-black text-white px-8 py-3 rounded-lg font-black uppercase text-sm hover:scale-105 transition-transform"
                            >
                                Vezi Oferta Specială
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
