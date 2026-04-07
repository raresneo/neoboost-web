/**
 * Utility to capture and store UTM parameters in localStorage
 */

export interface UTMParams {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    term: string | null;
    content: string | null;
}

const STORAGE_KEY = 'neoboost_utm_v1';

export const captureUTMParameters = () => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const utm: Partial<UTMParams> = {};

    const source = urlParams.get('utm_source');
    const medium = urlParams.get('utm_medium');
    const campaign = urlParams.get('utm_campaign');
    const term = urlParams.get('utm_term');
    const content = urlParams.get('utm_content');

    // Only store if we have at least a source
    if (source) {
        utm.source = source;
        utm.medium = medium;
        utm.campaign = campaign;
        utm.term = term;
        utm.content = content;

        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            ...utm,
            timestamp: new Date().toISOString()
        }));
    }
};

export const getStoredUTMParameters = (): UTMParams => {
    if (typeof window === 'undefined') return { source: null, medium: null, campaign: null, term: null, content: null };

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { source: null, medium: null, campaign: null, term: null, content: null };

    try {
        const data = JSON.parse(stored);
        // Optional: check if UTM is older than 30 days
        const timestamp = new Date(data.timestamp).getTime();
        const thirtyDaysAgo = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);

        if (timestamp < thirtyDaysAgo) {
            localStorage.removeItem(STORAGE_KEY);
            return { source: null, medium: null, campaign: null, term: null, content: null };
        }

        return data;
    } catch (e) {
        return { source: null, medium: null, campaign: null, term: null, content: null };
    }
};
