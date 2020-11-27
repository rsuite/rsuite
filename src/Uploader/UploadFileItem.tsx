import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Attachment from '@rsuite/icons/legacy/Attachment';
import Reload from '@rsuite/icons/Reload';

import { previewFile, useClassNames } from '../utils';
import { FileType } from './Uploader';
import { UploaderLocale } from '../locales';
import CloseButton from '../CloseButton';
import { WithAsProps } from '../@types/common';

export interface UploadFileItemProps extends WithAsProps {
  file: FileType;
  listType: 'text' | 'picture-text' | 'picture';
  disabled?: boolean;
  className?: string;
  maxPreviewFileSize: number;
  classPrefix?: string;
  removable?: boolean;
  allowReupload?: boolean;
  locale?: UploaderLocale;
  renderFileInfo?: (file: FileType, fileElement: React.ReactNode) => React.ReactNode;
  onCancel?: (fileKey: number | string, event: React.MouseEvent) => void;
  onPreview?: (file: FileType, event: React.MouseEvent) => void;
  onReupload?: (file: FileType, event: React.MouseEvent) => void;
}

/**
 * Format display file size
 * @param size
 */
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

const defaultProps: Partial<UploadFileItemProps> = {
  as: 'div',
  classPrefix: 'uploader-file-item',
  maxPreviewFileSize: 1024 * 1024 * 5, // 5MB
  listType: 'text',
  removable: true,
  allowReupload: true
};

const UploadFileItem = React.forwardRef(
  (props: UploadFileItemProps, ref: React.RefObject<HTMLDivElement>) => {
    const {
      as: Component,
      disabled,
      allowReupload,
      file,
      classPrefix,
      listType,
      className,
      removable,
      maxPreviewFileSize,
      locale,
      renderFileInfo,
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
        onCancel?.(file.fileKey, event);
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
      if (previewImage) {
        return (
          <div className={prefix('preview')}>
            <img role="presentation" src={previewImage} alt={file.name} onClick={handlePreview} />
          </div>
        );
      }
      return null;
    };

    /**
     * Render the loading state.
     */
    const renderLoading = () => {
      const uploading = file.status === 'uploading';
      const classes = prefix('icon-wrapper', { 'icon-loading': uploading });

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

      return <CloseButton className={prefix('btn-remove')} onClick={handleRemove} />;
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
              <a role="button" tabIndex={-1} onClick={handleReupload}>
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
        return <span className={prefix('size')}>{getSize(file?.blobFile?.size)}</span>;
      }
      return null;
    };

    /**
     * Render file panel
     */
    const renderFilePanel = () => {
      const fileElement = (
        <a role="presentation" className={prefix('title')} onClick={handlePreview}>
          {file.name}
        </a>
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
          {renderLoading()}
          {renderPreview()}
          {renderErrorStatus()}
          {renderRemoveButton()}
        </Component>
      );
    }

    if (listType === 'picture-text') {
      return (
        <Component {...rest} ref={ref} className={classes}>
          {renderLoading()}
          {renderPreview()}
          {renderFilePanel()}
          {renderProgressBar()}
          {renderRemoveButton()}
        </Component>
      );
    }

    return (
      <Component {...rest} ref={ref} className={classes}>
        {renderLoading()}
        {renderFilePanel()}
        {renderProgressBar()}
        {renderRemoveButton()}
      </Component>
    );
  }
);

UploadFileItem.displayName = 'UploadFileItem';
UploadFileItem.defaultProps = defaultProps;
UploadFileItem.propTypes = {
  locale: PropTypes.any,
  file: PropTypes.object,
  listType: PropTypes.oneOf(['text', 'picture-text', 'picture']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  maxPreviewFileSize: PropTypes.number,
  classPrefix: PropTypes.string,
  removable: PropTypes.bool,
  allowReupload: PropTypes.bool,
  renderFileInfo: PropTypes.func,
  onCancel: PropTypes.func,
  onPreview: PropTypes.func,
  onReupload: PropTypes.func
};

export default UploadFileItem;
