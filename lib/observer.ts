export const observerCallbacks = new Map<Element, (entry: IntersectionObserverEntry) => void>();

export const sharedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const cb = observerCallbacks.get(entry.target);
        if (cb) cb(entry);
    });
}, { threshold: 0.1, rootMargin: '50px' });
