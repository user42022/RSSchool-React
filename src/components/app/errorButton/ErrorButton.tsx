import { useContext, useState } from 'react';
import './ErrorButton.css';
import AppContext from '../AppContext/AppContext';

function ErrorButton() {
  const [error, setError] = useState(false);
  const context = useContext(AppContext);

  const causeError = () => {
    setError(true);
    context?.closeDetailedCard();
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
