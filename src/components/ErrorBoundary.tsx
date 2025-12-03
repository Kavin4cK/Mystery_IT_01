'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-black text-red-400 font-mono flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-red-400">
              SYSTEM ERROR DETECTED
            </h1>
            <div className="bg-gray-900/80 border border-red-400/50 rounded-lg p-6 mb-6">
              <div className="text-left">
                <div className="text-red-400 font-mono text-sm mb-2">
                  ERROR TYPE: {this.state.error?.name || 'Unknown Error'}
                </div>
                <div className="text-red-300 font-mono text-sm mb-4">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </div>
                <div className="text-red-400/70 font-mono text-xs">
                  This error has been logged. Please try refreshing the page or return to the mainframe.
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded font-mono transition-all duration-200 hover-lift"
              >
                [ RESTART SYSTEM ]
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-700 hover:bg-gray-600 text-green-400 font-bold py-3 px-6 rounded font-mono transition-all duration-200 hover-lift"
              >
                [ RETURN TO MAINFRAME ]
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-6 text-left">
                <summary className="text-red-400 cursor-pointer font-mono text-sm">
                  Technical Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-gray-900 rounded text-red-300 text-xs overflow-auto">
                  {this.state.error?.stack}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
