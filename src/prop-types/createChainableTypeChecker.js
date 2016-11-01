/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 * https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
 */
export default  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName) {
        componentName = componentName || '<<anonymous>>';
        if (props[propName] === null || typeof props[propName] === 'undefined') {
            if (isRequired) {
                return new Error(
                    `Required prop '${propName}' was not specified in '${componentName}'.`
                );
            }
        } else {
            return validate(props, propName, componentName);
        }
    }

    const chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
}
