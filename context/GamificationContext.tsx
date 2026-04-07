import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface GamificationState {
    xp: number;
    level: number;
    notifications: string[];
    activeMission: Mission | null;
    completedMissions: string[];
    addXP: (amount: number, reason: string) => void;
    completeMission: (missionId: string) => void;
    updateMissionStep: (missionId: string, step: number) => void;
}

interface Mission {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    totalSteps: number;
    currentStep: number;
    isCompleted: boolean;
}

const GamificationContext = createContext<GamificationState | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [notifications, setNotifications] = useState<string[]>([]);
    const [completedMissions, setCompletedMissions] = useState<string[]>([]);

    // Default Initial Mission
    const [activeMission, setActiveMission] = useState<Mission | null>({
        id: 'mission-1',
        title: 'Startul Călătoriei',
        description: 'Explorează site-ul pentru a descoperi tehnologia EMS.',
        xpReward: 100,
        totalSteps: 3,
        currentStep: 0,
        isCompleted: false
    });

    // Load from LocalStorage
    useEffect(() => {
        const savedXP = localStorage.getItem('neo_xp');
        const savedLevel = localStorage.getItem('neo_level');
        const savedMissions = localStorage.getItem('neo_completed_missions');

        if (savedXP) setXp(parseInt(savedXP));
        if (savedLevel) setLevel(parseInt(savedLevel));
        if (savedMissions) setCompletedMissions(JSON.parse(savedMissions));
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('neo_xp', xp.toString());
        localStorage.setItem('neo_level', level.toString());
        localStorage.setItem('neo_completed_missions', JSON.stringify(completedMissions));
    }, [xp, level, completedMissions]);

    const addXP = (amount: number, reason: string) => {
        setXp(prev => {
            const newXp = prev + amount;
            // Level calculation: simple formula (e.g., Level * 1000 XP needed)
            const nextLevelXp = level * 1000;
            if (newXp >= nextLevelXp) {
                setLevel(l => l + 1);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                setNotifications(prev => [...prev, `LEVEL UP! Nivelul ${level + 1}`]);
            }
            return newXp;
        });

        setNotifications(prev => [...prev, `+${amount} XP: ${reason}`]);

        // Auto-remove notification after 3 sec
        setTimeout(() => {
            setNotifications(prev => prev.slice(1));
        }, 3000);
    };

    const updateMissionStep = (missionId: string, step: number) => {
        if (activeMission && activeMission.id === missionId) {
            if (step > activeMission.currentStep) { // Only allow forward progress
                const newStep = Math.min(step, activeMission.totalSteps);
                setActiveMission(prev => prev ? { ...prev, currentStep: newStep } : null);

                // Notification for progress
                setNotifications(prev => [...prev, `Progres Misiune: ${newStep}/${activeMission.totalSteps}`]);
                setTimeout(() => {
                    setNotifications(prev => prev.slice(1));
                }, 3000);

                // Auto-complete if finished
                if (newStep >= activeMission.totalSteps) {
                    completeMission(missionId);
                }
            }
        }
    };

    const completeMission = (missionId: string) => {
        if (!completedMissions.includes(missionId)) {
            setCompletedMissions(prev => [...prev, missionId]);
            if (activeMission?.id === missionId) {
                setActiveMission(prev => prev ? { ...prev, isCompleted: true, currentStep: prev.totalSteps } : null);
                addXP(activeMission?.xpReward || 0, `Misiune Completată: ${activeMission?.title}`);
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#3A86FF', '#EF4444', '#FFD700']
                });
            }
        }
    };

    return (
        <GamificationContext.Provider value={{ xp, level, notifications, activeMission, completedMissions, addXP, completeMission, updateMissionStep }}>
            {children}
        </GamificationContext.Provider>
    );
};

export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
};
