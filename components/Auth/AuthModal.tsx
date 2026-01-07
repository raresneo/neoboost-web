import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Mail, Lock, Loader2, User } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSocialLogin = async (provider: 'google') => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                onClose();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
                    },
                });
                if (error) throw error;
                alert('Cont creat! Verifică email-ul pentru confirmare.');
                setIsLogin(true);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal with Glassmorphism */}
            <div className="relative w-full max-w-md bg-zinc-900/90 border border-white/10 p-8 rounded-2xl shadow-2xl overflow-hidden glass-modal">
                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF88]/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00FF88]/5 rounded-full blur-3xl -z-10" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black impact-font text-white mb-2">
                        {isLogin ? 'BINE AI VENIT' : 'ALĂTURĂ-TE'}
                    </h2>
                    <p className="text-white/60 text-sm">
                        {isLogin ? 'Intră în contul tău NeoBoost' : 'Începe transformarea ta astăzi'}
                    </p>
                </div>

                {/* Social Login */}
                <div className="space-y-3 mb-8">
                    <button
                        onClick={() => handleSocialLogin('google')}
                        disabled={loading}
                        className="w-full h-12 bg-white text-black font-bold uppercase tracking-wide rounded hover:bg-white/90 transition-colors flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continuă cu Google
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-white/10 flex-grow" />
                    <span className="text-white/30 text-xs uppercase tracking-widest text-[10px] mono-font">sau cu email</span>
                    <div className="h-px bg-white/10 flex-grow" />
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="text"
                                placeholder="Nume Complet"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required={!isLogin}
                                className="w-full h-12 bg-white/5 border border-white/10 rounded px-12 text-white placeholder:text-white/20 focus:border-[#00FF88] focus:outline-none transition-colors"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input
                            type="email"
                            placeholder="Adresa de Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full h-12 bg-white/5 border border-white/10 rounded px-12 text-white placeholder:text-white/20 focus:border-[#00FF88] focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input
                            type="password"
                            placeholder="Parola"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full h-12 bg-white/5 border border-white/10 rounded px-12 text-white placeholder:text-white/20 focus:border-[#00FF88] focus:outline-none transition-colors"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-xs text-center bg-red-500/10 py-2 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#00FF88] text-black font-black uppercase tracking-wide rounded hover:bg-[#00FF88]/90 transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Logare' : 'Înregistrare')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-white/40 hover:text-[#00FF88] text-xs uppercase tracking-wider transition-colors"
                    >
                        {isLogin ? 'Nu ai cont? Creează unul' : 'Ai deja cont? Loghează-te'}
                    </button>
                </div>
            </div>
        </div>
    );
};
