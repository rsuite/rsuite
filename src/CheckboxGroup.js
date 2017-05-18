import React from 'react';
import classNames from 'classnames';
import Checkbox from './Checkbox';

const CheckboxGroup = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        inline: React.PropTypes.bool,
        value: React.PropTypes.array,
        defaultValue: React.PropTypes.array,
        onChange: React.PropTypes.func
    },
    contextTypes: {
        formGroup: React.PropTypes.object
    },
    getFormGroup() {
        return this.context.formGroup || {};
    },
    handleChange(checked) {

        const refs = this.refs;
        const value = [];
        const { onChange } = this.props;
        const { onChange: onFormGroupChange } = this.getFormGroup();

        for (let key in refs) {
            if (refs[key].state.checked) {
                value.push(refs[key].props.value);
            }
        }
        onChange && onChange(value);
        onFormGroupChange && onFormGroupChange(value);

    },
    render() {

        const {
            className,
            inline,
            name,
            value,
            defaultValue,
            children
        } = this.props;

        const nextValue = Object.assign([], value, defaultValue);
        const clesses = classNames({
            'checkbox-list': true
        }, className);

        const items = React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
                key: index,
                ref: 'checkbox_' + index,
                inline: inline,
                checked: nextValue.some(i => i === child.props.value),
                onChange: this.handleChange,
                name: name
            }, child.props.children);
        });

        return (
            <div
                className={clesses}
                role="checkbox-list"
            >
                {items}
            </div>
        );
    }
});

export default CheckboxGroup;
