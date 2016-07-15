import React from 'react';

const FormControlMixin = {
    propTypes: {
        onChange: React.PropTypes.func,
        value: React.PropTypes.any,
        isValid: React.PropTypes.bool,
        errorMessage: React.PropTypes.string,
        onError: React.PropTypes.func,
        force: React.PropTypes.bool // if false, ignore errors when value is undefined
    },
    getDefaultProps() {
        return {
            isValid: false,
            force: false
        };
    },
    shouldCallOnError() {
        // able to call onError() when
        // 1. value exists(not undefined) and invalid
        // 2. invalid and force is true(ignore value exists or not)
        const { isValid, value, force } = this.props;
        return !isValid && (value !== undefined || force);
    },
    callError() {
        const { onError, isValid, errorMessage } = this.props;
        onError && onError(!isValid, errorMessage);
    },
    componentDidMount() {
        if(this.shouldCallOnError()) {
            this.callError();
        }
    },
    componentDidUpdate() {
        if(this.shouldCallOnError()) {
            this.callError();
        }
    }
}

export default FormControlMixin;
