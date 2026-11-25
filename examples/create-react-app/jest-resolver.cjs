const path = require('node:path');
const { createRequire } = require('node:module');

module.exports = (request, options) => {
  // Jest 27 misses the CommonJS export for date-fns locale subpaths.
  if (request === 'date-fns' || request.startsWith('date-fns/')) {
    return createRequire(path.join(options.basedir, 'package.json')).resolve(request);
  }

  return options.defaultResolver(request, options);
};
