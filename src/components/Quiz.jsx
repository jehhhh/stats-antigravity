import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

const questions = [
    {
        id: 1,
        question: "Which of the following is NOT a property of a Binomial Experiment?",
        options: [
            "The experiment consists of n identical trials",
            "Each trial results in one of two outcomes (success/failure)",
            "The probability of success changes from trial to trial",
            "The trials are independent"
        ],
        correct: 2,
        explanation: "In a Binomial experiment, the probability of success (p) must remain constant for all trials. If it changes (e.g., drawing without replacement), it is not a Binomial distribution."
    },
    {
        id: 2,
        question: "What is the expected value of a Bernoulli distribution with probability of success p?",
        options: ["np", "p", "p(1-p)", "1-p"],
        correct: 1,
        explanation: "For a Bernoulli distribution (single trial), the expected value is simply p. The formula np applies to the Binomial distribution where n > 1."
    },
    {
        id: 3,
        question: "If you flip a fair coin 10 times, what is the expected number of heads?",
        options: ["2.5", "5", "7.5", "10"],
        correct: 1,
        explanation: "Using the formula E(X) = np: n=10, p=0.5. So, 10 × 0.5 = 5."
    },
    {
        id: 4,
        question: "When is the variance of a Binomial distribution maximized?",
        options: ["When p = 0", "When p = 0.5", "When p = 1", "When p = 0.1"],
        correct: 1,
        explanation: "Variance is np(1-p). This value is maximized when p = 0.5, as the product p(1-p) reaches its peak at 0.5."
    },
    {
        id: 5,
        question: "A factory produces light bulbs where 5% are defective. In a sample of 20 bulbs, which formula correctly calculates the probability of exactly 2 defective bulbs?",
        options: [
            "20C2 * (0.05)^2 * (0.95)^18",
            "20C2 * (0.95)^2 * (0.05)^18",
            "20C2 * (0.05)^18 * (0.95)^2",
            "(0.05)^2 * (0.95)^18"
        ],
        correct: 0,
        explanation: "Using P(X=r) = nCr * p^r * q^(n-r): n=20, r=2, p=0.05 (defective), q=0.95. So 20C2 * (0.05)^2 * (0.95)^18."
    },
    {
        id: 6,
        question: "What is the relationship between Bernoulli and Binomial distributions?",
        options: [
            "They are unrelated",
            "Binomial is a special case of Bernoulli where n=1",
            "Bernoulli is a special case of Binomial where n=1",
            "Bernoulli is for continuous variables, Binomial for discrete"
        ],
        correct: 2,
        explanation: "A Bernoulli distribution represents a single trial (n=1). A Binomial distribution represents the sum of n independent Bernoulli trials."
    },
    {
        id: 7,
        question: "In the formula P(X=r) = nCr p^r q^(n-r), what does nCr represent?",
        options: [
            "The probability of one specific sequence of outcomes",
            "The number of ways to arrange r successes in n trials",
            "The average number of successes",
            "The variance of the distribution"
        ],
        correct: 1,
        explanation: "nCr (combinations) counts how many different ways we can have exactly r successes in n trials, regardless of order."
    },
    {
        id: 8,
        question: "If X ~ B(n, p) and n increases while p remains constant, what happens to the variance?",
        options: ["It increases", "It decreases", "It stays the same", "It becomes zero"],
        correct: 0,
        explanation: "Variance = np(1-p). Since p and (1-p) are constant positive values, increasing n will directly increase the variance."
    },
    {
        id: 9,
        question: "Who is credited with the first rigorous proof of the Law of Large Numbers using Bernoulli trials?",
        options: ["Isaac Newton", "Blaise Pascal", "Jacob Bernoulli", "Pierre-Simon Laplace"],
        correct: 2,
        explanation: "Jacob Bernoulli proved that as the number of trials increases, the observed frequency converges to the theoretical probability in his work 'Ars Conjectandi'."
    },
    {
        id: 10,
        question: "In hypothesis testing for a proportion, what does the Null Hypothesis (H0) typically represent?",
        options: [
            "The claim we want to prove",
            "The status quo or 'no effect' assumption (e.g., p = 0.5)",
            "The probability of making an error",
            "The sample size"
        ],
        correct: 1,
        explanation: "The Null Hypothesis usually assumes no difference or a specific standard value (like p=0.5 for a fair coin) until proven otherwise."
    },
    {
        id: 11,
        question: "If p = 0.3 and n = 10 (Martin's Store), what is q (probability of failure)?",
        options: ["0.3", "0.5", "0.7", "10"],
        correct: 2,
        explanation: "q is simply 1 - p. So if p = 0.3, then q = 1 - 0.3 = 0.7."
    },
    {
        id: 12,
        question: "Which of the following scenarios is best modeled by a Bernoulli distribution?",
        options: [
            "The number of customers entering a store in an hour",
            "The height of students in a class",
            "A single coin flip resulting in Heads or Tails",
            "The time it takes to finish a test"
        ],
        correct: 2,
        explanation: "Bernoulli models a SINGLE trial with two outcomes. A coin flip is the classic example."
    },
    {
        id: 13,
        question: "What is the variance of a Bernoulli trial with p = 0.8?",
        options: ["0.8", "0.2", "0.16", "0.64"],
        correct: 2,
        explanation: "Variance = p(1-p) = 0.8 * 0.2 = 0.16."
    },
    {
        id: 14,
        question: "In a Binomial distribution, if n=100 and p=0.5, what is the standard deviation?",
        options: ["5", "25", "50", "10"],
        correct: 0,
        explanation: "Variance = npq = 100 * 0.5 * 0.5 = 25. Standard deviation is the square root of variance, so √25 = 5."
    },
    {
        id: 15,
        question: "What does the 'I' in the BINS acronym stand for?",
        options: ["Identical", "Independent", "Integer", "Infinite"],
        correct: 1,
        explanation: "I stands for Independent trials - the outcome of one trial does not affect the others."
    },
    {
        id: 16,
        question: "If you conduct a hypothesis test and calculate a P-value of 0.03 (with alpha = 0.05), what is your conclusion?",
        options: [
            "Reject the Null Hypothesis",
            "Fail to reject the Null Hypothesis",
            "Accept the Null Hypothesis",
            "The test is inconclusive"
        ],
        correct: 0,
        explanation: "Since the P-value (0.03) is less than the significance level (0.05), we have sufficient evidence to reject the Null Hypothesis."
    },
    {
        id: 17,
        question: "Which distribution would you use to model the number of aces in 5 draws from a deck WITH replacement?",
        options: ["Bernoulli", "Binomial", "Normal", "Poisson"],
        correct: 1,
        explanation: "Since we are drawing WITH replacement, p remains constant, trials are independent, and n is fixed (5). This is a Binomial experiment."
    },
    {
        id: 18,
        question: "Which distribution would you use to model the number of aces in 5 draws from a deck WITHOUT replacement?",
        options: ["Bernoulli", "Binomial", "Hypergeometric", "Normal"],
        correct: 2,
        explanation: "Without replacement, the probability changes after each draw, violating the 'Same Probability' condition of Binomial. This is a Hypergeometric distribution (though not covered here, knowing it's NOT Binomial is key)."
    },
    {
        id: 19,
        question: "For a Binomial distribution X ~ B(n, p), what is E[3X]?",
        options: ["3np", "np", "3 + np", "9np"],
        correct: 0,
        explanation: "By linearity of expectation, E[aX] = aE[X]. So E[3X] = 3 * E[X] = 3np."
    },
    {
        id: 20,
        question: "Martin's store has p=0.3. If 1000 customers enter, what is the expected number of purchases?",
        options: ["30", "300", "700", "1000"],
        correct: 1,
        explanation: "E[X] = np = 1000 * 0.3 = 300."
    }
];

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleOptionSelect = (index) => {
        if (showFeedback) return;
        setSelectedOption(index);
        setShowFeedback(true);
        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setShowFeedback(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setShowFeedback(false);
        setScore(0);
        setQuizCompleted(false);
    };

    if (quizCompleted) {
        return (
            <div className="p-8 text-center">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Quiz Completed!</h3>
                <p className="text-lg text-slate-600 mb-8">
                    You scored <span className="font-bold text-indigo-600">{score}</span> out of <span className="font-bold text-indigo-600">{questions.length}</span>
                </p>
                <button
                    onClick={resetQuiz}
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Retake Quiz
                </button>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="p-6 lg:p-8">
            <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Score: {score}
                </span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-6 leading-relaxed">
                {question.question}
            </h3>

            <div className="space-y-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={showFeedback}
                        className={clsx(
                            "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group",
                            showFeedback
                                ? index === question.correct
                                    ? "border-green-500 bg-green-50 text-green-900"
                                    : index === selectedOption
                                        ? "border-red-500 bg-red-50 text-red-900"
                                        : "border-slate-200 opacity-50"
                                : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                        )}
                    >
                        <span className="font-medium">{option}</span>
                        {showFeedback && index === question.correct && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {showFeedback && index === selectedOption && index !== question.correct && (
                            <XCircle className="w-5 h-5 text-red-600" />
                        )}
                    </button>
                ))}
            </div>

            {showFeedback && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-2">
                    <div className={clsx(
                        "p-6 rounded-xl border mb-6",
                        selectedOption === question.correct
                            ? "bg-green-50 border-green-200 text-green-900"
                            : "bg-red-50 border-red-200 text-red-900"
                    )}>
                        <p className="font-bold mb-2">
                            {selectedOption === question.correct ? "Correct!" : "Incorrect"}
                        </p>
                        <p className="text-sm opacity-90 leading-relaxed">
                            {question.explanation}
                        </p>
                    </div>

                    <button
                        onClick={nextQuestion}
                        className="w-full py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center"
                    >
                        {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
}
