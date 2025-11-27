import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BernoulliPage from './pages/BernoulliPage';
import BinomialPage from './pages/BinomialPage';
import VisualizerPage from './pages/VisualizerPage';
import CalculatorPage from './pages/CalculatorPage';
import QuizPage from './pages/QuizPage';
import LawOfLargeNumbersPage from './pages/LawOfLargeNumbersPage';
import NormalApproximationPage from './pages/NormalApproximationPage';
import ExamQuestionsPage from './pages/ExamQuestionsPage';
import 'katex/dist/katex.min.css';

function App() {
  useEffect(() => {
    document.title = "ChanceLab | Master Probability";
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bernoulli" element={<BernoulliPage />} />
          <Route path="/binomial" element={<BinomialPage />} />
          <Route path="/visualizer" element={<VisualizerPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/law-of-large-numbers" element={<LawOfLargeNumbersPage />} />
          <Route path="/normal-approximation" element={<NormalApproximationPage />} />
          <Route path="/exam-questions" element={<ExamQuestionsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
