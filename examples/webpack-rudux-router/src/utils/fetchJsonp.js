/**
 * Largely copied directly from:
 * https://github.com/camsong/fetch-jsonp/blob/master/src/fetch-jsonp.js
 **/

const defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null,
};

function generateCallbackFunction() {
    return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
}

// Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined'
// error if request timeout
function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
        delete window[functionName];
    } catch (e) {
        window[functionName] = undefined;
    }
}

function removeScript(scriptId) {
    const script = document.getElementById(scriptId);
    document.getElementsByTagName('head')[0].removeChild(script);
}

function fetchJsonp(_url, options = {}) {
    // to avoid param reassign
    let url = _url;
    const timeout = options.timeout || defaultOptions.timeout;
    const jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    let timeoutId;

    return new Promise((resolve, reject) => {
        const callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
        const params = options.params || {};
        const scriptId = `${jsonpCallback}_${callbackFunction}`;

        window[callbackFunction] = (response) => {
            resolve({
                ok: true,
                // keep consistent with fetch API
                json: () => Promise.resolve(response),
            });

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            removeScript(scriptId);
            clearFunction(callbackFunction);
        };

        // Check if the user set their own params, and if not add a ? to start a list of params
        url += (url.indexOf('?') === -1) ? '?' : '&';

        const paramList = [];

        for (let key in params) {
            paramList.push(`${key}=${params[key]}`);
        }

        const jsonpScript = document.createElement('script');

        jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}&${paramList.join('&')}`);
        jsonpScript.id = scriptId;
        document.getElementsByTagName('head')[0].appendChild(jsonpScript);

        timeoutId = setTimeout(() => {
            reject(new Error(`JSONP request to ${url} timed out`));

            clearFunction(callbackFunction);
            removeScript(scriptId);
        }, timeout);
    });
}

export default fetchJsonp;
