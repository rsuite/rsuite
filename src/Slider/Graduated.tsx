import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { precisionMath } from './utils';
import Mark from './Mark';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface GraduatedProps extends WithAsProps {
  step?: number;
  min?: number;
  max?: number;
  count?: number;
  value?: number | number[];
  renderMark?: (mark: number) => React.ReactNode;
}

const defaultProps: Partial<GraduatedProps> = {
  as: 'div',
  classPrefix: 'slider'
};

const Graduated: RsRefForwardingComponent<'div', GraduatedProps> = React.forwardRef(
  (props: GraduatedProps, ref) => {
    const {
      as: Component,
      step,
      min,
      max,
      count,
      value,
      classPrefix,
      className,
      renderMark
    } = props;
    const { merge, prefix } = useClassNames(classPrefix);
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
        <ul>{graduatedItems}</ul>
      </Component>
    );
  }
);

Graduated.displayName = 'Graduated';
Graduated.defaultProps = defaultProps;
Graduated.propTypes = {
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  count: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  renderMark: PropTypes.func
};

export default Graduated;
