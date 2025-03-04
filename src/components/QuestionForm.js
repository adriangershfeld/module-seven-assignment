import React, { useState } from 'react';
import './QuestionForm.css';

// Component to display the question and accept an answer
const QuestionForm = ({ question, isLoading, error, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [formError, setFormError] = useState('');

  // Handle radio button selection
  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
    setFormError('');
  };

  // Validate and submit the answer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) {
      setFormError('Please select an answer');
      return;
    }
    onSubmit(selectedAnswer);
  };

  // Show loading state
  if (isLoading) {
    return <div className="loading">Loading your question...</div>;
  }

  // Show error message if API call failed
  if (error) {
    return <div className="error-container">
      <p className="error-message">Error: {error}</p>
    </div>;
  }

  return (
    <div className="question-form">
      <h2>Question</h2>
      
      {question && (
        <form onSubmit={handleSubmit}>
          <div className="question-text">
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
          </div>
          
          <div className="answers-container">
            {question.all_answers.map((answer, index) => (
              <div key={index} className="answer-option">
                <input
                  type="radio"
                  id={`answer-${index}`}
                  name="answer"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={handleAnswerChange}
                />
                <label htmlFor={`answer-${index}`} dangerouslySetInnerHTML={{ __html: answer }}></label>
              </div>
            ))}
          </div>
          
          {formError && <p className="form-error">{formError}</p>}
          
          <button type="submit" className="submit-btn">Submit Answer</button>
        </form>
      )}
    </div>
  );
};

export default QuestionForm;
