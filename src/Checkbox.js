import classNames from 'classnames';
import React from 'react';
import createChainedFunction from './utils/createChainedFunction';
import FormControlMixin from './mixins/FormControlMixin.js';


const Checkbox = React.createClass({
    mixins: [FormControlMixin],
    propTypes: {
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        inline: React.PropTypes.bool,
        title: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        checked: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        onChange: React.PropTypes.func,
        value: React.PropTypes.any
    },
    contextTypes: {
        formGroup: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            inline: false,
            disabled: false
        };
    },
    getInitialState() {
        return {
            checked: this.props.checked
        };
    },
    getFormGroup() {
        return this.context.formGroup || {};
    },
    handleChange(event) {
        if (this.props.disabled) {
            return;
        }

        let checked = !this.state.checked;
        this.setState({
            checked
        });

        const value = checked ? this.props.value : '';
        const { onChange } = this.props;
        const { onChange: onFormGroupChange } = this.getFormGroup();

        onChange && onChange(value);
        onFormGroupChange && onFormGroupChange(value);
    },
    render() {

        const {
            inline,
            title,
            name,
            disabled,
            className,
            children,
            onChange,
            value,
            checked
        } = this.props;

        let classes = classNames({
            'checkbox-inline': inline
        }, className);


        let checkboxClasses = classNames({
            'checker': true,
            'disabled': disabled
        });

        const input = (
            <span className={classNames({
                'checked': this.state.checked
            }) }>
                <input
                    type='checkbox'
                    name={name}
                    checked = { checked !== undefined ? checked : value }
                    value={ value }
                    disabled = {disabled}
                    onChange = {this.handleChange}
                    defaultChecked = {this.state.checked}
                    />
            </span>
        );

        return (
            <label className={ classes } >
                <div
                    className={ checkboxClasses }
                    role = 'checkbox'
                    >
                    {input}
                </div>
                { title || children }
            </label>
        );
    }
});

export default Checkbox;
