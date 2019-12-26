"use strict";

exports.__esModule = true;
exports.default = ajaxUpload;

function getResponse(xhr) {
  var text = xhr.responseText || xhr.response;

  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function ajaxUpload(options) {
  var name = options.name,
      timeout = options.timeout,
      _options$headers = options.headers,
      headers = _options$headers === void 0 ? {} : _options$headers,
      _options$data = options.data,
      data = _options$data === void 0 ? {} : _options$data,
      onError = options.onError,
      onSuccess = options.onSuccess,
      onProgress = options.onProgress,
      file = options.file,
      url = options.url,
      withCredentials = options.withCredentials;
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  formData.append(name, file, file.name);
  xhr.open('POST', url, true);
  Object.keys(data).forEach(function (key) {
    return formData.append(key, data[key]);
  });
  Object.keys(headers).forEach(function (key) {
    if (headers[key] !== null) {
      xhr.setRequestHeader(key, headers[key]);
    }
  });

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  if (timeout) {
    xhr.timeout = timeout;

    xhr.ontimeout = function (event) {
      onError({
        type: 'timeout'
      }, event);
    };
  }

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  xhr.onload = function (event) {
    var resp = getResponse(xhr);

    if (xhr.status < 200 || xhr.status >= 300) {
      onError({
        type: 'server_error',
        response: resp
      }, event);
      return;
    }

    onSuccess(resp, event);
  };

  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      var percent = 0;

      if (event.lengthComputable) {
        percent = event.loaded / event.total * 100;
      }

      onProgress(percent, event);
    };
  }

  xhr.onerror = function (event) {
    onError({
      type: 'xhr_error'
    }, event);
  };

  xhr.send(formData);
  return xhr;
}

module.exports = exports.default;