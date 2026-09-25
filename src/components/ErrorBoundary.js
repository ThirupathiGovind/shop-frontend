import React from 'react';
import Message from './Message';

class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Message variant="danger">
          This page could not be loaded. Refresh the page to try again.
        </Message>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
