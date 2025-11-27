import React from 'react';
import Quiz from '../components/Quiz';

export default function QuizPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Knowledge Check</h1>
                <p className="text-xl text-slate-600">
                    Test your understanding of Bernoulli and Binomial distributions.
                </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <Quiz />
            </div>
        </div>
    );
}
