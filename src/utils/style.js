import { camelize, hyphenate } from './stringFormatter';


const msPattern = /^ms-/;

/**
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
 */
function camelizeStyleName(string) {
    return camelize(string.replace(msPattern, 'ms-'));
}


function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, '-ms-');
}

function _getComputedStyle(node) {
    if (!node) {
        throw new TypeError('No Element passed to `getComputedStyle()`');
    }

    var doc = node.ownerDocument;

    if ('defaultView' in doc) {
        if (doc.defaultView.opener) {
            return node.ownerDocument.defaultView.getComputedStyle(node, null);
        }
        return window.getComputedStyle(node, null);

    }
    return {
        getPropertyValue(prop) {

            var style = node.style;

            prop = camelize(prop);

            if (prop === 'float') {
                prop = 'styleFloat';
            }

            let current = node.currentStyle[prop] || null;

            if (current === null && style && style[prop]) {
                current = style[prop];
            }

            if (rnumnonpx.test(current) && !rposition.test(prop)) {
                // Remember the original values
                let left = style.left;
                let runStyle = node.runtimeStyle;
                let rsLeft = runStyle && runStyle.left;

                // Put in the new values to get a computed value out
                if (rsLeft) {
                    runStyle.left = node.currentStyle.left;
                }

                style.left = prop === 'fontSize' ? '1em' : current;
                current = style.pixelLeft + 'px';

                // Revert the changed values
                style.left = left;
                if (rsLeft) {
                    runStyle.left = rsLeft;
                }
            }

            return current;
        }
    };

}

export function removeStyle(node, key) {
    return ('removeProperty' in node.style) ? node.style.removeProperty(key) : node.style.removeAttribute(key);
}

export function addStyle(node, property, value) {
    let css = '';
    let props = property;

    if (typeof property === 'string') {
        if (value === undefined) {
            return getStyle(node, property);
        }
        (props = {})[property] = value;
    }

    for (var key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            !props[key] && props[key] !== 0 ?
                removeStyle(node, hyphenateStyleName(key))
                : (css += hyphenateStyleName(key) + ':' + props[key] + ';');
        }
    }

    node.style.cssText += ';' + css;
}

export function getStyle(node, property) {
    return node.style[camelizeStyleName(property)] || _getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
}

export default {
    addStyle,
    removeStyle,
    getStyle
};
