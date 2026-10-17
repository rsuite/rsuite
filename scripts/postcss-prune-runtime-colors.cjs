const postcss = require('postcss');
const pruneVariables = require('postcss-prune-var');

// getColorValue also references these palette tokens from runtime system props.
const runtimeColor =
  /^--rs-(?:color-(?:red|orange|yellow|green|cyan|blue|violet)|(?:red|orange|yellow|green|cyan|blue|violet|gray)-(?:50|[1-9]00))$/;

module.exports = () => ({
  postcssPlugin: 'rsuite-prune-runtime-colors',
  Once(root) {
    const references = postcss.rule({ selector: ':root' });
    const colors = new Set();
    root.walkDecls(declaration => {
      if (runtimeColor.test(declaration.prop)) colors.add(declaration.prop);
    });
    for (const color of colors) {
      references.append({ prop: 'color', value: `var(${color})` });
    }

    // Include runtime uses in the dependency graph without emitting extra rules.
    root.append(references);
    try {
      pruneVariables().Once(root);
    } finally {
      references.remove();
    }
  }
});

module.exports.postcss = true;
