const path = require('node:path');

const internalAlias = '@/internals/';
const internalRoot = path.join(__dirname, 'src', 'internals');
const moduleCalls = [
  'require.resolve',
  'System.import',
  'jest.genMockFromModule',
  'jest.mock',
  'jest.unmock',
  'jest.doMock',
  'jest.dontMock',
  'jest.setMock',
  'jest.requireActual',
  'jest.requireMock',
  'require.requireActual',
  'require.requireMock'
];

function resolveInternalAliases({ types }) {
  const relativePath = /^\.?\.\//;
  function rewrite(source, filename) {
    if (!source.isStringLiteral()) return;
    const { value } = source.node;

    // Re-emit relative specifiers as before so the SDK's generated quotes stay stable.
    if (relativePath.test(value)) {
      source.replaceWith(types.stringLiteral(value));
      return;
    }
    if (!filename || !value.startsWith(internalAlias) || value.length === internalAlias.length) {
      return;
    }

    const target = path.join(internalRoot, value.slice(internalAlias.length));
    const relative = path
      .relative(path.dirname(filename), target)
      .split(path.sep)
      .join('/')
      .replace(/\/index$/, '');
    source.replaceWith(types.stringLiteral(relativePath.test(relative) ? relative : './' + relative));
  }

  return {
    name: 'rsuite-internal-aliases',
    visitor: {
      'ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration|ImportExpression'(entry, state) {
        rewrite(entry.get('source'), state.file.opts.filename);
      },
      CallExpression(entry, state) {
        const { callee } = entry.node;
        if (
          types.isImport(callee) ||
          types.isIdentifier(callee, { name: 'require' }) ||
          moduleCalls.some(pattern => types.matchesPattern(callee, pattern))
        ) {
          rewrite(entry.get('arguments.0'), state.file.opts.filename);
        }
      }
    }
  };
}

module.exports = (api, options) => {
  const { NODE_ENV } = options || process.env;
  const dev = NODE_ENV === 'development';
  const modules = NODE_ENV === 'esm' ? false : 'commonjs';

  if (api) {
    api.cache(() => NODE_ENV);
  }

  const plugins = [
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-transform-runtime', { useESModules: !modules }],
    [
      'transform-inline-environment-variables',
      {
        include: ['RUN_ENV']
      }
    ],
    resolveInternalAliases
  ];

  return {
    presets: [
      ['@babel/preset-env', { modules, loose: true }],
      ['@babel/preset-react', { development: dev }],
      '@babel/preset-typescript'
    ],
    plugins,
    env: {
      coverage: {
        plugins: [
          [
            'istanbul',
            {
              exclude: ['src/**/*Spec.js', 'src/**/*Spec.tsx', 'test/**/*']
            }
          ]
        ]
      }
    }
  };
};
