import React from 'react';
import classNames from 'classnames';

const PageFooter = React.createClass({

    render: function () {
        const classes = classNames('footer', this.props.className);
        return (
            <div className={classes}>
                <span className="copyright">&copy; COPYRIGHT HYPERS 2016</span>
            </div>
        );
    }
});

export default PageFooter;
