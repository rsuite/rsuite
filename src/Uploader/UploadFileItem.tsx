import React, { useCallback, useEffect, useState } from 'react';
import Attachment from '@rsuite/icons/Attachment';
import Reload from '@rsuite/icons/Reload';
import CloseButton from '@/internals/CloseButton';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { previewFile } from './utils/previewFile';
import type { FileType } from './Uploader';
import type { WithAsProps } from '@/internals/types';
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
export const formatSize = (size = 0): string => {
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

const UploadFileItem = forwardRef<'div', UploadFileItemProps>((props, ref) => {
  const {
    as: Component = 'div',
    disabled,
    allowReupload = true,
    file,
    classPrefix = 'uploader-file-item',
    listType = 'text',
    className,
    removable = true,
    maxPreviewFileSize = 1024 * 1024 * 5, // 5MB
    locale,
    renderFileInfo,
    renderThumbnail,
    onPreview,
    onCancel,
    onReupload,
    ...rest
  } = props;

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(listType, { disabled, 'has-error': file.status === 'error' })
  );

  const [previewImage, setPreviewImage] = useState(file.url ? file.url : null);

  /**
   * Get thumbnail of image file
   */
  const getThumbnail = useCallback(
    callback => {
      if (!~['picture-text', 'picture'].indexOf(listType)) {
        return;
      }

      // The thumbnail file size cannot be larger than the preset value.
      if (!file.blobFile || file?.blobFile?.size > maxPreviewFileSize) {
        return;
      }

      previewFile(file.blobFile, callback);
    },
    [file, listType, maxPreviewFileSize]
  );

  useEffect(() => {
    if (!file.url) {
      getThumbnail((previewImage: any) => {
        setPreviewImage(previewImage);
      });
    }
  }, [file.url, getThumbnail]);

  const handlePreview = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        return;
      }
      onPreview?.(file, event);
    },
    [disabled, file, onPreview]
  );

  const handleRemove = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        return;
      }
      onCancel?.(file.fileKey as number | string, event);
    },
    [disabled, file.fileKey, onCancel]
  );

  const handleReupload = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        return;
      }
      onReupload?.(file, event);
    },
    [disabled, file, onReupload]
  );

  /**
   * Rendering progress bar
   */
  const renderProgressBar = () => {
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
      <div className={prefix('progress')} style={wrapStyle}>
        <div className={prefix('progress-bar')} style={progressbarStyle} />
      </div>
    );
  };

  const renderPreview = () => {
    const thumbnail = previewImage ? (
      <img
        role="presentation"
        src={previewImage}
        alt={file.name}
        onClick={handlePreview}
        aria-label={`Preview: ${file.name}`}
      />
    ) : (
      <Attachment className={prefix('icon')} />
    );

    return (
      <div className={prefix('preview')}>
        {renderThumbnail ? renderThumbnail(file, thumbnail) : thumbnail}
      </div>
    );
  };

  /**
   * Render the loading state.
   */
  const renderIcon = () => {
    const uploading = file.status === 'uploading';
    const classes = prefix('icon-wrapper', { 'icon-loading': uploading });

    if (uploading) {
      return (
        <div className={classes}>
          <i className={prefix('icon')} aria-label="Uploading" />
        </div>
      );
    }

    if (listType === 'picture' || listType === 'picture-text') {
      return null;
    }

    return (
      <div className={classes}>
        <Attachment className={prefix('icon')} />
      </div>
    );
  };

  /**
   * Render the remove file button.
   */
  const renderRemoveButton = () => {
    if (!removable) {
      return null;
    }

    let closeLabel = 'Remove file';

    if (locale?.removeFile) {
      closeLabel = locale?.removeFile + (file?.name ? `: ${file?.name}` : '');
    }

    return (
      <CloseButton
        className={prefix('btn-remove')}
        onClick={handleRemove}
        tabIndex={-1}
        locale={{ closeLabel }}
        aria-hidden={disabled}
      />
    );
  };

  /**
   * Render error messages.
   */
  const renderErrorStatus = () => {
    if (file.status === 'error') {
      return (
        <div className={prefix('status')}>
          {<span>{locale?.error}</span>}
          {allowReupload && (
            <a role="button" tabIndex={-1} onClick={handleReupload} aria-label="Retry">
              <Reload className={prefix('icon-reupload')} />
            </a>
          )}
        </div>
      );
    }
    return null;
  };

  /**
   * Render file size.
   */
  const renderFileSize = () => {
    if (file.status !== 'error' && file.blobFile) {
      return <span className={prefix('size')}>{formatSize(file?.blobFile?.size)}</span>;
    }
    return null;
  };

  /**
   * Render file panel
   */
  const renderFilePanel = () => {
    const fileElement = (
      <div
        className={prefix('title')}
        tabIndex={-1}
        onClick={handlePreview}
        aria-label={`Preview: ${file.name}`}
      >
        {file.name}
      </div>
    );
    return (
      <div className={prefix('panel')}>
        <div className={prefix('content')}>
          {renderFileInfo ? renderFileInfo(file, fileElement) : fileElement}
          {renderErrorStatus()}
          {renderFileSize()}
        </div>
      </div>
    );
  };

  if (listType === 'picture') {
    return (
      <Component {...rest} ref={ref} className={classes}>
        {renderIcon()}
        {renderPreview()}
        {renderErrorStatus()}
        {renderRemoveButton()}
      </Component>
    );
  }

  if (listType === 'picture-text') {
    return (
      <Component {...rest} ref={ref} className={classes}>
        {renderIcon()}
        {renderPreview()}
        {renderFilePanel()}
        {renderProgressBar()}
        {renderRemoveButton()}
      </Component>
    );
  }

  return (
    <Component {...rest} ref={ref} className={classes}>
      {renderIcon()}
      {renderFilePanel()}
      {renderProgressBar()}
      {renderRemoveButton()}
    </Component>
  );
});

UploadFileItem.displayName = 'UploadFileItem';

export default UploadFileItem;
