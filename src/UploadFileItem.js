// @flow

import * as React from 'react';
import { FormattedMessage } from 'rsuite-intl';
import classNames from 'classnames';
import _ from 'lodash';

import { previewFile, defaultProps, prefix } from './utils';

type FileType = {
  fileKey: number | string,
  name: string,
  // https://developer.mozilla.org/zh-CN/docs/Web/API/File
  blobFile?: File,
  status?: 'inited' | 'uploading' | 'error' | 'finished',
  progress?: number
};

type Props = {
  file: FileType,
  listType: 'text' | 'picture-text' | 'picture',
  disabled?: boolean,
  onCancel?: (fileKey: number | string, event: SyntheticEvent<*>) => void,
  onPreview?: (file: FileType, event: SyntheticEvent<*>) => void,
  className?: string,
  classPrefix?: string
};

type State = {
  previewImage?: null | string | ArrayBuffer
};

const getSize = (size: number = 0): string => {
  // @flow
  const K = 1024;
  const M = 1024 * 1024;
  const G = 1024 * 1024 * 1024;

  if (size > G) {
    return `${(size / M).toFixed(2)}GB`;
  }

  if (size > M) {
    return `${(size / M).toFixed(2)}MB`;
  }

  if (size > K) {
    return `${(size / K).toFixed(2)}KB`;
  }
  return `${size}B`;
};

class UploadFileItem extends React.Component<Props, State> {
  static defaultProps = {
    listType: 'text'
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      thumbnail: null
    };
  }

  componentWillMount() {
    this.getThumbnail();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (_.isEqual(nextProps, this.props)) {
      this.getThumbnail(nextProps);
    }
  }

  getThumbnail(nextProps?: Props) {
    const { file } = nextProps || this.props;
    if (file.blobFile) {
      previewFile(file.blobFile, (previewImage: string | ArrayBuffer) => {
        this.setState({ previewImage });
      });
    }
  }

  handleRemove = (event: SyntheticEvent<*>) => {
    const { disabled, onCancel, file } = this.props;

    if (disabled) {
      return;
    }

    onCancel && onCancel(file.fileKey, event);
  };

  handlePreview = (event: SyntheticEvent<*>) => {
    const { disabled, onPreview, file } = this.props;
    if (disabled) {
      return;
    }
    onPreview && onPreview(file, event);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderProgressBar() {
    const { disabled, file } = this.props;
    const { progress = 0, status } = file;
    const show = !disabled && status === 'uploading';
    const visibility = show ? 'visible' : 'hidden';
    const wrapStyle = {
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

    if (previewImage && file.blobFile) {
      return (
        <div className={this.addPrefix('preview')}>
          <img
            role="presentation"
            src={previewImage}
            alt={file.blobFile.name}
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
    return (
      <a
        aria-label="Remove"
        className={this.addPrefix('btn-remove')}
        onClick={this.handleRemove}
        role="button"
        tabIndex="-1"
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
        </div>
      );
    }
    return null;
  }
  renderFileSize() {
    const { file } = this.props;
    if (file.blobFile && file.blobFile.size) {
      return <span className={this.addPrefix('size')}>{getSize(file.blobFile.size)}</span>;
    }
    return null;
  }

  renderFilePanel() {
    const { file } = this.props;
    return (
      <div className={this.addPrefix('panel')}>
        <div className={this.addPrefix('content')}>
          <a role="presentation" className={this.addPrefix('title')} onClick={this.handlePreview}>
            {file.name}
          </a>
          {this.renderErrorStatus()}
          {this.renderFileSize()}
        </div>
      </div>
    );
  }

  render() {
    const { disabled, file, classPrefix, listType, className } = this.props;
    const classes = classNames(classPrefix, className, {
      [this.addPrefix('has-error')]: file.status === 'error',
      [this.addPrefix('disabled')]: disabled
    });

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
      <div className={classes}>
        {this.renderLoading()}
        {this.renderFilePanel()}
        {this.renderProgressBar()}
        {this.renderRemoveButton()}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'uploader-file-item'
})(UploadFileItem);
