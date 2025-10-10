import React from 'react';
import { type ErrorStatus } from './utils/ajaxUpload';
import { UploadTriggerProps } from './UploadTrigger';
import type { WithAsProps } from '../internals/types';
import type { UploaderLocale } from '../locales';
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
export interface UploaderProps extends WithAsProps, Omit<UploadTriggerProps, 'onChange' | 'onError' | 'onProgress'> {
    /** Uploading URL */
    action: string;
    /** File types that can be accepted. See input accept Attribute */
    accept?: string;
    /** Automatically upload files after selecting them */
    autoUpload?: boolean;
    /** Primary content */
    children?: React.ReactElement;
    /** List of uploaded files */
    defaultFileList?: FileType[];
    /** List of uploaded files （Controlled） */
    fileList?: FileType[];
    /** Upload the parameters with */
    data?: any;
    /** Allow multiple file uploads */
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
    /** The http method of upload request	*/
    method?: string;
    /** Allow the queue to be updated. After you select a file, update the checksum function before the upload file queue, and return false to not update */
    shouldQueueUpdate?: (fileList: FileType[], newFile: FileType[] | FileType) => boolean | Promise<boolean>;
    /** Allow uploading of files. Check function before file upload, return false without uploading  */
    shouldUpload?: (file: FileType) => boolean | Promise<boolean>;
    /** callback function that the upload queue has changed */
    onChange?: (fileList: FileType[], event: React.ChangeEvent | React.MouseEvent) => void;
    /** The callback function that starts the upload file */
    onUpload?: (file: FileType, uploadData: any, xhr: XMLHttpRequest) => void;
    /** In the file list, for uploading failed files, click the callback function to upload */
    onReupload?: (file: FileType) => void;
    /** In the file list, click the callback function for the uploaded file */
    onPreview?: (file: FileType, event: React.SyntheticEvent) => void;
    /** Upload callback function with error */
    onError?: (status: ErrorStatus, file: FileType, event: ProgressEvent, xhr: XMLHttpRequest) => void;
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
export type FileStatusType = 'inited' | 'uploading' | 'error' | 'finished';
export interface FileProgressType {
    status?: FileStatusType;
    progress?: number;
}
/**
 * The `Uploader` component is used to upload files.
 *
 * @see https://rsuitejs.com/components/uploader
 */
declare const Uploader: React.ForwardRefExoticComponent<UploaderProps & React.RefAttributes<unknown>>;
export default Uploader;
