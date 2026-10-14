import React, { useState, useEffect, useMemo, useCallback, useRef, Fragment } from 'react';
import * as Babel from '@babel/standalone';
import { ConsoleLogEntry, TestResult, TestCase } from '../types';

/**
 * Format any value into readable string for console output
 */
export function formatValue(val: unknown): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'function') return val.toString();
  if (typeof val === 'object') {
    try {
      return JSON.stringify(val, null, 2);
    } catch {
      return String(val);
    }
  }
  return String(val);
}

/**
 * Executes arbitrary JavaScript code and captures all console logs safely
 */
export async function executeJavaScript(
  code: string,
  timeoutMs = 3000
): Promise<{ logs: ConsoleLogEntry[]; result: unknown; error: string | null }> {
  const logs: ConsoleLogEntry[] = [];

  const mockConsole = {
    log: (...args: unknown[]) => {
      logs.push({
        type: 'log',
        content: args.map(formatValue).join(' '),
        timestamp: Date.now(),
      });
    },
    info: (...args: unknown[]) => {
      logs.push({
        type: 'info',
        content: args.map(formatValue).join(' '),
        timestamp: Date.now(),
      });
    },
    warn: (...args: unknown[]) => {
      logs.push({
        type: 'warn',
        content: args.map(formatValue).join(' '),
        timestamp: Date.now(),
      });
    },
    error: (...args: unknown[]) => {
      logs.push({
        type: 'error',
        content: args.map(formatValue).join(' '),
        timestamp: Date.now(),
      });
    },
  };

  try {
    // If the code has JSX or modern syntax, transpile it
    let transpiled = code;
    try {
      const transformResult = Babel.transform(code, {
        presets: ['env', 'react'],
      });
      if (transformResult?.code) {
        transpiled = transformResult.code;
      }
    } catch {
      // Fallback to raw code if Babel transform fails (e.g. standard JS with syntax error will be caught below)
      transpiled = code;
    }

    // Prepare sandbox runner
    const runAsync = new Promise<{ result: unknown; logs: ConsoleLogEntry[] }>((resolve, reject) => {
      try {
        // Build function with sandboxed console and React utilities
        const fn = new Function(
          'console',
          'React',
          'useState',
          'useEffect',
          'useMemo',
          'useCallback',
          'useRef',
          'Fragment',
          `"use strict";
           try {
             const __evalResult = (function() {
               ${transpiled}
             })();
             return __evalResult;
           } catch(e) {
             throw e;
           }`
        );

        const res = fn(
          mockConsole,
          React,
          useState,
          useEffect,
          useMemo,
          useCallback,
          useRef,
          Fragment
        );

        // If returned promise, wait for it
        if (res instanceof Promise) {
          res
            .then((asyncRes) => resolve({ result: asyncRes, logs }))
            .catch((err) => reject(err));
        } else {
          resolve({ result: res, logs });
        }
      } catch (err) {
        reject(err);
      }
    });

    // Timeout guard to prevent infinite loops (e.g., while(true))
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Vaqt tugadi: Cheksiz tsikl (infinite loop) aniqlangan bo'lishi mumkin!")), timeoutMs);
    });

    const execution = await Promise.race([runAsync, timeoutPromise]);
    return { logs, result: execution.result, error: null };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logs.push({
      type: 'error',
      content: `Xatolik: ${errorMsg}`,
      timestamp: Date.now(),
    });
    return { logs, result: undefined, error: errorMsg };
  }
}

/**
 * Runs automated test cases against user code
 */
