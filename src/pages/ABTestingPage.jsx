import React, { useState, useMemo } from 'react';
import { Split, MousePointer2, ShoppingCart, ArrowRight, Trophy, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

// Normal PDF function for graph
const normalPDF = (x, mean, stdDev) => {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
};

export default function ABTestingPage() {
    // State for Group A (Control)
    const [visitorsA, setVisitorsA] = useState(1000);
    const [conversionRateA, setConversionRateA] = useState(0.10);

    // State for Group B (Variant)
    const [visitorsB, setVisitorsB] = useState(1000);
    const [conversionRateB, setConversionRateB] = useState(0.12);

    const [isSimulating, setIsSimulating] = useState(false);
    const [results, setResults] = useState(null);

    const runExperiment = async () => {
        setIsSimulating(true);
        setResults(null);

        // Simulate delay for effect
        await new Promise(r => setTimeout(r, 1500));

        // Simulate outcomes using Binomial distribution approximation
        // In a real simulation we might flip coins, but for large N we can just use the expected values + random noise
        // Or actually simulate it for "authenticity" if N isn't too huge.
        // Let's actually simulate it for smaller N, or use normal approximation for large N.
        // For N=1000, iterating is fine in JS.

        const simulateGroup = (n, p) => {
            let conversions = 0;
            for (let i = 0; i < n; i++) {
                if (Math.random() < p) conversions++;
            }
            return conversions;
        };

        const convA = simulateGroup(visitorsA, conversionRateA);
        const convB = simulateGroup(visitorsB, conversionRateB);

        // Calculate Z-score
        const pA = convA / visitorsA;
        const pB = convB / visitorsB;
        const pPool = (convA + convB) / (visitorsA + visitorsB);
        const se = Math.sqrt(pPool * (1 - pPool) * (1 / visitorsA + 1 / visitorsB));
        const zScore = (pB - pA) / se;

        // Two-tailed p-value
        // Approximation for p-value from Z
        const pValue = 2 * (1 - cdf(Math.abs(zScore)));

        setResults({
            conversionsA: convA,
            conversionsB: convB,
            rateA: pA,
            rateB: pB,
            zScore,
            pValue,
            winner: pValue < 0.05 ? (pB > pA ? 'B' : 'A') : 'Inconclusive'
        });

        setIsSimulating(false);
    };

    // Standard Normal CDF approximation
    function cdf(x) {
        var t = 1 / (1 + .2316419 * Math.abs(x));
        var d = .3989423 * Math.exp(-x * x / 2);
        var prob = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
        if (x > 0) prob = 1 - prob;
        return prob;
    }

    // Generate graph data for bell curves
    const chartData = useMemo(() => {
        const points = [];
        // We want to plot the distribution of the *Conversion Rate*
        // Mean = p, StdDev = sqrt(p(1-p)/n)
        const stdDevA = Math.sqrt(conversionRateA * (1 - conversionRateA) / visitorsA);
        const stdDevB = Math.sqrt(conversionRateB * (1 - conversionRateB) / visitorsB);

        const minX = Math.min(conversionRateA - 4 * stdDevA, conversionRateB - 4 * stdDevB);
        const maxX = Math.max(conversionRateA + 4 * stdDevA, conversionRateB + 4 * stdDevB);
        const step = (maxX - minX) / 100;

        for (let x = minX; x <= maxX; x += step) {
            points.push({
                rate: x,
                densityA: normalPDF(x, conversionRateA, stdDevA),
                densityB: normalPDF(x, conversionRateB, stdDevB),
            });
        }
        return points;
    }, [visitorsA, conversionRateA, visitorsB, conversionRateB]);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[28px] p-8 text-white shadow-lg">
                <div className="flex items-center mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm mr-4">
                        <Split className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold">A/B Testing Simulator</h1>
                </div>
                <p className="text-xl opacity-90 leading-relaxed max-w-2xl">
                    Optimize your conversion rates. Run a controlled experiment to compare two versions of a webpage (A vs B) and determine if the difference is statistically significant.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Group A Control */}
                    <div className="material-card p-6 border-l-4 border-l-slate-400">
                        <h3 className="font-bold text-lg mb-4 text-slate-700">Control Group (A)</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Visitors</label>
                                <input
                                    type="number"
                                    value={visitorsA}
                                    onChange={(e) => setVisitorsA(parseInt(e.target.value) || 0)}
                                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Baseline Conv. Rate</label>
                                <div className="flex items-center mt-1">
                                    <input
                                        type="range"
                                        min="0.01"
                                        max="0.5"
                                        step="0.01"
                                        value={conversionRateA}
                                        onChange={(e) => setConversionRateA(parseFloat(e.target.value))}
                                        className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500 mr-3"
                                    />
                                    <span className="font-mono font-bold text-slate-700 w-12 text-right">{(conversionRateA * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Group B Control */}
                    <div className="material-card p-6 border-l-4 border-l-emerald-500">
                        <h3 className="font-bold text-lg mb-4 text-emerald-700">Variant Group (B)</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Visitors</label>
                                <input
                                    type="number"
                                    value={visitorsB}
                                    onChange={(e) => setVisitorsB(parseInt(e.target.value) || 0)}
                                    className="w-full mt-1 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg font-mono text-emerald-700"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expected Conv. Rate</label>
                                <div className="flex items-center mt-1">
                                    <input
                                        type="range"
                                        min="0.01"
                                        max="0.5"
                                        step="0.01"
                                        value={conversionRateB}
                                        onChange={(e) => setConversionRateB(parseFloat(e.target.value))}
                                        className="flex-1 h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-500 mr-3"
                                    />
                                    <span className="font-mono font-bold text-emerald-700 w-12 text-right">{(conversionRateB * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={runExperiment}
                        disabled={isSimulating}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center ${isSimulating
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        {isSimulating ? 'Running Experiment...' : 'Run Experiment'}
                    </button>
                </div>

                {/* Visualization & Results */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Funnel Visualization */}
                    <div className="material-card p-8">
                        <h3 className="font-bold text-lg mb-6">Live Conversion Funnel</h3>
                        <div className="space-y-8">
                            {/* Funnel A */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-bold text-slate-600">Group A</span>
                                    <span className="text-slate-500">{results ? results.conversionsA : 0} / {visitorsA} Conversions</span>
                                </div>
                                <div className="h-8 bg-slate-100 rounded-full overflow-hidden relative">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-slate-400"
                                        initial={{ width: 0 }}
                                        animate={{ width: results ? `${(results.conversionsA / visitorsA) * 100}%` : '0%' }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>

                            {/* Funnel B */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-bold text-emerald-600">Group B</span>
                                    <span className="text-slate-500">{results ? results.conversionsB : 0} / {visitorsB} Conversions</span>
                                </div>
                                <div className="h-8 bg-emerald-50 rounded-full overflow-hidden relative">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-emerald-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: results ? `${(results.conversionsB / visitorsB) * 100}%` : '0%' }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistical Significance Graph */}
                    <div className="material-card p-6 min-h-[300px]">
                        <h3 className="font-bold text-lg mb-2">Probability Distributions</h3>
                        <p className="text-sm text-on-surface-variant mb-6">
                            These curves show the likely range of the true conversion rate for each group. Less overlap means higher confidence that they are different.
                        </p>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <XAxis
                                        dataKey="rate"
                                        tickFormatter={(val) => `${(val * 100).toFixed(1)}%`}
                                        type="number"
                                        domain={['auto', 'auto']}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        labelFormatter={(val) => `Rate: ${(val * 100).toFixed(2)}%`}
                                        formatter={(val) => val.toFixed(2)}
                                    />
                                    <Area type="monotone" dataKey="densityA" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} name="Group A" />
                                    <Area type="monotone" dataKey="densityB" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Group B" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Final Result */}
                    {results && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-2xl border-2 ${results.winner !== 'Inconclusive'
                                    ? 'bg-indigo-50 border-indigo-200'
                                    : 'bg-amber-50 border-amber-200'
                                }`}
                        >
                            <div className="flex items-start">
                                <div className={`p-3 rounded-xl mr-4 ${results.winner !== 'Inconclusive' ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'
                                    }`}>
                                    {results.winner !== 'Inconclusive' ? <Trophy className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold mb-1 ${results.winner !== 'Inconclusive' ? 'text-indigo-900' : 'text-amber-900'
                                        }`}>
                                        {results.winner === 'B' ? 'Variant B is the Winner!' :
                                            results.winner === 'A' ? 'Control A is the Winner!' :
                                                'Result Inconclusive'}
                                    </h3>
                                    <p className="text-on-surface-variant mb-2">
                                        {results.winner !== 'Inconclusive'
                                            ? `We are ${(100 - results.pValue * 100).toFixed(1)}% confident that the difference is real.`
                                            : `There is not enough data to prove a significant difference (p-value: ${results.pValue.toFixed(3)}).`}
                                    </p>
                                    <div className="text-sm font-mono bg-white/50 p-2 rounded inline-block">
                                        Z-Score: {results.zScore.toFixed(3)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
