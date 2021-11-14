import React, { useCallback, useRef, useImperativeHandle, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import FileItem from './UploadFileItem';
import UploadTrigger, { UploadTriggerInstance } from './UploadTrigger';
import { ajaxUpload, useClassNames, useCustom, guid } from '../utils';
import { WithAsProps } from '../@types/common';
import Plaintext from '../Plaintext';
import { UploaderLocale } from '../locales';

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

export interface UploaderInstance {
  root: HTMLElement;
  start: (file?: FileType) => void;
}

export interface UploaderProps extends WithAsProps {
  /** Uploading URL */
  action: string;

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
  data?: any;

  /** Allow multiple file uploads to be selected at a time */

  multiple?: boolean;

  /** Disabled upload button */
  disabled?: boolean;

  /** Disabled file item */
  disabledFileItem?: boolean;

  /**
   * If 'true', disable using a multipart form for file upload and instead stream the file.
   * Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form. Defaults to false.
   **/
  disableMultipart?: boolean;

  /** Render the control as plain text */
  plaintext?: boolean;

  /** Make the control readonly */
  readOnly?: boolean;

  /** Upload the parameter name of the corresponding file */
  name?: string;

  /** Set upload timeout */
  timeout?: number;

  /** Whether to carry cookies when uploading requests */
  withCredentials?: boolean;

  /** Set Upload request Header */
  headers?: any;

  /** Upload list Style */
  listType?: 'text' | 'picture-text' | 'picture';

  /** Max file size limit of the preview file */
  maxPreviewFileSize?: number;

  /** You can use a custom element for this component */
  toggleAs?: React.ElementType;

  /** Removable list file  */
  removable?: boolean;

  /** File list can be rendered */
  fileListVisible?: boolean;

  /** Supported Drag and drop upload **/
  draggable?: boolean;

  /** Custom locale */
  locale?: UploaderLocale;

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
  onUpload?: (file: FileType, uploadData: any, xhr: XMLHttpRequest) => void;

  /** In the file list, for uploading failed files, click the callback function to upload */
  onReupload?: (file: FileType) => void;

  /** In the file list, click the callback function for the uploaded file */
  onPreview?: (file: FileType, event: React.SyntheticEvent) => void;

  /** Upload callback function with erro */
  onError?: (status: any, file: FileType, event: ProgressEvent, xhr: XMLHttpRequest) => void;

  /** callback function after successful upload */
  onSuccess?: (response: any, file: FileType, event: ProgressEvent, xhr: XMLHttpRequest) => void;

  /** Callback functions that upload progress change */
  onProgress?: (percent: number, file: FileType, event: ProgressEvent, xhr: XMLHttpRequest) => void;

  /** In the file list, click the callback function to delete a file */
  onRemove?: (file: FileType) => void;

  /** Custom render file information */
  renderFileInfo?: (file: FileType, fileElement: React.ReactNode) => React.ReactNode;

  /** Custom render thumbnail */
  renderThumbnail?: (file: FileType, thumbnail: React.ReactNode) => React.ReactNode;
}

// Define several states of the file during the upload process.
export type FileStatusType = 'inited' | 'uploading' | 'error' | 'finished';

export interface FileProgressType {
  status?: FileStatusType;
  progress?: number;
}

const getFiles = (
  event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLInputElement>
) => {
  if (typeof event?.['dataTransfer'] === 'object') {
    return event?.['dataTransfer']?.files;
  }
  if (event.target) {
    return event.target['files'];
  }
  return [];
};

const createFile = (file: FileType) => {
  const { fileKey } = file;
  return {
    ...file,
    fileKey: fileKey || guid(),
    progress: 0
  };
};

type ActionType =
  | { type: 'push'; files: FileType[] }
  | { type: 'remove'; fileKey: string | number }
  | { type: 'updateFile'; file: FileType }
  | { type: 'init'; files: FileType[] };

function fileListReducer(files: FileType[], action: ActionType) {
  switch (action.type) {
    // Add one or more files
    case 'push':
      return [...files, ...action.files];

    // Remove a file by `fileKey`
    case 'remove':
      return files.filter(f => f.fileKey !== action.fileKey);

    // Update a file
    case 'updateFile':
      return files.map(file => {
        return file.fileKey === action.file.fileKey ? action.file : file;
      });

    // Initialization file list
    case 'init':
      return (
        action.files?.map(file => {
          // The state of the file needs to be preserved when the `fileList` is controlled.
          return files.find(f => f.fileKey === file.fileKey) || createFile(file);
        }) || []
      );
    default:
      throw new Error();
  }
}

const useFileList = (
  defaultFileList: FileType[] = []
): [React.MutableRefObject<FileType[]>, (action: ActionType, callback?) => void] => {
  const fileListRef = useRef<FileType[]>(defaultFileList.map(createFile));
  const fileListUpdateCallback = useRef<((v: FileType[]) => void) | null>();

  const [fileList, dispatch] = useReducer(fileListReducer, fileListRef.current);
  fileListRef.current = fileList;

  useEffect(() => {
    fileListUpdateCallback.current?.(fileList);
    fileListUpdateCallback.current = null;
  }, [fileList]);

  const dispatchCallback = useCallback((action: ActionType, callback) => {
    dispatch(action);
    fileListUpdateCallback.current = callback;
  }, []);

  return [fileListRef, dispatchCallback];
};

const Uploader = React.forwardRef((props: UploaderProps, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'uploader',
    className,
    listType = 'text',
    defaultFileList,
    fileList: fileListProp,
    fileListVisible = true,
    locale: localeProp,
    style,
    draggable,
    name = 'file',
    multiple = false,
    disabled = false,
    readOnly,
    plaintext,
    accept,
    children,
    toggleAs,
    removable = true,
    disabledFileItem,
    maxPreviewFileSize,
    autoUpload = true,
    action,
    headers,
    withCredentials = false,
    disableMultipart,
    timeout = 0,
    data = {},
    onRemove,
    onUpload,
    shouldUpload,
    shouldQueueUpdate,
    renderFileInfo,
    renderThumbnail,
    onPreview,
    onChange,
    onSuccess,
    onError,
    onProgress,
    onReupload,
    ...rest
  } = props;
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(listType, { draggable }));
  const { locale } = useCustom<UploaderLocale>('Uploader', localeProp);

  const rootRef = useRef<HTMLDivElement>();
  const xhrs = useRef({});
  const trigger = useRef<UploadTriggerInstance>();

  const [fileList, dispatch] = useFileList(fileListProp || defaultFileList);

  useEffect(() => {
    if (typeof fileListProp !== 'undefined') {
      // Force reset fileList in reducer, when `fileListProp` is updated
      dispatch({ type: 'init', files: fileListProp });
    }
  }, [dispatch, fileListProp]);

  const updateFileStatus = useCallback(
    (nextFile: FileType) => {
      dispatch({ type: 'updateFile', file: nextFile });
    },
    [dispatch]
  );

  /**
   * Clear the value in input.
   */
  const cleanInputValue = useCallback(() => {
    trigger.current!.clearInput();
  }, []);

  /**
   * Callback for successful file upload.
   * @param file
   * @param response
   * @param event
   * @param xhr
   */
  const handleAjaxUploadSuccess = useCallback(
    (file: FileType, response: any, event: ProgressEvent, xhr: XMLHttpRequest) => {
      const nextFile: FileType = {
        ...file,
        status: 'finished',
        progress: 100
      };
      updateFileStatus(nextFile);
      onSuccess?.(response, nextFile, event, xhr);
    },
    [onSuccess, updateFileStatus]
  );

  /**
   * Callback for file upload error.
   * @param file
   * @param status
   * @param event
   * @param xhr
   */
  const handleAjaxUploadError = useCallback(
    (file: FileType, status: any, event: ProgressEvent, xhr: XMLHttpRequest) => {
      const nextFile: FileType = {
        ...file,
        status: 'error'
      };
      updateFileStatus(nextFile);
      onError?.(status, nextFile, event, xhr);
    },
    [onError, updateFileStatus]
  );

  /**
   * Callback for file upload progress update.
   * @param file
   * @param percent
   * @param event
   * @param xhr
   */
  const handleAjaxUploadProgress = useCallback(
    (file: FileType, percent: number, event: ProgressEvent, xhr: XMLHttpRequest) => {
      const nextFile: FileType = {
        ...file,
        status: 'uploading',
        progress: percent
      };

      updateFileStatus(nextFile);
      onProgress?.(percent, nextFile, event, xhr);
    },
    [onProgress, updateFileStatus]
  );

  /**
   * Upload a single file.
   * @param file
   */
  const handleUploadFile = useCallback(
    (file: FileType) => {
      const { xhr, data: uploadData } = ajaxUpload({
        name,
        timeout,
        headers,
        data,
        withCredentials,
        disableMultipart,
        file: file.blobFile!,
        url: action,
        onError: handleAjaxUploadError.bind(null, file),
        onSuccess: handleAjaxUploadSuccess.bind(null, file),
        onProgress: handleAjaxUploadProgress.bind(null, file)
      });

      updateFileStatus({ ...file, status: 'uploading' });
      xhrs.current[file.fileKey!] = xhr;
      onUpload?.(file, uploadData, xhr);
    },
    [
      action,
      data,
      handleAjaxUploadError,
      handleAjaxUploadProgress,
      handleAjaxUploadSuccess,
      headers,
      name,
      onUpload,
      timeout,
      updateFileStatus,
      withCredentials,
      disableMultipart
    ]
  );

  const handleAjaxUpload = useCallback(() => {
    fileList.current.forEach(file => {
      const checkState = shouldUpload?.(file);

      if (checkState instanceof Promise) {
        checkState.then(res => {
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

  const handleUploadTriggerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = getFiles(event);
    const newFileList: FileType[] = [];

    Array.from(files).forEach((file: File) => {
      newFileList.push({
        blobFile: file,
        name: file.name,
        status: 'inited',
        fileKey: guid()
      });
    });

    const nextFileList = [...fileList.current, ...newFileList];
    const checkState = shouldQueueUpdate?.(nextFileList, newFileList);

    if (checkState === false) {
      cleanInputValue();
      return;
    }

    const upload = () => {
      onChange?.(nextFileList);
      dispatch({ type: 'push', files: newFileList }, () => {
        autoUpload && handleAjaxUpload();
      });
    };

    if (checkState instanceof Promise) {
      checkState.then(res => {
        res && upload();
      });
      return;
    }

    upload();
  };

  const handleRemoveFile = (fileKey: string | number) => {
    const file: any = find(fileList.current, f => f.fileKey === fileKey);
    const nextFileList = fileList.current.filter(f => f.fileKey !== fileKey);

    if (xhrs.current?.[file.fileKey]?.readyState !== 4) {
      xhrs.current[file.fileKey]?.abort();
    }

    dispatch({ type: 'remove', fileKey });

    onRemove?.(file);
    onChange?.(nextFileList);
    cleanInputValue();
  };

  const handleReupload = (file: FileType) => {
    autoUpload && handleUploadFile(file);
    onReupload?.(file);
  };

  // public API
  const start = (file?: FileType) => {
    if (file) {
      handleUploadFile(file);
      return;
    }
    handleAjaxUpload();
  };

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    start
  }));

  const renderList = [
    <UploadTrigger
      {...rest}
      locale={locale}
      name={name}
      key="trigger"
      multiple={multiple}
      draggable={draggable}
      disabled={disabled}
      readOnly={readOnly}
      accept={accept}
      ref={trigger}
      onChange={handleUploadTriggerChange}
      as={toggleAs}
    >
      {children}
    </UploadTrigger>
  ];

  if (fileListVisible) {
    renderList.push(
      <div key="items" className={prefix('file-items')}>
        {fileList.current.map((file, index) => (
          <FileItem
            locale={locale}
            key={file.fileKey || index}
            file={file}
            maxPreviewFileSize={maxPreviewFileSize}
            listType={listType}
            disabled={disabledFileItem}
            onPreview={onPreview}
            onReupload={handleReupload}
            onCancel={handleRemoveFile}
            renderFileInfo={renderFileInfo}
            renderThumbnail={renderThumbnail}
            removable={removable && !readOnly && !plaintext}
            allowReupload={!readOnly && !plaintext}
          />
        ))}
      </div>
    );
  }

  if (plaintext) {
    return (
      <Plaintext localeKey="notUploaded" className={withClassPrefix(listType)}>
        {fileList.current.length ? renderList[1] : null}
      </Plaintext>
    );
  }

  if (listType === 'picture') {
    renderList.reverse();
  }

  return (
    <Component ref={rootRef} className={classes} style={style}>
      {renderList}
    </Component>
  );
});

Uploader.displayName = 'Uploader';
Uploader.propTypes = {
  action: PropTypes.string.isRequired,
  accept: PropTypes.string,
  autoUpload: PropTypes.bool,
  children: PropTypes.node,
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
  listType: PropTypes.oneOf(['text', 'picture-text', 'picture']),
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
  style: PropTypes.object,
  toggleAs: PropTypes.elementType,
  renderFileInfo: PropTypes.func,
  renderThumbnail: PropTypes.func,
  removable: PropTypes.bool,
  fileListVisible: PropTypes.bool,
  draggable: PropTypes.bool,
  disableMultipart: PropTypes.bool
};

export default Uploader;
