import React from 'react';
import { Section, Heading, PrimaryCta, WhatsappCta } from './index';
import { PricingPlans } from './PricingPlans';
import { SESSION_MINUTES } from '../../lib/gymosPlans';

/**
 * Secțiunea de abonamente lunare de pe homepage.
 *
 * Aceeași sursă de date ca pagina /preturi: lib/gymosPlans.ts, oglindit din
 * GymOS. Înainte, homepage-ul citea MONTHLY_PACKAGES din constants.tsx, iar
 * pagina de prețuri citea catalogul GymOS, deci prețurile puteau să divergă.
 */
export const PricingSection: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => (
    <Section id="programe" tint>
        <Heading
            eyebrow="Abonamente"
            title={<>Alege ritmul<br />și formatul tău</>}
            sub={`Ședința durează ${SESSION_MINUTES} de minute. Alegi între grup mic, de maximum 2 persoane, sau Exclusive, cu toată sala doar pentru tine. Prima ședință e gratuită, fără card și fără obligații.`}
        />

        <PricingPlans />

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryCta onClick={onOpenBooking}>Rezervă ședința gratuită</PrimaryCta>
            <WhatsappCta text="Salut! Vreau să aflu dacă mi se potrivește Standard sau Exclusive.">
                Întreabă un antrenor
            </WhatsappCta>
        </div>
    </Section>
);
