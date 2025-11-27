import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { BookOpen, History, Calculator, FlaskConical } from 'lucide-react';

export default function BernoulliPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="bg-primary-container rounded-[28px] p-8 text-on-primary-container">
                <h1 className="text-4xl font-bold mb-4">Bernoulli Distribution</h1>
                <p className="text-xl opacity-90 leading-relaxed max-w-3xl">
                    The fundamental building block of discrete probability, modeling a single experiment with exactly two possible outcomes.
                </p>
            </div>

            {/* Historical Context */}
            <section className="material-card p-8">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center mr-4">
                        <History className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Historical Context</h2>
                </div>
                <div className="prose prose-lg max-w-none text-on-surface-variant">
                    <p>
                        The Bernoulli distribution is named after the Swiss mathematician <strong>Jacob Bernoulli</strong> (1654–1705). It was first described in his seminal work, <em>Ars Conjectandi</em> (The Art of Conjecturing), which was published posthumously in 1713.
                    </p>
                    <p className="mt-4">
                        Bernoulli was interested in the mathematics of games of chance and the conditions under which experimental results could be used to estimate unknown probabilities. His work laid the foundation for the Law of Large Numbers, connecting theoretical probability with observed frequencies.
                    </p>
                </div>
            </section>

            {/* Definition */}
            <section className="material-card p-8">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mr-4">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Definition</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                    <p className="text-on-surface-variant">
                        A random variable <InlineMath math="X" /> follows a Bernoulli distribution with parameter <InlineMath math="p" /> if it represents a single experiment with two mutually exclusive outcomes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-4">
                        <li><strong>Success</strong> (mapped to 1) with probability <InlineMath math="p" /></li>
                        <li><strong>Failure</strong> (mapped to 0) with probability <InlineMath math="q = 1 - p" /></li>
                    </ul>

                    <div className="my-8 p-6 bg-surface-variant rounded-2xl text-on-surface-variant">
                        <p className="text-center text-sm uppercase tracking-wider font-bold mb-4 opacity-70">Probability Mass Function (PMF)</p>
                        <div className="text-center text-xl font-mono">
                            <BlockMath math="P(X=x) = \begin{cases} p & \text{if } x=1 \\ 1-p & \text{if } x=0 \\ 0 & \text{otherwise} \end{cases}" />
                        </div>
                        <p className="text-center text-sm mt-4 opacity-70">
                            Compact form: <InlineMath math="P(X=x) = p^x (1-p)^{1-x}" /> for <InlineMath math="x \in \{0, 1\}" />
                        </p>
                    </div>
                </div>
            </section>

            {/* Mean and Variance */}
            <section className="material-card p-8">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mr-4">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Mean & Variance</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-on-surface mb-4">Expected Value (Mean)</h3>
                        <p className="text-on-surface-variant mb-4">
                            The expected value <InlineMath math="E[X]" /> represents the theoretical average outcome if we were to repeat the experiment infinitely many times.
                        </p>
                        <div className="bg-surface-variant/50 p-6 rounded-2xl border border-outline/10">
                            <div className="font-mono text-sm text-on-surface space-y-2">
                                <p className="text-xs text-on-surface-variant font-sans mb-2 uppercase tracking-wider font-bold">Derivation</p>
                                <BlockMath math="E[X] = \sum_{x} x \cdot P(X=x)" />
                                <BlockMath math="= 0 \cdot (1-p) + 1 \cdot p" />
                                <div className="pt-4 border-t border-outline/20 mt-4">
                                    <BlockMath math="\mu = p" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-on-surface mb-4">Variance</h3>
                        <p className="text-on-surface-variant mb-4">
                            Variance measures the spread or dispersion of the random variable. It quantifies how much the outcomes fluctuate around the mean.
                        </p>
                        <div className="bg-surface-variant/50 p-6 rounded-2xl border border-outline/10">
                            <div className="font-mono text-sm text-on-surface space-y-2">
                                <p className="text-xs text-on-surface-variant font-sans mb-2 uppercase tracking-wider font-bold">Derivation</p>
                                <BlockMath math="Var(X) = E[X^2] - (E[X])^2" />
                                <BlockMath math="= p - p^2 = p(1 - p)" />
                                <div className="pt-4 border-t border-outline/20 mt-4">
                                    <BlockMath math="\sigma^2 = pq" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hypothesis Testing */}
            <section className="material-card p-8">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center mr-4">
                        <FlaskConical className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Hypothesis Testing</h2>
                </div>
                <div className="prose prose-lg max-w-none text-on-surface-variant">
                    <p>
                        Hypothesis testing allows us to make inferences about the unknown parameter <InlineMath math="p" /> based on observed data.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6 mb-8">
                        <div className="bg-surface-variant p-6 rounded-2xl">
                            <h4 className="font-bold text-on-surface mb-2">Null Hypothesis (<InlineMath math="H_0" />)</h4>
                            <p className="text-sm mb-3 opacity-80">The default assumption.</p>
                            <div className="text-center font-mono bg-surface p-3 rounded-xl border border-outline/10">
                                <InlineMath math="H_0: p = p_0" />
                            </div>
                        </div>
                        <div className="bg-surface-variant p-6 rounded-2xl">
                            <h4 className="font-bold text-on-surface mb-2">Alternative Hypothesis (<InlineMath math="H_1" />)</h4>
                            <p className="text-sm mb-3 opacity-80">What we want to test for.</p>
                            <div className="text-center font-mono bg-surface p-3 rounded-xl border border-outline/10">
                                <InlineMath math="H_1: p \neq p_0" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-error-container/30 p-6 rounded-2xl border border-error-container text-on-surface">
                        <p className="font-bold text-error mb-2">Z-Test for Proportions</p>
                        <p className="text-sm mb-4 opacity-80">
                            For large samples, we use the Normal approximation. The test statistic <InlineMath math="Z" /> measures how many standard deviations our observed <InlineMath math="\hat{p}" /> is from the null hypothesis.
                        </p>
                        <div className="text-center font-mono text-lg">
                            <BlockMath math="Z = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}}" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
