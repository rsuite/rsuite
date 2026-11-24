const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const prettier = require('prettier');

// Existing configuration names without a literal hook call still belong to the API.
const compatibilityEntries = {
  Transition: ['TransitionProps', 'Animation/Transition'],
  DateRangeInput: ['DateRangeInputProps', 'DateRangeInput'],
  Progress: ['ProgressProps', 'Progress']
};
const sharedProps = { ProgressLine: ['ProgressProps', 'Progress'] };
const helpers = new Set(['useCustom', 'useCustomConfig', 'createComponent']);

function sourceFiles(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    .flatMap(entry => {
      if (['test', 'stories'].includes(entry.name)) return [];
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) return sourceFiles(filename);
      return /\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith('.d.ts') ? [filename] : [];
    });
}

function resolveSource(module) {
  return [
    module + '.ts',
    module + '.tsx',
    path.join(module, 'index.ts'),
    path.join(module, 'index.tsx')
  ].find(filename => fs.existsSync(filename));
}

function importedHelpers(source) {
  const bindings = new Map();
  const namespaces = new Set();
  for (const node of source.statements) {
    if (!ts.isImportDeclaration(node) || !node.importClause || node.importClause.isTypeOnly)
      continue;
    const module = node.moduleSpecifier.text;
    if (
      !/(?:\/hooks(?:\/useCustom(?:Config)?)?|\/utils(?:\/react\/createComponent)?|\/useCustom(?:Config)?)$/.test(
        module
      )
    )
      continue;
    const clause = node.importClause;
    if (clause.name && /\/useCustom(?:Config)?$/.test(module)) {
      bindings.set(
        clause.name.text,
        module.endsWith('useCustomConfig') ? 'useCustomConfig' : 'useCustom'
      );
    }
    if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
      for (const item of clause.namedBindings.elements) {
        const imported = (item.propertyName || item.name).text;
        if (!item.isTypeOnly && helpers.has(imported)) bindings.set(item.name.text, imported);
      }
    } else if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
      namespaces.add(clause.namedBindings.name.text);
    }
  }
  return expression => {
    if (ts.isIdentifier(expression)) return bindings.get(expression.text);
    if (
      ts.isPropertyAccessExpression(expression) &&
      ts.isIdentifier(expression.expression) &&
      namespaces.has(expression.expression.text) &&
      helpers.has(expression.name.text)
    ) {
      return expression.name.text;
    }
  };
}

function valueExports(source, checker, visited = new Set()) {
  if (!source || visited.has(source.fileName)) return new Set();
  visited = new Set([...visited, source.fileName]);
  const symbol = checker.getSymbolAtLocation(source);
  if (!symbol) return new Set();
  const values = checker.getTypeOfSymbolAtLocation(symbol, source).getProperties();
  const names = new Set(values.map(value => value.name));
  const exports = new Set();
  for (const value of values) {
    for (let declaration of value.declarations || []) {
      while (declaration.parent && declaration.parent !== source) declaration = declaration.parent;
      if (
        declaration.parent === source &&
        !ts.isExportDeclaration(declaration) &&
        ts.getCombinedModifierFlags(declaration) & ts.ModifierFlags.Export
      )
        exports.add(value.name);
    }
  }
  for (const statement of source.statements) {
    if (ts.isExportAssignment(statement)) exports.add('default');
    if (!ts.isExportDeclaration(statement) || statement.isTypeOnly) continue;
    const clause = statement.exportClause;
    if (clause && ts.isNamedExports(clause)) {
      for (const item of clause.elements) {
        if (!item.isTypeOnly && names.has(item.name.text)) exports.add(item.name.text);
      }
    } else if (clause && ts.isNamespaceExport(clause)) {
      if (names.has(clause.name.text)) exports.add(clause.name.text);
    } else if (statement.moduleSpecifier) {
      const target = checker.getSymbolAtLocation(statement.moduleSpecifier);
      const declaration = target?.declarations?.find(ts.isSourceFile);
      for (const name of valueExports(declaration, checker, visited)) {
        if (name !== 'default' && names.has(name)) exports.add(name);
      }
    }
  }
  return exports;
}

