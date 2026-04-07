
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';

export const useStripeCheckout = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async (
        priceId: string,
        priceString: string,
        title: string,
        session: Session | null,
        intervalCount: number = 1
    ) => {
        if (!priceId) {
            alert("Acest pachet nu are un link de plată configurat momentan.");
            return;
        }

        setIsLoading(true);
        try {
            const price = parseInt(priceString.replace(/\D/g, ''));
            const apiUrl = typeof window !== 'undefined' ? window.location.origin : '';

            const res = await fetch(`${apiUrl}/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: session?.user?.id,
                    priceId: priceId,
                    amount: price,
                    productName: title,
                    interval: 'month', // Programs usually billed once or monthly, defaulting to month logic for now or 'one_time' if needed. 
                    // However, existing logic seems to handle subscriptions. 
                    // If these are one-off programs, we might need a different mode, but let's stick to the existing "month" logic for consistency with the backend server unless we change it.
                    intervalCount: intervalCount
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server status ${res.status}: ${errorText.substring(0, 50)}`);
            }

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(`Eroare Stripe: ${data.error || 'Serverul nu a returnat un URL valid.'}`);
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            const msg = err.message || 'Verifică conexiunea la internet.';
            alert(`Eroare conexiune: ${msg}`);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleCheckout, isLoading };
};
