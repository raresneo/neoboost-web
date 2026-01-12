import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { ProgramLandingPage } from './pages/programs/ProgramLandingPage';
import { SpecialOfferPage } from './pages/SpecialOfferPage';
import { captureUTMParameters } from './lib/utm';

export const AppRouter: React.FC = () => {
    useEffect(() => {
        captureUTMParameters();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/program/:programId" element={<ProgramLandingPage />} />
                <Route path="/oferta-speciala" element={<SpecialOfferPage />} />
            </Routes>
        </BrowserRouter>
    );
};
