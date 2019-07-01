const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');

const tsConfig = require('../tsconfig.json');

const babelrc = require('../.babelrc.js');

const ES_DIR = '../es';
const LIB_DIR = '../lib';
const SOURCE_DIR = '../src/style';
const DIST_DIR = '../dist/styles';
const MODULARIZED_DIST_DIR = '../lib/styles';

gulp.task('clean', () => {
  del.sync(`${DIST_DIR}/**`, { force: true });
  return gulp;
});

gulp.task('build-less', () => {
  return gulp
    .src(`${SOURCE_DIR}/rsuite.less`)
    .pipe(sourcemaps.init())
    .pipe(less({ javascriptEnabled: true }))
    .pipe(postcss([require('autoprefixer')]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${DIST_DIR}`));
});

gulp.task('min-css', () => {
  return gulp
    .src(`${DIST_DIR}/rsuite.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(
      rename(path => {
        path.basename += '.min';
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${DIST_DIR}`));
});

gulp.task('postcss', ['build-less'], () => {
  return gulp.start('min-css');
});

gulp.task('copy-fonts', () => {
  return gulp.src(`${SOURCE_DIR}/fonts/**/*`).pipe(gulp.dest(`${DIST_DIR}/fonts`));
});

gulp.task('generate-modularized-styles', () => {
  // Don't match the file name begin with "_".
  return gulp.src(`${SOURCE_DIR}/!(_)*.less`).pipe(gulp.dest(MODULARIZED_DIST_DIR));
});

gulp.task('build-style', ['clean'], () => {
  gulp.start(['postcss', 'copy-fonts']);
});

gulp.task('babel-map', () =>
  gulp
    .src('../src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel(babelrc()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(LIB_DIR))
);

gulp.task('copy-tsd', () => {
  gulp.src('../src/**/*.d.ts').pipe(gulp.dest(LIB_DIR));
});

gulp.task('compile-js', () =>
  gulp
    .src('../src/**/*.js')
    .pipe(babel(babelrc()))
    .pipe(gulp.dest(LIB_DIR))
);

gulp.task('compile-ts', () => {
  const source = ['../src/**/*.tsx', '../src/**/*.ts'];
  const compilerOptions = tsConfig.compilerOptions;
  const modules = process.env.MODULE === 'ES6';

  if (modules) {
    compilerOptions.module = 'ES6';
  }

  gulp
    .src(source)
    .pipe(ts(compilerOptions))
    .pipe(gulp.dest(modules ? ES_DIR : LIB_DIR));
});

gulp.task('dev', () => {
  const source = ['../src/**/*.tsx', '../src/**/*.ts'];
  const compilerOptions = tsConfig.compilerOptions;
  gulp.start(['compile-ts']);
  gulp.watch(source, function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    const srcPath = `../${event.path.match(/src\/\S*/)[0]}`;
    const libPath = srcPath.replace('/src/', '/lib/').replace(/\/[a-z|A-Z]+.js/, '');

    gulp
      .src(srcPath)
      .pipe(ts(compilerOptions))
      .pipe(gulp.dest(libPath));
  });
});
