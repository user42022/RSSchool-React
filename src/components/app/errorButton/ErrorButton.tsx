import { useState } from 'react';
import './ErrorButton.css';

type ErrorButtonProps = {
  closeDetailed: () => void;
};

function ErrorButton(props: ErrorButtonProps) {
  const [error, setError] = useState(false);

  const causeError = () => {
    setError(true);
    props.closeDetailed();
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
