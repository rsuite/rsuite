import path from 'path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

describe('mergeRefs consumer types', () => {
  it.each([false, true])('compiles the real helper and consumer with strict=%s', strict => {
    const program = ts.createProgram([path.join(__dirname, 'mergeRefs.types.fixture.tsx')], {
      strict,
      noEmit: true,
      skipLibCheck: true,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      types: ['react']
    });
    const diagnostics = ts.getPreEmitDiagnostics(program);
    const formatted = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: file => file,
      getCurrentDirectory: process.cwd,
      getNewLine: () => '\n'
    });

    expect(diagnostics.length, formatted).toBe(0);
  });
});
