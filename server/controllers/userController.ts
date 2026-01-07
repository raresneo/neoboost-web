import { Request, Response } from 'express';
import { supabaseAdmin } from '../lib/clients';

export const getUserProfile = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const { data, error } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMembershipStatus = async (req: Request, res: Response) => {
    const { userId, status, endDate } = req.body;

    try {
        const { data, error } = await supabaseAdmin
            .from('profiles')
            .update({
                subscription_status: status,
                subscription_end_date: endDate
            })
            .eq('id', userId);

        if (error) throw error;
        res.json({ message: 'Status actualizat cu succes', data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
