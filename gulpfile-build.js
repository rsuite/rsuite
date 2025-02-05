const fs = require('fs');
const util = require('util');
const del = require('del');
const path = require('path');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const postcssPruneVar = require('postcss-prune-var');
const postcssDiscardEmpty = require('postcss-discard-empty');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const rtlcss = require('gulp-rtlcss');
const insert = require('gulp-insert');
const gulp = require('gulp');
const babelrc = require('./babel.config');
const { default: proxyDirectories } = require('./scripts/proxyDirectories');
const pkg = require('./package.json');

const writeFile = util.promisify(fs.writeFile);
const srcRoot = path.join(__dirname, './src');
const libRoot = path.join(__dirname, './lib');

const esmRoot = path.join(libRoot, 'esm');
const cjsRoot = path.join(libRoot, 'cjs');
const distRoot = path.join(libRoot, 'dist');
const styleRoot = path.join(srcRoot, 'scss');
const tsSources = [
  `${srcRoot}/**/*.tsx`,
  `${srcRoot}/**/*.ts`,
  `!${srcRoot}/**/*.d.ts`,
  `!${srcRoot}/**/test/*`,
  `!${srcRoot}/**/stories/*`
];

function clean(done) {
  del.sync([libRoot], { force: true });
  done();
}

// Build styles
// - Build SCSS into CSS under dist/
//   - With/Without reset styles
// - RTL/Non-RTL
// - Minify CSS files in dist/
// - Copy SCSS into scss/
//
// Final outputs:
// - dist/rsuite.css
// - dist/rsuite.min.css
// - dist/rsuite-rtl.css
// - dist/rsuite-rtl.min.css
// - dist/rsuite-no-reset.css
// - dist/rsuite-no-reset.min.css
// - dist/rsuite-no-reset-rtl.css
// - dist/rsuite-no-reset-rtl.min.css
// - scss/**/*.scss
exports.buildStyles = gulp.series(
  gulp.parallel(
    buildSass({ outputFileName: 'rsuite.css' }),
    buildSass({
      sassOptions: {
        data: '$enable-css-reset: false;'
      },
      outputFileName: 'rsuite-no-reset.css'
    })
  ),
  buildRTLCSS,
  minifyCSS
);

// Build component styles
// Final outputs:
// - lib/Button/styles/index.css
// - lib/IconButton/styles/index.css
// - ...
async function buildComponentCSS(done) {
  const buildList = [];

  fs.readdirSync(srcRoot).forEach(item => {
    const itemPath = path.resolve(srcRoot, item);
    const componentName = itemPath.split('/').pop();

    const scssFile = itemPath + '/styles/index.scss';

    if (fs.existsSync(scssFile)) {
      buildList.push({
        src: scssFile,
        dist: `${libRoot}/${componentName}/styles`,
        sassOptions: { data: '$enable-css-reset: false;' },
        outputFileName: 'index.css'
      });
    }
  });

  Promise.all(
    buildList.map(item => {
      return new Promise((resolve, reject) => {
        return buildSass({ ...item, postcssPlugins: [postcssPruneVar(), postcssDiscardEmpty()] })()
          .on('end', resolve)
          .on('error', reject);
      });
    })
  ).then(() => {
    console.log('Build component CSS done.');
    done();
  });
}

exports.buildComponentCSS = buildComponentCSS;

function buildSass({
  sassOptions,
  outputFileName,
  src = `${styleRoot}/index.scss`,
  dist = distRoot,
  postcssPlugins = []
}) {
  return () =>
    gulp
      .src(src)
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(postcss([require('autoprefixer'), ...postcssPlugins]))
      .pipe(rename(outputFileName))
      .pipe(gulp.dest(dist));
}

function buildRTLCSS() {
  return gulp
    .src(`${distRoot}/rsuite*.css`)
    .pipe(rtlcss()) // Convert to RTL.
    .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
    .pipe(gulp.dest(`${distRoot}`));
}

function minifyCSS() {
  return gulp
    .src(`${distRoot}/rsuite*.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss()) // uses postcss.config.js where cssnano is configured
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${distRoot}`));
}

function buildCjs() {
  return (
    gulp
      .src(tsSources)
      .pipe(babel(babelrc()))
      .pipe(insert.prepend(`'use client';\n`))
      .pipe(gulp.dest(cjsRoot))
  );
}

function buildEsm() {
  return (
    gulp
      .src(tsSources)
      .pipe(
        babel(
          babelrc(null, {
            NODE_ENV: 'esm'
          })
        )
      )
      .pipe(insert.prepend(`'use client';\n`))
      .pipe(gulp.dest(esmRoot))
  );
}

function copyTypescriptDeclarationFiles() {
  return gulp.src(`${srcRoot}/**/*.d.ts`).pipe(gulp.dest(cjsRoot)).pipe(gulp.dest(esmRoot));
}

function copyScssStylesheets() {
  return gulp.src(`${srcRoot}/**/*.scss`).pipe(gulp.dest(libRoot));
}

function copyScssPlugins() {
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
  return gulp.src(['./README.md', './CHANGELOG.md', './LICENSE']).pipe(gulp.dest(libRoot));
}

function createPkgFile(done) {
  delete pkg.devDependencies;
  delete pkg.files;

  pkg.main = 'cjs/index.js';
  pkg.module = 'esm/index.js';
  pkg.typings = 'esm/index.d.ts';
  pkg.scripts = {
    prepublishOnly: '../node_modules/mocha/bin/_mocha ../test/validateBuilds.js'
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
  gulp.parallel(buildCjs, buildEsm, exports.buildStyles),
  gulp.parallel(
    copyTypescriptDeclarationFiles,
    copyScssStylesheets,
    copyScssPlugins,
    copyDocs,
    createPkgFile
  ),
  buildComponentCSS,
  buildDirectories
);
