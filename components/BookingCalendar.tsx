import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Zap, TrendingUp, MessageCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { BRAND } from '../constants';

interface LocationSchedule {
    id: 'getfit' | 'ramada';
    name: string;
    type: string;
    icon: React.ReactNode;
    description: string;
    image: string; // Add visual context
    schedule: {
        [key: number]: { start: string; end: string }[];
    };
}

const LOCATIONS: LocationSchedule[] = [
    {
        id: 'getfit',
        name: 'GetFit',
        type: 'Functional & EMS (La Cerere)',
        description: 'Locație parteneră în GetFit Gym (Lotus Center). Focus pe antrenamente funcționale și cardio pe suprafețe generoase. *EMS disponibil doar la cerere, în limita echipamentelor mobile.*',
        icon: <TrendingUp size={24} />,
        image: '/getfit.webp',
        schedule: {
            1: [{ start: '07:00', end: '10:00' }], // Mon
            2: [{ start: '16:00', end: '19:00' }], // Tue
            3: [{ start: '07:00', end: '10:00' }], // Wed
            4: [{ start: '16:00', end: '19:00' }], // Thu
            5: [{ start: '07:00', end: '10:00' }], // Fri
        },
    },
    {
        id: 'ramada',
        name: 'Ramada',
        type: 'EMS Studio',
        description: 'Studioul principal NeoBoost, în incinta Hotel Ramada (Calea Aradului). Spațiu exclusivist dedicat tehnologiei EMS Wireless, cu vestiare private și dușuri.',
        icon: <Zap size={24} />,
        image: '/ramada_ems_1.webp',
        schedule: {
            1: [{ start: '15:00', end: '20:00' }], // Mon
            2: [{ start: '07:00', end: '11:30' }], // Tue
            3: [{ start: '15:00', end: '20:00' }], // Wed
            4: [{ start: '07:00', end: '11:30' }], // Thu
            5: [{ start: '15:00', end: '20:00' }], // Fri
            6: [{ start: '09:30', end: '13:00' }], // Sat
        },
    },
];

const generateTimeSlots = (start: string, end: string): string[] => {
    const slots: string[] = [];
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
        slots.push(`${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`);
        currentMin += 30;
        if (currentMin >= 60) {
            currentMin = 0;
            currentHour += 1;
        }
    }
    return slots;
};

const getDayOfWeek = (date: Date): number => {
    const day = date.getDay();
    return day === 0 ? 7 : day;
};

const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const WEEKDAYS = ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum'];

