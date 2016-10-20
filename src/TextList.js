import classNames from 'classnames';
import React from 'react';
import FormControl from './FormControl';

const TextList = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        value: React.PropTypes.array,
        onChange: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },
    contextTypes: {
        formGroup: React.PropTypes.object
    },
    getFormGroup() {
        return this.context.formGroup || {};
    },
    handleBlur() {
        const { onBlur } = this.props;
        const { onBlur: onFormGroupBlur } = this.getFormGroup();
        onBlur && onBlur();
        onFormGroupBlur && onFormGroupBlur();
    },
    handleChange(evt) {
        const value = evt.target.value.split('\n');

        const { onChange } = this.props;
        const { onChange: onFormGroupChange } = this.getFormGroup();

        onChange && onChange(value);
        onFormGroupChange && onFormGroupChange(value);
    },
    getValue() {
        const { value = []} = this.getFormGroup();
        return value || this.props.value || [];
    },
    render() {

        const { controlId } = this.getFormGroup();
        const {
            id = controlId,
            className,
            value = this.getValue()
        } = this.props;

        const valueStr = value.join('\n');

        const classes = classNames('form-control', className);

        return (
            <textarea
                id={id}
                value={valueStr}
                className={classes}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                />

        );
    }
});

export default TextList;
