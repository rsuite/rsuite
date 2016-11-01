/**
 *
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * Largely copied directly from:
 * https://github.com/react-bootstrap/react-bootstrap/blob/master/src/utils/createChainedFunction.js
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction(...funcs) {
    return funcs
        .filter(f => f !== null &&  typeof f !== 'undefined')
        .reduce((acc, f) => {
            if (typeof f !== 'function') {
                throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
            }

            if (acc === null) {
                return f;
            }

            return function chainedFunction(...args) {
                acc.apply(this, args);
                f.apply(this, args);
            };
        }, null);
}

export default createChainedFunction;
