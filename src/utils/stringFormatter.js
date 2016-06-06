/**
 * @example
 * underscoreName('getList');
 * => get_list
 */
export function underscore(string) {
    return string.replace(/([A-Z])/g, '_$1').toLowerCase();
}


/**
 * @example
 * camelize('font-size');
 * => fontSize
 */
export function camelize(string) {
    return string.replace(/\-(\w)/g, function (char) {
        return char.slice(1).toUpperCase();
    });
}

/**
 * @example
 * camelize('fontSize');
 * => font-size
 */
export function hyphenate(string) {
  return string.replace(/([A-Z])/g, '-$1').toLowerCase();
}


/**
 * @example
 * merge('{0} - A front-end {1} ','Suite','framework');
 * => Suite - A front-end framework
 */
export function merge(pattern) {
    var pointer = 0,
        i;
    for (i = 1; i < arguments.length; i++) {
        pattern = pattern.split('{' + pointer + '}').join(arguments[i]);
        pointer++;
    }
    return pattern;
}

export default {
    merge,
    underscore,
    camelize
};
