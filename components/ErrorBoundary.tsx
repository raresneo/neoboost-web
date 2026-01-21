import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };



    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (
                <div className="bg-black text-[#3A86FF] min-h-screen flex flex-col items-center justify-center p-8 text-center font-mono">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-widest border border-[#3A86FF] p-4">System Malfunction</h1>
                    <p className="text-white mb-2">A critical error occurred.</p>
                    <pre className="text-xs text-red-400 bg-white/5 p-4 rounded max-w-2xl overflow-auto text-left">
                        {this.state.error?.toString()}
                    </pre>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-2 bg-[#3A86FF] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                    >
                        Reboot System (Reload)
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
