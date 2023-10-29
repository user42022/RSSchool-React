import { Component } from 'react';
import { ErrorButtonState } from '../../../types/types';
import './ErrorButton.css';

class ErrorButton extends Component<Record<string, never>, ErrorButtonState> {
  state = { error: false };

  render() {
    if (this.state.error) {
      throw new Error(`User's error`);
    }

    return (
      <button
        onClick={() => this.setState({ error: true })}
        className="error-button"
      >
        Error
      </button>
    );
  }
}

export default ErrorButton;
