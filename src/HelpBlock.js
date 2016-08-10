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

        const {controlId, isValid, errorMessage } = this.context.formGroup;
        const {
            className,
            htmlFor = controlId,
            children
        } = this.props;

        const classes = classNames({
            'help-block': true,
            'error': !isValid
        }, className);

        return (
            <span
                htmlFor = {htmlFor}
                className={classes}
                >
                {(!isValid && errorMessage ) || children}
            </span>
        );
    }
});

export default HelpBlock;