export const BookingCalendar: React.FC<{ onClose: () => void; preselectedLocationId?: string; compact?: boolean }> = ({ onClose, preselectedLocationId, compact = false }) => {
    const [selectedLocation, setSelectedLocation] = useState<LocationSchedule>(() => {
        if (preselectedLocationId) {
            const found = LOCATIONS.find(l => l.id === preselectedLocationId);
            if (found) return found;
        }
        return LOCATIONS[0];
    });
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());


    const availableSlots = useMemo(() => {
        const dayOfWeek = getDayOfWeek(selectedDate);
        const daySchedule = selectedLocation.schedule[dayOfWeek];
        if (!daySchedule) return [];

        let slots: string[] = [];
        daySchedule.forEach(({ start, end }) => {
            slots.push(...generateTimeSlots(start, end));
        });

        // Filter out past times if selected date is today
        const now = new Date();
        if (selectedDate.toDateString() === now.toDateString()) {
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            slots = slots.filter(slot => {
                const [h, m] = slot.split(':').map(Number);
                const slotMinutes = h * 60 + m;
                return slotMinutes > currentMinutes;
            });
        }

        return slots;
    }, [selectedDate, selectedLocation]);

    const [trainingType, setTrainingType] = useState<'EMS' | 'Functional' | 'Unsure'>('EMS');

    const handleWhatsAppBooking = () => {
        if (!selectedTime) return;

        let typeText = "EMS (cu costum)";
        if (trainingType === 'Functional') typeText = "Funcțional fără costum";
        if (trainingType === 'Unsure') typeText = "Nu știu încă, vreau să mă sfătuiți voi";

        const message = `Salut!%0AVreau să programez o ședință la NeoBoost:%0A%0A*Locație:* ${selectedLocation.name}%0A*Data:* ${formatDate(selectedDate)}%0A*Ora:* ${selectedTime}%0A*Tip Antrenament:* ${typeText}`;
        const whatsappUrl = `https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    const getDaysInMonth = (date: Date): Date[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days: Date[] = [];

        const firstDayOfWeek = firstDay.getDay();
        const daysToAdd = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        for (let i = daysToAdd; i > 0; i--) {
            days.push(new Date(year, month, 1 - i));
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push(new Date(year, month + 1, i));
        }
        return days;
    };

    const daysInMonth = getDaysInMonth(currentMonth);

    const isDateAvailable = (date: Date): boolean => {
        const dayOfWeek = getDayOfWeek(date);
        return !!selectedLocation.schedule[dayOfWeek];
    };

    const isPastDate = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate < today;
    };

    const [view, setView] = useState<'date' | 'time' | 'confirm'>('date');

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime(null);
        setView('time');
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setView('confirm');
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden w-full max-w-5xl shadow-2xl shadow-black/10 flex flex-col md:flex-row max-h-[85vh] md:max-h-[800px] h-auto animate-in fade-in zoom-in duration-300">

            {/* Sidebar / Visual Context - Hidden on Mobile, Visible on Desktop */}
            {!compact && (
                <div className="hidden md:flex md:w-1/3 bg-gray-900 relative overflow-hidden flex-col justify-between p-6 border-r border-gray-800">
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src={selectedLocation.image}
                            alt={selectedLocation.name}
                            className="w-full h-full object-cover grayscale mix-blend-overlay transition-all duration-700"
                            loading="lazy"
                            decoding="async"
                            key={selectedLocation.image} // Force re-render for transition
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-display font-bold text-white mb-2 uppercase leading-none">
                            Programare
                        </h2>
                        <p className="text-[#3A86FF] mono-font text-[10px] uppercase tracking-[0.4em] font-bold">
                            {selectedLocation.name} Experience
                        </p>
                    </div>

                    <div className="relative z-10 space-y-6 mt-12 md:mt-0">
                        <div className="glass-block p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-2 text-[#3A86FF]">
                                {selectedLocation.icon}
                                <span className="font-bold uppercase tracking-wider text-sm">Locație Selectată</span>
                            </div>
                            <p className="text-white font-bold text-lg">{selectedLocation.name}</p>
                            <p className="text-white/50 text-xs">{selectedLocation.description}</p>
                        </div>

                        {selectedTime && (
                            <div className="glass-block p-4 rounded-xl border border-[#3A86FF]/30 bg-[#3A86FF]/10 backdrop-blur-md animate-in slide-in-from-bottom duration-500">
                                <div className="flex items-center gap-3 mb-2 text-white">
                                    <Clock size={18} />
                                    <span className="font-bold uppercase tracking-wider text-sm">Oră Selectată</span>
                                </div>
                                <p className="text-white font-bold text-2xl font-display tracking-wide">
                                    {formatDate(selectedDate)} <span className="text-[#3A86FF]">/</span> {selectedTime}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-white relative min-h-0 overflow-hidden">
                <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-1 min-h-0">

                    {/* Mobile Header (Visible only on Mobile) */}
                    <div className="md:hidden mb-6">
                        <h2 className="text-2xl font-display font-bold text-gray-900 uppercase leading-none">Programare</h2>
                        <p className="text-[#3A86FF] text-xs font-bold uppercase tracking-widest">{selectedLocation.name}</p>
                    </div>

                    {/* Location Tabs - Hidden in compact mode or if view is NOT date */}
                    {!compact && view === 'date' && (
                        <div className="flex bg-gray-100 p-1 rounded-xl mb-8 w-fit gap-1">
                            {LOCATIONS.map(loc => (
                                <button
                                    key={loc.id}
                                    onClick={() => { setSelectedLocation(loc); setSelectedTime(null); setView('date'); }}
                                    className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedLocation.id === loc.id ? 'bg-[#3A86FF] text-white shadow-[0_0_20px_rgba(58,134,255,0.4)]' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    {loc.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="space-y-8">
                        {/* Calendar View */}
                        {view === 'date' && (
                            <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 animate-in slide-in-from-left duration-300">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-gray-900 font-bold flex items-center gap-2">
                                        <Calendar size={18} className="text-[#3A86FF]" />
                                        <span className="uppercase tracking-wide text-sm">Selectează Data</span>
                                    </h3>
                                    <div className="flex gap-1">
                                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#3A86FF] transition-colors"><ChevronLeft size={18} /></button>
                                        <span className="min-w-[100px] text-center font-bold text-gray-900 text-sm uppercase py-2">{currentMonth.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}</span>
                                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#3A86FF] transition-colors"><ChevronRight size={18} /></button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {WEEKDAYS.map(day => <div key={day} className="text-center text-[10px] text-gray-400 font-bold uppercase py-2">{day}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                    {daysInMonth.map((date, i) => {
                                        const isAvailable = isDateAvailable(date) && !isPastDate(date);
                                        const isSelected = selectedDate.toDateString() === date.toDateString();
                                        const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => { if (isAvailable && isCurrentMonth) handleDateSelect(date); }}
                                                disabled={!isAvailable || !isCurrentMonth}
                                                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 relative group
                          ${!isCurrentMonth ? 'opacity-0 pointer-events-none' : ''}
                          ${isSelected ? 'bg-[#3A86FF] text-white shadow-[0_0_15px_rgba(58,134,255,0.5)] scale-110 z-10' :
                                                        isAvailable ? 'bg-white text-gray-800 hover:bg-blue-50 hover:border hover:border-[#3A86FF]/50 border border-gray-100' : 'text-gray-200 cursor-not-allowed'}
                        `}
                                            >
                                                {date.getDate()}
                                                {isAvailable && !isSelected && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#3A86FF] opacity-50"></div>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Time Slots View */}
                        {view === 'time' && (
                            <div className="animate-in slide-in-from-right duration-300">
                                <button
                                    onClick={() => setView('date')}
                                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-6 text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    <ChevronLeft size={16} /> Înapoi la Calendar
                                </button>

                                <h3 className="text-gray-900 font-bold flex items-center gap-2 mb-4">
                                    <Clock size={18} className="text-[#3A86FF]" />
                                    <span className="uppercase tracking-wide text-sm">Intervale pentru {formatDate(selectedDate)}</span>
                                    <span className="text-xs text-gray-400 font-normal normal-case ml-auto">{availableSlots.length > 0 ? `${availableSlots.length} locuri` : 'Niciun loc liber'}</span>
                                </h3>

                                {availableSlots.length > 0 ? (
                                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                                        {availableSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => handleTimeSelect(time)}
                                                className={`py-3 rounded-lg text-xs font-bold transition-all duration-200 border ${selectedTime === time
                                                    ? 'bg-[#3A86FF] border-[#3A86FF] text-white shadow-[0_0_15px_rgba(58,134,255,0.4)] scale-105'
                                                    : 'bg-white border-gray-200 text-gray-700 hover:border-[#3A86FF]/50 hover:bg-blue-50'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 border border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-sm">
                                        Nu sunt intervale disponibile pentru acestă dată.
                                    </div>
                                )}
                            </div>
                        )}


                        {/* Confirmation View */}
                        {view === 'confirm' && (
                            <div className="animate-in slide-in-from-right duration-300 flex flex-col items-center justify-start md:justify-center h-full py-8 pb-32 md:pb-8 overflow-y-auto">
                                <button
                                    onClick={() => setView('time')}
                                    className="self-start flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    <ChevronLeft size={16} /> Înapoi la Intervale
                                </button>

                                <div className="text-center space-y-4 max-w-sm w-full">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-4 md:mb-6 ring-1 ring-[#25D366]/50 shadow-[0_0_30px_rgba(37,211,102,0.2)]">
                                        <MessageCircle size={32} className="text-[#25D366] md:w-10 md:h-10" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 font-display uppercase tracking-tight">Confirmă Rezervarea</h3>
                                        <p className="text-gray-500 text-xs md:text-sm">
                                            Alege tipul de antrenament și finalizează pe WhatsApp.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 w-full text-left space-y-3">
                                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                            <span className="text-gray-400 text-xs font-bold uppercase">Data & Ora</span>
                                            <div className="text-right">
                                                <div className="text-gray-900 font-bold">{formatDate(selectedDate)}</div>
                                                <div className="text-[#3A86FF] font-black">{selectedTime}</div>
                                            </div>
                                        </div>

                                        {/* Training Type Selector */}
                                        <div className="pt-2">
                                            <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Tip Antrenament Preferat</label>
                                            <div className="grid grid-cols-1 gap-2">
                                                <button
                                                    onClick={() => setTrainingType('EMS')}
                                                    className={`w-full px-4 py-3 rounded-lg text-xs font-bold uppercase text-left flex justify-between items-center transition-all ${trainingType === 'EMS' ? 'bg-[#3A86FF] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                                                >
                                                    <span>EMS (cu costum)</span>
                                                    {trainingType === 'EMS' && <Check size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => setTrainingType('Functional')}
                                                    className={`w-full px-4 py-3 rounded-lg text-xs font-bold uppercase text-left flex justify-between items-center transition-all ${trainingType === 'Functional' ? 'bg-[#3A86FF] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                                                >
                                                    <span>Funcțional fără costum</span>
                                                    {trainingType === 'Functional' && <Check size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => setTrainingType('Unsure')}
                                                    className={`w-full px-4 py-3 rounded-lg text-xs font-bold uppercase text-left flex justify-between items-center transition-all ${trainingType === 'Unsure' ? 'bg-[#3A86FF] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                                                >
                                                    <span>Nu știu încă, vreau să mă sfătuiți voi</span>
                                                    {trainingType === 'Unsure' && <Check size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleWhatsAppBooking}
                                        className="w-full py-4 rounded-xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 transition-all duration-300 bg-[#25D366] text-black hover:brightness-110 shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:scale-105"
                                    >
                                        <MessageCircle size={20} />
                                        Trimite pe WhatsApp
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-200 bg-white flex justify-between items-center">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-900 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors">
                        Anulează
                    </button>
                </div>

            </div>
        </div>
    );
};
