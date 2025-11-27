import React from 'react';
import NormalApproximation from '../components/NormalApproximation';

export default function NormalApproximationPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Normal Approximation</h1>
                <p className="text-xl text-slate-600">
                    Visualize how the Binomial distribution approaches the Normal distribution as the sample size increases (Central Limit Theorem).
                </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <NormalApproximation />
            </div>
        </div>
    );
}
