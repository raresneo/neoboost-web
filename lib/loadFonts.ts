/**
 * Încarcă fonturile sistemului vizual nou (Space Grotesk + Azeret Mono).
 * Le adaug din JS ca să nu ating index.html (modificat și în PR #6).
 */
const HREF =
    'https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap';

if (typeof document !== 'undefined' && !document.querySelector(`link[href="${HREF}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = HREF;
    document.head.appendChild(link);
}

export {};
