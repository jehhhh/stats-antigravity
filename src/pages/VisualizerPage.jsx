import React from 'react';
import Visualizer from '../components/Visualizer';

export default function VisualizerPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Distribution Visualizer</h1>
                <p className="text-xl text-slate-600">
                    Explore how changing parameters affects the shape, mean, and variance of the distributions.
                </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <Visualizer />
            </div>
        </div>
    );
}
