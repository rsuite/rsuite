// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import compose from 'recompose/compose';
import { IntlProvider } from 'rsuite-intl';

import withLocale from './IntlProvider/withLocale';
import FileItem from './UploadFileItem';
import UploadTrigger from './UploadTrigger';

import { prefix, ajaxUpload, defaultProps } from './utils';

const guid = (num = 8) =>
  (Math.random() * 1e18)
    .toString(36)
    .slice(0, num)
    .toUpperCase();

const getFiles = (event: SyntheticInputEvent<*>) => {
  if (event.dataTransfer && typeof event.dataTransfer === 'object') {
    return event.dataTransfer.files;
  }
  if (event.target) {
    return event.target.files;
  }
  return [];
};

type FileType = {
  name: string,
  fileKey: number | string,
  // https://developer.mozilla.org/zh-CN/docs/Web/API/File
  blobFile?: File,
  status?: 'inited' | 'uploading' | 'error' | 'finished',
  progress?: number
};

type Props = {
  action: string,
  accept?: string,
  autoUpload?: boolean,
  children?: React.Element<any>,
  className?: string,
  classPrefix?: string,
  defaultFileList?: Array<FileType>,
  fileList?: Array<FileType>,
  data?: Object,
  multiple?: boolean,
  disabled?: boolean,
  disabledFileItem?: boolean,
  name: string,
  timeout?: number,
  withCredentials?: boolean,
  headers?: Object,
  locale?: Object,
  listType: 'text' | 'picture-text' | 'picture',
  shouldQueueUpdate?: (fileList: Array<FileType>, newFile: Array<FileType> | FileType) => boolean,
  shouldUpload?: (file: FileType) => boolean,
  onChange?: (fileList: Array<FileType>) => void,
  onUpload?: (file: FileType) => void,
  onReupload?: (file: FileType) => void,
  onError?: (reason: Object, file: FileType) => void,
  onPreview?: (file: FileType, event: SyntheticEvent<*>) => void,
  onSuccess?: (response: Object, file: FileType) => void,
  onProgress?: (percent: number, file: FileType) => void,
  onRemove?: (file: FileType) => void,
  maxPreviewFileSize?: number
};

type State = {
  fileList: Array<FileType>
};

class Uploader extends React.Component<Props, State> {
  static defaultProps = {
    autoUpload: true,
    timeout: 0,
    name: 'file',
    multiple: false,
    disabled: false,
    withCredentials: false,
    hasPanel: true,
    data: {},
    listType: 'text'
  };

  constructor(props: Props) {
    super(props);
    const { defaultFileList = [] } = props;
    const fileList = defaultFileList.map(this.createFile);

    this.state = {
      fileList
    };
  }

  getFileList() {
    const { fileList } = this.props;
    if (_.isUndefined(fileList)) {
      return this.state.fileList;
    }

    return fileList || [];
  }

  handleRemoveFile = (fileKey: number | string) => {
    const { onChange, onRemove } = this.props;
    const fileList = this.getFileList();
    const file: any = _.find(fileList, f => f.fileKey === fileKey);
    const nextFileList = fileList.filter(f => f.fileKey !== fileKey);

    if (this.xhrs[file.fileKey] && this.xhrs[file.fileKey].readyState !== 4) {
      this.xhrs[file.fileKey].abort();
    }

    this.setState({ fileList: nextFileList });

    onRemove && onRemove(file);
    onChange && onChange(nextFileList);
  };

  handleUploadTriggerChange = (event: SyntheticInputEvent<*>) => {
    const { autoUpload, shouldQueueUpdate, onChange } = this.props;
    const fileList = this.getFileList();
    const files: any = getFiles(event);
    const newFileList: Array<FileType> = [];

    Array.from(files).forEach(file => {
      newFileList.push({
        blobFile: file,
        name: file.name,
        status: 'inited',
        fileKey: guid()
      });
    });

    const nextFileList = [...fileList, ...newFileList];

    if (shouldQueueUpdate && shouldQueueUpdate(nextFileList, newFileList) === false) {
      return;
    }

    onChange && onChange(nextFileList);

    this.setState({ fileList: nextFileList }, () => {
      autoUpload && this.handleAjaxUpload();
    });
  };

