import React from 'react';
import Mark from './Mark';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { precisionMath } from './utils';
import type { WithAsProps } from '@/internals/types';

export interface GraduatedProps extends WithAsProps {
  step: number;
  min: number;
  max: number;
  count: number;
  value: number | number[];
  renderMark?: (mark: number) => React.ReactNode;
}

const Graduated = forwardRef<'div', GraduatedProps>((props, ref) => {
  const {
    as: Component = 'div',
    step,
    min,
    max,
    count,
    value,
    classPrefix = 'slider',
    className,
    renderMark
  } = props;
  const { merge, prefix } = useClassNames(classPrefix);
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

  for (let i = 0; i < count; i += 1) {
    const classes = prefix({
      pass: i >= startIndex && i <= endIndex,
      active: ~activeIndexs.indexOf(i)
    });

    const mark = precisionMath(i * step + min);
    const lastMark = Math.min(max, mark + step);
    const last = i === count - 1;

    graduatedItems.push(
      <li className={classes} key={i}>
        <Mark mark={mark} renderMark={renderMark} />
        {last ? <Mark mark={lastMark} renderMark={renderMark} last={last} /> : null}
      </li>
    );
  }

  const classes = merge(className, prefix('graduator'));

  return (
    <Component ref={ref} className={classes}>
      <ol>{graduatedItems}</ol>
    </Component>
  );
});

Graduated.displayName = 'Graduated';

export default Graduated;
