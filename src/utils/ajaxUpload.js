// @flow

type ErrorStatus = {
  type: 'timeout' | 'server_error' | 'xhr_error',
  response?: any
};

type Options = {
  name: string,
  timeout?: number,
  data?: Object,
  withCredentials?: boolean,
  headers?: Object,
  file: File,
  url: string,
  onError: (status: ErrorStatus, event: Object) => void,
  onSuccess: (response: any, event: Object) => void,
  onProgress: (percent: number, event: Object) => void
};

function getResponse(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export default function ajaxUpload(options: Options) {
  const {
    name,
    timeout,
    headers = {},
    data = {},
    onError,
    onSuccess,
    onProgress,
    file,
    url,
    withCredentials
  } = options;

  const xhr = new XMLHttpRequest();
  const formData = new FormData();

  formData.append(name, file, file.name);

  xhr.open('POST', url, true);

  Object.keys(data).forEach(key => formData.append(key, data[key]));
  Object.keys(headers).forEach(key => {
    if (headers[key] !== null) {
      xhr.setRequestHeader(key, headers[key]);
    }
  });

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  if (timeout) {
    xhr.timeout = timeout;
    xhr.ontimeout = event => {
      onError({ type: 'timeout' }, event);
    };
  }

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  xhr.onload = event => {
    const resp = getResponse(xhr);
    if (xhr.status < 200 || xhr.status >= 300) {
      onError({ type: 'server_error', response: resp }, event);
      return;
    }
    onSuccess(resp, event);
  };

  if (xhr.upload) {
    xhr.upload.onprogress = event => {
      let percent = 0;
      if (event.lengthComputable) {
        percent = event.loaded / event.total * 100;
      }
      onProgress(percent, event);
    };
  }

  xhr.onerror = event => {
    onError({ type: 'xhr_error' }, event);
  };

  xhr.send(formData);

  return xhr;
}
