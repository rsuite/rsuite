const sass = require('sass');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const postcss = require('postcss');
const postcssPruneVar = require('postcss-prune-var');
const postcssDiscardEmpty = require('postcss-discard-empty');
const postcssDiscardComments = require('postcss-discard-comments');
const postcssMergeRules = require('postcss-merge-rules');
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
    sourceMap: false,
    loadPaths: ['node_modules'],
    ...sassOptions
  });

  // Base plugins for all CSS files
  const postcssPlugins = [
    autoprefixer(),
    postcssDiscardComments({ removeAll: true }), // Remove all comments for all files
    postcssMergeRules()
  ];

  // Add component-specific optimization plugins for component styles
  if (optimizeComponent) {
    postcssPlugins.push(
      postcssPruneVar(), // Remove unused CSS variables
      postcssDiscardEmpty() // Remove empty rules
    );
  }

  const postcssResult = await postcss(postcssPlugins).process(sassResult.css, {
    from: input,
    to: output,
    map: false
  });

  await fs.ensureDir(path.dirname(output));
  await fs.writeFile(output, postcssResult.css);

  console.log(`✔ Built: ${output}`);
}

// --- Main style ---
// Build styles
// - dist/rsuite.css
// - dist/rsuite.min.css
// - dist/rsuite-no-reset.css
// - dist/rsuite-no-reset.min.css
async function buildMainStyles() {
  const variants = [
    // Standard versions
    ['index.scss', 'rsuite.css'],
    ['index.scss', 'rsuite.min.css', true],
    // Versions without reset styles
    ['components.scss', 'rsuite-no-reset.css', false],
    ['components.scss', 'rsuite-no-reset.min.css', true]
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
      optimizeComponent: true // Enable optimization for component styles,
    });
  }
};

async function buildAll() {
  await buildMainStyles();
  await buildComponentStyles();
}

(async () => {
  try {
    await buildAll();
  } catch (error) {
    console.error('Error during build:', error);
    process.exit(1);
  }
})();
