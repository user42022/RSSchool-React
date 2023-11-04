import { useState } from 'react';
import './ErrorButton.css';

function ErrorButton() {
  const [error, setError] = useState(false);

  const causeError = () => {
    setError(true);
  };

  if (error) {
    throw new Error(`User's error`);
  }

  return (
    <button onClick={causeError} className="error-button">
      Error
    </button>
  );
}

export default ErrorButton;
