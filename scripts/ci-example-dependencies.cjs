const { execFileSync } = require('node:child_process');
const { readFileSync } = require('node:fs');

function exampleDependenciesOnly() {
  if (process.env.GITHUB_EVENT_NAME !== 'pull_request') return false;

  const git = (...args) =>
    execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
  const { pull_request: pr } = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const [base, head, extra] = git('show', '-s', '--format=%P', 'HEAD').trim().split(' ');

  // Classify the same merge tree that the SDK jobs would test.
  if (
    extra ||
    base !== pr?.base.sha ||
    head !== pr?.head.sha ||
    git('rev-parse', 'HEAD').trim() !== process.env.GITHUB_SHA
  ) {
    return false;
  }

  // Include both paths of a rename so that moves out of the SDK run its tests.
  const files = git('diff', '--name-only', '--no-renames', '-z', base, 'HEAD')
    .split('\0')
    .filter(Boolean);
  return (
    files.length > 0 &&
    files.every(file => {
      const [folder, example, name, extra] = file.split('/');
      return (
        folder === 'examples' &&
        !!example &&
        !extra &&
        ['package.json', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'].includes(name)
      );
    })
  );
}

let result = false;
try {
  result = exampleDependenciesOnly();
} catch {
  // Missing history or event data needs the full matrix.
}
console.log('example_dependencies_only=' + result);
