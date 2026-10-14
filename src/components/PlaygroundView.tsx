import React, { useState } from 'react';
import { Play, Sparkles, Terminal, Layout, RefreshCw, FileCode, Check } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';
import { ReactLivePreview } from './ReactLivePreview';
import { ConsoleLogEntry } from '../types';
import { executeJavaScript } from '../utils/codeRunner';

const PRESET_SNIPPETS = [
  {
    title: 'Oddiy JS Hisoblar',
    type: 'js',
    code: `// Erkin JavaScript tajribasi
const narxlar = [15000, 42000, 8900, 31000];

// 20000 dan katta narxlar:
const qimmatlar = narxlar.filter(n => n > 20000);
console.log("Qimmat mahsulotlar:", qimmatlar);

// 12% QQS qo'shilgan narxlar:
const qqsBilan = narxlar.map(n => Math.round(n * 1.12));
console.log("QQS bilan:", qqsBilan);

const umumiy = narxlar.reduce((sum, n) => sum + n, 0);
console.log("Umumiy summa:", umumiy, "so'm");
`,
  },
  {
    title: 'React Hisoblagich & Ranglar',
    type: 'react',
    code: `function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#0284c7");

  const colors = ["#0284c7", "#10b981", "#8b5cf6", "#f43f5e"];

  return (
    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
      <h2 style={{ color, fontSize: '24px', fontWeight: 'bold' }}>
        Sanoq: {count}
      </h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
        Tugmalarni bosib o'zgartiring
      </p>

      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '8px 16px', background: color, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          +1 Qo'shish
        </button>
        <button
          onClick={() => setCount(0)}
          style={{ padding: '8px 16px', background: '#e2e8f0', color: '#0f172a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          0 ga tenglash
        </button>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#64748b' }}>Rang tanlang:</span>
        {colors.map(c => (
          <button
            key={c}
            onClick={() => setColor(c)}
            style={{ width: '24px', height: '24px', borderRadius: '50%', background: c, border: color === c ? '2px solid #0f172a' : 'none', cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
}
`,
  },
  {
    title: 'Asinxron Ma\'lumot Olish',
    type: 'js',
    code: `// Simulyatsiya qilingan server so'rovi
async function fetchWeather(city) {
  console.log(city + " shahri ob-havosi yuklanmoqda...");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city: city,
        temp: 24,
        condition: "Quyoshli va iliq"
      });
    }, 600);
  });
}

async function start() {
  const data = await fetchWeather("Toshkent");
  console.log("Natija keldi:", data);
  console.log("Havo harorati:", data.temp + "°C");
}

start();
`,
  },
];

export const PlaygroundView: React.FC = () => {
  const [code, setCode] = useState(PRESET_SNIPPETS[0].code);
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([]);
  const [execResult, setExecResult] = useState<unknown>(undefined);
  const [execError, setExecError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'js' | 'react'>('js');

  const handleRun = async () => {
    setIsRunning(true);
    setExecError(null);
    const { logs: resLogs, result, error } = await executeJavaScript(code);
    setLogs(resLogs);
    setExecResult(result);
    setExecError(error);
    setIsRunning(false);
  };

  const handleSelectSnippet = (snippet: typeof PRESET_SNIPPETS[0]) => {
    setCode(snippet.code);
    setMode(snippet.type as 'js' | 'react');
    setLogs([]);
    setExecResult(undefined);
    setExecError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Interaktiv Qumloq (Sandbox)</span>
            <span aria-hidden="true">·</span>
            <span>Erkin Kod Sinovi</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Laboratoriya (Playground)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Xohlagan JavaScript kodingizni yoki React komponentingizni yozib, real vaqtda natijasini tekshiring.
          </p>
        </div>

        {/* Templates Dropdown/Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Shablonlar:</span>
          {PRESET_SNIPPETS.map((snippet) => (
            <button
              key={snippet.title}
              onClick={() => handleSelectSnippet(snippet)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              {snippet.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
            {/* Mode switch */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs">
              <button
                onClick={() => setMode('js')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  mode === 'js'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                JavaScript
              </button>
              <button
                onClick={() => setMode('react')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  mode === 'react'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                React (JSX)
              </button>
            </div>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? "Ishlamoqda..." : "Ishga Tushirish"}</span>
            </button>
          </div>

          <CodeEditor
            value={code}
            onChange={setCode}
            minHeight="420px"
            label={mode === 'react' ? 'React (JSX) Muharriri' : 'JavaScript Muharriri'}
          />
        </div>

        {/* Outputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {mode === 'react' && (
            <ReactLivePreview code={code} />
          )}

          <ConsoleOutput
            logs={logs}
            onClear={() => setLogs([])}
            resultValue={execResult}
            error={execError}
          />
        </div>
      </div>
    </div>
  );
};
