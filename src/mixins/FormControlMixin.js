import React from 'react';

const FormControlMixin = {
    propTypes: {
        onChange: React.PropTypes.func,
        value: React.PropTypes.any,
        isValid: React.PropTypes.bool,
        errorMessage: React.PropTypes.string,
        onError: React.PropTypes.func
    },
    shouldCallOnError() {
        return this.props.isValid === false;
    },
    callError() {
        const { onError, isValid, errorMessage } = this.props;
        onError && onError(!isValid, errorMessage);

    },
    componentDidMount() {

        if (this.shouldCallOnError()) {
            this.callError();
        }
    },
    componentDidUpdate() {
        if (this.shouldCallOnError()) {
            this.callError();
        }
    }
};

export default FormControlMixin;
