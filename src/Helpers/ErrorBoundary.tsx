import type React from 'react'
import { Component } from 'react'

interface ErrorBoundaryProps {
  children: JSX.Element
}
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false, error: null }

  static getDerivedStateFromError (): ErrorBoundaryState {
    return { hasError: true, error: null }
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo, 'Test')
    this.setState({ error })
  }

  render (): JSX.Element {
    if (this.state.hasError) {
      return <div className="card">
        <div className="card-body">
          {(this.state?.error as unknown as Error).message}
        </div>
      </div>
    }
    return this.props.children
  }
}
