/**
 * @author {@link https://github.com/jashkenas/underscore underscorejs}.
 * @version 1.7.0
 * @see {@link http://underscorejs.org/#debounce underscore.debounce(function, wait, [immediate])}
 * @param func
 * @param wait
 * @param immediate
 * @returns {*}
 */
export default function debounce(func, wait, immediate) {

    var timeout, args, context, timestamp, result;

    var _now = Date.now || function () {
        return new Date().getTime();
    };

    var later = function () {
        var last = _now() - timestamp;
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) {
                    context = args = null;
                }
            }
        }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = _now();
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}
