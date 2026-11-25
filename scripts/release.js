/**
 * NOT COMPLETED. DO NOT USE UNLESS YOU'RE THE AUTHOR OF THIS SCRIPT.
 *
 * 1. Exit if user is not on the main branch.
 * 2. (todo) Check the main branch is up-to-date with remote
 * 3. Ask whether a minor|patch release this is
 * 4. Confirm the resulted version number with user
 * 5. Run `npm version <type>`
 * 6. Confirm with user whether it's ready to push the tag.
 * 7. Push the tag if user confirms
 * 8. (todo) More to be added...
 */
async function run() {
  const boxen = (await import('boxen')).default;
  console.log(boxen('rsuite release wizard', { borderStyle: 'double', padding: 1 }));
  console.log();
  const argv = require('minimist')(process.argv.slice(2));

  const isDryRun = argv['dry-run'] === true;
  if (isDryRun) {
    console.info(
      'Using `--dry-run` flag, you would be only testing the release workflow without actually publishing a release.'
    );
    console.log();
  }

  const { $ } = await import('execa');

  const { stdout: currentBranch } = await $`git branch --show-current`;

  if (!isReleaseBranch(currentBranch) && !isDryRun) {
    console.info('You could only run this script on `main`/`*.x` branch or with `--dry-run` flag');
    process.exit(1);
  }

  const pc = (await import('picocolors')).default;

  console.info(`NOTICE: You're doing release on ${pc.bold(currentBranch)} branch`);
  console.log();

  const inquirer = (await import('inquirer')).default;
  const semver = require('semver');
  const currentVersion = require('../package.json').version;

  const { releaseType } = await inquirer.prompt([
    {
      name: 'releaseType',
      message: 'What type is this release?',
      type: 'list',
      choices: [
        {
          name: 'Minor',
          value: 'minor'
        },
        {
          name: 'Patch',
          value: 'patch'
        }
      ]
    }
  ]);

  const releaseVersion = semver.inc(currentVersion, releaseType);

  console.log();
  console.log('The semver of this ' + releaseType + ' release would be:');
  console.log();
  console.log(releaseVersion);
  console.log();

  const { confirmRelease } = await inquirer.prompt([
    {
      name: 'confirmRelease',
      message: 'Is the semver expected?',
      type: 'list',
      choices: [
        {
          name: 'Yes, run `npm version ' + releaseType + '` now',
          short: 'Yes',
          value: true
        },
        {
          name: 'No, abort the release',
          short: 'No',
          value: false
        }
      ]
    }
  ]);

  if (!confirmRelease) {
    console.log('Release is aborted');
    process.exit(1);
  }

  if (isDryRun) {
    console.info('Skipped actual `npm version` in dry-run mode');
  } else {
    await $({ stdio: 'inherit' })`npm version ${releaseType}`;
  }

  const { confirmPushChanges } = await inquirer.prompt([
    {
      name: 'confirmPushChanges',
      message: 'Shall we push the commit and tag now?',
      type: 'list',
      choices: [
        {
          name: 'Yes, run `git push --follow-tags` now',
          short: 'Yes',
          value: true
        },
        {
          name: 'No, abort the release',
          short: 'No',
          value: false
        }
      ]
    }
  ]);

  if (!confirmPushChanges) {
    console.log('Release is aborted');
    process.exit(1);
  }

  if (isDryRun) {
    console.info('Skipped actual `git push --follow-tags` in dry-run mode');
  } else {
    await $({ stdio: 'inherit' })`git push --follow-tags`;
  }
}

run();

function isReleaseBranch(branch) {
  return branch === 'main' || /\d\.x/.test(branch);
}
