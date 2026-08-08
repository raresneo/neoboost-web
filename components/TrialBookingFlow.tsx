import React, { useEffect, useMemo, useState } from 'react';
import {
    Calendar, Clock, MapPin, MessageCircle, Check, ChevronLeft, Loader2, AlertCircle,
} from 'lucide-react';
import { BRAND } from '../constants';
import {
    fetchAvailableSlots, groupSlotsByDay, formatSlotTime, formatSlotDate,
    isGymosConfigured, TRIAL_SESSION_TYPES, type GymosSlot,
} from '../lib/gymos';

/**
 * Fluxul de rezervare a ședinței de probă.
 *
 * Diferența față de vechiul BookingCalendar: orele afișate sunt cele reale din
 * GymOS, iar rezervarea se scrie efectiv în sistem. Înainte, orarul era
 * hardcodat în componentă și butonul doar deschidea WhatsApp, deci se putea
 * promite un interval deja ocupat.
 *
 * Trei pași: alegi ziua, alegi ora, lași datele de contact.
 */

type Step = 'day' | 'time' | 'details' | 'done';
type TrainingType = 'EMS' | 'Functional' | 'Unsure';

const TRAINING_LABELS: Record<TrainingType, string> = {
    EMS: 'EMS, cu costum',
    Functional: 'Funcțional, fără costum',
    Unsure: 'Nu știu încă, vreau să mă sfătuiți',
};

const waFallback = (text: string) =>
    `https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=${encodeURIComponent(text)}`;

/**
 * Păstrăm sloturile de tipul pe care îl vindem ca probă. Un slot fără
 * `session_type` rămâne în listă, ca să nu ascundem intervale valide doar
 * pentru că nu au fost etichetate în GymOS.
 */
const isTrialSlot = (slot: GymosSlot) =>
    !slot.session_type || TRIAL_SESSION_TYPES.includes(slot.session_type);

