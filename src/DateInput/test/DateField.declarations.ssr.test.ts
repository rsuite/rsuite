import fs from 'fs';
import os from 'os';
import path from 'path';
import ts from 'typescript';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '../../..');
let temporaryDirectory: string;
let consumerFile: string;

const formatDiagnostics = (diagnostics: readonly ts.Diagnostic[]) =>
  ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: file => file,
    getCurrentDirectory: () => root,
    getNewLine: () => '\n'
  });

describe('DateInput declarations', () => {
  beforeAll(() => {
    temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-date-declarations-'));
    fs.symlinkSync(path.join(root, 'node_modules'), path.join(temporaryDirectory, 'node_modules'));

    const configFile = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
    const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
    const program = ts.createProgram(
      [
        path.join(root, 'src/DateInput/DateField.ts'),
        path.join(root, 'src/DateInput/hooks/useDateInputState.ts')
      ],
      {
        ...config.options,
        declaration: true,
        emitDeclarationOnly: true,
        noEmit: false,
        outDir: temporaryDirectory,
        rootDir: path.join(root, 'src'),
        preserveSymlinks: true,
        // Match the development build's Object.prototype.should augmentation.
        types: ['react', 'chai']
      }
    );
    const diagnostics = ts.getPreEmitDiagnostics(program);
    expect(diagnostics.length, formatDiagnostics(diagnostics)).toBe(0);
    const emitted = program.emit();
    expect(emitted.emitSkipped, formatDiagnostics(emitted.diagnostics)).toBe(false);

    consumerFile = path.join(temporaryDirectory, 'consumer.ts');
    fs.writeFileSync(
      consumerFile,
      `import { useDateField } from './DateInput/DateField';
import { useDateInputState } from './DateInput/hooks/useDateInputState';
declare const field: ReturnType<typeof useDateField>['dateField'];
declare const state: ReturnType<typeof useDateInputState>;
export const format: string = field.format;
export const year: number | null = field.year;
export const day: number | null = state.dateField.day;
export const date: string = state.toDateString();
`
    );
  });

  afterAll(() => {
    if (temporaryDirectory) fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it.each([true, false])(
    'compiles emitted date declarations without test types, strict=%s',
    strict => {
      const program = ts.createProgram([consumerFile], {
        strict,
        noEmit: true,
        skipLibCheck: false,
        esModuleInterop: true,
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        moduleResolution: ts.ModuleResolutionKind.Node10,
        types: ['react']
      });
      const diagnostics = ts.getPreEmitDiagnostics(program);

      expect(program.getSourceFiles().some(file => file.fileName.includes('@types/chai/'))).toBe(
        false
      );
      expect(diagnostics.length, formatDiagnostics(diagnostics)).toBe(0);
    }
  );
});
