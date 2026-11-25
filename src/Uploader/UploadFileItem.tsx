import React, { useCallback } from 'react';
import Attachment from '@rsuite/icons/Attachment';
import Reload from '@rsuite/icons/Reload';
import CloseButton from '@/internals/CloseButton';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import useFilePreview from './useFilePreview';
import type { FileType } from './Uploader';
import type { UploaderLocale } from '../locales';

export interface UploadFileItemProps extends BoxProps {
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
    as,
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

  const { merge, withPrefix, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const dataAttributes = {
    'data-type': listType,
    'data-disabled': disabled,
    'data-has-error': file.status === 'error'
  };

  const previewImage = useFilePreview(file, listType, maxPreviewFileSize);
  const previewLabel = file.name ? `Preview: ${file.name}` : 'Preview';

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
    (event: React.MouseEvent<HTMLButtonElement>) => {
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
        alt={onPreview ? '' : file.name}
        onClick={onPreview ? undefined : handlePreview}
        aria-label={onPreview ? undefined : previewLabel}
      />
    ) : (
      <Attachment className={prefix('icon')} />
    );
    const preview = onPreview ? (
      <button
        type="button"
        className={prefix('btn-preview')}
        data-rs-uploader-action="preview"
        disabled={disabled}
        onClick={handlePreview}
        aria-label={previewLabel}
      >
        {thumbnail}
      </button>
    ) : (
      thumbnail
    );

    return (
      <div className={prefix('preview')}>
        {renderThumbnail ? renderThumbnail(file, preview) : preview}
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
        data-rs-uploader-action="remove"
        className={prefix('btn-remove')}
        onClick={handleRemove}
        disabled={disabled}
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
            <button
              data-rs-uploader-action="retry"
              type="button"
              className={prefix('btn-reupload')}
              disabled={disabled}
              onClick={handleReupload}
              aria-label="Retry"
            >
              <Reload className={prefix('icon-reupload')} />
            </button>
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
    const Title = onPreview ? 'button' : 'div';
    const fileElement = (
      <Title
        className={prefix('title')}
        {...(onPreview
          ? { type: 'button' as const, disabled, 'data-rs-uploader-action': 'preview' }
          : { tabIndex: -1 })}
        onClick={handlePreview}
        aria-label={previewLabel}
      >
        {file.name}
      </Title>
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

  const boxProps = {
    as,
    ref,
    role: typeof as === 'string' && !['div', 'span'].includes(as) ? undefined : 'group',
    tabIndex: -1,
    'aria-label': file.name || locale?.upload,
    className: classes,
    ...dataAttributes,
    ...rest
  };

  if (listType === 'picture') {
    return (
      <Box {...boxProps}>
        {renderIcon()}
        {renderPreview()}
        {renderErrorStatus()}
        {renderRemoveButton()}
      </Box>
    );
  }

  if (listType === 'picture-text') {
    return (
      <Box {...boxProps}>
        {renderIcon()}
        {renderPreview()}
        {renderFilePanel()}
        {renderProgressBar()}
        {renderRemoveButton()}
      </Box>
    );
  }

  return (
    <Box {...boxProps}>
      {renderIcon()}
      {renderFilePanel()}
      {renderProgressBar()}
      {renderRemoveButton()}
    </Box>
  );
});

UploadFileItem.displayName = 'UploadFileItem';

export default UploadFileItem;
