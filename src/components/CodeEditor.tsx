import React, { useRef, useMemo } from 'react';
import { RotateCcw, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onReset?: () => void;
  readOnly?: boolean;
  minHeight?: string;
  label?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  onReset,
  readOnly = false,
  minHeight = '300px',
  label = 'JavaScript / JSX Muharriri',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = React.useState(false);

  // Calculate line numbers
  const lines = useMemo(() => {
    return value.split('\n').map((_, index) => index + 1);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-lg border border-slate-700 bg-slate-900 overflow-hidden shadow-xs">
      {/* Editor top status bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950 border-b border-slate-800 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
          <span className="text-slate-300 font-medium">{label}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500 tabular-nums">{lines.length} qator</span>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              title="Kodni qayta tiklash"
              className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors text-xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Tiklash</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Nusxalash"
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors text-xs"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Nusxalandi</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Nusxa</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor content area with synchronized line numbers */}
      <div className="relative flex font-mono text-sm leading-6 overflow-auto" style={{ minHeight }}>
        {/* Line Numbers */}
        <div className="py-3 px-3 bg-slate-950/60 text-slate-600 text-right select-none border-r border-slate-800 tabular-nums text-xs font-mono shrink-0">
          {lines.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          className="w-full flex-1 p-3 bg-transparent text-slate-100 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none whitespace-pre overflow-x-auto dark-scrollbar caret-sky-400"
          style={{ minHeight }}
        />
      </div>
    </div>
  );
};