export async function runTestCases(
  userCode: string,
  testCases: TestCase[]
): Promise<{ testResults: TestResult[]; allPassed: boolean; logs: ConsoleLogEntry[] }> {
  const testResults: TestResult[] = [];
  const combinedLogs: ConsoleLogEntry[] = [];

  for (const tc of testCases) {
    const testLogs: ConsoleLogEntry[] = [];
    const mockConsole = {
      log: (...args: unknown[]) => {
        const line = args.map(formatValue).join(' ');
        testLogs.push({ type: 'log', content: line, timestamp: Date.now() });
      },
      error: (...args: unknown[]) => {
        testLogs.push({ type: 'error', content: args.map(formatValue).join(' '), timestamp: Date.now() });
      },
      warn: (...args: unknown[]) => {
        testLogs.push({ type: 'warn', content: args.map(formatValue).join(' '), timestamp: Date.now() });
      },
      info: (...args: unknown[]) => {
        testLogs.push({ type: 'info', content: args.map(formatValue).join(' '), timestamp: Date.now() });
      },
    };

    try {
      // Transpile user code and test script together
      const combinedScript = `
        ${userCode}
        
        // --- TEST CHECK ---
        return (function() {
          ${tc.testFn}
        })();
      `;

      let transpiled = combinedScript;
      try {
        const transResult = Babel.transform(combinedScript, {
          presets: ['env', 'react'],
        });
        if (transResult?.code) {
          transpiled = transResult.code;
        }
      } catch (babelErr) {
        throw new BabelError(babelErr instanceof Error ? babelErr.message : 'Sintaksis xatosi');
      }

      const runner = new Function(
        'console',
        'React',
        'useState',
        'useEffect',
        'useMemo',
        'useCallback',
        'useRef',
        'Fragment',
        `"use strict";
         ${transpiled}`
      );

      const result = runner(
        mockConsole,
        React,
        useState,
        useEffect,
        useMemo,
        useCallback,
        useRef,
        Fragment
      );

      let passed = false;
      if (result === true) {
        passed = true;
      } else if (result === false) {
        passed = false;
      } else if (result !== undefined && tc.expectedValue) {
        passed = String(result).trim() === tc.expectedValue.trim();
      } else {
        // Truthy check
        passed = Boolean(result);
      }

      testResults.push({
        testId: tc.id,
        description: tc.description,
        passed,
        actual: formatValue(result),
        expected: tc.expectedValue,
      });

      combinedLogs.push(...testLogs);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      testResults.push({
        testId: tc.id,
        description: tc.description,
        passed: false,
        error: msg,
      });
    }
  }

  const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
  return { testResults, allPassed, logs: combinedLogs };
}

class BabelError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BabelError';
  }
}

/**
 * Transpiles user React code and returns a component that can be rendered dynamically
 */
export function compileReactComponent(code: string): {
  component: React.ComponentType | null;
  error: string | null;
} {
  try {
    const transformResult = Babel.transform(code, {
      presets: ['env', 'react'],
    });
    const transpiled = transformResult?.code;

    if (!transpiled) {
      return { component: null, error: "Kodni kompilyatsiya qilib bo'lmadi" };
    }

    // We extract the component from the executed function
    const fn = new Function(
      'React',
      'useState',
      'useEffect',
      'useMemo',
      'useCallback',
      'useRef',
      'Fragment',
      `
      "use strict";
      let AppExport = null;
      ${transpiled}
      
      // Look for default export or common function names
      if (typeof App !== 'undefined') return App;
      if (typeof Component !== 'undefined') return Component;
      if (typeof TodoApp !== 'undefined') return TodoApp;
      if (typeof Counter !== 'undefined') return Counter;
      if (typeof Profile !== 'undefined') return Profile;
      if (typeof Main !== 'undefined') return Main;
      if (typeof UserCard !== 'undefined') return UserCard;
      if (typeof ProductList !== 'undefined') return ProductList;
      if (typeof AppExport !== 'undefined' && AppExport) return AppExport;
      
      // Fallback: look for any function defined
      return null;
      `
    );

    const comp = fn(
      React,
      useState,
      useEffect,
      useMemo,
      useCallback,
      useRef,
      Fragment
    );

    if (typeof comp === 'function') {
      return { component: comp, error: null };
    }

    return {
      component: null,
      error: "Asosiy React komponenti topilmadi. Masalan: `function App() { return <div>...</div> }` deb yozing.",
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { component: null, error: errorMsg };
  }
}
