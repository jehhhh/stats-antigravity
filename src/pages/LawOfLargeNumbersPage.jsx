import React from 'react';
import LawOfLargeNumbers from '../components/LawOfLargeNumbers';

export default function LawOfLargeNumbersPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Law of Large Numbers</h1>
                <p className="text-xl text-slate-600">
                    See how the observed proportion of successes converges to the theoretical probability as the number of trials increases.
                </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <LawOfLargeNumbers />
            </div>
        </div>
    );
}
