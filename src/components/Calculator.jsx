import React, { useState } from 'react';
import { Calculator as CalcIcon, ArrowRight, Check } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Utility for combinations
const nCr = (n, r) => {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    if (r > n / 2) r = n - r;
    let res = 1;
    for (let i = 1; i <= r; i++) {
        res = res * (n - i + 1) / i;
    }
    return res;
};

export default function Calculator() {
    const [n, setN] = useState(5);
    const [p, setP] = useState(0.5);
    const [r, setR] = useState(3);
    const [showSolution, setShowSolution] = useState(false);

    const calculate = () => {
        const q = 1 - p;
        const combinations = nCr(n, r);
        const prob = combinations * Math.pow(p, r) * Math.pow(q, n - r);
        return {
            q,
            combinations,
            prob,
            mean: n * p,
            variance: n * p * q
        };
    };

    const result = calculate();

    return (
        <div className="p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">1</div>
                            Define Parameters
                        </h3>
                        <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Number of Trials (n)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={n}
                                    onChange={(e) => setN(parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Probability of Success (p)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={p}
                                    onChange={(e) => setP(parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Target Successes (r)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max={n}
                                    value={r}
                                    onChange={(e) => setR(parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowSolution(true)}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center"
                    >
                        <CalcIcon className="w-5 h-5 mr-2" />
                        Calculate Probability
                    </button>
                </div>

                <div className="relative min-h-[300px]">
                    {!showSolution ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
                            <div className="text-center">
                                <CalcIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>Enter parameters and click Calculate</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    Solution Breakdown
                                </h3>

                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                                        <p className="font-medium text-slate-700">Formula</p>
                                        <div className="mt-2 text-slate-900 overflow-x-auto max-w-full">
                                            <BlockMath math="P(X=r) = \binom{n}{r} p^r (1-p)^{n-r}" />
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        <div className="flex items-start">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm font-bold mr-4">1</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-slate-900">Identify Parameters</p>
                                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                                        <span className="text-slate-500 block text-xs">n (trials)</span>
                                                        <span className="font-mono font-semibold">{n}</span>
                                                    </div>
                                                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                                        <span className="text-slate-500 block text-xs">p (success)</span>
                                                        <span className="font-mono font-semibold">{p}</span>
                                                    </div>
                                                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                                        <span className="text-slate-500 block text-xs">q (failure)</span>
                                                        <span className="font-mono font-semibold">{result.q.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm font-bold mr-4">2</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-slate-900">Calculate Combinations</p>
                                                <p className="text-sm text-slate-600 mt-1">Number of ways to choose {r} successes from {n} trials.</p>
                                                <div className="mt-2 text-slate-900">
                                                    <InlineMath math={`\\binom{${n}}{${r}} = ${result.combinations}`} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm font-bold mr-4">3</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-slate-900">Compute Probability</p>
                                                <div className="mt-2 text-slate-900 overflow-x-auto max-w-full">
                                                    <BlockMath math={`P(X=${r}) = ${result.combinations} \\times (${p})^{${r}} \\times (${result.q.toFixed(2)})^{${n - r}}`} />
                                                    <div className="flex flex-col sm:flex-row items-center justify-center mt-4 text-2xl font-bold text-indigo-600">
                                                        <ArrowRight className="w-6 h-6 mb-2 sm:mb-0 sm:mr-3 text-slate-300 transform rotate-90 sm:rotate-0" />
                                                        <span>{result.prob.toFixed(4)}</span>
                                                        <span className="text-sm font-normal text-slate-500 mt-1 sm:mt-0 sm:ml-3">({(result.prob * 100).toFixed(2)}%)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
