const del = require('del');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const gulp = require('gulp');
const babelrc = require('./.babelrc.js');

const ESM_DIR = './es';
const LIB_DIR = './lib';
const DIST_DIR = './dist';
const STYLE_SOURCE_DIR = './src/styles';
const STYLE_DIST_DIR = './dist/styles';
const TS_SOURCE = ['./src/**/*.tsx', './src/**/*.ts', '!./src/**/*.d.ts'];
const THEMES = ['default', 'dark'];

function clean(done) {
  del.sync([LIB_DIR, ESM_DIR, DIST_DIR], { force: true });
  done();
}

function buildLess() {
  return THEMES.map(theme => () =>
    gulp
      .src(`${STYLE_SOURCE_DIR}/themes/${theme}/index.less`)
      .pipe(sourcemaps.init())
      .pipe(less({ javascriptEnabled: true }))
      .pipe(postcss([require('autoprefixer')]))
      .pipe(sourcemaps.write('./'))
      .pipe(rename(`rsuite-${theme}.css`))
      .pipe(gulp.dest(`${STYLE_DIST_DIR}`))
  );
}

function buildCss() {
  return THEMES.map(theme => () =>
    gulp
      .src(`${STYLE_DIST_DIR}/rsuite-${theme}.css`)
      .pipe(sourcemaps.init())
      .pipe(postcss())
      .pipe(
        rename(path => {
          path.basename += '.min';
        })
      )
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`${STYLE_DIST_DIR}`))
  );
}

function buildLib() {
  return gulp
    .src(TS_SOURCE)
    .pipe(babel(babelrc()))
    .pipe(gulp.dest(LIB_DIR));
}

function buildEsm() {
  return gulp
    .src(TS_SOURCE)
    .pipe(
      babel(
        babelrc(null, {
          NODE_ENV: 'esm'
        })
      )
    )
    .pipe(gulp.dest(ESM_DIR));
}

function copyFontFiles() {
  return gulp.src(`${STYLE_SOURCE_DIR}/fonts/**/*`).pipe(gulp.dest(`${STYLE_DIST_DIR}/fonts`));
}

function copyTypescriptDeclarationFiles() {
  return gulp
    .src('./src/**/*.d.ts')
    .pipe(gulp.dest(LIB_DIR))
    .pipe(gulp.dest(ESM_DIR));
}

function copyLessFiles() {
  return gulp
    .src(['./src/**/*.less', './src/**/fonts/**/*'])
    .pipe(gulp.dest(LIB_DIR))
    .pipe(gulp.dest(ESM_DIR));
}

function watch() {
  const watcher = gulp.watch(TS_SOURCE);
  watcher.on('change', (filePath, stats) => {
    console.log('File ' + filePath + ' was changed, running tasks...');
    const libPath = filePath.replace('src/', 'lib/').replace(/\/[a-z|A-Z]+.(tsx|ts)/, '');

    return gulp
      .src(filePath)
      .pipe(babel(babelrc()))
      .pipe(gulp.dest(libPath));
  });
}

exports.buildStyle = gulp.series(clean, ...buildLess(), ...buildCss(), copyFontFiles);
exports.dev = gulp.series(clean, buildLib, watch);
exports.build = gulp.series(
  clean,
  gulp.parallel(buildLib, buildEsm, gulp.series(...buildLess(), ...buildCss())),
  gulp.parallel(copyTypescriptDeclarationFiles, copyLessFiles, copyFontFiles)
);
