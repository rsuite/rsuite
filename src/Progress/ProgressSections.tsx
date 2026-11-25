import React from 'react';
import ProgressStroke from './ProgressStroke';
import { useStyles } from '@/internals/hooks';
import type { ProgressSection } from './types';

export interface ProgressSectionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The classPrefix passed from parent component */
  classPrefix: string;
  /** Multiple sections with different colors */
  sections: ProgressSection[];
  /** Whether the progress bar is displayed vertically */
  vertical?: boolean;
}

/**
 * A component to render multiple sections in a progress bar
 */
const ProgressSections = React.memo((props: ProgressSectionsProps) => {
  const { classPrefix, sections, vertical, ...rest } = props;
  const { prefix } = useStyles(classPrefix);

  let countPercent = 0;

  return (
    <div className={prefix('sections')} {...rest}>
      {sections.map((section, index) => {
        const sectionStroke = (
          <ProgressStroke
            key={index}
            classPrefix={classPrefix}
            percent={section.percent}
            color={section.color}
            vertical={vertical}
            isSection={true}
            tooltip={section.tooltip}
            countPercent={countPercent}
          >
            {section.label}
          </ProgressStroke>
        );

        countPercent += section.percent;

        return sectionStroke;
      })}
    </div>
  );
});

ProgressSections.displayName = 'ProgressSections';

export default ProgressSections;