export const TrialBookingFlow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState<Step>('day');
    const [slots, setSlots] = useState<GymosSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadFailed, setLoadFailed] = useState(false);

    const [dayKey, setDayKey] = useState<string | null>(null);
    const [slot, setSlot] = useState<GymosSlot | null>(null);
    const [trainingType, setTrainingType] = useState<TrainingType>('EMS');

    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', notes: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            if (!isGymosConfigured()) {
                setLoadFailed(true);
                setLoading(false);
                return;
            }
            const { slots: fetched } = await fetchAvailableSlots(21);
            if (!alive) return;
            const relevant = fetched.filter(isTrialSlot);
            setSlots(relevant);
            setLoadFailed(relevant.length === 0);
            setLoading(false);
        })();
        return () => { alive = false; };
    }, []);

    const byDay = useMemo(() => groupSlotsByDay(slots), [slots]);
    const days = useMemo(() => Array.from(byDay.keys()).sort(), [byDay]);
    const daySlots = dayKey ? (byDay.get(dayKey) ?? []) : [];

    const canSubmit =
        !!slot && form.firstName.trim().length > 1 && form.phone.trim().length > 6 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

    const submit = async () => {
        if (!slot || !canSubmit) return;
        setSubmitting(true);
        setError(null);
        try {
            const res = await fetch('/api/trial-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slotId: slot.id,
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    notes: form.notes.trim(),
                    trainingType: TRAINING_LABELS[trainingType],
                    startsAt: slot.starts_at,
                    endsAt: slot.ends_at,
                    location: slot.location,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || data?.error) {
                setError(data?.error || 'Rezervarea nu a putut fi finalizată.');
                setSubmitting(false);
                return;
            }
            setStep('done');
        } catch {
            setError('Conexiune întreruptă. Încearcă din nou sau scrie-ne pe WhatsApp.');
        }
        setSubmitting(false);
    };

    /* ---------------------------------------------------------------- */

    const BackButton = ({ to, label }: { to: Step; label: string }) => (
        <button
            onClick={() => { setStep(to); setError(null); }}
            className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-900"
        >
            <ChevronLeft size={15} /> {label}
        </button>
    );

    return (
        <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-black/10">
            <div className="border-b border-gray-200 px-6 py-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#3A86FF]">
                    Ședință de probă gratuită
                </p>
                <h2 className="mt-1 font-display text-2xl font-black uppercase leading-none text-gray-900">
                    {step === 'done' ? 'Rezervare confirmată' : 'Alege când vii'}
                </h2>
                {step !== 'done' && (
                    <p className="mt-2 text-xs text-gray-500">
                        Orele afișate sunt cele libere în acest moment. 30 de minute, echipamentul e al nostru.
                    </p>
                )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* Încărcare */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <Loader2 size={28} className="animate-spin text-[#3A86FF]" />
                        <p className="mt-3 text-sm">Se încarcă intervalele libere…</p>
                    </div>
                )}

                {/* Fallback: fără sloturi sau fără configurare */}
                {!loading && loadFailed && (
                    <div className="py-10 text-center">
                        <AlertCircle size={32} className="mx-auto text-amber-500" />
                        <h3 className="mt-4 font-display text-lg font-bold text-gray-900">
                            Nu putem afișa orarul chiar acum
                        </h3>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                            Scrie-ne pe WhatsApp și îți dăm intervalele libere în câteva minute.
                        </p>
                        <a
                            href={waFallback('Salut! Vreau să programez ședința de probă gratuită la NeoBoost.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-105"
                        >
                            <MessageCircle size={17} /> Scrie pe WhatsApp
                        </a>
                    </div>
                )}

                {/* Pas 1: ziua */}
                {!loading && !loadFailed && step === 'day' && (
                    <div>
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-900">
                            <Calendar size={17} className="text-[#3A86FF]" /> Zile cu locuri libere
                        </h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {days.map((key) => {
                                const bucket = byDay.get(key)!;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => { setDayKey(key); setStep('time'); }}
                                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-left transition-all hover:border-[#3A86FF] hover:bg-blue-50/50"
                                    >
                                        <span className="text-sm font-bold capitalize text-gray-900">
                                            {formatSlotDate(bucket[0].starts_at)}
                                        </span>
                                        <span className="text-xs font-semibold text-[#3A86FF]">
                                            {bucket.length} {bucket.length === 1 ? 'interval' : 'intervale'}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Pas 2: ora */}
                {!loading && step === 'time' && (
                    <div>
                        <BackButton to="day" label="Alege altă zi" />
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-900">
                            <Clock size={17} className="text-[#3A86FF]" />
                            <span className="capitalize">{daySlots[0] ? formatSlotDate(daySlots[0].starts_at) : ''}</span>
                        </h3>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {daySlots.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => { setSlot(s); setStep('details'); }}
                                    className="rounded-xl border border-gray-200 bg-white py-3 text-sm font-bold text-gray-800 transition-all hover:border-[#3A86FF] hover:bg-blue-50"
                                >
                                    {formatSlotTime(s.starts_at)}
                                </button>
                            ))}
                        </div>
                        {daySlots[0]?.location && (
                            <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-gray-500">
                                <MapPin size={13} className="text-[#3A86FF]" /> {daySlots[0].location}
                            </p>
                        )}
                    </div>
                )}

                {/* Pas 3: datele de contact */}
                {!loading && step === 'details' && slot && (
                    <div>
                        <BackButton to="time" label="Alege altă oră" />

                        <div className="mb-6 rounded-xl border border-[#3A86FF]/30 bg-blue-50/60 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Intervalul ales</p>
                            <p className="mt-1 font-display text-lg font-black capitalize text-gray-900">
                                {formatSlotDate(slot.starts_at)}, {formatSlotTime(slot.starts_at)}
                            </p>
                            {slot.location && (
                                <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-gray-600">
                                    <MapPin size={13} /> {slot.location}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <input
                                value={form.firstName}
                                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                                placeholder="Prenume *"
                                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#3A86FF]"
                            />
                            <input
                                value={form.lastName}
                                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                                placeholder="Nume"
                                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#3A86FF]"
                            />
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                placeholder="Telefon (WhatsApp) *"
                                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#3A86FF]"
                            />
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                placeholder="Email *"
                                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#3A86FF]"
                            />
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                                Ce vrei să încerci
                            </label>
                            <div className="grid gap-2">
                                {(Object.keys(TRAINING_LABELS) as TrainingType[]).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setTrainingType(type)}
                                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-xs font-bold uppercase transition-all ${
                                            trainingType === type
                                                ? 'bg-[#3A86FF] text-white'
                                                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {TRAINING_LABELS[type]}
                                        {trainingType === type && <Check size={15} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea
                            value={form.notes}
                            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                            placeholder="Ceva ce ar trebui să știm? Obiectiv, accidentări, întrebări (opțional)"
                            rows={2}
                            className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#3A86FF]"
                        />

                        {error && (
                            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            onClick={submit}
                            disabled={!canSubmit || submitting}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3A86FF] py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                            {submitting ? 'Se rezervă…' : 'Confirmă rezervarea'}
                        </button>

                        <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-400">
                            Prin confirmare, intervalul se blochează pe numele tău și primești mesaj
                            de confirmare pe WhatsApp.
                        </p>
                    </div>
                )}

                {/* Final */}
                {step === 'done' && slot && (
                    <div className="py-8 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <Check size={32} className="text-green-600" />
                        </div>
                        <h3 className="mt-5 font-display text-xl font-black uppercase text-gray-900">
                            Te-am trecut în program
                        </h3>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
                            <span className="font-bold capitalize">
                                {formatSlotDate(slot.starts_at)}, {formatSlotTime(slot.starts_at)}
                            </span>
                            {slot.location ? `, la ${slot.location}` : ''}. Primești confirmarea pe WhatsApp,
                            iar un antrenor îți scrie înainte de ședință.
                        </p>
                        <p className="mx-auto mt-4 max-w-sm text-xs text-gray-500">
                            Vino cu adidași și o sticlă de apă. Costumul EMS e al nostru.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-7 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-700"
                        >
                            Închide
                        </button>
                    </div>
                )}
            </div>

            {step !== 'done' && (
                <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-900"
                    >
                        Anulează
                    </button>
                    <a
                        href={waFallback('Salut! Am o întrebare despre ședința de probă.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 transition-colors hover:text-[#1ebe57]"
                    >
                        <MessageCircle size={14} className="text-[#25D366]" /> Prefer WhatsApp
                    </a>
                </div>
            )}
        </div>
    );
};
