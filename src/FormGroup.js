import classNames from 'classnames';
import React from 'react';
import FormControlMixin from './mixins/FormControlMixin';


const FormGroup = React.createClass({
    mixins: [FormControlMixin],
    propTypes: {
        controlId: React.PropTypes.string,
        validationState: React.PropTypes.oneOf(['success', 'warning', 'error'])
    },
    childContextTypes: {
        formGroup: React.PropTypes.object.isRequired,
    },
    getChildContext() {
        return {
            formGroup: {
                ...this.props
            }
        };
    },
    render() {

        const { validationState, className, children, isValid, formStatus, errorMessage } = this.props;
        const statusClass = (validationState || isValid === undefined ? '' : isValid ? 'has-success' : 'has-error');

        const classes = classNames({
            'form-group': true,
            [statusClass]: formStatus === 'TYPING' || errorMessage
        }, className);


        return (
            <div className={classes}>
                {children}
            </div>
        );
    }
});


export default FormGroup;
