import React from 'react';

/**
 * Sunetul ambient a fost scos (5 oct 2026): enerva pe mobil și descărca 3.6MB degeaba.
 * Componenta rămâne ca no-op ca să nu rup importul din Layout. Butoanele de sunet
 * din Navbar sunt ascunse din styles/cinematic.css.
 */
export const AmbientAudio: React.FC<{ isMuted: boolean }> = () => null;
