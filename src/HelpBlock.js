import React from 'react';
import classNames from 'classnames';

const HelpBlock = React.createClass({
    propTypes: {
        htmlFor: React.PropTypes.string
    },
    contextTypes: {
        formGroup: React.PropTypes.object
    },
    render() {

        const {controlId, isValid, errorMessage, force } = this.context.formGroup;
        const {
            className,
            htmlFor = controlId,
            children
        } = this.props;

        const classes = classNames({
            'help-block': true,
            'error': !isValid && force
        }, className);

        return (
            <span
                htmlFor = {htmlFor}
                className={classes}
                >
                {(!isValid && force && errorMessage ) || children}
            </span>
        );
    }
});

export default HelpBlock;