async function generateComponentRegistry({ sourceRoot }) {
  const filename = path.join(sourceRoot, 'internals/Provider/types.ts');
  const configFile = ts.findConfigFile(
    path.dirname(sourceRoot),
    ts.sys.fileExists,
    'tsconfig.json'
  );
  let options = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    jsx: ts.JsxEmit.React,
    skipLibCheck: true
  };
  if (configFile) {
    const config = ts.readConfigFile(configFile, ts.sys.readFile);
    if (config.error)
      throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
    const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, path.dirname(configFile));
    if (parsed.errors.length) {
      throw new Error(ts.flattenDiagnosticMessageText(parsed.errors[0].messageText, '\n'));
    }
    options = { ...options, ...parsed.options };
  }
  const program = ts.createProgram(sourceFiles(sourceRoot), options);
  const checker = program.getTypeChecker();
  const rootModule =
    program.getSourceFile(path.join(sourceRoot, 'index.tsx')) ||
    program.getSourceFile(path.join(sourceRoot, 'index.ts'));
  const publicNames = valueExports(rootModule, checker);
  const entries = new Map();
  const literal = node => {
    if (!node) return;
    if (ts.isStringLiteralLike(node)) return node.text;
    const type = checker.getTypeAtLocation(node);
    return type.isStringLiteral() ? type.value : undefined;
  };
  function register(name, source) {
    if (!/^[A-Z][A-Za-z0-9]*$/.test(name))
      throw new Error(`Invalid component configuration name: ${name}`);
    if (entries.has(name)) return;
    const override = sharedProps[name];
    let module = override
      ? resolveSource(path.join(sourceRoot, override[1]))
      : resolveSource(path.join(sourceRoot, name));
    if (!module && source) {
      const directory = path.dirname(source.fileName);
      module =
        path.basename(directory) === name
          ? resolveSource(path.join(directory, 'index'))
          : undefined;
      module ||= source.fileName;
    }
    add(name, override ? override[0] : name + 'Props', module);
  }
  function add(name, props, module) {
    const source = module && program.getSourceFile(module);
    const symbol = source && checker.getSymbolAtLocation(source);
    const exported = symbol && checker.getExportsOfModule(symbol).find(item => item.name === props);
    const declaration =
      exported &&
      (exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported);
    if (!declaration?.declarations?.length)
      throw new Error(`Cannot resolve exported ${props} for ${name}.`);
    const specifier = path
      .relative(path.dirname(filename), module)
      .replace(/\\/g, '/')
      .replace(/\.(ts|tsx)$/, '')
      .replace(/\/index$/, '');
    entries.set(name, {
      name,
      props,
      module: specifier.startsWith('.') ? specifier : './' + specifier
    });
  }
  for (const source of program.getSourceFiles()) {
    if (
      !source.fileName.startsWith(sourceRoot + path.sep) ||
      /[/\\](test|stories)[/\\]/.test(source.fileName)
    )
      continue;
    const helper = importedHelpers(source);
    function visit(node) {
      if (ts.isCallExpression(node)) {
        const kind = helper(node.expression);
        let name;
        if (kind === 'useCustom' || kind === 'useCustomConfig') name = literal(node.arguments[0]);
        else if (
          kind === 'createComponent' &&
          node.arguments[0] &&
          ts.isObjectLiteralExpression(node.arguments[0])
        ) {
          const property = node.arguments[0].properties.find(
            item =>
              ts.isPropertyAssignment(item) &&
              (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) &&
              item.name.text === 'name'
          );
          if (property) name = literal(property.initializer);
        }
        if (name && (kind !== 'createComponent' || publicNames.has(name))) register(name, source);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  for (const [name, [props, module]] of Object.entries(compatibilityEntries)) {
    const resolved = resolveSource(path.join(sourceRoot, module));
    if (resolved) add(name, props, resolved);
  }
  const sorted = [...entries.values()].sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );
  const imports = new Map();
  for (const entry of sorted) {
    if (imports.has(entry.props) && imports.get(entry.props) !== entry.module)
      throw new Error(`Conflicting imports for ${entry.props}.`);
    imports.set(entry.props, entry.module);
  }
  const text =
    '// This file is automatically generated. Run npm run generate:component-types to update.\n' +
    [...imports]
      .map(([props, module]) => `import type { ${props} } from ${JSON.stringify(module)};`)
      .join('\n') +
    '\n\ninterface ComponentProps<T> { defaultProps: Partial<T>; }\n\nexport interface ReactSuiteComponents {\n' +
    sorted.map(entry => `  ${entry.name}: ComponentProps<${entry.props}>;`).join('\n') +
    '\n}\n';
  const config = await prettier.resolveConfig(filename);
  return {
    filename,
    entries: sorted,
    contents: await prettier.format(text, { ...config, parser: 'typescript' })
  };
}

module.exports = { generateComponentRegistry };
