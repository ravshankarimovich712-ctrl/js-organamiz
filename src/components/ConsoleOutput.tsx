import React from 'react';
import { Terminal, Trash2, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { ConsoleLogEntry } from '../types';

interface ConsoleOutputProps {
  logs: ConsoleLogEntry[];
  onClear: () => void;
  resultValue?: unknown;
  error?: string | null;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  logs,
  onClear,
  resultValue,
  error,
}) => {
  return (
    <div className="flex flex-col rounded-lg border border-slate-700 bg-slate-900 overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950 border-b border-slate-800 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2 font-mono">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-300 font-medium">Terminal & Konsol</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500 tabular-nums">{logs.length} chiqish</span>
        </div>

        {logs.length > 0 && (
          <button
            onClick={onClear}
            title="Konsolni tozalash"
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors text-xs"
          >
            <Trash2 className="w-3 h-3" />
            <span>Tozalash</span>
          </button>
        )}
      </div>

      <div className="p-3 font-mono text-xs leading-5 max-h-56 min-h-[120px] overflow-y-auto space-y-1.5 dark-scrollbar">
        {logs.length === 0 && !error && resultValue === undefined && (
          <div className="text-slate-500 italic py-6 text-center select-none">
            Konsol bo'sh. Natijani ko'rish uchun "Kodni Ishga Tushirish" tugmasini bosing.
          </div>
        )}

        {logs.map((log, index) => {
          let icon = <Info className="w-3 h-3 text-sky-400 shrink-0 mt-0.5" />;
          let textColor = 'text-slate-200';

          if (log.type === 'error') {
            icon = <AlertCircle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />;
            textColor = 'text-rose-300';
          } else if (log.type === 'warn') {
            icon = <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />;
            textColor = 'text-amber-300';
          } else if (log.type === 'success') {
            icon = <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />;
            textColor = 'text-emerald-300';
          }

          return (
            <div key={index} className="flex items-start gap-2">
              {icon}
              <pre className={`whitespace-pre-wrap break-all ${textColor}`}>
                {log.content}
              </pre>
            </div>
          );
        })}

        {resultValue !== undefined && (
          <div className="pt-2 border-t border-slate-800 text-slate-400 flex items-start gap-2">
            <span className="text-emerald-400 font-semibold select-none">&lt;= Qaytarilgan qiymat:</span>
            <span className="text-emerald-300 font-bold">{String(resultValue)}</span>
          </div>
        )}

        {error && (
          <div className="p-2 bg-rose-950/40 border border-rose-800/60 rounded text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Kompilyatsiya / Ijro xatosi:</span>
              <span className="text-rose-200">{error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
