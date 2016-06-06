/**
 * Expose `requestAnimationFrame()`.
 */
const requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || fallback;

/**
 * Fallback implementation.
 */

let prev = new Date().getTime();
function fallback(fn) {
    let curr = new Date().getTime();
    let ms = Math.max(0, 16 - (curr - prev));
    let req = setTimeout(fn, ms);
    prev = curr;
    return req;
}

/**
 * Cancel.
 */
const cancelAnimationFrame = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.clearTimeout;


export default {
    requestAnimationFrame,
    cancelAnimationFrame
};
