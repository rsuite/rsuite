import classNames from 'classnames';
import React from 'react';
import FormControlMixin from './mixins/FormControlMixin';


const FormGroup = React.createClass({
    mixins: [FormControlMixin],
    propTypes: {
        controlId: React.PropTypes.string,
        isValid: React.PropTypes.bool,
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

        const { validationState, className, children, isValid } = this.props;
        const statusClass = validationState ? `has-${validationState}` : (
            isValid === undefined ? '' : isValid ? 'has-success' : 'has-error'
        );

        const classes = classNames('form-group', statusClass, className);
        return (
            <div className={classes}>
                {children}
            </div>
        );
    }
});


export default FormGroup;
