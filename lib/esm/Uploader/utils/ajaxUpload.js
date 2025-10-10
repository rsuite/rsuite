'use client';
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
export default function ajaxUpload(options) {
  var name = options.name,
    timeout = options.timeout,
    _options$headers = options.headers,
    headers = _options$headers === void 0 ? {} : _options$headers,
    _options$data = options.data,
    data = _options$data === void 0 ? {} : _options$data,
    _options$method = options.method,
    method = _options$method === void 0 ? 'POST' : _options$method,
    onError = options.onError,
    onSuccess = options.onSuccess,
    onProgress = options.onProgress,
    file = options.file,
    url = options.url,
    withCredentials = options.withCredentials,
    disableMultipart = options.disableMultipart;
  var xhr = new XMLHttpRequest();
  var sendableData;
  xhr.open(method, url, true);
  if (!disableMultipart) {
    sendableData = new FormData();
    sendableData.append(name, file, file.name);
    for (var key in data) {
      sendableData.append(key, data[key]);
    }
  } else {
    sendableData = file;
  }
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
      onError === null || onError === void 0 || onError({
        type: 'timeout'
      }, event, xhr);
    };
  }
  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }
  xhr.onload = function (event) {
    var resp = getResponse(xhr);
    if (xhr.status < 200 || xhr.status >= 300) {
      onError === null || onError === void 0 || onError({
        type: 'server_error',
        response: resp
      }, event, xhr);
      return;
    }
    onSuccess === null || onSuccess === void 0 || onSuccess(resp, event, xhr);
  };
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      var percent = 0;
      if (event.lengthComputable) {
        percent = event.loaded / event.total * 100;
      }
      onProgress === null || onProgress === void 0 || onProgress(percent, event, xhr);
    };
  }
  xhr.onerror = function (event) {
    onError === null || onError === void 0 || onError({
      type: 'xhr_error'
    }, event, xhr);
  };
  xhr.send(sendableData);
  return {
    xhr: xhr,
    data: sendableData
  };
}