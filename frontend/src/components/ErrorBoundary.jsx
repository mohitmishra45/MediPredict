import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        <AlertTriangle className="text-red-500" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">Something went wrong</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md leading-relaxed">
                        We encountered an unexpected error while rendering this component.
                        <br />
                        <span className="text-sm opacity-70 mt-2 block font-mono bg-black/10 dark:bg-white/5 p-2 rounded">
                            {this.state.error?.toString()}
                        </span>
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => window.location.reload()}
                        className="shadow-lg hover:shadow-xl"
                    >
                        Refresh Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
