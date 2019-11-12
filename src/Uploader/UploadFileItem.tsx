import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import FormattedMessage from '../IntlProvider/FormattedMessage';
import { previewFile, defaultProps, getUnhandledProps, prefix } from '../utils';
import { FileType } from './Uploader.d';

export interface UploadFileItemProps {
  file: FileType;
  listType: 'text' | 'picture-text' | 'picture';
  disabled?: boolean;
  className?: string;
  maxPreviewFileSize: number;
  classPrefix?: string;
  removable?: boolean;
  renderFileInfo?: (file: FileType, fileElement: React.ReactNode) => React.ReactNode;
  onCancel?: (fileKey: number | string, event: React.MouseEvent) => void;
  onPreview?: (file: FileType, event: React.MouseEvent) => void;
  onReupload?: (file: FileType, event: React.MouseEvent) => void;
}

interface UploadFileItemState {
  previewImage?: string;
}

const getSize = (size = 0): string => {
  const K = 1024;
  const M = 1024 * 1024;
  const G = 1024 * 1024 * 1024;

  if (size > G) {
    return `${(size / G).toFixed(2)}GB`;
  }

  if (size > M) {
    return `${(size / M).toFixed(2)}MB`;
  }

  if (size > K) {
    return `${(size / K).toFixed(2)}KB`;
  }
  return `${size}B`;
};

class UploadFileItem extends React.Component<UploadFileItemProps, UploadFileItemState> {
  static propTypes = {
    file: PropTypes.object,
    listType: PropTypes.oneOf(['text', 'picture-text', 'picture']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    maxPreviewFileSize: PropTypes.number,
    classPrefix: PropTypes.string,
    removable: PropTypes.bool,
    renderFileInfo: PropTypes.func,
    onCancel: PropTypes.func,
    onPreview: PropTypes.func,
    onReupload: PropTypes.func
  };
  static defaultProps = {
    maxPreviewFileSize: 1024 * 1024 * 5, // 5MB
    listType: 'text',
    removable: true
  };

  constructor(props) {
    super(props);

    const { file } = props;

    this.state = {
      previewImage: file.url ? file.url : null
    };

    if (!file.url) {
      this.getThumbnail((previewImage: any) => {
        this.setState({ previewImage });
      });
    }
  }

  getThumbnail(callback) {
    const { file, listType, maxPreviewFileSize } = this.props;

    if (!~['picture-text', 'picture'].indexOf(listType)) {
      return;
    }

    if (!file.blobFile || _.get(file, 'blobFile.size') > maxPreviewFileSize) {
      return;
    }

    previewFile(file.blobFile, callback);
  }

  handleRemove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { disabled, onCancel, file } = this.props;

    if (disabled) {
      return;
    }

    onCancel?.(file.fileKey, event);
  };

  handlePreview = (event: React.MouseEvent) => {
    const { disabled, onPreview, file } = this.props;
    if (disabled) {
      return;
    }
    onPreview?.(file, event);
  };

  handleReupload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { disabled, onReupload, file } = this.props;
    if (disabled) {
      return;
    }
    onReupload?.(file, event);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderProgressBar() {
    const { disabled, file } = this.props;
    const { progress = 0, status } = file;
    const show = !disabled && status === 'uploading';
    const visibility = show ? 'visible' : 'hidden';
    const wrapStyle: React.CSSProperties = {
      visibility
    };
    const progressbarStyle = {
      width: `${progress}%`
    };
    return (
      <div className={this.addPrefix('progress')} style={wrapStyle}>
        <div className={this.addPrefix('progress-bar')} style={progressbarStyle} />
      </div>
    );
  }

  renderPreview() {
    const { previewImage } = this.state;
    const { file } = this.props;

    if (previewImage) {
      return (
        <div className={this.addPrefix('preview')}>
          <img
            role="presentation"
            src={previewImage}
            alt={file.name}
            onClick={this.handlePreview}
          />
        </div>
      );
    }
    return null;
  }

  renderLoading() {
    const { file } = this.props;
    const uploading = file.status === 'uploading';
    const classes = classNames(this.addPrefix('icon-wrapper'), {
      [this.addPrefix('icon-loading')]: uploading
    });
    return (
      <div className={classes}>
        <i className={this.addPrefix('icon')} />
      </div>
    );
  }

  renderRemoveButton() {
    const { removable } = this.props;

    if (!removable) {
      return null;
    }

    return (
      <a
        aria-label="Remove"
        className={this.addPrefix('btn-remove')}
        onClick={this.handleRemove}
        role="button"
        tabIndex={-1}
      >
        <span aria-hidden="true">×</span>
      </a>
    );
  }

  renderErrorStatus() {
    const { file } = this.props;
    if (file.status === 'error') {
      return (
        <div className={this.addPrefix('status')}>
          <FormattedMessage id="error" />
          <a role="button" tabIndex={-1} onClick={this.handleReupload}>
            <i className={this.addPrefix('icon-reupload')} />
          </a>
        </div>
      );
    }
    return null;
  }
  renderFileSize() {
    const { file } = this.props;
    if (file.status !== 'error' && file.blobFile) {
      return (
        <span className={this.addPrefix('size')}>{getSize(_.get(file, 'blobFile.size'))}</span>
      );
    }
    return null;
  }

  renderFilePanel() {
    const { file, renderFileInfo } = this.props;
    const fileElement = (
      <a role="presentation" className={this.addPrefix('title')} onClick={this.handlePreview}>
        {file.name}
      </a>
    );
    return (
      <div className={this.addPrefix('panel')}>
        <div className={this.addPrefix('content')}>
          {renderFileInfo ? renderFileInfo(file, fileElement) : fileElement}
          {this.renderErrorStatus()}
          {this.renderFileSize()}
        </div>
      </div>
    );
  }

  render() {
    const { disabled, file, classPrefix, listType, className, ...rest } = this.props;
    const classes = classNames(classPrefix, className, this.addPrefix(listType), {
      [this.addPrefix('has-error')]: file.status === 'error',
      [this.addPrefix('disabled')]: disabled
    });
    const unhandled = getUnhandledProps(UploadFileItem, rest);

    if (listType === 'picture') {
      return (
        <div className={classes}>
          {this.renderLoading()}
          {this.renderPreview()}
          {this.renderErrorStatus()}
          {this.renderRemoveButton()}
        </div>
      );
    }

    if (listType === 'picture-text') {
      return (
        <div className={classes}>
          {this.renderLoading()}
          {this.renderPreview()}
          {this.renderFilePanel()}
          {this.renderProgressBar()}
          {this.renderRemoveButton()}
        </div>
      );
    }

    return (
      <div {...unhandled} className={classes}>
        {this.renderLoading()}
        {this.renderFilePanel()}
        {this.renderProgressBar()}
        {this.renderRemoveButton()}
      </div>
    );
  }
}

export default defaultProps<UploadFileItemProps>({
  classPrefix: 'uploader-file-item'
})(UploadFileItem);
