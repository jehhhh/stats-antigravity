import React, { useState, useEffect, useRef } from 'react';
import { Share2, Users, TrendingUp, RefreshCw, Heart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViralTrendsPage() {
    const [followers, setFollowers] = useState(50);
    const [shareProb, setShareProb] = useState(0.1);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationResult, setSimulationResult] = useState(null); // { shares: number, grid: boolean[] }
    const [history, setHistory] = useState([]); // Array of share counts

    // Generate grid data
    const generateGrid = () => {
        return Array(followers).fill(false);
    };

    const [gridState, setGridState] = useState(generateGrid());

    useEffect(() => {
        setGridState(generateGrid());
        setSimulationResult(null);
    }, [followers]);

    const runSimulation = async () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setSimulationResult(null);

        // Reset grid
        const newGrid = Array(followers).fill(null); // null = pending
        setGridState(newGrid);

        let shares = 0;
        const finalGrid = [];

        // Simulate with animation delay
        for (let i = 0; i < followers; i++) {
            await new Promise(r => setTimeout(r, 20)); // Fast animation
            const isShared = Math.random() < shareProb;
            if (isShared) shares++;
            finalGrid.push(isShared);

            // Update grid state incrementally for animation
            setGridState(prev => {
                const next = [...prev];
                next[i] = isShared;
                return next;
            });
        }

        setSimulationResult({ shares, grid: finalGrid });
        setHistory(prev => [...prev, shares]);
        setIsSimulating(false);
    };

    // Prepare chart data from history
    const chartData = history.reduce((acc, val) => {
        const existing = acc.find(item => item.shares === val);
        if (existing) {
            existing.count++;
        } else {
            acc.push({ shares: val, count: 1 });
        }
        return acc;
    }, []).sort((a, b) => a.shares - b.shares);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[28px] p-8 text-white shadow-lg">
                <div className="flex items-center mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm mr-4">
                        <Share2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold">Viral Trends Simulator</h1>
                </div>
                <p className="text-xl opacity-90 leading-relaxed max-w-2xl">
                    Will your post go viral? Simulate how content spreads through your follower network. Each follower decides to share (Success) or ignore (Failure) based on probability.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="material-card p-6">
                        <h3 className="font-bold text-lg mb-6 flex items-center">
                            <Users className="w-5 h-5 mr-2 text-primary" />
                            Simulation Settings
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-on-surface-variant">Followers (n)</label>
                                    <span className="font-mono font-bold text-primary">{followers}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="10"
                                    value={followers}
                                    onChange={(e) => setFollowers(parseInt(e.target.value))}
                                    disabled={isSimulating}
                                    className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-on-surface-variant">Share Probability (p)</label>
                                    <span className="font-mono font-bold text-primary">{(shareProb * 100).toFixed(0)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.05"
                                    max="0.95"
                                    step="0.05"
                                    value={shareProb}
                                    onChange={(e) => setShareProb(parseFloat(e.target.value))}
                                    disabled={isSimulating}
                                    className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            <button
                                onClick={runSimulation}
                                disabled={isSimulating}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center ${isSimulating
                                    ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                                    : 'bg-primary text-on-primary hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                                    }`}
                            >
                                {isSimulating ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                        Simulating...
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="w-5 h-5 mr-2" />
                                        Post Content
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="material-card p-6 bg-surface-variant/30 border-none">
                        <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4">Results</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-surface p-4 rounded-xl border border-outline/10 text-center">
                                <div className="text-xs text-on-surface-variant mb-1">Total Shares</div>
                                <div className="text-3xl font-bold text-primary">
                                    {simulationResult ? simulationResult.shares : '-'}
                                </div>
                            </div>
                            <div className="bg-surface p-4 rounded-xl border border-outline/10 text-center">
                                <div className="text-xs text-on-surface-variant mb-1">Virality Rate</div>
                                <div className="text-3xl font-bold text-tertiary">
                                    {simulationResult ? ((simulationResult.shares / followers) * 100).toFixed(1) : '-'}%
                                </div>
                            </div>
                        </div>
                        {simulationResult && (
                            <div className="mt-4 text-center">
                                <p className="text-sm text-on-surface-variant">
                                    Expected Shares: <span className="font-bold text-on-surface">{(followers * shareProb).toFixed(1)}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Visualization */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="material-card p-6 min-h-[400px]">
                        <h3 className="font-bold text-lg mb-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <TrendingUp className="w-5 h-5 mr-2 text-secondary" />
                                Network Visualization
                            </div>
                            <div className="flex gap-4 text-xs">
                                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>Shared</div>
                                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-slate-200 mr-2"></span>Ignored</div>
                            </div>
                        </h3>

                        <div className="grid grid-cols-10 gap-3 justify-items-center">
                            <AnimatePresence>
                                {gridState.map((status, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${status === true
                                            ? 'bg-green-100 text-green-600 shadow-sm border-2 border-green-200'
                                            : status === false
                                                ? 'bg-slate-100 text-slate-300'
                                                : 'bg-slate-50 border border-slate-100'
                                            }`}
                                    >
                                        {status === true ? <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : null}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* History Chart */}
                    {history.length > 0 && (
                        <div className="material-card p-6">
                            <h3 className="font-bold text-lg mb-4">Distribution of Outcomes</h3>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                        <XAxis
                                            dataKey="shares"
                                            label={{ value: 'Shares', position: 'bottom', offset: 0 }}
                                            tick={{ fill: '#64748b' }}
                                        />
                                        <YAxis
                                            allowDecimals={false}
                                            label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
                                            tick={{ fill: '#64748b' }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="count" fill="#818cf8" radius={[4, 4, 0, 0]}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.shares === simulationResult?.shares ? '#4f46e5' : '#c7d2fe'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-center text-sm text-on-surface-variant mt-2">
                                This histogram builds up the Binomial Distribution as you run more simulations.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
