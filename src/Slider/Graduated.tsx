import React from 'react';
import Mark from './Mark';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { precisionMath } from './utils';

export interface GraduatedProps extends BoxProps {
  step: number;
  min: number;
  max: number;
  count: number;
  value: number | number[];
  marks?: { value: number; label: React.ReactNode }[];
  renderMark?: (mark: number) => React.ReactNode;
}

const Graduated = forwardRef<'div', GraduatedProps>((props, ref) => {
  const {
    as,
    step,
    min,
    max,
    count,
    value,
    classPrefix = 'slider',
    className,
    marks = [],
    renderMark,
    ...rest
  } = props;
  const { merge, prefix, cssVar } = useStyles(classPrefix);
  const activeIndexs: number[] = [];

  let startIndex = 0;
  let endIndex = 0;

  if (Array.isArray(value)) {
    const [start, end] = value;

    startIndex = precisionMath(start / step - min / step);
    endIndex = precisionMath(end / step - min / step);
    activeIndexs.push(precisionMath(Math.ceil(((start - min) / (max - min)) * count)));
    activeIndexs.push(precisionMath(Math.ceil(((end - min) / (max - min)) * count)));
  } else {
    endIndex = precisionMath(value / step - min / step);
    activeIndexs.push(precisionMath(Math.ceil(((value - min) / (max - min)) * count)));
  }

  const graduatedItems: React.ReactElement[] = [];

  // If custom marks are provided, use them
  if (marks.length > 0) {
    // Only create DOM nodes for the specific mark values
    marks.forEach((mark, index) => {
      // Calculate the position index for this mark
      const markPosition = precisionMath(((mark.value - min) / (max - min)) * count);

      graduatedItems.push(
        <li
          className={prefix('tick')}
          key={`${mark.value}-${index}`}
          data-pass={markPosition >= startIndex && markPosition <= endIndex}
          data-active={activeIndexs.indexOf(markPosition) !== -1}
          style={cssVar('tick-offset', `${((mark.value - min) / (max - min)) * 100}%`)}
        >
          <Mark mark={mark.value} renderMark={() => mark.label || mark.value} />
        </li>
      );
    });
  } else {
    // Original implementation for when no custom marks are provided
    for (let i = 0; i < count; i += 1) {
      const mark = precisionMath(i * step + min);
      const lastMark = Math.min(max, mark + step);
      const last = i === count - 1;

      graduatedItems.push(
        <li
          className={prefix('tick')}
          data-pass={i >= startIndex && i <= endIndex}
          data-active={activeIndexs.indexOf(i) !== -1}
          key={i}
        >
          <Mark mark={mark} renderMark={renderMark} />
          {last ? <Mark mark={lastMark} renderMark={renderMark} last={last} /> : null}
        </li>
      );
    }
  }

  const classes = merge(className, prefix('graduator'));

  return (
    <Box as={as} ref={ref} className={classes} {...rest} data-with-marks={marks.length > 0}>
      <ol>{graduatedItems}</ol>
    </Box>
  );
});

Graduated.displayName = 'Graduated';

export default Graduated;
