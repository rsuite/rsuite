// getColorValue also references these palette tokens from runtime system props.
const runtimeColor =
  /^--rs-(?:color-(?:red|orange|yellow|green|cyan|blue|violet)|(?:red|orange|yellow|green|cyan|blue|violet|gray)-(?:50|[1-9]00))$/;
const variableReference = /var\(\s*(--[^ ,);]+)/g;

module.exports = () => ({
  postcssPlugin: 'rsuite-prune-runtime-colors',
  Once(root) {
    const used = new Set();
    const dependencies = new Map();

    root.walkDecls(({ prop, value }) => {
      const isVariable = prop.startsWith('--');
      if (runtimeColor.test(prop)) used.add(prop);

      for (const [, name] of value.matchAll(variableReference)) {
        const variable = name.trim();
        if (!isVariable) {
          used.add(variable);
          continue;
        }

        if (!dependencies.has(prop)) dependencies.set(prop, new Set());
        dependencies.get(prop).add(variable);
      }
    });

    // Set iteration visits new entries and avoids reprocessing cycles.
    for (const variable of used) {
      for (const dependency of dependencies.get(variable) ?? []) used.add(dependency);
    }

    root.walkDecls(declaration => {
      if (declaration.prop.startsWith('--') && !used.has(declaration.prop)) declaration.remove();
    });
  }
});

module.exports.postcss = true;
