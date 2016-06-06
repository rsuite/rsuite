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

        const formGroup = this.context.formGroup;
        const controlId = formGroup && formGroup.controlId;
        const {
            className,
            htmlFor = controlId,
            ...props
        } = this.props;

        const classes = classNames({
            'help-block': true
        }, className);

        return (
            <span
                {...props}
                htmlFor = {htmlFor}
                className={classes}
                />
        );
     }
});

export default HelpBlock;
