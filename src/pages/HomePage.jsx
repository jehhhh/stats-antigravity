
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Activity, Calculator, TrendingUp, BarChart2, CheckCircle, FileQuestion, Share2, Split } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, to, colorClass }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(to)}
            className="group relative overflow-hidden bg-surface rounded-[24px] p-6 border border-outline/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
        >
            <div className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{description}</p>
            <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
            </div>
        </div>
    );
};

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-12 animate-fade-in pb-12">
            {/* Hero Section */}
            <section className="relative bg-primary-container rounded-[32px] p-8 lg:p-16 overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                        Interactive Statistics Learning
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-on-primary-container mb-6 leading-tight">
                        Master Probability with <span className="text-primary">ChanceLab</span>
                    </h1>
                    <p className="text-lg text-on-primary-container/80 mb-8 leading-relaxed max-w-lg">
                        Dive deep into Bernoulli and Binomial distributions through interactive simulations, real-world examples, and visual learning tools.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => navigate('/bernoulli')}
                            className="material-btn-primary text-lg px-8 py-4"
                        >
                            Start Learning
                        </button>
                        <button
                            onClick={() => navigate('/visualizer')}
                            className="material-btn-tonal text-lg px-8 py-4"
                        >
                            Try Visualizer
                        </button>
                    </div>
                </div>

                {/* Abstract Decorative Elements */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10 lg:opacity-20">
                    <div className="absolute top-1/4 right-[-10%] w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] right-[20%] w-64 h-64 bg-tertiary rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Modules Grid */}
            <section>
                <h2 className="text-2xl font-bold text-on-surface mb-8 px-2">Learning Modules</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        to="/bernoulli"
                        icon={BookOpen}
                        title="Bernoulli Distribution"
                        description="Understand the fundamental building block of binary outcomes. History, definition, and properties."
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                    <FeatureCard
                        to="/binomial"
                        icon={BookOpen}
                        title="Binomial Distribution"
                        description="Scale up to multiple trials. Learn about the BINS conditions and the formula."
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                    <FeatureCard
                        to="/visualizer"
                        icon={Activity}
                        title="Interactive Visualizer"
                        description="Play with parameters n and p to see how the distribution shape changes in real-time."
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                    <FeatureCard
                        to="/calculator"
                        icon={Calculator}
                        title="Probability Calculator"
                        description="Solve complex problems with step-by-step breakdowns and LaTeX formulas."
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                    <FeatureCard
                        to="/law-of-large-numbers"
                        icon={TrendingUp}
                        title="Law of Large Numbers"
                        description="Run simulations to see probability convergence in action."
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                    <FeatureCard
                        to="/viral-trends"
                        icon={Share2}
                        title="Viral Trends"
                        description="Simulate social media virality. Will your post spread or flop?"
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                    <FeatureCard
                        to="/ab-testing"
                        icon={Split}
                        title="A/B Testing"
                        description="Run business experiments to optimize conversion rates."
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                    <FeatureCard
                        to="/normal-approximation"
                        icon={BarChart2}
                        title="Normal Approximation"
                        description="Visualize the Central Limit Theorem and how Binomial approaches Normal."
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                    <FeatureCard
                        to="/quiz"
                        icon={CheckCircle}
                        title="Knowledge Check"
                        description="Test your understanding with 20 interactive questions and instant feedback."
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                    <FeatureCard
                        to="/exam-questions"
                        icon={FileQuestion}
                        title="Exam Questions"
                        description="Practice with 5 comprehensive exam-style questions covering all topics."
                        colorClass="bg-primary-container text-on-primary-container"
                    />
                </div>
            </section>

            {/* Project Team Section */}
            <section className="bg-surface rounded-[24px] p-8 border border-outline/10">
                <h2 className="text-2xl font-bold text-on-surface mb-6">Project Team</h2>
                <div className="bg-surface-variant/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Group - 1</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {['Jay Aherkar', 'Nihar Asawa', 'Kabeer Pandey', 'Lakshya Vhora', 'Maanas Jain'].map((name, index) => (
                            <li key={index} className="flex items-center text-on-surface-variant">
                                <span className="w-2 h-2 rounded-full bg-primary/50 mr-3"></span>
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
