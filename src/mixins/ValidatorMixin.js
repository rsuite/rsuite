import React from 'react';

const ValidatorMixin = {
    propTypes: {
        invalid: React.PropTypes.array,
        invalidTip: React.PropTypes.oneOf(['helpBlock', 'toolTip'])
    },
    getInitialState() {
        return {
            errorMessages: [],
        };
    },
    onCheck() {

        let { invalid } = this.props;
        let { value } = this.state;
        let errorMessages = [];

        invalid.map((func, index) => {
            errorMessages.push(func(value));
        });

        this.setState({
            errorMessages: errorMessages
        });
    }
};

export default ValidatorMixin;
