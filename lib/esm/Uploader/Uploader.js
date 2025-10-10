'use client';
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["as", "classPrefix", "className", "listType", "defaultFileList", "fileList", "fileListVisible", "locale", "style", "draggable", "name", "multiple", "disabled", "readOnly", "plaintext", "accept", "children", "toggleAs", "removable", "disabledFileItem", "maxPreviewFileSize", "method", "autoUpload", "action", "headers", "withCredentials", "disableMultipart", "timeout", "data", "onRemove", "onUpload", "shouldUpload", "shouldQueueUpdate", "renderFileInfo", "renderThumbnail", "onPreview", "onChange", "onSuccess", "onError", "onProgress", "onReupload"];
import React, { useCallback, useRef, useImperativeHandle, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import FileItem from "./UploadFileItem.js";
import Plaintext from "../internals/Plaintext/index.js";
import ajaxUpload from "./utils/ajaxUpload.js";
import UploadTrigger from "./UploadTrigger.js";
import { useClassNames, useWillUnmount } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { guid } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";

// Define several states of the file during the upload process.

var getFiles = function getFiles(event) {
  if (typeof (event === null || event === void 0 ? void 0 : event['dataTransfer']) === 'object') {
    var _event$dataTransfer;
    return event === null || event === void 0 || (_event$dataTransfer = event['dataTransfer']) === null || _event$dataTransfer === void 0 ? void 0 : _event$dataTransfer.files;
  }
  if (event.target) {
    return event.target['files'];
  }
  return [];
};
var createFile = function createFile(file) {
  var fileKey = file.fileKey;
  return _extends({}, file, {
    fileKey: fileKey || guid(),
    progress: 0
  });
};
function fileListReducer(files, action) {
  var _action$files;
  switch (action.type) {
    // Add one or more files
    case 'push':
      return [].concat(files, action.files);

    // Remove a file by `fileKey`
    case 'remove':
      return files.filter(function (f) {
        return f.fileKey !== action.fileKey;
      });

    // Update a file
    case 'updateFile':
      return files.map(function (file) {
        return file.fileKey === action.file.fileKey ? action.file : file;
      });

    // Initialization file list
    case 'init':
      return ((_action$files = action.files) === null || _action$files === void 0 ? void 0 : _action$files.map(function (file) {
        // The state of the file needs to be preserved when the `fileList` is controlled.
        return files.find(function (f) {
          return f.fileKey === file.fileKey;
        }) || createFile(file);
      })) || [];
    default:
      throw new Error();
  }
}
var useFileList = function useFileList(defaultFileList) {
  if (defaultFileList === void 0) {
    defaultFileList = [];
  }
  var fileListRef = useRef(defaultFileList.map(createFile));
  var fileListUpdateCallback = useRef();
  var _useReducer = useReducer(fileListReducer, fileListRef.current),
    fileList = _useReducer[0],
    dispatch = _useReducer[1];
  fileListRef.current = fileList;
  useEffect(function () {
    var _fileListUpdateCallba;
    (_fileListUpdateCallba = fileListUpdateCallback.current) === null || _fileListUpdateCallba === void 0 || _fileListUpdateCallba.call(fileListUpdateCallback, fileList);
    fileListUpdateCallback.current = null;
  }, [fileList]);
  useWillUnmount(function () {
    fileListUpdateCallback.current = null;
  });
  var dispatchCallback = useCallback(function (action, callback) {
    dispatch(action);
    fileListUpdateCallback.current = callback;
  }, []);
  return [fileListRef, dispatchCallback];
};

/**
 * The `Uploader` component is used to upload files.
 *
 * @see https://rsuitejs.com/components/uploader
 */
var Uploader = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Uploader', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'uploader' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    _propsWithDefaults$li = propsWithDefaults.listType,
    listType = _propsWithDefaults$li === void 0 ? 'text' : _propsWithDefaults$li,
    defaultFileList = propsWithDefaults.defaultFileList,
    fileListProp = propsWithDefaults.fileList,
    _propsWithDefaults$fi = propsWithDefaults.fileListVisible,
    fileListVisible = _propsWithDefaults$fi === void 0 ? true : _propsWithDefaults$fi,
    locale = propsWithDefaults.locale,
    style = propsWithDefaults.style,
    draggable = propsWithDefaults.draggable,
    _propsWithDefaults$na = propsWithDefaults.name,
    name = _propsWithDefaults$na === void 0 ? 'file' : _propsWithDefaults$na,
    _propsWithDefaults$mu = propsWithDefaults.multiple,
    multiple = _propsWithDefaults$mu === void 0 ? false : _propsWithDefaults$mu,
    _propsWithDefaults$di = propsWithDefaults.disabled,
    disabled = _propsWithDefaults$di === void 0 ? false : _propsWithDefaults$di,
    readOnly = propsWithDefaults.readOnly,
    plaintext = propsWithDefaults.plaintext,
    accept = propsWithDefaults.accept,
    children = propsWithDefaults.children,
    toggleAs = propsWithDefaults.toggleAs,
    _propsWithDefaults$re = propsWithDefaults.removable,
    removable = _propsWithDefaults$re === void 0 ? true : _propsWithDefaults$re,
    disabledFileItem = propsWithDefaults.disabledFileItem,
    maxPreviewFileSize = propsWithDefaults.maxPreviewFileSize,
    _propsWithDefaults$me = propsWithDefaults.method,
    method = _propsWithDefaults$me === void 0 ? 'POST' : _propsWithDefaults$me,
    _propsWithDefaults$au = propsWithDefaults.autoUpload,
    autoUpload = _propsWithDefaults$au === void 0 ? true : _propsWithDefaults$au,
    action = propsWithDefaults.action,
    headers = propsWithDefaults.headers,
    _propsWithDefaults$wi = propsWithDefaults.withCredentials,
    withCredentials = _propsWithDefaults$wi === void 0 ? false : _propsWithDefaults$wi,
    disableMultipart = propsWithDefaults.disableMultipart,
    _propsWithDefaults$ti = propsWithDefaults.timeout,
    timeout = _propsWithDefaults$ti === void 0 ? 0 : _propsWithDefaults$ti,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? {} : _propsWithDefaults$da,
    onRemove = propsWithDefaults.onRemove,
    onUpload = propsWithDefaults.onUpload,
    shouldUpload = propsWithDefaults.shouldUpload,
    shouldQueueUpdate = propsWithDefaults.shouldQueueUpdate,
    renderFileInfo = propsWithDefaults.renderFileInfo,
    renderThumbnail = propsWithDefaults.renderThumbnail,
    onPreview = propsWithDefaults.onPreview,
    onChange = propsWithDefaults.onChange,
    onSuccess = propsWithDefaults.onSuccess,
    onError = propsWithDefaults.onError,
    onProgress = propsWithDefaults.onProgress,
    onReupload = propsWithDefaults.onReupload,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix(listType, {
    draggable: draggable
  }));
  var rootRef = useRef();
  var xhrs = useRef({});
  var trigger = useRef();
  var _useFileList = useFileList(fileListProp || defaultFileList),
    fileList = _useFileList[0],
    dispatch = _useFileList[1];
  useEffect(function () {
    if (typeof fileListProp !== 'undefined') {
      // Force reset fileList in reducer, when `fileListProp` is updated
      dispatch({
        type: 'init',
        files: fileListProp
      });
    }
  }, [dispatch, fileListProp]);
  var updateFileStatus = useCallback(function (nextFile) {
    dispatch({
      type: 'updateFile',
      file: nextFile
    });
  }, [dispatch]);

  /**
   * Clear the value in input.
   */
  var cleanInputValue = useCallback(function () {
    var _trigger$current;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || _trigger$current.clearInput();
  }, []);

  /**
   * Callback for successful file upload.
   * @param file
   * @param response
   * @param event
   * @param xhr
   */
  var handleAjaxUploadSuccess = useCallback(function (file, response, event, xhr) {
    var nextFile = _extends({}, file, {
      status: 'finished',
      progress: 100
    });
    updateFileStatus(nextFile);
    onSuccess === null || onSuccess === void 0 || onSuccess(response, nextFile, event, xhr);
  }, [onSuccess, updateFileStatus]);

  /**
   * Callback for file upload error.
   * @param file
   * @param status
   * @param event
   * @param xhr
   */
  var handleAjaxUploadError = useCallback(function (file, status, event, xhr) {
    var nextFile = _extends({}, file, {
      status: 'error'
    });
    updateFileStatus(nextFile);
    onError === null || onError === void 0 || onError(status, nextFile, event, xhr);
  }, [onError, updateFileStatus]);

  /**
   * Callback for file upload progress update.
   * @param file
   * @param percent
   * @param event
   * @param xhr
   */
  var handleAjaxUploadProgress = useCallback(function (file, percent, event, xhr) {
    var nextFile = _extends({}, file, {
      status: 'uploading',
      progress: percent
    });
    updateFileStatus(nextFile);
    onProgress === null || onProgress === void 0 || onProgress(percent, nextFile, event, xhr);
  }, [onProgress, updateFileStatus]);

  /**
   * Upload a single file.
   * @param file
   */
  var handleUploadFile = useCallback(function (file) {
    var _ajaxUpload = ajaxUpload({
        name: name,
        timeout: timeout,
        headers: headers,
        data: data,
        method: method,
        withCredentials: withCredentials,
        disableMultipart: disableMultipart,
        file: file.blobFile,
        url: action,
        onError: handleAjaxUploadError.bind(null, file),
        onSuccess: handleAjaxUploadSuccess.bind(null, file),
        onProgress: handleAjaxUploadProgress.bind(null, file)
      }),
      xhr = _ajaxUpload.xhr,
      uploadData = _ajaxUpload.data;
    updateFileStatus(_extends({}, file, {
      status: 'uploading'
    }));
    if (file.fileKey) {
      xhrs.current[file.fileKey] = xhr;
    }
    onUpload === null || onUpload === void 0 || onUpload(file, uploadData, xhr);
  }, [name, timeout, headers, data, method, withCredentials, disableMultipart, action, handleAjaxUploadError, handleAjaxUploadSuccess, handleAjaxUploadProgress, updateFileStatus, onUpload]);
  var handleAjaxUpload = useCallback(function () {
    fileList.current.forEach(function (file) {
      var checkState = shouldUpload === null || shouldUpload === void 0 ? void 0 : shouldUpload(file);
      if (checkState instanceof Promise) {
        checkState.then(function (res) {
          if (res) {
            handleUploadFile(file);
          }
        });
        return;
      } else if (checkState === false) {
        return;
      }
      if (file.status === 'inited') {
        handleUploadFile(file);
      }
    });
    cleanInputValue();
  }, [cleanInputValue, fileList, handleUploadFile, shouldUpload]);
  var handleUploadTriggerChange = function handleUploadTriggerChange(event) {
    var files = getFiles(event);
    var newFileList = [];
    Array.from(files).forEach(function (file) {
      newFileList.push({
        blobFile: file,
        name: file.name,
        status: 'inited',
        fileKey: guid()
      });
    });
    var nextFileList = [].concat(fileList.current, newFileList);
    var checkState = shouldQueueUpdate === null || shouldQueueUpdate === void 0 ? void 0 : shouldQueueUpdate(nextFileList, newFileList);
    if (checkState === false) {
      cleanInputValue();
      return;
    }
    var upload = function upload() {
      onChange === null || onChange === void 0 || onChange(nextFileList, event);
      if (rootRef.current) {
        dispatch({
          type: 'push',
          files: newFileList
        }, function () {
          autoUpload && handleAjaxUpload();
        });
      }
    };
    if (checkState instanceof Promise) {
      checkState.then(function (res) {
        res && upload();
      });
      return;
    }
    upload();
  };
  var handleRemoveFile = function handleRemoveFile(fileKey, event) {
    var _xhrs$current;
    var file = find(fileList.current, function (f) {
      return f.fileKey === fileKey;
    });
    var nextFileList = fileList.current.filter(function (f) {
      return f.fileKey !== fileKey;
    });
    if (((_xhrs$current = xhrs.current) === null || _xhrs$current === void 0 || (_xhrs$current = _xhrs$current[file.fileKey]) === null || _xhrs$current === void 0 ? void 0 : _xhrs$current.readyState) !== 4) {
      var _xhrs$current$file$fi;
      (_xhrs$current$file$fi = xhrs.current[file.fileKey]) === null || _xhrs$current$file$fi === void 0 || _xhrs$current$file$fi.abort();
    }
    dispatch({
      type: 'remove',
      fileKey: fileKey
    });
    onRemove === null || onRemove === void 0 || onRemove(file);
    onChange === null || onChange === void 0 || onChange(nextFileList, event);
    cleanInputValue();
  };
  var handleReupload = function handleReupload(file) {
    autoUpload && handleUploadFile(file);
    onReupload === null || onReupload === void 0 || onReupload(file);
  };

  // public API
  var start = function start(file) {
    if (file) {
      handleUploadFile(file);
      return;
    }
    handleAjaxUpload();
  };
  useImperativeHandle(ref, function () {
    return {
      root: rootRef.current,
      start: start
    };
  });
  var renderList = [/*#__PURE__*/React.createElement(UploadTrigger, _extends({}, rest, {
    locale: locale,
    name: name,
    key: "trigger",
    multiple: multiple,
    draggable: draggable,
    disabled: disabled,
    readOnly: readOnly,
    accept: accept,
    ref: trigger,
    onChange: handleUploadTriggerChange,
    as: toggleAs
  }), children)];
  if (fileListVisible) {
    renderList.push(/*#__PURE__*/React.createElement("div", {
      key: "items",
      className: prefix('file-items')
    }, fileList.current.map(function (file, index) {
      return /*#__PURE__*/React.createElement(FileItem, {
        locale: locale,
        key: file.fileKey || index,
        file: file,
        maxPreviewFileSize: maxPreviewFileSize,
        listType: listType,
        disabled: disabledFileItem,
        onPreview: onPreview,
        onReupload: handleReupload,
        onCancel: handleRemoveFile,
        renderFileInfo: renderFileInfo,
        renderThumbnail: renderThumbnail,
        removable: removable && !readOnly && !plaintext,
        allowReupload: !readOnly && !plaintext
      });
    })));
  }
  if (plaintext) {
    return /*#__PURE__*/React.createElement(Plaintext, {
      localeKey: "notUploaded",
      className: withClassPrefix(listType)
    }, fileList.current.length ? renderList[1] : null);
  }
  if (listType === 'picture') {
    renderList.reverse();
  }
  return /*#__PURE__*/React.createElement(Component, {
    ref: rootRef,
    className: classes,
    style: style
  }, renderList);
});
Uploader.displayName = 'Uploader';
Uploader.propTypes = {
  action: PropTypes.string.isRequired,
  accept: PropTypes.string,
  autoUpload: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  defaultFileList: PropTypes.array,
  fileList: PropTypes.array,
  data: PropTypes.object,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledFileItem: PropTypes.bool,
  name: PropTypes.string,
  timeout: PropTypes.number,
  withCredentials: PropTypes.bool,
  headers: PropTypes.object,
  locale: PropTypes.any,
  listType: oneOf(['text', 'picture-text', 'picture']),
  shouldQueueUpdate: PropTypes.func,
  shouldUpload: PropTypes.func,
  onChange: PropTypes.func,
  onUpload: PropTypes.func,
  onReupload: PropTypes.func,
  onPreview: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  onProgress: PropTypes.func,
  onRemove: PropTypes.func,
  maxPreviewFileSize: PropTypes.number,
  method: PropTypes.string,
  style: PropTypes.object,
  renderFileInfo: PropTypes.func,
  renderThumbnail: PropTypes.func,
  removable: PropTypes.bool,
  fileListVisible: PropTypes.bool,
  draggable: PropTypes.bool,
  disableMultipart: PropTypes.bool
};
export default Uploader;