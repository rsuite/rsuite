const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const babelrc = require('../.babelrc.js');

const SOURCE_PATH = '../styles';
const DIST_PATH = '../dist/styles';
const MODULARIZED_DIST_PATH = '../lib/styles';

gulp.task('clean', () => {
  del.sync(`${DIST_PATH}/**`, { force: true });
  return gulp;
});

gulp.task('build-less', () => {
  return gulp
    .src(`${SOURCE_PATH}/rsuite.less`)
    .pipe(sourcemaps.init())
    .pipe(less({ javascriptEnabled: true }))
    .pipe(postcss([require('autoprefixer')]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${DIST_PATH}`));
});

gulp.task('min-css', () => {
  return gulp
    .src(`${DIST_PATH}/rsuite.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(
      rename(path => {
        path.basename += '.min';
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${DIST_PATH}`));
});

gulp.task('postcss', ['build-less'], () => {
  return gulp.start('min-css');
});

gulp.task('copy-fonts', () => {
  return gulp.src(`${SOURCE_PATH}/fonts/**/*`).pipe(gulp.dest(`${DIST_PATH}/fonts`));
});

gulp.task('generate-modularized-styles', () => {
  // Don't match the file name begin with "_".
  return gulp.src(`${SOURCE_PATH}/!(_)*.less`).pipe(gulp.dest(MODULARIZED_DIST_PATH));
});

gulp.task('default', ['clean'], () => {
  gulp.start(['postcss', 'copy-fonts']);
});

gulp.task('babel', () =>
  gulp
    .src('../src/**/*.js')
    .pipe(babel(babelrc()))
    .pipe(gulp.dest('../lib'))
);

gulp.task('babel-map', () =>
  gulp
    .src('../src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel(babelrc()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('../lib'))
);

gulp.task('dev', () => {
  gulp.start(['babel']);
  gulp.watch('../src/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    const srcPath = `../${event.path.match(/src\/\S*/)[0]}`;
    const libPath = srcPath.replace('/src/', '/lib/').replace(/\/[a-z|A-Z]+.js/, '');

    gulp
      .src(srcPath)
      .pipe(babel(babelrc()))
      .pipe(gulp.dest(libPath));
  });
});

gulp.task('dev-map', () => {
  gulp.start(['babel-map']);
  gulp.watch('../src/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    const srcPath = `../${event.path.match(/src\/\S*/)[0]}`;
    const libPath = srcPath.replace('/src/', '/lib/').replace(/\/[a-z|A-Z]+.js/, '');

    gulp
      .src(srcPath)
      .pipe(sourcemaps.init())
      .pipe(babel(babelrc()))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(libPath));
  });
});
