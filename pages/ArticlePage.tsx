import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MoveUpRight, Activity, Target, Share2, Facebook, MessageCircle, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { BENEFIT_ARTICLES } from '../constants';
import { SEO } from '../components/SEO';
import { HabitLoopAnimation } from '../components/ui/HabitLoopAnimation';
import { HiitEffectAnimation } from '../components/ui/HiitEffectAnimation';

export const ArticlePage: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);

    const article = BENEFIT_ARTICLES.find(a => a.id === articleId);

    // Get Related Articles (exclude current, take 2)
    const relatedArticles = BENEFIT_ARTICLES
        .filter(a => a.id !== articleId)
        .slice(0, 2);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [articleId]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);

            // Calculate progress
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setReadingProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = (platform: 'facebook' | 'whatsapp') => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Citește acest articol despre EMS la NeoBoost: ${article?.title}`);

        if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        } else {
            window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
        }
    };

    if (!article) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Articolul nu a fost găsit</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-[var(--accent-primary)] hover:underline"
                    >
                        Înapoi la pagina principală
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900 pb-24 md:pb-0">
            {/* SEO */}
            {article.seo && (
                <SEO
                    title={article.seo.title}
                    description={article.seo.description}
                    keywords={article.seo.keywords}
                    ogImage={article.image}
                    canonical={`/articol/${article.id}`}
                    ogType="article"
                    jsonLd={{
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": article.title,
                        "image": [
                            `https://neo-boost.com${article.image}`
                        ],
                        "author": {
                            "@type": "Organization",
                            "name": "NeoBoost EMS"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "NeoBoost",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://neo-boost.com/assets/logo.png"
                            }
                        },
                        "description": article.seo.description,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://neo-boost.com/articol/${article.id}`
                        }
                    }}
                />
            )}

            {/* Navigation Header */}
            <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/science')}
                        className={`group flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-gray-900 hover:text-brand' : 'text-white hover:text-blue-200'}`}
                    >
                        <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Înapoi la Blog
                    </button>

                    <div className="hidden md:flex items-center gap-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${scrolled ? 'text-gray-400' : 'text-white/60'}`}>Share:</span>
                        <button onClick={() => handleShare('facebook')} className="hover:text-[#1877F2] transition-colors"><Facebook size={18} /></button>
                        <button onClick={() => handleShare('whatsapp')} className="hover:text-[#25D366] transition-colors"><MessageCircle size={18} /></button>
                    </div>
                </div>
            </div>

            {/* Hero Image/Video Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-black/40 z-10"></div>

                {/* Video Cover (YouTube) */}
                {(article as any).video && ((article as any).video.includes('youtube') || (article as any).video.includes('youtu.be')) ? (
                    <>
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover absolute inset-0 z-0"
                        />
                        {/* Interactive Background Video */}
                        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                            <iframe
                                src={`https://www.youtube.com/embed/${(() => {
                                    const url = (article as any).video;
                                    if (!url) return '';
                                    if (url.includes('/shorts/')) return url.split('/shorts/')[1].split('?')[0];
                                    if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
                                    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
                                    return url.split('/').pop()?.split('?')[0];
                                })()}?autoplay=1&mute=1&loop=1&playlist=${(() => {
                                    const url = (article as any).video;
                                    if (!url) return '';
                                    if (url.includes('/shorts/')) return url.split('/shorts/')[1].split('?')[0];
                                    if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
                                    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
                                    return url.split('/').pop()?.split('?')[0];
                                })()}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${window.location.origin}`}
                                title={article.title}
                                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.35]"
                                style={{ pointerEvents: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>
                    </>
                ) : (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                )}

                <div className="absolute bottom-0 left-0 w-full z-20 pb-12 md:pb-20">
                    <div className="container mx-auto px-6 md:px-24">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="px-3 py-1 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                    Research
                                </div>
                                <div className="flex items-center gap-2 text-gray-800 font-bold uppercase tracking-widest text-xs bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                                    <Clock size={14} />
                                    <span>5 Min Read</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black font-display text-gray-900 uppercase leading-none mb-6" style={{ textShadow: '0 2px 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8), 0 4px 25px rgba(255,255,255,0.6)' }}>
                                {article.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-brand-dark font-medium border-l-4 border-brand pl-6 italic bg-white/80 backdrop-blur-md py-3 pr-5 rounded-r-xl shadow-sm">
                                "{article.subtitle}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-6 md:px-24 max-w-5xl mt-0 md:-mt-10 relative z-30">
                <div className="grid md:grid-cols-[1fr_300px] gap-16">

                    {/* Article Body */}
                    <article className="space-y-16">
                        {/* Intro Drop Cap */}
                        <div className="prose prose-lg prose-gray max-w-none">
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-normal first-letter:text-6xl first-letter:font-black first-letter:text-brand first-letter:mr-4 first-letter:float-left">
                                {article.intro}
                            </p>
                        </div>

                        {/* Infographic Insertion */}
                        {(article as any).infographic && (
                            <div className="my-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                                <img
                                    src={(article as any).infographic}
                                    alt={`${article.title} Infographic`}
                                    className="w-full h-auto"
                                />
                            </div>
                        )}

                        {/* Habit Loop Animation (New Feature) */}
                        {(article as any).habitLoop && (
                            <HabitLoopAnimation data={(article as any).habitLoop} />
                        )}

                        {/* HIIT Effect Animation (New Feature) */}
                        {(article as any).hiitEffect && (
                            <HiitEffectAnimation data={(article as any).hiitEffect} />
                        )}


                        {/* Myths / Mechanisms Cards */}
                        <div className="grid gap-6">
                            {article.mechanisms.map((mech, idx) => (
                                <div key={idx} className="group relative bg-white border border-gray-200 p-8 rounded-2xl hover:border-brand-light hover:bg-blue-50/30 transition-all hover:translate-x-2 shadow-sm hover:shadow-md">
                                    <div className="absolute top-8 left-0 w-1.5 h-12 bg-brand rounded-r-full"></div>
                                    <h3 className="text-xl font-display font-bold text-gray-900 uppercase mb-3 pl-4 flex items-center gap-3">
                                        {mech.title}
                                    </h3>
                                    <p className="text-gray-600 pl-4 leading-relaxed">{mech.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Science Deep Dive Box */}
                        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 p-32 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-10 md:gap-12">
                                <div>
                                    <div className="flex items-center gap-3 mb-4 text-brand-dark">
                                        <Activity size={22} />
                                        <h4 className="font-black uppercase tracking-widest text-sm">Știința din Spate</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-7">
                                        {article.science}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-4 text-brand-dark">
                                        <Target size={22} />
                                        <h4 className="font-black uppercase tracking-widest text-sm">Ce să te aștepți</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-7">
                                        {article.expectations}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Share (Desktop inline) */}
                        <div className="py-8 border-y border-gray-100 flex items-center justify-between">
                            <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">Ți-a plăcut articolul?</span>
                            <div className="flex gap-4">
                                <button onClick={() => handleShare('facebook')} className="flex items-center gap-2 px-4 py-2 bg-[#1877F2]/10 text-[#1877F2] rounded-lg hover:bg-[#1877F2] hover:text-white transition-all text-xs font-bold uppercase">
                                    <Facebook size={16} /> Share
                                </button>
                                <button onClick={() => handleShare('whatsapp')} className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-all text-xs font-bold uppercase">
                                    <MessageCircle size={16} /> WhatsApp
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar / Related Articles */}
                    <aside className="space-y-12">
                        {/* Sticky CTA Box Desktop */}
                        <div className="sticky top-32 p-6 bg-gray-50 border border-gray-100 rounded-2xl text-center hidden md:block shadow-sm">
                            <h3 className="text-xl font-black font-display text-gray-900 uppercase mb-4">Vrei rezultate reale?</h3>
                            <p className="text-gray-600 text-sm mb-6">Programează o ședință de încercare gratuită și simte diferența NeoBoost.</p>
                            <button onClick={() => navigate('/oferta-speciala')} className="w-full py-4 bg-brand text-white font-black uppercase text-xs tracking-widest hover:bg-brand-dark transition-colors rounded-lg shadow-lg shadow-brand/20">
                                Rezervă Test Gratuit
                            </button>
                        </div>

                        {/* Related Articles */}
                        <div>
                            <h4 className="text-gray-900 font-bold uppercase tracking-widest text-xs mb-6 border-b border-gray-100 pb-2">Citește și...</h4>
                            <div className="space-y-6">
                                {relatedArticles.map((rel, i) => (
                                    <Link key={i} to={`/articol/${rel.id}`} className="block group">
                                        <div className="aspect-video rounded-lg overflow-hidden mb-3 border border-gray-100 shadow-sm">
                                            <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <h5 className="text-gray-900 font-bold uppercase text-sm leading-tight group-hover:text-brand transition-colors mb-1">{rel.title}</h5>
                                        <p className="text-gray-500 text-[11px] uppercase tracking-wider">{rel.subtitle}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-xl border-t border-gray-100 md:hidden z-50 flex items-center justify-between gap-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="text-gray-900 text-xs">
                    <p className="font-bold uppercase">Te-a convins știința?</p>
                    <p className="text-brand text-[10px]">Încearcă gratuit o ședință.</p>
                </div>
                <button onClick={() => navigate('/oferta-speciala')} className="px-6 py-3 bg-brand text-white font-bold uppercase text-xs rounded shadow-lg shadow-brand/30">
                    Rezervă Acum
                </button>
            </div>
        </div>
    );
};

