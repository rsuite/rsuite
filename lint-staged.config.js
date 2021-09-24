/**
 * @link [lint-staged](https://github.com/okonet/lint-staged)
 */
module.exports = {
  '*.{js,jsx,less,md,json}': ['prettier --write'],
  '*.ts?(x)': ['eslint --fix --quiet', 'prettier --parser=typescript --write'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit'
};
