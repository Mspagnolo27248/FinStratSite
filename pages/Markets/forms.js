import React, { useState } from 'react';

function forms() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const minLength = 5;
    const maxLength = 10;

    if (inputValue.length < minLength || inputValue.length > maxLength) {
      setError(`Input must be between ${minLength} and ${maxLength} characters`);
    } else {
      setError('');
      // Submit the form
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input-field">Input:</label>
      <input id="input-field" type="text" value={inputValue} onChange={handleInputChange} />
      {error && <div className="error">{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default forms