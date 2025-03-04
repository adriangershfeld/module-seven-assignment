import React from 'react';
import './ResultsSection.css';

// Component to display the quiz results
const ResultsSection = ({ name, isCorrect, correctAnswer, userAnswer, onReset }) => {
  return (
    <div className="results-section">
      <h2>Results</h2>
      
      <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
        {isCorrect ? (
          <p>Congratulations, {name}! Your answer is correct!</p>
        ) : (
          <>
            <p>Sorry, {name}. Your answer is incorrect.</p>
            <div className="answer-details">
              <p>You answered: <span dangerouslySetInnerHTML={{ __html: userAnswer }}></span></p>
              <p>Correct answer: <span dangerouslySetInnerHTML={{ __html: correctAnswer }}></span></p>
            </div>
          </>
        )}
      </div>
      
      <button onClick={onReset} className="reset-btn">Try Another Question</button>
    </div>
  );
};

export default ResultsSection;