  handleAjaxUpload() {
    const { shouldUpload } = this.props;
    const fileList = this.getFileList();
    fileList.forEach(file => {
      if (shouldUpload && shouldUpload(file) === false) {
        return;
      }

      if (file.status === 'inited') {
        this.handleUploadFile(file);
      }
    });

    if (this.input) {
      this.input.value = '';
    }
  }

  handleAjaxUploadSuccess = (response: Object, file: FileType) => {
    const { onSuccess } = this.props;
    const nextFile = {
      ...file,
      status: 'finished',
      progress: 100
    };
    this.updateFileList(nextFile, () => {
      onSuccess && onSuccess(response, nextFile);
    });
  };

  handleAjaxUploadError = (reason: Object, file: FileType) => {
    const { onError } = this.props;
    const nextFile = {
      ...file,
      status: 'error'
    };
    this.updateFileList(nextFile, () => {
      onError && onError(reason, nextFile);
    });
  };

  handleAjaxUploadProgress = (percent: number, file: FileType) => {
    const { onProgress } = this.props;
    const nextFile = {
      ...file,
      status: 'uploading',
      progress: percent
    };
    this.updateFileList(nextFile, () => {
      onProgress && onProgress(percent, nextFile);
    });
  };

  handleUploadFile = (file: FileType) => {
    const { name, action, headers, withCredentials, timeout, data, onUpload } = this.props;
    const xhr = ajaxUpload({
      name,
      timeout,
      headers,
      data,
      withCredentials,
      file: file.blobFile,
      url: action,
      onError: reason => {
        this.handleAjaxUploadError(reason, file);
      },
      onSuccess: resp => {
        this.handleAjaxUploadSuccess(resp, file);
      },
      onProgress: percent => {
        this.handleAjaxUploadProgress(percent, file);
      }
    });
    this.updateFileList({
      ...file,
      status: 'uploading'
    });
    this.xhrs[file.fileKey] = xhr;

    onUpload && onUpload(file);
  };

  handleReupload = (file: FileType) => {
    const { onReupload } = this.props;
    this.handleUploadFile(file);
    onReupload && onReupload(file);
  };

  updateFileList(nextFile: Object, callback?: () => void) {
    const fileList = this.getFileList();
    const nextFileList = fileList.map(
      file => (file.fileKey === nextFile.fileKey ? nextFile : file)
    );
    this.setState(
      {
        fileList: nextFileList
      },
      callback
    );
  }
  createFile = (file: FileType) => {
    const { fileKey } = file;
    return {
      ...file,
      fileKey: fileKey || guid(),
      progress: 0
    };
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  input: any;
  progressTimer: IntervalID;
  xhrs = {};
  uploadTrigger = null;
  inputRef = ref => {
    this.input = ref;
  };

  renderFileItems() {
    const { disabledFileItem, listType, onPreview, maxPreviewFileSize } = this.props;
    const fileList = this.getFileList();

    return (
      <div key="items" className={this.addPrefix('file-items')}>
        {fileList.map((file, index) => (
          <FileItem
            key={file.fileKey || index}
            file={file}
            maxPreviewFileSize={maxPreviewFileSize}
            listType={listType}
            disabled={disabledFileItem}
            onPreview={onPreview}
            onReupload={this.handleReupload}
            onCancel={this.handleRemoveFile}
          />
        ))}
      </div>
    );
  }

  renderUploadTrigger() {
    const { name, multiple, disabled, accept, children } = this.props;

    return (
      <UploadTrigger
        name={name}
        key="trigger"
        multiple={multiple}
        disabled={disabled}
        accept={accept}
        innerRef={this.inputRef}
        onChange={this.handleUploadTriggerChange}
      >
        {children}
      </UploadTrigger>
    );
  }

  render() {
    const { classPrefix, className, listType, locale } = this.props;
    const classes = classNames(classPrefix, this.addPrefix(listType), className);
    const renderList = [this.renderUploadTrigger(), this.renderFileItems()];

    if (listType === 'picture') {
      renderList.reverse();
    }

    return (
      <IntlProvider locale={locale}>
        <div className={classes}>{renderList}</div>
      </IntlProvider>
    );
  }
}

export default compose(
  withLocale(['Uploader']),
  defaultProps({
    classPrefix: 'uploader'
  })
)(Uploader);
