import classNames from 'classnames';
import React from 'react';


const FormGroup = React.createClass({
    propTypes: {
        controlId: React.PropTypes.string,
        validationState: React.PropTypes.oneOf(['success', 'warning', 'error'])
    },
    childContextTypes: {
        formGroup: React.PropTypes.object.isRequired,
    },
    getChildContext() {

        const { controlId, validationState, children} = this.props;
        return {
            formGroup: {
                controlId,
                validationState
            }
        };

    },
    render() {
         const {
            validationState,
            className,
            children,
            controlId,
            ...props,
        } = this.props;

        const classes = classNames({
            'form-group': true,
            [`has-${validationState}`]: validationState && true
        },className);


        return (
            <div {...props} className={classes}>
                {children}
            </div>
        );
    }
});


export default FormGroup;
