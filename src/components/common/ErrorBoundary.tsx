// src/components/common/ErrorBoundary.tsx

import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Container } from './Container'
import { Button } from '@/components/ui/Button'
import { RefreshCw, AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch rendering errors gracefully
 * Prevents the entire app from crashing on component errors
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="bg-primary flex min-h-screen items-center justify-center">
          <Container className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="font-display text-text-primary mb-4 text-2xl font-bold">
              Something went wrong
            </h1>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="bg-secondary text-text-muted mb-8 max-w-lg mx-auto overflow-auto rounded p-4 text-left text-sm">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex justify-center gap-4">
              <Button
                variant="primary"
                onClick={this.handleRetry}
                rightIcon={<RefreshCw className="h-4 w-4" />}
              >
                Try Again
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          </Container>
        </div>
      )
    }

    return this.props.children
  }
}
