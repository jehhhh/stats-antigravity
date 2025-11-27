import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { FileQuestion, GraduationCap, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';

const Question = ({ number, title, children, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="material-card p-4 lg:p-8 mb-8 transition-all duration-300">
            <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex-shrink-0 flex items-center justify-center mr-3 lg:mr-4 font-bold text-xl">
                    {number}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
                    <div className="prose prose-lg max-w-none text-on-surface-variant mb-6">
                        {children}
                    </div>

                    <div className="border-t border-outline/10 pt-6">
                        <button
                            onClick={() => setShowAnswer(!showAnswer)}
                            className={`flex items-center px-4 py-2 rounded-full font-medium transition-all ${showAnswer
                                ? 'bg-primary-container text-on-primary-container'
                                : 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80'
                                }`}
                        >
                            {showAnswer ? (
                                <>
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    Hide Answer
                                </>
                            ) : (
                                <>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Show Answer
                                </>
                            )}
                        </button>

                        {showAnswer && (
                            <div className="mt-6 bg-surface-variant/30 rounded-xl p-4 lg:p-6 border border-outline/10 animate-fade-in">
                                <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Detailed Solution</h4>
                                <div className="prose prose-lg max-w-none text-on-surface-variant">
                                    {answer}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ExamQuestionsPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-4xl font-bold text-on-surface mb-4 flex items-center">
                    <GraduationCap className="w-10 h-10 mr-4 text-primary" />
                    Exam Questions
                </h1>
                <p className="text-xl text-on-surface-variant">
                    Practice with these 5 exam-style questions focusing on Bernoulli and Binomial distributions.
                </p>
                <div className="mt-6 bg-secondary-container text-on-secondary-container p-4 rounded-xl border border-secondary-container inline-block">
                    <strong>Instructions:</strong> Answer any 5 questions. Each question is worth 4 marks. Try to solve them before checking the answers!
                </div>
            </div>

            <Question
                number="1"
                title="Pharmaceutical Quality Control"
                answer={
                    <div className="space-y-4">
                        <div>
                            <strong className="text-on-surface">a. Probability & Distribution</strong>
                            <p>
                                Since we are selecting a single tablet, this is a <strong>Bernoulli trial</strong>.
                                <br />
                                <InlineMath math="P(\text{Defective}) = p = 0.03" />
                            </p>
                        </div>
                        <div>
                            <strong className="text-on-surface">b. Expected Value & Standard Deviation (n=50)</strong>
                            <p>
                                <InlineMath math="E[X] = np = 50 \times 0.03 = 1.5" /> tablets.
                                <br />
                                <InlineMath math="\sigma = \sqrt{npq} = \sqrt{50 \times 0.03 \times 0.97} = \sqrt{1.455} \approx 1.206" />
                            </p>
                        </div>
                        <div>
                            <strong className="text-on-surface">c. Probability of exactly 2 defective</strong>
                            <div className="font-mono text-sm bg-surface p-2 rounded border border-outline/10 my-2 overflow-x-auto">
                                <BlockMath math="P(X=2) = \binom{50}{2} (0.03)^2 (0.97)^{48}" />
                                <BlockMath math="= 1225 \times 0.0009 \times 0.2311 \approx 0.255" />
                            </div>
                        </div>
                        <div>
                            <strong className="text-on-surface">d. Probability of no defective tablets</strong>
                            <div className="font-mono text-sm bg-surface p-2 rounded border border-outline/10 my-2 overflow-x-auto">
                                <BlockMath math="P(X=0) = \binom{50}{0} (0.03)^0 (0.97)^{50} \approx 0.218" />
                            </div>
                            <p>
                                There is a 21.8% chance that a batch of 50 tablets has zero defects. This means roughly 1 in 5 batches will be perfect.
                            </p>
                        </div>
                    </div>
                }
            >
                <p className="mb-4">
                    A quality control manager at a pharmaceutical company knows that 3% of tablets produced are defective. The company randomly selects tablets for inspection.
                </p>
                <ol className="list-[lower-alpha] space-y-4 pl-4">
                    <li>
                        <p>What is the probability that a randomly selected tablet is defective? What type of distribution describes this single selection?</p>
                    </li>
                    <li>
                        <p>If the company inspects 50 tablets, what is the expected number of defective tablets? Calculate the standard deviation.</p>
                    </li>
                    <li>
                        <p>What is the probability that exactly 2 tablets out of 50 are defective? Show your calculation.</p>
                    </li>
                    <li>
                        <p>What is the probability that no tablets are defective in a sample of 50? Interpret what this result means for the company.</p>
                    </li>
                </ol>
            </Question>

            <Question
                number="2"
                title="Smartphone Market Research"
                answer={
                    <div className="space-y-4">
                        <div>
                            <strong className="text-on-surface">a. Parameters & Assumptions</strong>
                            <p>
                                <InlineMath math="n = 15" />, <InlineMath math="p = 0.40" />, <InlineMath math="q = 0.60" />.
                                <br />
                                Assumptions (BINS): Binary outcomes (purchase/no purchase), Independent users, Fixed Number (15), Same Probability (0.40).
                            </p>
                        </div>
                        <div>
                            <strong className="text-on-surface">b. Probability of exactly 6 users</strong>
                            <div className="font-mono text-sm bg-surface p-2 rounded border border-outline/10 my-2 overflow-x-auto">
                                <BlockMath math="P(X=6) = \binom{15}{6} (0.4)^6 (0.6)^9 \approx 0.2066" />
                            </div>
                        </div>
                        <div>
                            <strong className="text-on-surface">c. Probability of at most 4 users</strong>
                            <p>We sum <InlineMath math="P(X=0) + P(X=1) + P(X=2) + P(X=3) + P(X=4)" />.</p>
                            <div className="font-mono text-sm bg-surface p-2 rounded border border-outline/10 my-2 overflow-x-auto">
                                <BlockMath math="P(X \le 4) \approx 0.0005 + 0.0047 + 0.0219 + 0.0634 + 0.1268 = 0.2173" />
                            </div>
                        </div>
                        <div>
                            <strong className="text-on-surface">d. Expected Value & Variance</strong>
                            <p>
                                <InlineMath math="E[X] = 15 \times 0.4 = 6" /> users.
                                <br />
                                <InlineMath math="Var(X) = 15 \times 0.4 \times 0.6 = 3.6" />.
                                <br />
                                On average, we expect 6 users to have made a purchase, with a variance of 3.6.
                            </p>
                        </div>
                    </div>
                }
            >
                <p className="mb-4">
                    A market research firm conducted a study showing that 40% of smartphone users in India have made an online purchase using their phone in the last month. A random sample of 15 smartphone users is selected.
                </p>
                <ol className="list-[lower-alpha] space-y-4 pl-4">
                    <li>
                        <p>What are the values of <InlineMath math="n" />, <InlineMath math="p" />, and <InlineMath math="q" /> for this binomial experiment? State the assumptions required for this to be a valid binomial distribution.</p>
                    </li>
                    <li>
                        <p>Calculate the probability that exactly 6 users in the sample have made an online purchase using their phone.</p>
                    </li>
                    <li>
                        <p>What is the probability that at most 4 users have made an online purchase? (Calculate for 0, 1, 2, 3, and 4, then sum)</p>
                    </li>
                    <li>
                        <p>Calculate the expected number and variance of users who have made online purchases in this sample. Interpret these values.</p>
                    </li>
                </ol>
            </Question>

            <Question
                number="3"
                title="E-commerce Conversion"
                answer={
                    <div className="space-y-4">
                        <div>
                            <strong className="text-on-surface">a. Probability Distribution (Partial)</strong>
                            <p><InlineMath math="n=20, p=0.25" /></p>
                            <ul className="list-none pl-0 font-mono text-sm space-y-1">
                                <li>r=0: 0.0032</li>
                                <li>r=1: 0.0211</li>
                                <li>r=2: 0.0669</li>
                                <li>r=3: 0.1339</li>
                                <li>r=4: 0.1897</li>
                                <li>r=5: 0.2023</li>
                            </ul>
                        </div>
                        <div>
                            <strong className="text-on-surface">b. Probability fewer than 3</strong>
                            <div className="font-mono text-sm bg-surface p-2 rounded border border-outline/10 my-2 overflow-x-auto">
                                <BlockMath math="P(X < 3) = P(0) + P(1) + P(2) \approx 0.0032 + 0.0211 + 0.0669 = 0.0912" />
                            </div>
                        </div>
                        <div>
                            <strong className="text-on-surface">c. Most likely number (Mode)</strong>
                            <p>
                                <InlineMath math="E[X] = 5" />. The mode is usually <InlineMath math="\lfloor (n+1)p \rfloor = \lfloor 21 \times 0.25 \rfloor = 5" />.
                                <br />
                                Checking probabilities: P(4)=0.1897, <strong>P(5)=0.2023</strong>, P(6)=0.1686.
                                <br />
                                The mode is indeed 5.
                            </p>
                        </div>
                        <div>
                            <strong className="text-on-surface">d. Probability of at least 8</strong>
                            <div className="font-mono text-sm bg-surface p-2 rounded border border-outline/10 my-2 overflow-x-auto">
                                <BlockMath math="P(X \ge 8) = 1 - P(X \le 7) \approx 1 - 0.898 = 0.102" />
                            </div>
                            <p>
                                Only ~10% chance. The target of 8 seems optimistic given the current conversion rate.
                            </p>
                        </div>
                    </div>
                }
            >
                <p className="mb-4">
                    An e-commerce platform knows that 25% of customers who add items to their cart complete the purchase (conversion rate = 0.25). On a particular day, 20 customers add items to their cart.
                </p>
                <ol className="list-[lower-alpha] space-y-4 pl-4">
                    <li>
                        <p>Develop the probability distribution for the number of completed purchases (create a table showing <InlineMath math="r = 0, 1, 2, 3..." /> and corresponding probabilities for at least <InlineMath math="r = 0" /> to <InlineMath math="r = 5" />).</p>
                    </li>
                    <li>
                        <p>What is the probability that fewer than 3 customers complete their purchase?</p>
                    </li>
                    <li>
                        <p>What is the most likely number of completed purchases (the mode)? Calculate probabilities for <InlineMath math="r = 4, 5, \text{ and } 6" /> to verify.</p>
                    </li>
                    <li>
                        <p>If the platform wants at least 8 completed purchases, what is the probability of achieving this target? Discuss whether this target seems realistic.</p>
                    </li>
                </ol>
            </Question>

            <Question
                number="4"
                title="Credit Card Rejections"
                answer={
                    <div className="space-y-4">
                        <div>
                            <strong className="text-on-surface">a. Hypotheses</strong>
                            <p>
                                <InlineMath math="k = E[X] = 30 \times 0.12 = 3.6" />.
                                <br />
                                <InlineMath math="H_0: \mu = 3.6" /> (Rate is unchanged)
                                <br />
                                <InlineMath math="H_a: \mu \neq 3.6" /> (Rate has changed)
                            </p>
                        </div>
                        <div>
                            <strong className="text-on-surface">b. Is 7 rejections high?</strong>
                            <p>Calculate <InlineMath math="P(X \ge 7)" />.</p>
                            <div className="font-mono text-sm bg-surface p-2 rounded border border-outline/10 my-2 overflow-x-auto">
                                <BlockMath math="P(X \ge 7) = 1 - P(X \le 6) \approx 1 - 0.936 = 0.064" />
                            </div>
                            <p>
                                With a probability of 6.4%, it is somewhat high but typically not considered statistically significant at the 5% level (p &gt; 0.05).
                            </p>
                        </div>
                        <div>
                            <strong className="text-on-surface">c. Probability of exactly 3</strong>
                            <div className="font-mono text-sm bg-surface p-2 rounded border border-outline/10 my-2 overflow-x-auto">
                                <BlockMath math="P(X=3) = \binom{30}{3} (0.12)^3 (0.88)^{27} \approx 0.221" />
                            </div>
                        </div>
                        <div>
                            <strong className="text-on-surface">d. New Scenario (p=0.10)</strong>
                            <p>
                                New Mean: <InlineMath math="30 \times 0.10 = 3.0" /> (vs 3.6)
                                <br />
                                New Variance: <InlineMath math="30 \times 0.1 \times 0.9 = 2.7" />
                                <br />
                                Old Variance: <InlineMath math="30 \times 0.12 \times 0.88 = 3.168" />
                                <br />
                                Lowering the rejection rate reduces both the expected number of rejections and the variability.
                            </p>
                        </div>
                    </div>
                }
            >
                <p className="mb-4">
                    A bank's credit card division reports that historically 12% of credit card applications are rejected. A bank officer reviews 30 applications in a day.
                </p>
                <ol className="list-[lower-alpha] space-y-4 pl-4">
                    <li>
                        <p>State the null hypothesis <InlineMath math="H_0: \mu = k" /> and alternative hypothesis <InlineMath math="H_a: \mu \neq k" /> for testing whether the rejection rate has changed, where <InlineMath math="k" /> is the expected number of rejections. Calculate the value of <InlineMath math="k" />.</p>
                    </li>
                    <li>
                        <p>If the officer rejects 7 applications, does this seem unusually high compared to the historical rate? Calculate the probability of rejecting 7 or more applications and interpret.</p>
                    </li>
                    <li>
                        <p>Calculate the probability of rejecting exactly 3 applications. Show all steps.</p>
                    </li>
                    <li>
                        <p>The bank wants to keep rejections below 10% to improve customer satisfaction. If they achieve <InlineMath math="p = 0.10" />, what would be the new expected number and variance for 30 applications? Compare with the current scenario (<InlineMath math="p = 0.12" />).</p>
                    </li>
                </ol>
            </Question>

            <Question
                number="5"
                title="Manufacturing Quality Control"
                answer={
                    <div className="space-y-4">
                        <div>
                            <strong className="text-on-surface">a. Single Component</strong>
                            <p>
                                <InlineMath math="P(\text{Fail}) = 1 - 0.95 = 0.05" />.
                                <br />
                                Modeled by a <strong>Bernoulli distribution</strong>.
                            </p>
                        </div>
                        <div>
                            <strong className="text-on-surface">b. Batch of 8</strong>
                            <ul className="list-none pl-0 space-y-2 mt-2">
                                <li>
                                    i) All 8 meet specs: <InlineMath math="(0.95)^8 \approx 0.6634" />
                                </li>
                                <li>
                                    ii) Exactly 7 meet specs: <InlineMath math="\binom{8}{7}(0.95)^7(0.05)^1 \approx 0.2793" />
                                </li>
                            </ul>
                        </div>
                        <div>
                            <strong className="text-on-surface">c. Production run of 100</strong>
                            <p>
                                <InlineMath math="E[X] = 100 \times 0.95 = 95" />.
                                <br />
                                <InlineMath math="\sigma = \sqrt{100 \times 0.95 \times 0.05} = \sqrt{4.75} \approx 2.18" />.
                                <br />
                                The standard deviation of 2.18 indicates that while we expect 95 good components, it would not be unusual to see anywhere from 93 to 97 good components in a typical run.
                            </p>
                        </div>
                        <div>
                            <strong className="text-on-surface">d. Minimizing Variance</strong>
                            <p>
                                Variance <InlineMath math="np(1-p)" /> is minimized when <InlineMath math="p" /> approaches 0 or 1.
                                <br />
                                To minimize variance, we would want <InlineMath math="p=1" /> (100% success rate).
                                <br />
                                <strong>Paradox:</strong> A "perfect" process has zero variance because the outcome is certain. In quality control, zero variance is the ultimate goal (every item is perfect), unlike in sampling where we often want variability to represent a population.
                            </p>
                        </div>
                    </div>
                }
            >
                <p className="mb-4">
                    A manufacturing company produces electronic components. Quality control data shows that each component has a 0.95 probability of meeting specifications (success). Components are tested independently.
                </p>
                <ol className="list-[lower-alpha] space-y-4 pl-4">
                    <li>
                        <p>For a single component, what is the probability it fails to meet specifications? What distribution models this single test?</p>
                    </li>
                    <li>
                        <p>A batch of 8 components is selected for testing. Calculate:</p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>i) The probability all 8 meet specifications</li>
                            <li>ii) The probability exactly 7 meet specifications</li>
                        </ul>
                    </li>
                    <li>
                        <p>In a production run of 100 components, calculate the expected number that will meet specifications and the standard deviation. Interpret what the standard deviation tells us about variability in production.</p>
                    </li>
                    <li>
                        <p>Suppose the variance you calculated in part (c) is considered too high by management. Without changing <InlineMath math="n = 100" />, what would the probability <InlineMath math="p" /> need to be to minimize the variance? Explain why this is paradoxical for a quality control scenario. (Hint: recall that <InlineMath math="\text{variance} = npq" /> is maximized when <InlineMath math="p = 0.5" />)</p>
                    </li>
                </ol>
            </Question>
        </div>
    );
}
