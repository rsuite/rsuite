import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';

import { withStyleProps, defaultProps, prefix } from '../utils';
import { LoaderProps } from './Loader.d';

class Loader extends React.Component<LoaderProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    center: PropTypes.bool,
    backdrop: PropTypes.bool,
    inverse: PropTypes.bool,
    vertical: PropTypes.bool,
    content: PropTypes.node,
    speed: PropTypes.oneOf(['normal', 'fast', 'slow'])
  };
  static defaultProps = {
    speed: 'normal'
  };

  render() {
    const {
      classPrefix,
      className,
      inverse,
      backdrop,
      speed,
      center,
      vertical,
      content,
      ...props
    } = this.props;

    const hasContent = !!content;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('wrapper'), addPrefix(`speed-${speed}`), className, {
      [addPrefix('backdrop-wrapper')]: backdrop,
      [addPrefix('vertical')]: vertical,
      [addPrefix('inverse')]: inverse,
      [addPrefix('center')]: center,
      [addPrefix('has-content')]: hasContent
    });

    return (
      <div {...props} className={classes}>
        {backdrop && <div className={addPrefix('backdrop')} />}
        <div className={classPrefix}>
          <span className={addPrefix('spin')} />
          {hasContent && <span className={addPrefix('content')}>{content}</span>}
        </div>
      </div>
    );
  }
}

export default compose<any, LoaderProps>(
  withStyleProps<LoaderProps>({
    hasSize: true
  }),
  defaultProps<LoaderProps>({
    classPrefix: 'loader'
  })
)(Loader);
