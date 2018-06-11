const { promisify } = require('util');
const path = require('path');
const makeDir = require('make-dir');
const glob = promisify(require('glob'));
const writeFile = promisify(require('fs').writeFile);

const INPUT_DIR = '../styles';
const OUTPUT_DIR = '../lib/styles';
const CORE_FILE_NAME = '_core.less';

const getImportContent = files => files.map(fileName => `require('../../styles/${fileName}');`).join('\n');

(async function() {
  await makeDir(OUTPUT_DIR);
  // Don't match the file name begin with "_".
  const files = await glob(`${INPUT_DIR}/!(_)*.less`);
  for (const filePath of files) {
    const baseName = path.basename(filePath, '.less');
    const outputPath = `${OUTPUT_DIR}/${baseName}.js`;
    const content = getImportContent([CORE_FILE_NAME, `${baseName}.less`]);
    const err = await writeFile(outputPath, content);
    console.log(`Generate file ${outputPath} ${err ? 'failed' : 'finished'}.`);
  }
  console.log(`Total: ${files.length}`);
})();
