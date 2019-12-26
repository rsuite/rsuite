"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FormattedMessage = _interopRequireDefault(require("../IntlProvider/FormattedMessage"));

var _utils = require("../utils");

var getSize = function getSize(size) {
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

var UploadFileItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(UploadFileItem, _React$Component);

  function UploadFileItem(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleRemove = function (event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onCancel = _this$props.onCancel,
          file = _this$props.file;

      if (disabled) {
        return;
      }

      onCancel === null || onCancel === void 0 ? void 0 : onCancel(file.fileKey, event);
    };

    _this.handlePreview = function (event) {
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          onPreview = _this$props2.onPreview,
          file = _this$props2.file;

      if (disabled) {
        return;
      }

      onPreview === null || onPreview === void 0 ? void 0 : onPreview(file, event);
    };

    _this.handleReupload = function (event) {
      var _this$props3 = _this.props,
          disabled = _this$props3.disabled,
          onReupload = _this$props3.onReupload,
          file = _this$props3.file;

      if (disabled) {
        return;
      }

      onReupload === null || onReupload === void 0 ? void 0 : onReupload(file, event);
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    var _file = props.file;
    _this.state = {
      previewImage: _file.url ? _file.url : null
    };

    if (!_file.url) {
      _this.getThumbnail(function (previewImage) {
        _this.setState({
          previewImage: previewImage
        });
      });
    }

    return _this;
  }

  var _proto = UploadFileItem.prototype;

  _proto.getThumbnail = function getThumbnail(callback) {
    var _this$props4 = this.props,
        file = _this$props4.file,
        listType = _this$props4.listType,
        maxPreviewFileSize = _this$props4.maxPreviewFileSize;

    if (!~['picture-text', 'picture'].indexOf(listType)) {
      return;
    }

    if (!file.blobFile || (0, _get2.default)(file, 'blobFile.size') > maxPreviewFileSize) {
      return;
    }

    (0, _utils.previewFile)(file.blobFile, callback);
  };

  _proto.renderProgressBar = function renderProgressBar() {
    var _this$props5 = this.props,
        disabled = _this$props5.disabled,
        file = _this$props5.file;
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
    return React.createElement("div", {
      className: this.addPrefix('progress'),
      style: wrapStyle
    }, React.createElement("div", {
      className: this.addPrefix('progress-bar'),
      style: progressbarStyle
    }));
  };

  _proto.renderPreview = function renderPreview() {
    var previewImage = this.state.previewImage;
    var file = this.props.file;

    if (previewImage) {
      return React.createElement("div", {
        className: this.addPrefix('preview')
      }, React.createElement("img", {
        role: "presentation",
        src: previewImage,
        alt: file.name,
        onClick: this.handlePreview
      }));
    }

    return null;
  };

  _proto.renderLoading = function renderLoading() {
    var _classNames;

    var file = this.props.file;
    var uploading = file.status === 'uploading';
    var classes = (0, _classnames.default)(this.addPrefix('icon-wrapper'), (_classNames = {}, _classNames[this.addPrefix('icon-loading')] = uploading, _classNames));
    return React.createElement("div", {
      className: classes
    }, React.createElement("i", {
      className: this.addPrefix('icon')
    }));
  };

  _proto.renderRemoveButton = function renderRemoveButton() {
    var removable = this.props.removable;

    if (!removable) {
      return null;
    }

    return React.createElement("a", {
      "aria-label": "Remove",
      className: this.addPrefix('btn-remove'),
      onClick: this.handleRemove,
      role: "button",
      tabIndex: -1
    }, React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"));
  };

  _proto.renderErrorStatus = function renderErrorStatus() {
    var file = this.props.file;

    if (file.status === 'error') {
      return React.createElement("div", {
        className: this.addPrefix('status')
      }, React.createElement(_FormattedMessage.default, {
        id: "error"
      }), React.createElement("a", {
        role: "button",
        tabIndex: -1,
        onClick: this.handleReupload
      }, React.createElement("i", {
        className: this.addPrefix('icon-reupload')
      })));
    }

    return null;
  };

  _proto.renderFileSize = function renderFileSize() {
    var file = this.props.file;

    if (file.status !== 'error' && file.blobFile) {
      return React.createElement("span", {
        className: this.addPrefix('size')
      }, getSize((0, _get2.default)(file, 'blobFile.size')));
    }

    return null;
  };

  _proto.renderFilePanel = function renderFilePanel() {
    var _this$props6 = this.props,
        file = _this$props6.file,
        renderFileInfo = _this$props6.renderFileInfo;
    var fileElement = React.createElement("a", {
      role: "presentation",
      className: this.addPrefix('title'),
      onClick: this.handlePreview
    }, file.name);
    return React.createElement("div", {
      className: this.addPrefix('panel')
    }, React.createElement("div", {
      className: this.addPrefix('content')
    }, renderFileInfo ? renderFileInfo(file, fileElement) : fileElement, this.renderErrorStatus(), this.renderFileSize()));
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props7 = this.props,
        disabled = _this$props7.disabled,
        file = _this$props7.file,
        classPrefix = _this$props7.classPrefix,
        listType = _this$props7.listType,
        className = _this$props7.className,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props7, ["disabled", "file", "classPrefix", "listType", "className"]);
    var classes = (0, _classnames.default)(classPrefix, className, this.addPrefix(listType), (_classNames2 = {}, _classNames2[this.addPrefix('has-error')] = file.status === 'error', _classNames2[this.addPrefix('disabled')] = disabled, _classNames2));
    var unhandled = (0, _utils.getUnhandledProps)(UploadFileItem, rest);

    if (listType === 'picture') {
      return React.createElement("div", {
        className: classes
      }, this.renderLoading(), this.renderPreview(), this.renderErrorStatus(), this.renderRemoveButton());
    }

    if (listType === 'picture-text') {
      return React.createElement("div", {
        className: classes
      }, this.renderLoading(), this.renderPreview(), this.renderFilePanel(), this.renderProgressBar(), this.renderRemoveButton());
    }

    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), this.renderLoading(), this.renderFilePanel(), this.renderProgressBar(), this.renderRemoveButton());
  };

  return UploadFileItem;
}(React.Component);

UploadFileItem.propTypes = {
  file: _propTypes.default.object,
  listType: _propTypes.default.oneOf(['text', 'picture-text', 'picture']),
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string,
  maxPreviewFileSize: _propTypes.default.number,
  classPrefix: _propTypes.default.string,
  removable: _propTypes.default.bool,
  renderFileInfo: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  onPreview: _propTypes.default.func,
  onReupload: _propTypes.default.func
};
UploadFileItem.defaultProps = {
  maxPreviewFileSize: 1024 * 1024 * 5,
  // 5MB
  listType: 'text',
  removable: true
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'uploader-file-item'
})(UploadFileItem);

exports.default = _default;
module.exports = exports.default;