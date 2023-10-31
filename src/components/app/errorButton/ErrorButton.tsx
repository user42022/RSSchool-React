import { Component } from 'react';
import { ErrorButtonState } from '../../../types/types';
import './ErrorButton.css';

class ErrorButton extends Component<Record<string, never>, ErrorButtonState> {
  state = { error: false };

  causeError = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      throw new Error(`User's error`);
    }

    return (
      <button onClick={this.causeError} className="error-button">
        Error
      </button>
    );
  }
}

export default ErrorButton;
