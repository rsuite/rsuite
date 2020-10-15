import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface MarkProps extends WithAsProps {
  mark?: number;
  last?: boolean;
  renderMark?: (mark: number) => React.ReactNode;
}

const defaultProps: Partial<MarkProps> = {
  as: 'span',
  classPrefix: 'slider-mark'
};

const Mark: RsRefForwardingComponent<'span', MarkProps> = React.forwardRef(
  (props: MarkProps, ref) => {
    const { as: Component, mark, last, classPrefix, className, renderMark } = props;
    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ last }));

    if (renderMark) {
      return (
        <Component ref={ref} className={classes}>
          <span className={prefix('content')}>{renderMark(mark)}</span>
        </Component>
      );
    }

    return null;
  }
);

Mark.displayName = 'Mark';
Mark.defaultProps = defaultProps;
Mark.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  mark: PropTypes.number,
  last: PropTypes.bool,
  renderMark: PropTypes.func
};

export default Mark;
