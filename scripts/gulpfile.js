const gulp = require('gulp');
const clean = require('gulp-clean');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const SOURCE_PATH = '../styles/less';
const DIST_PATH = '../dist/styles';

gulp.task('clean', () => {
  return gulp.src(DIST_PATH, { read: true }).pipe(clean({ force: true }));
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

gulp.task('default', ['clean'], () => {
  gulp.start(['postcss', 'copy-fonts']);
});
