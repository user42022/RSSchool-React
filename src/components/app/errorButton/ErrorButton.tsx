import { useState } from 'react';
import './ErrorButton.css';
import { useSearchParams } from 'react-router-dom';

function ErrorButton() {
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()

  const closeDetailedCard = () => {
    searchParams.delete('detailedId');
    setSearchParams(searchParams);
  };

  const causeError = () => {
    setError(true);
    closeDetailedCard();
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
