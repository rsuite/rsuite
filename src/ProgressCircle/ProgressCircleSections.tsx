import React from 'react';
import { useStyles } from '@/internals/hooks';
import type { ProgressSection } from '../Progress';

export interface ProgressCircleSectionsProps {
  /** The classPrefix passed from parent component */
  classPrefix: string;
  /** Multiple sections with different colors */
  sections: ProgressSection[];
  /** Path string for the circle */
  pathString: string;
  /** Stroke line cap style */
  strokeLinecap: 'butt' | 'round' | 'square';
  /** Stroke width */
  strokeWidth: number;
  /** Gap degree */
  gapDegree: number;
  /** Total percent of all sections */
  totalPercent: number;
}

/**
 * A component to render multiple sections in a circular progress bar
 */
const ProgressCircleSections = React.memo((props: ProgressCircleSectionsProps) => {
  const { classPrefix, sections, pathString, strokeLinecap, strokeWidth, gapDegree, totalPercent } =
    props;

  const { prefix } = useStyles(classPrefix);
  let startPercent = 0;

  return (
    <>
      {sections.map((section, index) => {
        const sectionLen = Math.PI * 2 * (50 - strokeWidth / 2);
        const gapLength = (gapDegree / 360) * sectionLen;
        const sectionPercent = section.percent;
        const endPercent = startPercent + sectionPercent;

        // Calculate the stroke dash array and offset for this section
        const sectionStyle = {
          stroke: section.color,
          strokeDasharray: `${(sectionPercent / 100) * (sectionLen - gapLength)}px ${sectionLen}px`,
          strokeDashoffset: `-${gapLength / 2 + (startPercent / 100) * (sectionLen - gapLength)}px`
        };

        const sectionPath = (
          <path
            key={index}
            d={pathString}
            strokeLinecap={strokeLinecap}
            className={prefix('stroke')}
            strokeWidth={totalPercent === 0 ? 0 : strokeWidth}
            fillOpacity="0"
            style={sectionStyle}
          />
        );

        startPercent = endPercent;
        return sectionPath;
      })}
    </>
  );
});

ProgressCircleSections.displayName = 'ProgressCircleSections';

export default ProgressCircleSections;
