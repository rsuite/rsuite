import classNames from 'classnames';
import React from 'react';
import FormControlMixin from './mixins/FormControlMixin';
import HelpBlock from './HelpBlock';


const FormGroup = React.createClass({
    mixins: [FormControlMixin],
    propTypes: {
        controlId: React.PropTypes.string,
        validationState: React.PropTypes.oneOf(['success', 'warning', 'error'])
    },
    childContextTypes: {
        formGroup: React.PropTypes.object.isRequired,
    },
    handleError(hasError, errorMessage) {
        const helpBlock = this.refs.helpBlock;
        helpBlock && helpBlock.handleError(hasError, errorMessage);
    },
    handleChange(value) {
        const { onChange } = this.props;
        onChange && onChange(value);
        this.setState({
            force: true
        });
    },
    getChildContext() {

        const { isValid, errorMessage, controlId, validationState, value, force } = this.props;
        return {
            formGroup: {
                controlId,
                validationState,
                value,
                isValid,
                errorMessage,
                force: force || this.state.force,
                onChangeValue: this.handleChange
            }
        };
    },
    render() {

        const { validationState, className, children, isValid,force } = this.props;
        const hasState = validationState || (isValid ? 'success' : 'error');
        const classes = classNames({
            'form-group': true,
            [`has-${hasState}`]: hasState && (force || this.state.force)
        }, className);

        return (
            <div className={classes}>
                {children}
            </div>
        );
    }
});


export default FormGroup;
