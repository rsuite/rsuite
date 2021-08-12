const fs = require('fs');
const util = require('util');
const del = require('del');
const path = require('path');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const postcssCustomProperties = require('postcss-custom-properties');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const rtlcss = require('gulp-rtlcss');
const gulp = require('gulp');
const babelrc = require('../babel.config');
const proxyDirectories = require('./proxyDirectories');
const pkg = require('../package.json');

const writeFile = util.promisify(fs.writeFile);
const srcRoot = path.join(__dirname, '../src');
const libRoot = path.join(__dirname, '../lib');

const esmRoot = path.join(libRoot, 'esm');
const cjsRoot = path.join(libRoot, 'cjs');
const distRoot = path.join(libRoot, 'dist');
const styleRoot = path.join(srcRoot, 'styles');
const tsSources = [`${srcRoot}/**/*.tsx`, `${srcRoot}/**/*.ts`, `!${srcRoot}/**/*.d.ts`];

function clean(done) {
  del.sync([libRoot], { force: true });
  done();
}

// Build styles
// - Build LESS into CSS under dist/
// - Minify CSS files in dist/
// - Copy LESS into less/
//
// Final outputs:
// - dist/rsuite.css
// - dist/rsuite.min.css
// - dist/rsuite-rtl.css
// - dist/rsuite-rtl.min.css
// - less/**/*.less

function buildLESS() {
  return gulp
    .src(`${styleRoot}/index.less`)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([require('autoprefixer'), postcssCustomProperties()]))
    .pipe(sourcemaps.write('./'))
    .pipe(rename('rsuite.css'))
    .pipe(gulp.dest(`${distRoot}`));
}

/**
 * Minify built css files
 */
function minifyCSS() {
  return gulp
    .src(`${distRoot}/rsuite.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss()) // uses postcss.config.js where cssnano is configured
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${distRoot}`));
}

function buildRTLCSS() {
  return gulp
    .src(`${distRoot}/rsuite.css`)
    .pipe(rtlcss()) // Convert to RTL.
    .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
    .pipe(gulp.dest(`${distRoot}`))
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${distRoot}`));
}

function buildCjs() {
  return gulp.src(tsSources).pipe(babel(babelrc())).pipe(gulp.dest(cjsRoot));
}

function buildEsm() {
  return gulp
    .src(tsSources)
    .pipe(
      babel(
        babelrc(null, {
          NODE_ENV: 'esm'
        })
      )
    )
    .pipe(gulp.dest(esmRoot));
}

function copyTypescriptDeclarationFiles() {
  return gulp.src(`${srcRoot}/**/*.d.ts`).pipe(gulp.dest(cjsRoot)).pipe(gulp.dest(esmRoot));
}

function copyLessStylesheets() {
  return gulp.src(`${srcRoot}/**/*.less`).pipe(gulp.dest(libRoot));
}

function copyLessPlugins() {
  return gulp.src(`${srcRoot}/styles/plugins/*.js`).pipe(gulp.dest(`${libRoot}/styles/plugins`));
}

function watch() {
  const watcher = gulp.watch(tsSources);
  watcher.on('change', filePath => {
    console.log('File ' + filePath + ' was changed, running tasks...');
    const cjsPath = filePath.replace('src/', 'cjs/').replace(/\/[a-z|A-Z]+.(tsx|ts)/, '');

    return gulp.src(filePath).pipe(babel(babelrc())).pipe(gulp.dest(cjsPath));
  });
}

function buildDirectories(done) {
  proxyDirectories().then(() => {
    done();
  });
}

function copyDocs() {
  return gulp.src(['../README.md', '../CHANGELOG.md', '../LICENSE']).pipe(gulp.dest(libRoot));
}

function createPkgFile(done) {
  delete pkg.devDependencies;
  delete pkg.scripts;

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
  gulp.parallel(buildCjs, buildEsm, gulp.series(buildLESS, gulp.parallel(minifyCSS, buildRTLCSS))),
  gulp.parallel(
    copyTypescriptDeclarationFiles,
    copyLessStylesheets,
    copyLessPlugins,
    copyDocs,
    createPkgFile
  ),
  buildDirectories
);
