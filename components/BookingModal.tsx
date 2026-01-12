import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, ChevronRight, MessageCircle } from 'lucide-react';
import { BRAND } from '../constants';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState<'date' | 'time' | 'details'>('date');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [name, setName] = useState('');

    // Generate next 14 days
    const dates = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    // Generate time slots (07:00 - 21:00)
    const timeSlots = Array.from({ length: 14 }, (_, i) => {
        const hour = i + 7;
        return `${hour < 10 ? '0' + hour : hour}:00`;
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSendRequest = () => {
        if (!selectedDate || !selectedTime) return;

        const dateStr = selectedDate.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' });

        const message = `Salut! 👋\nVreau o programare la NeoBoost.\n\n📅 Data: ${dateStr}\n⏰ Ora: ${selectedTime}\n👤 Nume: ${name || 'Nespecificat'}\n\nAștept confirmarea voastră dacă intervalul este disponibil. Mulțumesc!`;

        const url = `https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <div>
                        <h3 className="text-xl font-black impact-font uppercase text-white">Programare Rapidă</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Verificare disponibilitate</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} className="text-white/60" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className={`h-1 flex-1 rounded-full ${step === 'date' || step === 'time' || step === 'details' ? 'bg-[#3A86FF]' : 'bg-white/10'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${step === 'time' || step === 'details' ? 'bg-[#3A86FF]' : 'bg-white/10'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${step === 'details' ? 'bg-[#3A86FF]' : 'bg-white/10'}`}></div>
                    </div>

                    {step === 'date' && (
                        <div className="space-y-4">
                            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <CalendarIcon className="text-[#3A86FF]" size={20} /> Alege Data
                            </h4>
                            <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {dates.map((date, i) => {
                                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => { setSelectedDate(date); setStep('time'); }}
                                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isSelected
                                                ? 'bg-[#3A86FF] border-[#3A86FF] text-black'
                                                : 'bg-white/5 border-white/5 hover:border-[#3A86FF]/50 text-white'
                                                }`}
                                        >
                                            <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-black/60' : 'text-white/40'}`}>
                                                {date.toLocaleDateString('ro-RO', { weekday: 'short' })}
                                            </span>
                                            <span className="text-xl font-black">
                                                {date.getDate()}
                                            </span>
                                            <span className={`text-[9px] uppercase ${isSelected ? 'text-black/60' : 'text-white/30'}`}>
                                                {date.toLocaleDateString('ro-RO', { month: 'short' })}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {step === 'time' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <button onClick={() => setStep('date')} className="text-xs text-white/40 hover:text-white uppercase tracking-wider flex items-center gap-1">
                                    Draft: {selectedDate?.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })}
                                </button>
                                <h4 className="text-white font-bold text-lg flex items-center gap-2">
                                    <Clock className="text-[#3A86FF]" size={20} /> Alege Ora
                                </h4>
                            </div>

                            <div className="grid grid-cols-4 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                                {timeSlots.map((time, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setSelectedTime(time); setStep('details'); }}
                                        className={`py-3 rounded-lg border text-sm font-bold transition-all duration-300 ${selectedTime === time
                                            ? 'bg-[#3A86FF] border-[#3A86FF] text-black'
                                            : 'bg-white/5 border-white/5 hover:border-[#3A86FF]/50 text-white'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'details' && (
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white/40 text-xs uppercase tracking-widest">Data Aleasă</span>
                                    <button onClick={() => setStep('date')} className="text-[#3A86FF] text-xs font-bold">Modifică</button>
                                </div>
                                <div className="text-white font-bold text-lg">
                                    {selectedDate?.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </div>
                                <div className="w-full h-px bg-white/10 my-3"></div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white/40 text-xs uppercase tracking-widest">Ora Aleasă</span>
                                    <button onClick={() => setStep('time')} className="text-[#3A86FF] text-xs font-bold">Modifică</button>
                                </div>
                                <div className="text-white font-bold text-lg">
                                    {selectedTime}
                                </div>
                            </div>

                            <div>
                                <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Numele Tău (Opțional)</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex: Popescu Ion"
                                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#3A86FF] outline-none transition-colors"
                                />
                            </div>

                            <div className="bg-[#3A86FF]/10 border border-[#3A86FF]/20 rounded-lg p-4 flex gap-3">
                                <div className="w-5 h-5 rounded-full bg-[#3A86FF] flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-black font-bold text-xs">i</span>
                                </div>
                                <p className="text-[#3A86FF] text-xs leading-relaxed">
                                    Apăsând butonul de mai jos, vei fi redirecționat către WhatsApp pentru a trimite cererea. Îți vom confirma disponibilitatea în cel mai scurt timp.
                                </p>
                            </div>

                            <button
                                onClick={handleSendRequest}
                                className="w-full py-4 bg-[#3A86FF] text-black font-black uppercase text-sm tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(58,134,255,0.3)]"
                            >
                                TRIMITE CEREREA <MessageCircle size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
