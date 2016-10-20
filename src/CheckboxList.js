import React from 'react';
import classNames from 'classnames';
import Checkbox  from './Checkbox';

const CheckboxList = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        inline: React.PropTypes.bool,
        value: React.PropTypes.array,
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

        setTimeout(() => {
            for (let key in refs) {
                if (refs[key].state.checked) {
                    value.push(refs[key].props.value);
                }
            }
            onChange && onChange(value);
            onFormGroupChange && onFormGroupChange(value);
        }, 1);

    },
    render() {

        const {
            className,
            inline,
            name,
            children
        } = this.props;

        const clesses = classNames({
            'checkbox-list': true
        }, className);

        const items = React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
                key: index,
                ref: 'checkbox_' + index,
                inline: inline,
                onChange: this.handleChange,
                name: name
            }, child.props.children);
        });

        return (
            <div
                className={clesses}
                role = "checkbox-list"
                >
                {items}
            </div>
        );
    }
});

export default CheckboxList;
