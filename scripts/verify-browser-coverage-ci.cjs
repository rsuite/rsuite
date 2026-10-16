const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function verifyBrowserCoverage(directory, browser) {
  assert(['chromium', 'firefox'].includes(browser), 'Choose chromium or firefox.');
  const expected = ['React18', 'React19', 'React19.3']
    .flatMap(react => [1, 2].map(shard => `browser-coverage-${browser}-${react}-${shard}`))
    .sort();
  assert.deepEqual(
    fs.readdirSync(directory).sort(),
    expected,
    'Coverage must contain exactly both shards for each React runtime.'
  );
  let sourceFiles;
  return expected.flatMap(name => {
    const file = path.join(directory, name, 'coverage-final.json');
    const report = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert(
      report && !Array.isArray(report) && typeof report === 'object',
      `${file}: invalid report`
    );
    const entries = Object.values(report);
    assert(entries.length > 0, `${file}: empty report`);
    for (const entry of entries) {
      assert(entry && typeof entry.path === 'string', `${file}: missing source path`);
      for (const field of ['statementMap', 'fnMap', 'branchMap', 's', 'f', 'b']) {
        assert(
          entry[field] && typeof entry[field] === 'object' && !Array.isArray(entry[field]),
          `${file}: invalid ${field}`
        );
      }
      const counts = [...Object.values(entry.s), ...Object.values(entry.f)];
      for (const branch of Object.values(entry.b)) {
        assert(Array.isArray(branch), `${file}: invalid branch counts`);
        counts.push(...branch);
      }
      assert(
        counts.every(count => Number.isSafeInteger(count) && count >= 0),
        `${file}: invalid counts`
      );
    }
    const paths = entries.map(entry => entry.path).sort();
    if (sourceFiles) {
      assert.deepEqual(paths, sourceFiles, `${file}: shards must cover the same source files`);
    } else {
      sourceFiles = paths;
    }
    // Preserve both formats used by the existing Codecov upload.
    const cloverFile = path.join(directory, name, 'clover.xml');
    const clover = fs.readFileSync(cloverFile, 'utf8');
    assert(
      /^\s*<\?xml[^>]*>\s*<coverage\b[\s\S]*<\/coverage>\s*$/.test(clover) &&
        /<project\b[\s\S]*<file\b[\s\S]*<\/file>[\s\S]*<\/project>/.test(clover),
      `${cloverFile}: missing or incomplete Clover report`
    );
    return [file, cloverFile];
  });
}

module.exports = { verifyBrowserCoverage };

if (require.main === module) {
  const files = verifyBrowserCoverage(process.argv[2], process.argv[3]);
  console.log(`Verified ${files.length} coverage files: ${files.join(', ')}`);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `files=${files.join(',')}\n`);
  }
}
