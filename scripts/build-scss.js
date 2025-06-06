const sass = require('sass');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const postcss = require('postcss');
const postcssPruneVar = require('postcss-prune-var');
const postcssDiscardEmpty = require('postcss-discard-empty');
const postcssDiscardComments = require('postcss-discard-comments');
const autoprefixer = require('autoprefixer');

const outDir = 'lib/dist';
const componentOutDir = 'lib';

// --- Compile SCSS + PostCSS ---
async function compileScss(
  input,
  output,
  { minify = false, sassOptions = {}, optimizeComponent = false } = {}
) {
  const sassResult = sass.compile(input, {
    style: minify ? 'compressed' : 'expanded',
    sourceMap: false, // Disable source map generation
    loadPaths: ['node_modules'],
    ...sassOptions
  });

  // Base plugins for all CSS files
  const postcssPlugins = [
    autoprefixer(),
    postcssDiscardComments({ removeAll: true }) // Remove all comments for all files
  ];
  
  // Add component-specific optimization plugins for component styles
  if (optimizeComponent) {
    postcssPlugins.push(
      postcssPruneVar(), // Remove unused CSS variables
      postcssDiscardEmpty() // Remove empty rules
    );
  }

  // Make source map paths relative to the output directory and point to lib
  if (sassResult.sourceMap) {
    const outputDir = path.dirname(path.resolve(output));
    const relativeToLib = path.relative(outputDir, path.resolve(componentOutDir));

    sassResult.sourceMap.sources = sassResult.sourceMap.sources.map(source => {
      // For main source file, use the path in lib directory
      if (source.endsWith(path.basename(input))) {
        const relativePath = path.relative(path.resolve('src'), path.dirname(path.resolve(input)));
        return path.join(relativeToLib, relativePath, path.basename(input));
      }
      // For partials, they should be in the same directory as the output
      return path.basename(source);
    });
  }

  const postcssResult = await postcss(postcssPlugins).process(sassResult.css, {
    from: input,
    to: output,
    map: false // Disable source map generation in PostCSS
  });

  await fs.ensureDir(path.dirname(output));
  await fs.writeFile(output, postcssResult.css);

  console.log(`✔ Built: ${output}`);
}

// --- Main style ---
// Build styles
// - dist/rsuite.css
// - dist/rsuite.min.css
// - dist/rsuite-rtl.css
// - dist/rsuite-rtl.min.css
// - dist/rsuite-no-reset.css
// - dist/rsuite-no-reset.min.css
// - dist/rsuite-no-reset-rtl.css
// - dist/rsuite-no-reset-rtl.min.css
async function buildMainStyles() {
  const variants = [
    // Standard versions
    ['index.scss', 'rsuite.css'],
    ['index.scss', 'rsuite.min.css', true],
    // Versions without reset styles
    ['index.scss', 'rsuite-no-reset.css', false, { '$enable-css-reset': false }],
    ['index.scss', 'rsuite-no-reset.min.css', true, { '$enable-css-reset': false }]
  ];

  for (const [src, out, minify = false, variables = {}] of variants) {
    await compileScss(path.join('src/styles', src), path.join(outDir, out), {
      minify,
      sassOptions: {
        variables
      }
    });
  }
}

// --- Each component style (supports CSS Modules) ---
const buildComponentStyles = async () => {
  const files = glob.sync('src/*/styles/index.scss');

  for (const file of files) {
    const outputFile = file.replace('src/', `${componentOutDir}/`).replace(/\.scss$/, '.css');
    await compileScss(file, outputFile, {
      minify: false,
      optimizeComponent: true // Enable optimization for component styles
    });
  }
};

const clean = async () => {
  await fs.remove(outDir);
  await fs.remove(componentOutDir);
};

async function buildAll() {
  await clean();
  await buildMainStyles();
  await buildComponentStyles();
}

buildAll();
