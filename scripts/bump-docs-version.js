/**
 * This script is run after a new release of rsuite has been published,
 * in order to bump the rsuite dependency in `docs/` folder to the latest version.
 */
const path = require('path');
const { spawnSync } = require('child_process');
const PackageJson = require('@npmcli/package-json');
const projectRoot = process.cwd();

(async () => {
  const rsuitePackageJson = await PackageJson.load(projectRoot);
  const docsPackageJson = await PackageJson.load(path.join(projectRoot, 'docs'));

  const rsuiteVersion = rsuitePackageJson.content.version;

  console.info('Local rsuite version is: ' + rsuiteVersion);

  // Two steps to bump rsuite in docs
  // 1. update docs version to the same as the latest rsuite version
  // 2. install latest rsuite version in docs
  console.log();
  console.log(
    'Updating package.json in docs to version: ' +
      rsuiteVersion +
      ' and upgrading rsuite dependency to ^' +
      rsuiteVersion
  );
  docsPackageJson.update({
    version: rsuiteVersion,
    dependencies: {
      ...docsPackageJson.content.dependencies,
      rsuite: '^' + rsuiteVersion
    }
  });

  await docsPackageJson.save();

  spawnSync('npm', [
    'install',
    '--prefix',
    'docs',
    '--legacy-peer-deps',
    '--registry',
    'https://registry.npmjs.org/'
  ]);

  // Make sure the rsuite just installed matches the local version
  console.log();
  console.log('Validating installed rsuite version');

  const installedRsuitePackageJson = await PackageJson.load(
    path.join(projectRoot, 'docs/node_modules/rsuite')
  );

  const installedRsuiteVersion = installedRsuitePackageJson.content.version;

  if (installedRsuiteVersion !== rsuiteVersion) {
    console.warn('❌ Installed rsuite version does not match local rsuite version.');
    process.exit(1);
  }
  console.log('✅ rsuite@' + installedRsuiteVersion + ' has been installed.');

  // Commit produced changes
  console.log();
  console.log('Commiting changes');
  spawnSync('git', ['add', '-A']);
  spawnSync('git', ['commit', '-m', 'build(docs): bump rsuite ' + rsuiteVersion]);

  console.info('✅ docs is up to date');
})();
