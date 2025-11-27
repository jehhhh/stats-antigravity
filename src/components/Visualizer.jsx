import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
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

export default function Visualizer() {
    const [mode, setMode] = useState('binomial'); // 'bernoulli' or 'binomial'
    const [p, setP] = useState(0.5);
    const [n, setN] = useState(10);

    const data = useMemo(() => {
        const points = [];
        if (mode === 'bernoulli') {
            points.push({ x: 0, prob: 1 - p, label: 'Failure (0)' });
            points.push({ x: 1, prob: p, label: 'Success (1)' });
        } else {
            for (let r = 0; r <= n; r++) {
                const prob = nCr(n, r) * Math.pow(p, r) * Math.pow(1 - p, n - r);
                points.push({ x: r, prob: prob, label: r.toString() });
            }
        }
        return points;
    }, [mode, p, n]);

    const stats = useMemo(() => {
        if (mode === 'bernoulli') {
            return {
                mean: p,
                variance: p * (1 - p)
            };
        } else {
            return {
                mean: n * p,
                variance: n * p * (1 - p)
            };
        }
    }, [mode, p, n]);

    return (
        <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Controls */}
                <div className="w-full lg:w-1/3 space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Distribution Type</label>
                        <div className="flex bg-white rounded-lg p-1 border border-slate-200">
                            <button
                                onClick={() => setMode('bernoulli')}
                                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${mode === 'bernoulli' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                Bernoulli
                            </button>
                            <button
                                onClick={() => setMode('binomial')}
                                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${mode === 'binomial' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                Binomial
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-sm font-medium text-slate-700">Probability of Success (p)</label>
                                <span className="text-sm font-mono text-indigo-600">{p.toFixed(2)}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={p}
                                onChange={(e) => setP(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>

                        {mode === 'binomial' && (
                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm font-medium text-slate-700">Number of Trials (n)</label>
                                    <span className="text-sm font-mono text-indigo-600">{n}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    step="1"
                                    value={n}
                                    onChange={(e) => setN(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <h4 className="text-sm font-semibold text-indigo-900 mb-3 flex items-center">
                            <Info className="w-4 h-4 mr-2" />
                            Statistics
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-indigo-600 uppercase tracking-wider font-semibold">Mean (μ)</div>
                                <div className="text-xl font-mono text-indigo-900">{stats.mean.toFixed(4)}</div>
                                <div className="text-xs text-indigo-400 mt-1 font-mono">
                                    {mode === 'bernoulli' ? 'p' : 'n × p'}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-indigo-600 uppercase tracking-wider font-semibold">Variance (σ²)</div>
                                <div className="text-xl font-mono text-indigo-900">{stats.variance.toFixed(4)}</div>
                                <div className="text-xs text-indigo-400 mt-1 font-mono">
                                    {mode === 'bernoulli' ? 'p(1-p)' : 'np(1-p)'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Graph */}
                <div className="w-full lg:w-2/3 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                label={{ value: mode === 'bernoulli' ? 'Outcome' : 'Number of Successes (r)', position: 'bottom', offset: 0 }}
                                tick={{ fill: '#64748b' }}
                                axisLine={{ stroke: '#cbd5e1' }}
                            />
                            <YAxis
                                label={{ value: 'Probability P(X=r)', angle: -90, position: 'insideLeft' }}
                                tick={{ fill: '#64748b' }}
                                axisLine={{ stroke: '#cbd5e1' }}
                            />
                            <Tooltip
                                cursor={{ fill: '#f1f5f9' }}
                                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value) => [value.toFixed(4), 'Probability']}
                            />
                            <Bar dataKey="prob" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={mode === 'bernoulli' ? (index === 1 ? '#4f46e5' : '#94a3b8') : '#4f46e5'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-center text-sm text-slate-500 mt-2">
                        {mode === 'bernoulli'
                            ? 'Probability Mass Function for Bernoulli Trial'
                            : `Probability Mass Function for Binomial Distribution (n=${n}, p=${p})`}
                    </p>
                </div>
            </div>
        </div>
    );
}
