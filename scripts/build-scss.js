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
  { minify = false, sassOptions = {}, optimizeComponent = false, wrapInLayer = false } = {}
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

  let css = postcssResult.css;

  // Wrap CSS in @layer rsuite { ... } for better integration with utility-first
  // CSS frameworks like Tailwind CSS. @layer adjusts cascade order (layer priority)
  // relative to unlayered styles, making it easier for users to override with utilities.
  if (wrapInLayer) {
    // Extract @charset declarations — they must appear before @layer at the top of the file
    let charset = '';
    css = css.replace(/^@charset\s+[^;]+;\s*/m, match => {
      charset = minify ? match.trimEnd() : match.trimEnd() + '\n';
      return '';
    });

    if (minify) {
      css = `${charset}@layer rsuite{${css}}\n`;
    } else {
      css = `${charset}@layer rsuite {\n${css.trimStart()}\n}\n`;
    }
  }

  await fs.ensureDir(path.dirname(output));
  await fs.writeFile(output, css);

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
    // Standard versions (with @layer rsuite wrapper)
    ['index.scss', 'rsuite.css', false, {}, true],
    ['index.scss', 'rsuite.min.css', true, {}, true],
    // Versions without reset styles (with @layer rsuite wrapper)
    ['components.scss', 'rsuite-no-reset.css', false, {}, true],
    ['components.scss', 'rsuite-no-reset.min.css', true, {}, true]
  ];

  for (const [src, out, minify = false, variables = {}, wrapInLayer = false] of variants) {
    await compileScss(path.join('src/styles', src), path.join(outDir, out), {
      minify,
      wrapInLayer,
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
      optimizeComponent: true,
      wrapInLayer: true
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
