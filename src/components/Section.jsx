import React from 'react';
import { clsx } from 'clsx';

export default function Section({ id, title, subtitle, children, className }) {
    return (
        <section id={id} className={clsx("scroll-mt-24", className)}>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
                {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {children}
            </div>
        </section>
    );
}
