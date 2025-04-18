/**
 * @link [lint-staged](https://github.com/lint-staged/lint-staged)
 */
module.exports = {
  '*.{js,jsx,less,md,json}': ['prettier'],
  'src/**/*.{ts,tsx}': ['eslint --fix --quiet', 'prettier --parser=typescript --write'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit'
};
