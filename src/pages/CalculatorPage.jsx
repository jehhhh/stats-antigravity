import React from 'react';
import Calculator from '../components/Calculator';

export default function CalculatorPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Probability Calculator</h1>
                <p className="text-xl text-slate-600">
                    Solve Binomial probability problems with step-by-step breakdowns and explanations.
                </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <Calculator />
            </div>
        </div>
    );
}
