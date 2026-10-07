/* eslint-disable @typescript-eslint/no-require-imports -- This Node-only runner loads its isolated TypeScript fixture with CommonJS. */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const ts = require('./node_modules/typescript');
const root = path.resolve(__dirname, '../..');
const supply = path.join(__dirname, 'node_modules');
const lib = path.join(root, 'lib');
const results = path.join(__dirname, 'results');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const fixture = fs.readFileSync(path.join(__dirname, 'consumer.tsx'), 'utf8');
assert.equal(ts.version, '5.7.3');
assert.equal((fixture.match(/@ts-expect-error/g) || []).length, 2);
for (const entry of ['package.json', 'esm/index.d.ts', 'cjs/index.d.ts']) {
  assert(fs.existsSync(path.join(lib, entry)), 'Build the public lib first: ' + entry);
}
fs.mkdirSync(results, { recursive: true });
const runResults = fs.mkdtempSync(path.join(results, 'run-'));
const temporary = fs.realpathSync(
  fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-public-declarations-'))
);
const published = path.join(temporary, 'published');
function link(modules, name, target) {
  const dest = path.join(modules, name);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.symlinkSync(target, dest, process.platform === 'win32' ? 'junction' : 'dir');
}
function packageOf(file) {
  let directory = path.dirname(file);
  while (true) {
    const pkg = path.join(directory, 'package.json');
    if (fs.existsSync(pkg)) {
      const data = JSON.parse(fs.readFileSync(pkg, 'utf8'));
      return { root: directory, name: data.name, version: data.version };
    }
    const parent = path.dirname(directory);
    if (parent === directory) return null;
    directory = parent;
  }
}
function declarationHashes(directory, relative = '') {
  const files = {};
  for (const child of fs.readdirSync(path.join(directory, relative), { withFileTypes: true })) {
    const entry = path.join(relative, child.name);
    if (child.isDirectory() && child.name !== 'node_modules') {
      Object.assign(files, declarationHashes(directory, entry));
    } else if (child.isFile() && /\.d\.(?:ts|cts|mts)$/.test(entry)) {
      files[entry] = hash(path.join(directory, entry));
    }
  }
  return files;
}
function supplier(slot, version) {
  const physicalRoot = fs.realpathSync(path.join(supply, slot));
  const pkg = path.join(physicalRoot, 'package.json');
  const data = JSON.parse(fs.readFileSync(pkg, 'utf8'));
  assert.equal(data.version, version, 'Wrong installed test supplier: ' + slot);
  return {
    root: physicalRoot,
    name: data.name,
    version,
    packageSHA256: hash(pkg),
    declarations: declarationHashes(physicalRoot)
  };
}
const common = {
  '@types/node': ['@types/node', '24.19.1'],
  '@types/prop-types': ['@types/prop-types', '15.7.15'],
  csstype: ['csstype', '3.2.3'],
  'undici-types': ['undici-types', '7.24.6'],
  buffer: ['buffer', '5.7.1']
};
const cjsSpecifiers = {
  rsuite: 'rsuite/cjs',
  'rsuite/DateInput': 'rsuite/cjs/DateInput',
  'rsuite/Button': 'rsuite/cjs/Button',
  'rsuite/Animation': 'rsuite/cjs/Animation',
  'rsuite/CustomProvider': 'rsuite/cjs/CustomProvider',
  'rsuite/Fade': 'rsuite/cjs/Animation/Fade'
};
function sourceFor(entry) {
  return fixture.replace(/from (['"])(rsuite(?:\/[^'"]+)?)\1/g, (original, quote, specifier) => {
    assert(Object.hasOwn(cjsSpecifiers, specifier), 'Unmapped public entry: ' + specifier);
    return entry === 'esm' ? original : 'from ' + quote + cjsSpecifiers[specifier] + quote;
  });
}
let failures = 0;
console.log('Declaration results: ' + runResults);
try {
  fs.cpSync(lib, published, { recursive: true });
  const production = JSON.parse(
    fs.readFileSync(path.join(published, 'package.json'), 'utf8')
  ).dependencies;
  const rootLock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
  const productionSuppliers = {};
  for (const dependency of Object.keys(production)) {
    const physicalRoot = fs.realpathSync(path.join(root, 'node_modules', dependency));
    const pkg = path.join(physicalRoot, 'package.json');
    const data = JSON.parse(fs.readFileSync(pkg, 'utf8'));
    assert.equal(
      data.version,
      rootLock.packages['node_modules/' + dependency].version,
      'Root locked dependency mismatch: ' + dependency
    );
    productionSuppliers[dependency] = {
      root: physicalRoot,
      name: data.name,
      version: data.version,
      packageSHA256: hash(pkg),
      declarations: declarationHashes(physicalRoot)
    };
  }
  const compilerRoot = fs.realpathSync(path.join(supply, 'typescript'));
  const compilerDeclarations = declarationHashes(compilerRoot);
  for (const major of [18, 19]) {
    for (const entry of ['esm', 'cjs']) {
      for (const strict of [true, false]) {
        const name = 'react' + major + '-' + entry + '-' + (strict ? 'strict' : 'loose');
        const project = path.join(temporary, name);
        const modules = path.join(project, 'node_modules');
        fs.mkdirSync(modules, { recursive: true });
        link(modules, 'rsuite', published);
        for (const dependency of Object.keys(production))
          link(modules, dependency, path.join(root, 'node_modules', dependency));
        const selected = {
          ...common,
          '@types/react': ['react' + major + '-types', major === 18 ? '18.3.31' : '19.0.8'],
          '@types/react-dom': ['react' + major + '-dom-types', major === 18 ? '18.3.7' : '19.0.3']
        };
        const selectedSuppliers = {};
        for (const [packageName, [slot, version]] of Object.entries(selected)) {
          link(modules, packageName, path.join(supply, slot));
          selectedSuppliers[packageName] = supplier(slot, version);
        }
        assert.equal(
          selectedSuppliers.buffer.declarations['index.d.ts'],
          '8e9c23ba78aabc2e0a27033f18737a6df754067731e69dc5f52823957d60a4b6'
        );
        const consumer = path.join(project, 'consumer.tsx');
        fs.writeFileSync(consumer, sourceFor(entry));
        const options = {
          strict,
          noEmit: true,
          skipLibCheck: false,
          preserveSymlinks: true,
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.ESNext,
          moduleResolution: ts.ModuleResolutionKind.Node10,
          jsx: ts.JsxEmit.React,
          esModuleInterop: true,
          types: ['react', 'react-dom', 'node'],
          typeRoots: [path.join(modules, '@types')],
          lib: ['lib.es2020.d.ts', 'lib.dom.d.ts']
        };
        const publicEntries = [
          ...new Set(
            [
              ...fs.readFileSync(consumer, 'utf8').matchAll(/from ['"](rsuite(?:\/[^'"]+)?)['"]/g)
            ].map(match => match[1])
          )
        ];
        const resolvedEntries = publicEntries.map(specifier => ({
          specifier,
          resolved: ts.resolveModuleName(specifier, consumer, options, ts.sys).resolvedModule
            ?.resolvedFileName
        }));
        for (const item of resolvedEntries)
          assert(
            item.resolved && fs.realpathSync(item.resolved).startsWith(published + path.sep),
            'Missing natural public declaration entry: ' + item.specifier
          );
        const program = ts.createProgram([consumer], options);
        const diagnostics = ts.getPreEmitDiagnostics(program);
        const files = program.getSourceFiles().map(file => {
          const physical = fs.realpathSync(file.fileName);
          return {
            filename: file.fileName,
            physical,
            sha256: hash(physical),
            package: packageOf(physical)
          };
        });
        const issues = [];
        for (const [packageName, wanted] of Object.entries(selectedSuppliers)) {
          if (packageName === '@types/prop-types' && major === 19) continue;
          const actual = files.filter(file => file.package?.name === packageName);
          if (
            !actual.length ||
            actual.some(
              file =>
                file.package.root !== wanted.root ||
                file.package.version !== wanted.version ||
                wanted.declarations[path.relative(wanted.root, file.physical)] !== file.sha256
            )
          )
            issues.push('Wrong loaded type supplier: ' + packageName);
        }
        if (
          !files.some(
            file => file.physical === path.join(selectedSuppliers.buffer.root, 'index.d.ts')
          )
        )
          issues.push('Buffer5.7.1 declaration not actually loaded');
        const admitted = new Map(
          [...Object.values(productionSuppliers), ...Object.values(selectedSuppliers)].map(
            value => [value.root, value]
          )
        );
        for (const file of files) {
          if (file.physical === consumer || file.physical.startsWith(published + path.sep))
            continue;
          if (
            file.package?.root === compilerRoot &&
            compilerDeclarations[path.relative(compilerRoot, file.physical)] === file.sha256
          )
            continue;
          const wanted = admitted.get(file.package?.root);
          if (
            !wanted ||
            file.package.version !== wanted.version ||
            wanted.declarations[path.relative(wanted.root, file.physical)] !== file.sha256
          )
            issues.push('Unadmitted loaded declaration: ' + file.physical);
        }
        const majors = [
          ...new Set(
            files
              .filter(file => ['@types/react', '@types/react-dom'].includes(file.package?.name))
              .map(file => Number(file.package.version.split('.')[0]))
          )
        ];
        if (majors.length !== 1 || majors[0] !== major)
          issues.push('Mixed or incorrect React declaration major');
        if (
          !files.some(
            file =>
              file.physical === path.join(selectedSuppliers['@types/node'].root, 'ts5.7/index.d.ts')
          )
        )
          issues.push('Node TS5.7 declarations not actually selected');
        if (
          files.some(file =>
            /(?:^|\/)(?:@types\/chai|vitest|@vitest)(?:\/|$)/.test(
              file.filename + ':' + file.physical
            )
          )
        )
          issues.push('Test ambient loaded');
        const relative = files
          .filter(file => file.physical.startsWith(published + path.sep))
          .map(file => path.relative(published, file.physical));
        for (const required of [
          'index.d.ts',
          'Animation/Transition.d.ts',
          'Animation/Fade.d.ts',
          'DateInput/DateField.d.ts',
          'DateInput/hooks/useDateInputState.d.ts'
        ]) {
          if (!relative.includes(entry + '/' + required))
            issues.push('Public declaration not loaded: ' + required);
        }
        if (relative.some(file => file.startsWith((entry === 'esm' ? 'cjs' : 'esm') + '/')))
          issues.push('Opposite declaration entry loaded');
        const row = {
          name,
          node: process.version,
          execPath: process.execPath,
          typescript: ts.version,
          entry,
          strict,
          options,
          resolvedEntries,
          selectedSuppliers,
          productionSuppliers,
          rootLockSHA256: hash(path.join(root, 'package-lock.json')),
          fixtureLockSHA256: hash(path.join(__dirname, 'package-lock.json')),
          consumerSHA256: hash(consumer),
          files,
          diagnostics: diagnostics.map(d => ({
            code: d.code,
            file: d.file?.fileName,
            message: ts.flattenDiagnosticMessageText(d.messageText, '\n')
          })),
          issues,
          negativeContractsConsumed: diagnostics.length === 0,
          scope:
            'Declaration consumers; module ESNext even for cjs imports, no CommonJS/component runtime.'
        };
        fs.writeFileSync(
          path.join(runResults, name + '.json'),
          JSON.stringify(row, null, 2) + '\n',
          { flag: 'wx' }
        );
        console.log(name + ': ' + (diagnostics.length || issues.length ? 'FAIL' : 'PASS'));
        if (diagnostics.length)
          console.error(
            ts.formatDiagnostics(diagnostics, {
              getCanonicalFileName: f => f,
              getCurrentDirectory: () => project,
              getNewLine: () => '\n'
            })
          );
        if (issues.length) console.error(issues.join('\n'));
        if (diagnostics.length || issues.length) failures++;
      }
    }
  }
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
process.exitCode = failures ? 1 : 0;
