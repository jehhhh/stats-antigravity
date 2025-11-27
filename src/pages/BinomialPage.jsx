import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { BookOpen, History, Calculator, Scale, ShoppingBag } from 'lucide-react';

export default function BinomialPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="bg-secondary-container rounded-[28px] p-8 text-on-secondary-container">
                <h1 className="text-4xl font-bold mb-4">Binomial Distribution</h1>
                <p className="text-xl opacity-90 leading-relaxed max-w-3xl">
                    Modeling the number of successes in a fixed series of independent Bernoulli trials.
                </p>
            </div>

            {/* Historical Context */}
            <section className="material-card p-8">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mr-4">
                        <History className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Historical Context</h2>
                </div>
                <div className="prose prose-lg max-w-none text-on-surface-variant">
                    <p>
                        The Binomial distribution is the natural extension of the Bernoulli distribution. While Jacob Bernoulli laid the groundwork, the general formula for the binomial expansion was known to <strong>Isaac Newton</strong> and <strong>Blaise Pascal</strong>.
                    </p>
                    <p className="mt-4">
                        Bernoulli's specific contribution was proving that as the number of trials <InlineMath math="n" /> increases, the observed proportion of successes converges to the theoretical probability <InlineMath math="p" />. This was the first rigorous proof of the <strong>Law of Large Numbers</strong>.
                    </p>
                </div>
            </section>

            {/* Definition */}
            <section className="material-card p-8">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mr-4">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Definition & Formula</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                    <p className="text-on-surface-variant">
                        A random variable <InlineMath math="X" /> follows a Binomial distribution <InlineMath math="B(n, p)" /> if it represents the total number of successes in <InlineMath math="n" /> independent Bernoulli trials.
                    </p>

                    <div className="my-8 p-6 bg-surface-variant rounded-2xl text-on-surface-variant">
                        <p className="text-center text-sm uppercase tracking-wider font-bold mb-4 opacity-70">Probability Mass Function</p>
                        <div className="text-center text-2xl font-mono overflow-x-auto">
                            <BlockMath math="P(X=r) = \binom{n}{r} p^r (1-p)^{n-r}" />
                        </div>
                        <div className="mt-6 flex justify-center gap-8 text-sm opacity-70">
                            <div><InlineMath math="n" />: Trials</div>
                            <div><InlineMath math="r" />: Successes</div>
                            <div><InlineMath math="p" />: Prob. Success</div>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-on-surface mt-8 mb-4">The 4 Conditions (BINS)</h3>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="bg-surface-variant/50 p-4 rounded-xl border border-outline/10">
                            <strong className="text-primary block mb-1">B - Binary</strong>
                            Outcomes must be Success/Failure.
                        </li>
                        <li className="bg-surface-variant/50 p-4 rounded-xl border border-outline/10">
                            <strong className="text-primary block mb-1">I - Independent</strong>
                            Trials must not affect each other.
                        </li>
                        <li className="bg-surface-variant/50 p-4 rounded-xl border border-outline/10">
                            <strong className="text-primary block mb-1">N - Number</strong>
                            Fixed number of trials <InlineMath math="n" />.
                        </li>
                        <li className="bg-surface-variant/50 p-4 rounded-xl border border-outline/10">
                            <strong className="text-primary block mb-1">S - Same Probability</strong>
                            <InlineMath math="p" /> must be constant.
                        </li>
                    </ul>
                </div>
            </section>

            {/* Expected Value and Variance */}
            <section className="material-card p-8">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mr-4">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Expected Value & Variance</h2>
                </div>

                <div className="prose prose-lg max-w-none text-on-surface-variant">
                    <p>
                        Since a Binomial variable <InlineMath math="X" /> is the sum of <InlineMath math="n" /> independent Bernoulli variables <InlineMath math="X_1, X_2, ..., X_n" />:
                    </p>
                    <div className="my-4 bg-surface-variant/50 p-4 rounded-xl border border-outline/10 font-mono text-sm overflow-x-auto">
                        <BlockMath math="X = X_1 + X_2 + ... + X_n" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <h4 className="font-bold text-on-surface mb-2">Expected Value (Mean)</h4>
                            <div className="font-mono text-sm text-on-surface overflow-x-auto">
                                <BlockMath math="E[X] = \sum E[X_i] = np" />
                                <div className="mt-4 p-3 bg-secondary-container/30 border border-secondary-container rounded-xl text-center font-bold text-on-secondary-container text-lg">
                                    <InlineMath math="E[X] = np" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-on-surface mb-2">Variance</h4>
                            <div className="font-mono text-sm text-on-surface overflow-x-auto">
                                <BlockMath math="Var(X) = \sum Var(X_i) = npq" />
                                <div className="mt-4 p-3 bg-secondary-container/30 border border-secondary-container rounded-xl text-center font-bold text-on-secondary-container text-lg">
                                    <InlineMath math="Var(X) = npq" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Worked Example: Martin's Clothing Store */}
            <section className="material-card p-8">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mr-4">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Worked Example</h2>
                </div>

                <div className="space-y-6">
                    <div className="bg-tertiary-container/20 p-6 rounded-2xl border border-tertiary-container/20">
                        <h3 className="font-bold text-tertiary mb-2">Martin's Clothing Store</h3>
                        <p className="text-on-surface-variant leading-relaxed">
                            Martin manages a high-end clothing store. Historical data shows that <strong>30%</strong> of customers who enter the store make a purchase. If <strong>10 customers</strong> enter the store in the next hour, what is the probability that <strong>exactly 4</strong> of them make a purchase? Also, what is the expected number of sales?
                        </p>
                    </div>

                    <div className="space-y-6 text-on-surface-variant">
                        <div>
                            <h4 className="font-bold text-on-surface mb-2">1. Identify Parameters</h4>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong className="text-primary">n = 10</strong> (number of customers/trials)</li>
                                <li><strong className="text-primary">p = 0.30</strong> (probability of purchase)</li>
                                <li><strong className="text-primary">q = 0.70</strong> (probability of no purchase)</li>
                                <li><strong className="text-primary">r = 4</strong> (target number of sales)</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-on-surface mb-2">2. Apply Formula</h4>
                            <div className="bg-surface-variant p-4 rounded-xl font-mono text-sm overflow-x-auto">
                                <BlockMath math="P(X=4) = \binom{10}{4} (0.3)^4 (0.7)^{10-4} \approx 0.2001" />
                            </div>
                            <p className="mt-2 text-sm">
                                There is approximately a <strong>20.01%</strong> chance that exactly 4 customers will make a purchase.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-on-surface mb-2">3. Calculate Expected Value</h4>
                            <div className="bg-surface-variant p-4 rounded-xl font-mono text-sm overflow-x-auto">
                                <BlockMath math="E[X] = np = 10 \times 0.3 = 3" />
                            </div>
                            <p className="mt-2 text-sm">
                                On average, Martin can expect <strong>3 sales</strong> from 10 customers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="material-card p-8 overflow-hidden">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mr-4">
                        <Scale className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Bernoulli vs. Binomial</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-outline/20">
                                <th className="py-4 px-4 text-on-surface font-bold">Feature</th>
                                <th className="py-4 px-4 text-primary font-bold">Bernoulli</th>
                                <th className="py-4 px-4 text-primary font-bold">Binomial</th>
                            </tr>
                        </thead>
                        <tbody className="text-on-surface-variant">
                            <tr className="border-b border-outline/10">
                                <td className="py-4 px-4 font-medium">Number of Trials</td>
                                <td className="py-4 px-4">Single trial (<InlineMath math="n=1" />)</td>
                                <td className="py-4 px-4">Multiple trials (<InlineMath math="n > 1" />)</td>
                            </tr>
                            <tr className="border-b border-outline/10">
                                <td className="py-4 px-4 font-medium">Outcomes</td>
                                <td className="py-4 px-4">Success / Failure</td>
                                <td className="py-4 px-4">Count of Successes (0 to n)</td>
                            </tr>
                            <tr className="border-b border-outline/10">
                                <td className="py-4 px-4 font-medium">Parameter(s)</td>
                                <td className="py-4 px-4"><InlineMath math="p" /></td>
                                <td className="py-4 px-4"><InlineMath math="n, p" /></td>
                            </tr>
                            <tr className="border-b border-outline/10">
                                <td className="py-4 px-4 font-medium">Expected Value</td>
                                <td className="py-4 px-4"><InlineMath math="p" /></td>
                                <td className="py-4 px-4"><InlineMath math="np" /></td>
                            </tr>
                            <tr>
                                <td className="py-4 px-4 font-medium">Variance</td>
                                <td className="py-4 px-4"><InlineMath math="p(1-p)" /></td>
                                <td className="py-4 px-4"><InlineMath math="np(1-p)" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
