const del = require('del');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const postcssCustomProperties = require('postcss-custom-properties');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const rtlcss = require('gulp-rtlcss');
const gulp = require('gulp');
const babelrc = require('./babel.config');

const ESM_DIR = './es';
const LIB_DIR = './lib';
const DIST_DIR = './dist';
const STYLE_SOURCE_DIR = './src/styles';
const STYLE_DIST_DIR = DIST_DIR;
const TS_SOURCE = ['./src/**/*.tsx', './src/**/*.ts', '!./src/**/*.d.ts'];

function clean(done) {
  del.sync([LIB_DIR, ESM_DIR, DIST_DIR], { force: true });
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
    .src(`${STYLE_SOURCE_DIR}/index.less`)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([require('autoprefixer'), postcssCustomProperties()]))
    .pipe(sourcemaps.write('./'))
    .pipe(rename('rsuite.css'))
    .pipe(gulp.dest(`${STYLE_DIST_DIR}`));
}

/**
 * Minify built css files
 */
function minifyCSS() {
  return gulp
    .src(`${STYLE_DIST_DIR}/rsuite.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss()) // uses postcss.config.js where cssnano is configured
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${STYLE_DIST_DIR}`));
}

function buildRTLCSS() {
  return gulp
    .src(`${STYLE_DIST_DIR}/rsuite.css`)
    .pipe(rtlcss()) // Convert to RTL.
    .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
    .pipe(gulp.dest(`${STYLE_DIST_DIR}`))
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${STYLE_DIST_DIR}`));
}

function buildLib() {
  return gulp.src(TS_SOURCE).pipe(babel(babelrc())).pipe(gulp.dest(LIB_DIR));
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

function copyTypescriptDeclarationFiles() {
  return gulp.src('./src/**/*.d.ts').pipe(gulp.dest(LIB_DIR)).pipe(gulp.dest(ESM_DIR));
}

function copyLessStylesheets() {
  return gulp.src('./src/**/*.less').pipe(gulp.dest(LIB_DIR)).pipe(gulp.dest(ESM_DIR));
}

function copyLessPlugins() {
  return gulp
    .src('./src/styles/plugins/*.js')
    .pipe(gulp.dest(`${LIB_DIR}/styles/plugins`))
    .pipe(gulp.dest(`${ESM_DIR}/styles/plugins`));
}

function copyStyles() {
  return gulp.src(`${STYLE_SOURCE_DIR}/**/*`).pipe(gulp.dest('./less'));
}

function watch() {
  const watcher = gulp.watch(TS_SOURCE);
  watcher.on('change', (filePath, stats) => {
    console.log('File ' + filePath + ' was changed, running tasks...');
    const libPath = filePath.replace('src/', 'lib/').replace(/\/[a-z|A-Z]+.(tsx|ts)/, '');

    return gulp.src(filePath).pipe(babel(babelrc())).pipe(gulp.dest(libPath));
  });
}

exports.dev = gulp.series(clean, buildLib, watch);
exports.build = gulp.series(
  clean,
  gulp.parallel(buildLib, buildEsm, gulp.series(buildLESS, gulp.parallel(minifyCSS, buildRTLCSS))),
  gulp.parallel(copyTypescriptDeclarationFiles, copyLessStylesheets, copyLessPlugins, copyStyles)
);
