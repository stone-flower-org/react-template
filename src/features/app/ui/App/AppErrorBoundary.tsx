import { Component, PropsWithChildren } from 'react';

import { errorReporterProvider } from '@src/features/app/boot';

interface ErrorBoundaryState {
  error?: Error;
}

type ErrorBoundaryProps = PropsWithChildren;

export class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    errorReporterProvider.get().report(error);
  }

  render() {
    if (this.state.error) return this.state.error.message;
    return this.props.children;
  }
}
