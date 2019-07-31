import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import { TagGroupProps } from './TagGroup.d';

class TagGroup extends React.Component<TagGroupProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node
  };
  render() {
    const { className, classPrefix, children, ...rest } = this.props;
    const classes = classNames(classPrefix, className);
    return (
      <div {...rest} className={classes}>
        {children}
      </div>
    );
  }
}

export default defaultProps<TagGroupProps>({
  classPrefix: 'tag-group'
})(TagGroup);
