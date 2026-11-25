import React from 'react';
import { PROGRESS_STATUS_ICON } from '@/internals/constants/statusIcons';
import { useStyles } from '@/internals/hooks';

export interface ProgressInfoProps {
  /** The prefix of the component CSS class */
  classPrefix: string;

  /** Percent of progress */
  percent: number;

  /** Progress status */
  status?: 'success' | 'fail' | 'active';

  /** Custom render function for info content */
  renderInfo?: (percent: number, status?: 'success' | 'fail' | 'active') => React.ReactNode;
}

/**
 * Shared component for displaying progress information
 * Used by both ProgressLine and ProgressCircle
 */
const ProgressInfo = (props: ProgressInfoProps) => {
  const { percent, renderInfo, status, classPrefix } = props;
  const { prefix } = useStyles(classPrefix);
  const showIcon = status && status !== 'active';

  return (
    <div className={prefix('info')}>
      {renderInfo
        ? renderInfo(percent, status)
        : showIcon
          ? PROGRESS_STATUS_ICON[status]
          : `${percent}%`}
    </div>
  );
};

export default ProgressInfo;
