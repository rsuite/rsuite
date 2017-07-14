import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  condensed: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool
};

const defaultProps = {
  bordered: false,
  condensed: false,
  hover: false,
  responsive: false,
  striped: false
};

class Table extends React.Component {
  render() {

    const {
      striped,
      bordered,
      condensed,
      hover,
      children,
      className,
      responsive,
      ...props
    } = this.props;

    const classes = classNames('table', {
      'table-striped': striped,
      'table-bordered': bordered,
      'table-condensed': condensed,
      'table-hover': hover
    }, className);

    const table = (
      <table
        {...props}
        className={classes}
      />
    );

    return responsive ? (
      <div className="table-responsive">
        {table}
      </div>
    ) : table;
  }
}


Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
