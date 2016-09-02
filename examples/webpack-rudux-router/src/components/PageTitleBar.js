import React from 'react';

const PageTitleBar = React.createClass({
    propTypes: {
        title: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.node
        ])
    },
    render: function () {
        const {title,children} = this.props;
        return (
            <div className="page-title-wrapper">
                <h4 className="page-title">{title}</h4>
                {children}
            </div>
        );
    }
});

export default PageTitleBar;
