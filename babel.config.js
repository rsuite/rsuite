module.exports = (api, options) => {
  const { NODE_ENV } = options || process.env;
  const dev = NODE_ENV === 'development';
  const modules = NODE_ENV === 'esm' ? false : 'commonjs';

  if (api) {
    api.cache(() => NODE_ENV);
  }

  const plugins = [
    'lodash',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-nullish-coalescing-operator',
    ['@babel/plugin-transform-class-properties', { loose: true }],
    '@babel/plugin-transform-export-namespace-from',
    ['@babel/plugin-transform-runtime', { useESModules: !modules }],
    [
      'transform-inline-environment-variables',
      {
        include: ['RUN_ENV']
      }
    ],
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '^@/internals/(.+)': ([, name]) => {
            return `./src/internals/${name}`;
          }
        }
      }
    ]
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
