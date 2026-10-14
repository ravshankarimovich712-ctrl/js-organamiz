import React, { useState, useEffect } from 'react';
import { compileReactComponent } from '../utils/codeRunner';
import { Play, AlertCircle, RefreshCw } from 'lucide-react';

interface ReactLivePreviewProps {
  code: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackKey: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ReactErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.fallbackKey !== this.props.fallbackKey && this.state.hasError) {
      this.setState({ hasError: false, errorMessage: '' });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs">
          <div className="flex items-center gap-2 font-bold mb-1">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>React Render Xatosi</span>
          </div>
          <p className="font-mono">{this.state.errorMessage}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export const ReactLivePreview: React.FC<ReactLivePreviewProps> = ({ code }) => {
  const [RenderedComponent, setRenderedComponent] = useState<React.ComponentType | null>(null);
  const [compileError, setCompileError] = useState<string | null>(null);
  const [renderCount, setRenderCount] = useState(0);

  const compile = () => {
    const { component, error } = compileReactComponent(code);
    if (error) {
      setCompileError(error);
      setRenderedComponent(null);
    } else {
      setCompileError(null);
      setRenderedComponent(() => component);
      setRenderCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    compile();
  }, [code]);

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 select-none">
        <div className="flex items-center gap-2">
          <Play className="w-3.5 h-3.5 text-sky-600" />
          <span className="font-semibold text-slate-800">Jonli React Komponenti (Live Preview)</span>
        </div>

        <button
          onClick={compile}
          title="Qayta renderlash"
          className="flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors text-xs"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Qayta ishga tushirish</span>
        </button>
      </div>

      <div className="p-4 min-h-[160px] bg-slate-50/50 flex flex-col justify-center">
        {compileError ? (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">React Komponentini aniqlab bo'lmadi:</span>
              <span>{compileError}</span>
            </div>
          </div>
        ) : RenderedComponent ? (
          <ReactErrorBoundary fallbackKey={`${renderCount}`}>
            <div className="w-full">
              <RenderedComponent />
            </div>
          </ReactErrorBoundary>
        ) : (
          <div className="text-center text-xs text-slate-400 italic">
            React komponentingiz shu yerda jonli ko'rinadi.
          </div>
        )}
      </div>
    </div>
  );
};
