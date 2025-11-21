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
    const pathname = itemPath.replace(/[-_a-z0-9]*\//gi, '').replace('.ts', '');

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

/**
 * Write package.json file for each directory
 *
 * @param {string[] | [itemKey, itemPath][]} options.resources  - directory names
 * @param {string} options.pkgName - package name
 * @param {boolean} options.isLocaleDir  - is locale directory
 */
async function writePkgFile(options) {
  const { resources = [], pkgName = 'rsuite', isLocaleDir } = options;
  await Promise.all(
    resources.map(async item => {
      const [itemKey, itemPath] = Array.isArray(item) ? item : [item, `${item}/index`];

      const name = isLocaleDir ? `locales/${itemKey}` : itemKey;
      const file = isLocaleDir ? `locales/${itemKey}` : itemPath;
      const filePath = isLocaleDir ? '../..' : '..';
      const proxyDir = path.join(libRoot, name);

      await mkDir(libRoot).catch(() => {
        // console.log('lib directory already exists');
      });
      await mkDir(proxyDir).catch(() => {
        // console.log('proxy directory already exists');
      });
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
async function proxyComponents() {
  const resources = findResources({ dir: srcRoot, ignores: ['styles', 'internals'] });

  await writePkgFile({ resources });
}

/**
 * Use package.json file to proxy child components directory
 *
 * outputs:
 * lib/AccordionPanel/package.json
 * lib/Collapse/package.json
 * lib/Fade/package.json
 * lib/Slide/package.json
 * ...
 */
async function proxyChildComponents() {
  const resources = findResources({ dir: srcRoot, ignores: ['styles', 'internals'] });

  // Check if build.json exists and if proxy is true
  resources.forEach(async item => {
    const buildJsonPath = path.join(srcRoot, item, 'build.json');
    if (fs.existsSync(buildJsonPath)) {
      const buildJson = require(buildJsonPath);
      const { components, proxy = true } = buildJson;

      if (proxy && components) {
        await writePkgFile({ resources: Object.entries(components) });
      }
    }
  });
}

async function proxy() {
  await proxyComponents();
  await proxyChildComponents();
  await proxyLocales();
}

module.exports.findResources = findResources;
module.exports.default = proxy;
