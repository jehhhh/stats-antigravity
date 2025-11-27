import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Play, RefreshCw, FastForward } from 'lucide-react';

export default function LawOfLargeNumbers() {
    const [p, setP] = useState(0.5);
    const [data, setData] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(100); // ms per trial
    const [totalTrials, setTotalTrials] = useState(0);
    const [successes, setSuccesses] = useState(0);

    const intervalRef = useRef(null);

    const runSimulation = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        } else {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTotalTrials(prev => {
                    const newTotal = prev + 1;
                    const isSuccess = Math.random() < p;
                    setSuccesses(prevSuccess => {
                        const newSuccess = isSuccess ? prevSuccess + 1 : prevSuccess;
                        const currentProp = newSuccess / newTotal;

                        setData(prevData => {
                            const newData = [...prevData, { trial: newTotal, proportion: currentProp }];
                            // Keep only last 100 points for performance if needed, but for this we want to see history
                            // For very long runs we might need to downsample, but for < 1000 it's fine.
                            return newData;
                        });
                        return newSuccess;
                    });
                    return newTotal;
                });
            }, speed);
        }
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setData([]);
        setTotalTrials(0);
        setSuccesses(0);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="p-6 lg:p-8">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Simulation Controls</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">True Probability (p)</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0.1"
                                    max="0.9"
                                    step="0.1"
                                    value={p}
                                    onChange={(e) => {
                                        reset();
                                        setP(parseFloat(e.target.value));
                                    }}
                                    disabled={isRunning || totalTrials > 0}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <span className="font-mono font-bold text-indigo-600 w-12">{p}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Simulation Speed</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSpeed(200)}
                                    className={`flex-1 py-1 text-xs rounded border ${speed === 200 ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-white border-slate-200'}`}
                                >
                                    Slow
                                </button>
                                <button
                                    onClick={() => setSpeed(50)}
                                    className={`flex-1 py-1 text-xs rounded border ${speed === 50 ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-white border-slate-200'}`}
                                >
                                    Fast
                                </button>
                                <button
                                    onClick={() => setSpeed(10)}
                                    className={`flex-1 py-1 text-xs rounded border ${speed === 10 ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-white border-slate-200'}`}
                                >
                                    Turbo
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={runSimulation}
                                className={`flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-colors ${isRunning
                                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                            >
                                {isRunning ? 'Pause' : 'Start'}
                                <Play className={`w-4 h-4 ml-2 ${isRunning ? 'hidden' : ''}`} />
                            </button>
                            <button
                                onClick={reset}
                                className="py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                        <h3 className="font-bold text-indigo-900 mb-4">Current Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-indigo-700">Total Trials</span>
                                <span className="font-mono font-bold text-indigo-900">{totalTrials}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-indigo-700">Successes</span>
                                <span className="font-mono font-bold text-indigo-900">{successes}</span>
                            </div>
                            <div className="pt-3 border-t border-indigo-200 flex justify-between">
                                <span className="text-indigo-700 font-semibold">Observed Proportion</span>
                                <span className="font-mono font-bold text-indigo-900">
                                    {totalTrials > 0 ? (successes / totalTrials).toFixed(4) : '0.0000'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 min-h-[400px] bg-white rounded-xl border border-slate-200 p-4">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="trial"
                                label={{ value: 'Number of Trials', position: 'bottom', offset: 0 }}
                                type="number"
                                domain={['auto', 'auto']}
                                allowDecimals={false}
                            />
                            <YAxis
                                domain={[0, 1]}
                                label={{ value: 'Proportion of Successes', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                formatter={(value) => [value.toFixed(4), 'Proportion']}
                                labelFormatter={(label) => `Trial: ${label}`}
                            />
                            <ReferenceLine y={p} stroke="#4f46e5" strokeDasharray="5 5" label={{ value: `Target p=${p}`, position: 'right', fill: '#4f46e5' }} />
                            <Line
                                type="monotone"
                                dataKey="proportion"
                                stroke="#0f172a"
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-center text-sm text-slate-500 mt-4">
                        Notice how the observed proportion fluctuates wildly at first but settles closer to the true probability <strong>p={p}</strong> as the number of trials increases.
                    </p>
                </div>
            </div>
        </div>
    );
}
