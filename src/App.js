import React, { useState } from 'react';
import './App.css';
import HomeForm from './components/HomeForm';
import QuestionForm from './components/QuestionForm';
import ResultsSection from './components/ResultsSection';

// Main App component
function App() {
  // Basic state setup for user info
  const [userState, setUserState] = useState({
    name: '',
    category: '',
    difficulty: '',
  });
  
  // States for question flow
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Function to fetch a question from the API
  const fetchQuestion = async (userData) => {
    setIsLoading(true);
    setError(null);
    setUserState(userData);
    setShowResults(false);

    try {
      const url = `https://opentdb.com/api.php?amount=1&category=${userData.category}&difficulty=${userData.difficulty}&type=multiple`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.response_code !== 0 || !data.results || data.results.length === 0) {
        throw new Error('Failed to fetch questions. Please try again.');
      }

      const questionData = data.results[0];
      // Shuffle answers for random order
      const allAnswers = [
        ...questionData.incorrect_answers,
        questionData.correct_answer
      ].sort(() => Math.random() - 0.5);

      setQuestion({
        ...questionData,
        all_answers: allAnswers
      });
      setCorrectAnswer(questionData.correct_answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user's answer submission
  const handleAnswerSubmit = (answer) => {
    setUserAnswer(answer);
    setIsCorrect(answer === correctAnswer);
    setShowResults(true);
  };

  // Reset quiz to start again
  const resetQuiz = () => {
    setQuestion(null);
    setUserAnswer('');
    setShowResults(false);
  };

  // Render different components based on quiz state
  return (
    <div className="App">
      <div className="quiz-container">
        {!question ? (
          <HomeForm onSubmit={fetchQuestion} />
        ) : !showResults ? (
          <QuestionForm 
            question={question} 
            isLoading={isLoading} 
            error={error} 
            onSubmit={handleAnswerSubmit} 
          />
        ) : (
          <ResultsSection
            name={userState.name}
            isCorrect={isCorrect}
            correctAnswer={correctAnswer}
            userAnswer={userAnswer}
            onReset={resetQuiz}
          />
        )}
      </div>
    </div>
  );
}

export default App;
