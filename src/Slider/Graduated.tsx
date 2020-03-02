import * as React from 'react';
import classNames from 'classnames';
import prefix, { defaultClassPrefix } from '../utils/prefix';
import { precisionMath } from './utils';

const addPrefix = prefix(defaultClassPrefix('slider'));

interface MarkProps {
  mark?: number;
  last?: boolean;
  renderMark?: (mark: number) => React.ReactNode;
}

function Mark(props: MarkProps) {
  const { mark, last, renderMark } = props;
  const classes = classNames(addPrefix('mark'), {
    [addPrefix('last-mark')]: last
  });

  if (renderMark) {
    return (
      <span className={classes}>
        <span className={addPrefix('mark-content')}>{renderMark(mark)}</span>
      </span>
    );
  }

  return null;
}

interface GraduatedProps {
  step?: number;
  min?: number;
  max?: number;
  count?: number;
  value?: number | [number, number];
  renderMark?: (mark: number) => React.ReactNode;
}

function Graduated(props: GraduatedProps) {
  const { step, min, max, count, value, renderMark } = props;
  const activeIndexs = [];

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

  const graduatedItems = [];

  for (let i = 0; i < count; i += 1) {
    const classes = classNames({
      [addPrefix('pass')]: i >= startIndex && i <= endIndex,
      [addPrefix('active')]: ~activeIndexs.indexOf(i)
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

  return (
    <div className={addPrefix('graduator')}>
      <ul>{graduatedItems}</ul>
    </div>
  );
}

export default Graduated;
