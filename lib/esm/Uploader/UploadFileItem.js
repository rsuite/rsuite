'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "disabled", "allowReupload", "file", "classPrefix", "listType", "className", "removable", "maxPreviewFileSize", "locale", "renderFileInfo", "renderThumbnail", "onPreview", "onCancel", "onReupload"];
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Attachment from '@rsuite/icons/Attachment';
import Reload from '@rsuite/icons/Reload';
import CloseButton from "../internals/CloseButton/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { previewFile } from "./utils/previewFile.js";
/**
 * Format display file size
 * @param size
 */
export var formatSize = function formatSize(size) {
  if (size === void 0) {
    size = 0;
  }
  var K = 1024;
  var M = 1024 * 1024;
  var G = 1024 * 1024 * 1024;
  if (size > G) {
    return (size / G).toFixed(2) + "GB";
  }
  if (size > M) {
    return (size / M).toFixed(2) + "MB";
  }
  if (size > K) {
    return (size / K).toFixed(2) + "KB";
  }
  return size + "B";
};
var UploadFileItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    disabled = props.disabled,
    _props$allowReupload = props.allowReupload,
    allowReupload = _props$allowReupload === void 0 ? true : _props$allowReupload,
    file = props.file,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'uploader-file-item' : _props$classPrefix,
    _props$listType = props.listType,
    listType = _props$listType === void 0 ? 'text' : _props$listType,
    className = props.className,
    _props$removable = props.removable,
    removable = _props$removable === void 0 ? true : _props$removable,
    _props$maxPreviewFile = props.maxPreviewFileSize,
    maxPreviewFileSize = _props$maxPreviewFile === void 0 ? 1024 * 1024 * 5 : _props$maxPreviewFile,
    locale = props.locale,
    renderFileInfo = props.renderFileInfo,
    renderThumbnail = props.renderThumbnail,
    onPreview = props.onPreview,
    onCancel = props.onCancel,
    onReupload = props.onReupload,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix(listType, {
    disabled: disabled,
    'has-error': file.status === 'error'
  }));
  var _useState = useState(file.url ? file.url : null),
    previewImage = _useState[0],
    setPreviewImage = _useState[1];

  /**
   * Get thumbnail of image file
   */
  var getThumbnail = useCallback(function (callback) {
    var _file$blobFile;
    if (!~['picture-text', 'picture'].indexOf(listType)) {
      return;
    }

    // The thumbnail file size cannot be larger than the preset value.
    if (!file.blobFile || (file === null || file === void 0 || (_file$blobFile = file.blobFile) === null || _file$blobFile === void 0 ? void 0 : _file$blobFile.size) > maxPreviewFileSize) {
      return;
    }
    previewFile(file.blobFile, callback);
  }, [file, listType, maxPreviewFileSize]);
  useEffect(function () {
    if (!file.url) {
      getThumbnail(function (previewImage) {
        setPreviewImage(previewImage);
      });
    }
  }, [file.url, getThumbnail]);
  var handlePreview = useCallback(function (event) {
    if (disabled) {
      return;
    }
    onPreview === null || onPreview === void 0 || onPreview(file, event);
  }, [disabled, file, onPreview]);
  var handleRemove = useCallback(function (event) {
    if (disabled) {
      return;
    }
    onCancel === null || onCancel === void 0 || onCancel(file.fileKey, event);
  }, [disabled, file.fileKey, onCancel]);
  var handleReupload = useCallback(function (event) {
    if (disabled) {
      return;
    }
    onReupload === null || onReupload === void 0 || onReupload(file, event);
  }, [disabled, file, onReupload]);

  /**
   * Rendering progress bar
   */
  var renderProgressBar = function renderProgressBar() {
    var _file$progress = file.progress,
      progress = _file$progress === void 0 ? 0 : _file$progress,
      status = file.status;
    var show = !disabled && status === 'uploading';
    var visibility = show ? 'visible' : 'hidden';
    var wrapStyle = {
      visibility: visibility
    };
    var progressbarStyle = {
      width: progress + "%"
    };
    return /*#__PURE__*/React.createElement("div", {
      className: prefix('progress'),
      style: wrapStyle
    }, /*#__PURE__*/React.createElement("div", {
      className: prefix('progress-bar'),
      style: progressbarStyle
    }));
  };
  var renderPreview = function renderPreview() {
    var thumbnail = previewImage ? /*#__PURE__*/React.createElement("img", {
      role: "presentation",
      src: previewImage,
      alt: file.name,
      onClick: handlePreview,
      "aria-label": "Preview: " + file.name
    }) : /*#__PURE__*/React.createElement(Attachment, {
      className: prefix('icon')
    });
    return /*#__PURE__*/React.createElement("div", {
      className: prefix('preview')
    }, renderThumbnail ? renderThumbnail(file, thumbnail) : thumbnail);
  };

  /**
   * Render the loading state.
   */
  var renderIcon = function renderIcon() {
    var uploading = file.status === 'uploading';
    var classes = prefix('icon-wrapper', {
      'icon-loading': uploading
    });
    if (uploading) {
      return /*#__PURE__*/React.createElement("div", {
        className: classes
      }, /*#__PURE__*/React.createElement("i", {
        className: prefix('icon'),
        "aria-label": "Uploading"
      }));
    }
    if (listType === 'picture' || listType === 'picture-text') {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: classes
    }, /*#__PURE__*/React.createElement(Attachment, {
      className: prefix('icon')
    }));
  };

  /**
   * Render the remove file button.
   */
  var renderRemoveButton = function renderRemoveButton() {
    if (!removable) {
      return null;
    }
    var closeLabel = 'Remove file';
    if (locale !== null && locale !== void 0 && locale.removeFile) {
      closeLabel = (locale === null || locale === void 0 ? void 0 : locale.removeFile) + (file !== null && file !== void 0 && file.name ? ": " + (file === null || file === void 0 ? void 0 : file.name) : '');
    }
    return /*#__PURE__*/React.createElement(CloseButton, {
      className: prefix('btn-remove'),
      onClick: handleRemove,
      tabIndex: -1,
      locale: {
        closeLabel: closeLabel
      },
      "aria-hidden": disabled
    });
  };

  /**
   * Render error messages.
   */
  var renderErrorStatus = function renderErrorStatus() {
    if (file.status === 'error') {
      return /*#__PURE__*/React.createElement("div", {
        className: prefix('status')
      }, /*#__PURE__*/React.createElement("span", null, locale === null || locale === void 0 ? void 0 : locale.error), allowReupload && /*#__PURE__*/React.createElement("a", {
        role: "button",
        tabIndex: -1,
        onClick: handleReupload,
        "aria-label": "Retry"
      }, /*#__PURE__*/React.createElement(Reload, {
        className: prefix('icon-reupload')
      })));
    }
    return null;
  };

  /**
   * Render file size.
   */
  var renderFileSize = function renderFileSize() {
    if (file.status !== 'error' && file.blobFile) {
      var _file$blobFile2;
      return /*#__PURE__*/React.createElement("span", {
        className: prefix('size')
      }, formatSize(file === null || file === void 0 || (_file$blobFile2 = file.blobFile) === null || _file$blobFile2 === void 0 ? void 0 : _file$blobFile2.size));
    }
    return null;
  };

  /**
   * Render file panel
   */
  var renderFilePanel = function renderFilePanel() {
    var fileElement = /*#__PURE__*/React.createElement("div", {
      className: prefix('title'),
      tabIndex: -1,
      onClick: handlePreview,
      "aria-label": "Preview: " + file.name
    }, file.name);
    return /*#__PURE__*/React.createElement("div", {
      className: prefix('panel')
    }, /*#__PURE__*/React.createElement("div", {
      className: prefix('content')
    }, renderFileInfo ? renderFileInfo(file, fileElement) : fileElement, renderErrorStatus(), renderFileSize()));
  };
  if (listType === 'picture') {
    return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
      ref: ref,
      className: classes
    }), renderIcon(), renderPreview(), renderErrorStatus(), renderRemoveButton());
  }
  if (listType === 'picture-text') {
    return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
      ref: ref,
      className: classes
    }), renderIcon(), renderPreview(), renderFilePanel(), renderProgressBar(), renderRemoveButton());
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), renderIcon(), renderFilePanel(), renderProgressBar(), renderRemoveButton());
});
UploadFileItem.displayName = 'UploadFileItem';
UploadFileItem.propTypes = {
  locale: PropTypes.any,
  file: PropTypes.object.isRequired,
  listType: oneOf(['text', 'picture-text', 'picture']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  maxPreviewFileSize: PropTypes.number,
  classPrefix: PropTypes.string,
  removable: PropTypes.bool,
  allowReupload: PropTypes.bool,
  renderFileInfo: PropTypes.func,
  renderThumbnail: PropTypes.func,
  onCancel: PropTypes.func,
  onPreview: PropTypes.func,
  onReupload: PropTypes.func
};
export default UploadFileItem;