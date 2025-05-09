import React from 'react';
import { useStyles } from '@/internals/hooks';
import { mergeStyles } from '@/internals/utils';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';

export interface ProgressStrokeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The classPrefix passed from parent component */
  classPrefix: string;
  /** Percent of progress */
  percent: number;
  /** Line color */
  color?: string;
  /** Whether the progress bar is displayed vertically */
  vertical?: boolean;
  /** Children to be rendered inside the stroke */
  children?: React.ReactNode;
  /** Whether this is part of a multi-section progress bar */
  isSection?: boolean;
  /** Tooltip of this section */
  tooltip?: React.ReactNode;
  /**  The percentage of the current section in the total progress bar */
  countPercent?: number;
}

/**
 * A single stroke component used within ProgressLine
 */
const ProgressStroke = React.memo((props: ProgressStrokeProps) => {
  const {
    classPrefix,
    percent,
    color,
    vertical,
    children,
    isSection,
    tooltip,
    style,
    countPercent
  } = props;
  const { prefix } = useStyles(classPrefix);

  // Build class names
  const classes = prefix('stroke', { section: isSection });

  const content = (
    <div
      className={classes}
      style={mergeStyles(style, {
        width: vertical ? '100%' : `${percent}%`,
        height: vertical ? `${percent}%` : '100%',
        background: color,
        bottom: vertical ? `${countPercent}%` : undefined
      })}
    >
      {children}
    </div>
  );

  return tooltip ? (
    <Whisper trigger="hover" placement="top" speaker={<Tooltip>{tooltip}</Tooltip>}>
      {content}
    </Whisper>
  ) : (
    content
  );
});

ProgressStroke.displayName = 'ProgressStroke';

export default ProgressStroke;
