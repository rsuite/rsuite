/**
 * NOT COMPLETED. DO NOT USE UNLESS YOU'RE THE AUTHOR OF THIS SCRIPT.
 *
 * 1. (todo) Exit if user is not on the main branch.
 * 2. (todo) Check the main branch is up-to-date with remote
 * 3. Ask whether a minor|patch release this is
 * 4. Confirm the resulted version number with user
 * 5. Run `npm version <type>`
 * 6. (todo) Confirm with user whether it's ready to push the tag.
 * 7. (todo) Push the tag if user confirms
 * 8. (todo) More to be added...
 */
async function run() {
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
          short: 'Yes',
          value: false
        }
      ]
    }
  ]);

  if (!confirmRelease) {
    console.log('Release is aborted');
    process.exit(1);
  }

  const { $ } = await import('execa');

  $({ stdio: 'inherit' })`npm version ${releaseType}`;
}

run();
