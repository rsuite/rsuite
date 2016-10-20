import classNames from 'classnames';
import React from 'react';
import elementType from './prop-types/elementType';
import ClassNameMixin from './mixins/ClassNameMixin';

const FormControl = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        componentClass: elementType,
        type: React.PropTypes.string,
        id: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        value: React.PropTypes.any
    },
    contextTypes: {
        formGroup: React.PropTypes.object
    },

    getFormGroup() {
        return this.context.formGroup || {};
    },
    getDefaultProps() {
        return {
            componentClass: 'input'
        };
    },
    handleChange(event) {

        const value = event.target.value;
        const { onChange } = this.props;
        const { onChange: onFormGroupChange } = this.getFormGroup();

        onChange && onChange(value);
        onFormGroupChange && onFormGroupChange(value);
    },
    handleBlur(event) {
        const { onBlur } = this.props;
        const { onBlur: onFormGroupBlur } = this.getFormGroup();
        onBlur && onBlur(event);
        onFormGroupBlur && onFormGroupBlur(event);
    },
    getValue() {
        const { value } = this.getFormGroup();
        return value || this.props.value;
    },
    render() {

        const { controlId } = this.getFormGroup();
        const {
            componentClass: Component,
            type,
            id = controlId,
            value = this.getValue(),
            className,
            ...props,
        } = this.props;


        let classes = classNames({
            // input[type="file"] should not have .form-control.
            'form-control': type !== 'file'
        }, className);


        return (
            <Component
                {...props}
                type={type}
                id={id}
                value={value}
                className={classes}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                />
        );
    }
});

export default FormControl;
