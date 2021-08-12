/**
 * Create a package.json for each directory and proxy to CJS and ESM files.
 * Can make importing a component easier.
 *
 * E.g:
 * import Button from 'rsuite/Button';
 * import 'rsuite/Button/styles/index.less';
 */

const path = require('path');
const fs = require('fs');
const util = require('util');

const mkDir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const srcRoot = path.join(__dirname, '../src');
const libRoot = path.join(__dirname, '../lib');

function findResources(options) {
  const { dir = srcRoot, ignores = [], isFile } = options;
  const resources = [];
  fs.readdirSync(dir).forEach(item => {
    const itemPath = path.resolve(dir, item);
    const pathname = itemPath.replace(/[a-z0-9]*\//gi, '').replace('.ts', '');

    if (fs.statSync(itemPath).isDirectory()) {
      resources.push(pathname);
    }
    if (isFile && fs.statSync(itemPath).isFile()) {
      resources.push(pathname);
    }
  });

  return resources.filter(item => !ignores.includes(item));
}

function proxyResource(options) {
  const { pkgName = 'rsuite', name, file, filePath = '../' } = options;
  const proxyPkg = {
    name: `${pkgName}/${name}`,
    private: true,
    main: `${filePath}/cjs/${file}.js`,
    module: `${filePath}/esm/${file}.js`,
    types: `${filePath}/esm/${file}.d.ts`
  };

  return JSON.stringify(proxyPkg, null, 2) + '\n';
}

async function writePkgFile(options) {
  const { resources = [], pkgName = 'rsuite', isLocaleDir } = options;
  await Promise.all(
    resources.map(async item => {
      const name = isLocaleDir ? `locales/${item}` : item;
      const file = isLocaleDir ? `locales/${item}` : `${item}/index`;
      const filePath = isLocaleDir ? '../..' : '..';
      const proxyDir = path.join(libRoot, name);
      await mkDir(libRoot).catch(() => {});
      await mkDir(proxyDir).catch(() => {});
      await writeFile(
        `${proxyDir}/package.json`,
        proxyResource({ pkgName, name, file, filePath })
      ).catch(err => {
        if (err) console.error(err.toString());
      });
    })
  );
}

/**
 * Use package.json file to proxy locales directory
 *
 * outputs:
 * lib/locales/ar_EG/package.json
 * lib/locales/da_DK/package.json
 * ....
 */
async function proxyLocales() {
  const resources = findResources({
    dir: path.join(srcRoot, 'locales'),
    ignores: ['index'],
    isFile: true
  });

  await writePkgFile({ resources, isLocaleDir: true });
}

/**
 * Use package.json file to proxy component directory
 *
 * outputs:
 * lib/Affix/package.json
 * lib/Button/package.json
 * .....
 */
async function proxyComponent() {
  const resources = findResources({ dir: srcRoot, ignores: ['styles', '@types'] });

  await writePkgFile({ resources });
}

async function proxy() {
  await proxyComponent();
  await proxyLocales();
}

module.exports = proxy;
