import React from 'react';
import { TriangleAlert, Shield, X } from 'lucide-react';

export const EligibilityDisclaimer: React.FC = () => {
    return (
        <div className="w-full max-w-2xl mx-auto bg-[#F8F9FB] rounded-[2rem] p-6 md:p-10 border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-50 flex items-center justify-center">
                    <TriangleAlert className="text-red-500 w-7 h-7" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase impact-font leading-tight mb-1">
                        NU ESTE PENTRU ORICINE
                    </h2>
                    <p className="text-gray-600 font-medium">
                        Când EMS nu este recomandat
                    </p>
                </div>
            </div>

            {/* Medical Section - Yellow Card */}
            <div className="bg-[#FAF6EC] border border-orange-100/60 rounded-3xl p-6 md:p-8 mb-8">
                <p className="font-bold text-slate-700 text-sm md:text-base leading-relaxed mb-6">
                    Antrenamentul EMS NU este recomandat în anumite situații medicale. Înainte să te programezi, este important să discuți cu medicul tău dacă:
                </p>

                <ul className="space-y-4">
                    {[
                        "ai stimulator cardiac (pacemaker) sau alte dispozitive electronice implantate;",
                        "ai avut recent intervenții chirurgicale majore;",
                        "ai afecțiuni cardiace grave sau tulburări severe de ritm;",
                        "ești însărcinată sau alăptezi în primele luni;",
                        "ai alte probleme medicale serioase pentru care medicul nu recomandă efort fizic."
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-3.5 bg-red-500 shrink-0 mt-1 rounded-sm"></div>
                            <span className="text-slate-600 font-medium leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mindset Section */}
            <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                    <Shield className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-600">
                        MINDSET & ATITUDINE
                    </span>
                </div>

                <div className="pl-2 border-l-2 border-slate-800 ml-4 space-y-4 py-1">
                    <div className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Cauți o <strong className="text-slate-800">"pastilă magică"</strong>. Noi oferim tehnologie, nu miracole fără efort.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Nu ești dispus(ă) să îți asumi <strong className="text-slate-800">responsabilitatea</strong> procesului.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
