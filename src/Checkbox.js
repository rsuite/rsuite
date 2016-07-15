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
        value: React.PropTypes.bool
    },
    getCheckStateFromProps() {
        // if checked props given, return checked props, else return value props
        const { checked, value } = this.props;
        let check = checked;
        if(check === undefined) {
            check = value;
        }
        return check;
    },
    getValue() {
        return this.state.checked;
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
            checked: this.getCheckStateFromProps()
        };
    },
    handleChange(event){
        if(this.props.disabled){
            return;
        }

        this.setState({
            checked: !this.state.checked
        });
    },
    render() {

        const {
            type,
            inline,
            title,
            name,
            disabled,
            className,
            children,
            onChange,
            ...props,
        } = this.props;

        let classes = classNames({
            'checkbox-inline': inline
        }, className);


        let checkboxClasses = classNames({
            'checker' : true,
            'disabled' : disabled
        });

        const input = (
            <span className={classNames({
                    'checked' : this.state.checked
                })}>
                <input
                    type='checkbox'
                    name={name}
                    disabled = {disabled}
                    onChange = {createChainedFunction(
                        this.handleChange,
                        onChange && onChange.bind(this, this.getValue())
                    )}
                    defaultChecked = {this.state.checked}
                    />
            </span>
        );

        return (
            <label className={ classes } >
                <div
                    className={checkboxClasses}
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
