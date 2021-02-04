import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface FileType {
  /** File Name */
  name?: string;
  /** File unique identifier */
  fileKey?: number | string;
  /** https://developer.mozilla.org/zh-CN/docs/Web/API/File */
  blobFile?: File;

  /** File upload status */
  status?: 'inited' | 'uploading' | 'error' | 'finished';

  /** File upload status */
  progress?: number;

  /** The url of the file can be previewed. */
  url?: string;
}

export interface UploaderProps extends StandardProps {
  /** Uploading URL */
  action?: string;

  /** File types that can be accepted. See input accept Attribute */
  accept?: string;

  /** Automatically upload files after selecting them */
  autoUpload?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** List of uploaded files */
  defaultFileList?: FileType[];

  /** List of uploaded files （Controlled） */
  fileList?: FileType[];

  /** Upload the parameters with */
  data?: object;

  /** Allow multiple file uploads to be selected at a time */

  multiple?: boolean;

  /** Disabled upload button */
  disabled?: boolean;

  /** Disabled file item */
  disabledFileItem?: boolean;

  /** Upload the parameter name of the corresponding file */
  name?: string;

  /** Set upload timeout */
  timeout?: number;

  /** Whether to carry cookies when uploading requests */
  withCredentials?: boolean;

  /** Set Upload request Header */
  headers?: object;

  /** Upload list Style */
  listType?: 'text' | 'picture-text' | 'picture';

  /** Allow the queue to be updated. After you select a file, update the checksum function before the upload file queue, and return false to not update */
  shouldQueueUpdate?: (
    fileList: FileType[],
    newFile: FileType[] | FileType
  ) => boolean | Promise<boolean>;

  /** Allow uploading of files. Check function before file upload, return false without uploading  */
  shouldUpload?: (file: FileType) => boolean | Promise<boolean>;

  /** callback function that the upload queue has changed */
  onChange?: (fileList: FileType[]) => void;

  /** The callback function that starts the upload file */
  onUpload?: (file: FileType) => void;

  /** In the file list, for uploading failed files, click the callback function to upload */
  onReupload?: (file: FileType) => void;

  /** In the file list, click the callback function for the uploaded file */
  onPreview?: (file: FileType, event: React.SyntheticEvent<any>) => void;

  /** Upload callback function with erro */
  onError?: (
    status: object,
    file: FileType,
    event: React.SyntheticEvent<any>,
    xhr: XMLHttpRequest
  ) => void;

  /** callback function after successful upload */
  onSuccess?: (
    response: object,
    file: FileType,
    event: React.SyntheticEvent<any>,
    xhr: XMLHttpRequest
  ) => void;

  /** Callback functions that upload progress change */
  onProgress?: (
    percent: number,
    file: FileType,
    event: React.SyntheticEvent<any>,
    xhr: XMLHttpRequest
  ) => void;

  /** In the file list, click the callback function to delete a file */
  onRemove?: (file: FileType) => void;

  /** Max file size limit of the preview file */
  maxPreviewFileSize?: number;

  /** You can use a custom element for this component */
  toggleComponentClass?: React.ElementType;

  /** Custom render file information */
  renderFileInfo?: (file: FileType, fileElement: React.ReactNode) => React.ReactNode;

  /** Removable list file  */
  removable?: boolean;

  /** File list can be rendered */
  fileListVisible?: boolean;

  /** Supported Drag and drop upload **/
  draggable?: boolean;
}

declare const Uploader: React.ComponentType<UploaderProps>;

export default Uploader;
