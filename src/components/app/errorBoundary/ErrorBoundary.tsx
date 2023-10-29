import { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state: { error: null | Error } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <>
          <div className="error-message">{error.message}</div>
          {this.props.children}
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
