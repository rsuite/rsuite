import React from 'react';
import classNames from 'classnames';


const ControlLabel = React.createClass({
    propTypes: {
        htmlFor: React.PropTypes.string,
        srOnly: React.PropTypes.bool,
    },
    contextTypes: {
        formGroup: React.PropTypes.object,
    },
    getDefaultProps() {
        return {
            srOnly: false
        };
    }, render() {
        const formGroup = this.context.formGroup;
        const controlId = formGroup && formGroup.controlId;

        const {
            htmlFor = controlId,
            srOnly,
            className,
            ...props,
        } = this.props;

        if(htmlFor === null ){
             throw new Error('`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.');
        }


        const classes = classNames({
            'control-label':true,
            'sr-only': srOnly,
        }, className);

        return (
            <label
                {...props}
                htmlFor={htmlFor}
                className={classes}
             />
        );
  }
});

export default ControlLabel;
