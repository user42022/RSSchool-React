import { Component } from 'react';
import './ErrorButton.css';

class ErrorButton extends Component {
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
