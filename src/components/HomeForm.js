import React, { useState } from 'react';
import './HomeForm.css';

// Component for the initial quiz setup form
const HomeForm = ({ onSubmit }) => {
  // State for form data using a single object
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: ''
  });
  const [errors, setErrors] = useState({});

  // Categories available from the API
  const categories = [
    { id: 9, name: 'General Knowledge' },
    { id: 17, name: 'Science & Nature' },
    { id: 21, name: 'Sports' },
    { id: 23, name: 'History' }
  ];

  // Difficulty levels from the API
  const difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.difficulty) newErrors.difficulty = 'Please select a difficulty';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="home-form">
      <h1>Trivia Challenge</h1>
      <div className="instructions">
        <p>Welcome to the Trivia Challenge! Test your knowledge with a random question.</p>
        <p>Fill out the form below to get started:</p>
        <ol>
          <li>Enter your name</li>
          <li>Select a question category</li>
          <li>Choose a difficulty level</li>
          <li>Click "Start Quiz" to begin!</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your First Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Question Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
          >
            <option value="">-- Select Category --</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Question Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className={errors.difficulty ? 'error' : ''}
          >
            <option value="">-- Select Difficulty --</option>
            {difficulties.map(difficulty => (
              <option key={difficulty.id} value={difficulty.id}>
                {difficulty.name}
              </option>
            ))}
          </select>
          {errors.difficulty && <span className="error-message">{errors.difficulty}</span>}
        </div>

        <button type="submit" className="submit-btn">Start Quiz</button>
      </form>
    </div>
  );
};

export default HomeForm;
