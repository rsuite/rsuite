import React from 'react';
import classNames from 'classnames';

const Table = React.createClass({
    propTypes: {
        striped: React.PropTypes.bool,
        bordered: React.PropTypes.bool,
        condensed: React.PropTypes.bool,
        hover: React.PropTypes.bool,
        responsive: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            bordered: false,
            condensed: false,
            hover: false,
            responsive: false,
            striped: false
        };
    },

    render() {
        const {
            striped,
            bordered,
            condensed,
            hover,
            children,
            className,
            ...props
        } = this.props;

        const classes = classNames({
            'table': true,
            'table-striped': striped,
            'table-bordered': bordered,
            'table-condensed': condensed,
            'table-hover': hover
        }, className);

        const table = (
            <table {...props} className={classes}>
                {children}
            </table>
        );

        return this.props.responsive ? (
            <div className="table-responsive">
                {table}
            </div>
        ) : table;
    }
});

export default Table;
