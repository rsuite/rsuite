let React = require('react');
let classnames = require('classnames');
let Doc = require('./Doc');

exports.Markdown = React.createClass({
    propTypes: {
        doc: React.PropTypes.bool
    },
    createMarkup: function () {

        return { __html: this.props.children };
    },
    render: function () {

        var Tag = this.props.doc ? Doc : 'div';

        return (
            <Tag
                dangerouslySetInnerHTML={this.createMarkup() }
                className={this.props.className || 'markdown'}
                />
        );
    }
});
