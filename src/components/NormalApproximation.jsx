import React, { useState, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Info } from 'lucide-react';

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

// Normal PDF function
const normalPDF = (x, mean, stdDev) => {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
};

export default function NormalApproximation() {
    const [n, setN] = useState(10);
    const [p, setP] = useState(0.5);

    const { data, mean, stdDev } = useMemo(() => {
        const m = n * p;
        const s = Math.sqrt(n * p * (1 - p));
        const points = [];

        // Generate binomial data and normal curve points
        // We'll generate points for the whole range 0 to n
        for (let r = 0; r <= n; r++) {
            const binomProb = nCr(n, r) * Math.pow(p, r) * Math.pow(1 - p, n - r);
            // For normal curve, we want it to match the scale. 
            // Since Binomial is discrete (prob at integer), and Normal is continuous (density),
            // we can just plot the density at the integer points for visual comparison.
            // Or better, plot the normal density curve.
            const normDensity = normalPDF(r, m, s);

            points.push({
                x: r,
                binomial: binomProb,
                normal: normDensity
            });
        }
        return { data: points, mean: m, stdDev: s };
    }, [n, p]);

    const isApproximationGood = useMemo(() => {
        return n * p >= 10 && n * (1 - p) >= 10;
    }, [n, p]);

    return (
        <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Controls */}
                <div className="w-full lg:w-1/3 space-y-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Parameters</h3>

                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-slate-700">Number of Trials (n)</label>
                                <span className="font-mono text-indigo-600">{n}</span>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="100"
                                step="1"
                                value={n}
                                onChange={(e) => setN(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>

                        <div className="mb-2">
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-slate-700">Probability (p)</label>
                                <span className="font-mono text-indigo-600">{p}</span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="0.9"
                                step="0.05"
                                value={p}
                                onChange={(e) => setP(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isApproximationGood ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                        <h4 className={`font-bold mb-2 ${isApproximationGood ? 'text-green-800' : 'text-amber-800'}`}>
                            Approximation Check
                        </h4>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>np = {(n * p).toFixed(1)}</span>
                                <span>{n * p >= 10 ? '✅ ≥ 10' : '❌ < 10'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>n(1-p) = {(n * (1 - p)).toFixed(1)}</span>
                                <span>{n * (1 - p) >= 10 ? '✅ ≥ 10' : '❌ < 10'}</span>
                            </div>
                        </div>
                        <p className="text-xs mt-3 opacity-80">
                            {isApproximationGood
                                ? "Conditions met! The Normal distribution is a good approximation."
                                : "Conditions not met. The Normal distribution may not be accurate."}
                        </p>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <h4 className="text-sm font-semibold text-indigo-900 mb-3 flex items-center">
                            <Info className="w-4 h-4 mr-2" />
                            Normal Parameters
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-indigo-600 uppercase tracking-wider font-semibold">Mean (μ)</div>
                                <div className="text-xl font-mono text-indigo-900">{mean.toFixed(2)}</div>
                            </div>
                            <div>
                                <div className="text-xs text-indigo-600 uppercase tracking-wider font-semibold">Std Dev (σ)</div>
                                <div className="text-xl font-mono text-indigo-900">{stdDev.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Graph */}
                <div className="w-full lg:w-2/3 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                label={{ value: 'Number of Successes', position: 'bottom', offset: 0 }}
                                tick={{ fill: '#64748b' }}
                            />
                            <YAxis
                                label={{ value: 'Probability / Density', angle: -90, position: 'insideLeft' }}
                                tick={{ fill: '#64748b' }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value, name) => [value.toFixed(4), name === 'binomial' ? 'Binomial Prob' : 'Normal Density']}
                            />
                            <Bar dataKey="binomial" fill="#94a3b8" barSize={20} opacity={0.6} name="binomial" />
                            <Line
                                type="monotone"
                                dataKey="normal"
                                stroke="#4f46e5"
                                strokeWidth={3}
                                dot={false}
                                name="normal"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                    <p className="text-center text-sm text-slate-500 mt-2">
                        Grey bars: Binomial Probability Mass Function<br />
                        Blue line: Normal Probability Density Function N({mean.toFixed(1)}, {stdDev.toFixed(2)})
                    </p>
                </div>
            </div>
        </div>
    );
}
