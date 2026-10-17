const fs = require('fs');
const util = require('util');
const path = require('path');
const { Readable } = require('stream');
const Vinyl = require('vinyl');
const babel = require('gulp-babel');
const insert = require('gulp-insert');
const gulp = require('gulp');
const babelrc = require('./babel.config');
const { default: proxyDirectories } = require('./scripts/proxy-directories');
const pkg = require('./package.json');

const writeFile = util.promisify(fs.writeFile);
const srcRoot = path.join(__dirname, './src');
const libRoot = path.join(__dirname, './lib');

const esmRoot = path.join(libRoot, 'esm');
const cjsRoot = path.join(libRoot, 'cjs');
const tsSources = ['**/*.tsx', '**/*.ts', '!**/*.d.ts', '!**/test/*', '!**/stories/*'];

function clean(done) {
  fs.rmSync(libRoot, { recursive: true, force: true });
  done();
}

function compileCjs(source) {
  return (
    source
      .pipe(babel(babelrc()))
      // adds the "use-client" directive to /cjs exported from rsuite
      .pipe(insert.prepend(`'use client';\n`))
      .pipe(gulp.dest(cjsRoot))
  );
}

function buildCjs() {
  return compileCjs(gulp.src(tsSources, { cwd: srcRoot, base: srcRoot }));
}

function buildEsm() {
  return (
    gulp
      .src(tsSources, { cwd: srcRoot, base: srcRoot })
      .pipe(
        babel(
          babelrc(null, {
            NODE_ENV: 'esm'
          })
        )
      )
      // adds the "use-client" directive to /esm exported from rsuite
      .pipe(insert.prepend(`'use client';\n`))
      .pipe(gulp.dest(esmRoot))
  );
}

function copyTypescriptDeclarationFiles() {
  return gulp
    .src('**/*.d.ts', { cwd: srcRoot, base: srcRoot })
    .pipe(gulp.dest(cjsRoot))
    .pipe(gulp.dest(esmRoot));
}

function watch() {
  // Watch the literal directory: Chokidar also expands braces in absolute glob roots.
  const watcher = gulp.watch(srcRoot, { disableGlobbing: true });
  watcher.on('change', filePath => {
    if (
      !['.ts', '.tsx'].includes(path.extname(filePath)) ||
      filePath.endsWith('.d.ts') ||
      ['test', 'stories'].includes(path.basename(path.dirname(filePath)))
    ) {
      return;
    }
    console.log('File ' + filePath + ' was changed, running tasks...');
    // The watcher supplies a literal filename, which may itself contain glob characters.
    const source = Readable.from(
      (async function* () {
        yield new Vinyl({
          cwd: __dirname,
          base: srcRoot,
          path: path.resolve(srcRoot, filePath),
          contents: await fs.promises.readFile(path.resolve(srcRoot, filePath))
        });
      })()
    );
    return compileCjs(source);
  });
  return watcher;
}

function buildDirectories(done) {
  proxyDirectories().then(() => {
    done();
  });
}

async function copyDocs() {
  await fs.promises.mkdir(libRoot, { recursive: true });
  await Promise.all(
    ['README.md', 'CHANGELOG.md', 'LICENSE'].map(file =>
      fs.promises.copyFile(path.join(__dirname, file), path.join(libRoot, file))
    )
  );
}

function copyScssFiles() {
  return gulp.src('**/*.scss', { cwd: srcRoot, base: srcRoot }).pipe(gulp.dest(libRoot));
}

function createPkgFile(done) {
  delete pkg.devDependencies;
  delete pkg.files;

  pkg.main = 'cjs/index.js';
  pkg.module = 'esm/index.js';
  pkg.typings = 'esm/index.d.ts';
  pkg.sass = 'styles/index.scss';
  pkg.style = 'dist/rsuite.css';
  pkg.scripts = {
    prepublishOnly: 'node ../scripts/validate-builds.js'
  };

  writeFile(`${libRoot}/package.json`, JSON.stringify(pkg, null, 2) + '\n')
    .then(() => {
      done();
    })
    .catch(err => {
      if (err) console.error(err.toString());
    });
}

exports.dev = gulp.series(clean, buildCjs, watch);
exports.build = gulp.series(
  clean,
  gulp.parallel(buildCjs, buildEsm),
  gulp.parallel(copyTypescriptDeclarationFiles, copyDocs, copyScssFiles, createPkgFile),
  buildDirectories
);
