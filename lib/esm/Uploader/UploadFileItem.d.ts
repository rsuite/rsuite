import React from 'react';
import type { FileType } from './Uploader';
import type { WithAsProps } from '../internals/types';
import type { UploaderLocale } from '../locales';
export interface UploadFileItemProps extends WithAsProps {
    file: FileType;
    listType?: 'text' | 'picture-text' | 'picture';
    disabled?: boolean;
    className?: string;
    maxPreviewFileSize?: number;
    classPrefix?: string;
    removable?: boolean;
    allowReupload?: boolean;
    locale?: UploaderLocale;
    renderFileInfo?: (file: FileType, fileElement: React.ReactNode) => React.ReactNode;
    renderThumbnail?: (file: FileType, thumbnail: React.ReactNode) => React.ReactNode;
    onCancel?: (fileKey: number | string, event: React.MouseEvent) => void;
    onPreview?: (file: FileType, event: React.MouseEvent) => void;
    onReupload?: (file: FileType, event: React.MouseEvent) => void;
}
/**
 * Format display file size
 * @param size
 */
export declare const formatSize: (size?: number) => string;
declare const UploadFileItem: React.ForwardRefExoticComponent<UploadFileItemProps & React.RefAttributes<HTMLDivElement>>;
export default UploadFileItem;
