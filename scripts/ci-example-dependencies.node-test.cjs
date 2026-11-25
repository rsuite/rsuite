const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { mkdirSync, mkdtempSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { test } = require('node:test');

const script = path.resolve(__dirname, 'ci-example-dependencies.cjs');

function fixture(context, change, run) {
  const cwd = mkdtempSync(path.join(tmpdir(), 'rsuite-ci-scope-'));
  context.after(() => rmSync(cwd, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
  const write = (file, text) => {
    mkdirSync(path.dirname(path.join(cwd, file)), { recursive: true });
    writeFileSync(path.join(cwd, file), text);
  };

  git('init', '-b', 'main');
  git('config', 'user.name', 'RSuite CI test');
  git('config', 'user.email', 'ci-test@example.invalid');
  git('config', 'commit.gpgsign', 'false');
  write('examples/demo/package.json', '{}\n');
  write('examples/demo/pnpm-lock.yaml', 'lockfileVersion: 9\n');
  write('src/index.ts', 'export {};\n');
  write('package-lock.json', '{}\n');
  git('add', '.');
  git('commit', '-m', 'Initial tree');
  git('switch', '-c', 'candidate');
  change(git, write);
  git('add', '.');
  git('commit', '--allow-empty', '-m', 'Candidate changes');
  git('switch', 'main');
  git('merge', '--no-ff', '-m', 'Synthetic PR merge', 'candidate');

  const pr = {
    base: { sha: git('rev-parse', 'HEAD^1') },
    head: { sha: git('rev-parse', 'HEAD^2') }
  };
  const event = path.join(cwd, 'event.json');
  const classify = ({
    pullRequest = pr,
    type = 'pull_request',
    checkout = cwd,
    sha = git('rev-parse', 'HEAD')
  } = {}) => {
    writeFileSync(event, JSON.stringify({ pull_request: pullRequest }));
    return execFileSync(process.execPath, [script], {
      cwd: checkout,
      encoding: 'utf8',
      env: {
        ...process.env,
        GITHUB_EVENT_NAME: type,
        GITHUB_EVENT_PATH: event,
        GITHUB_SHA: sha
      }
    }).trim();
  };
  run(classify, pr, cwd);
}

const changeDependencies = (_git, write) => {
  write('examples/demo/package.json', '{"name":"demo"}\n');
  write('examples/demo/pnpm-lock.yaml', 'lockfileVersion: 9\npackages: {}\n');
};

test('a merge tree with only nested example dependencies can skip the SDK matrix', context => {
  fixture(context, changeDependencies, classify =>
    assert.equal(classify(), 'example_dependencies_only=true')
  );
});

test('source changes keep the full matrix, including names with a newline', context => {
  fixture(
    context,
    (git, write) => {
      changeDependencies(git, write);
      write('src/mixed\npackage.json', '{}\n');
    },
    classify => assert.equal(classify(), 'example_dependencies_only=false')
  );
});

test('root dependencies and non-dependency example files each keep the full matrix', context => {
  fixture(
    context,
    (_git, write) => write('package-lock.json', '{"changed":true}\n'),
    classify => assert.equal(classify(), 'example_dependencies_only=false')
  );
  fixture(
    context,
    (_git, write) => write('examples/demo/index.ts', 'export {};\n'),
    classify => assert.equal(classify(), 'example_dependencies_only=false')
  );
  fixture(
    context,
    (_git, write) => write('examples/demo/package.json\n', '{}\n'),
    classify => assert.equal(classify(), 'example_dependencies_only=false')
  );
});

test('moving a source file into an allowed path keeps the full matrix', context => {
  fixture(
    context,
    git => git('mv', 'src/index.ts', 'examples/demo/yarn.lock'),
    classify => assert.equal(classify(), 'example_dependencies_only=false')
  );
});

test('an empty merge diff keeps the full matrix', context => {
  fixture(
    context,
    () => {},
    classify => assert.equal(classify(), 'example_dependencies_only=false')
  );
});

test('pushes and stale or incomplete merge metadata keep the full matrix', context => {
  fixture(context, changeDependencies, (classify, pr) => {
    for (const options of [
      { type: 'push' },
      { sha: pr.head.sha },
      { pullRequest: {} },
      { pullRequest: { ...pr, base: pr.head } },
      { pullRequest: { ...pr, head: pr.base } }
    ]) {
      assert.equal(classify(options), 'example_dependencies_only=false');
    }
  });
});

test('a two-commit sparse checkout can classify the merge tree', context => {
  fixture(context, changeDependencies, (classify, _pr, source) => {
    const dir = mkdtempSync(path.join(tmpdir(), 'rsuite-ci-sparse-'));
    context.after(() => rmSync(dir, { recursive: true, force: true }));
    const options = { stdio: ['ignore', 'pipe', 'ignore'] };
    execFileSync('git', ['clone', '--depth', '2', pathToFileURL(source).href, dir], options);
    execFileSync(
      'git',
      ['-C', dir, 'sparse-checkout', 'set', '--no-cone', '/never-checked-out'],
      options
    );
    assert.equal(classify({ checkout: dir }), 'example_dependencies_only=true');
  });
});
