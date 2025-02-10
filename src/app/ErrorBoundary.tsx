import React from 'react';
import Button from '../shared/Button';

interface IErrProps {
  children: React.ReactNode;
}

interface IErrState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IErrProps, IErrState> {
  declare state: Readonly<IErrState>;

  constructor(props: IErrProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>Something went wrong 😢</h3>
          <Button
            text={'refresh page'}
            callback={() => {
              window.location.reload();
            }}
          ></Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
