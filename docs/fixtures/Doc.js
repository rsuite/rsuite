let React = require('react');
let classnames = require('classnames');

exports.Doc = React.createClass({
    render: function () {
        return (
            <div
                {...this.props}
                className={classnames('doc-content', this.props.className) }
                >
                {this.props.children}
            </div>
        );
    }
});
