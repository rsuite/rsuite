import classNames from 'classnames';
import React from 'react';
import createChainedFunction from './utils/createChainedFunction';


const Checkbox = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        inline: React.PropTypes.bool,
        title: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        checked: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        onChange: React.PropTypes.func
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
                    onChange = {createChainedFunction(this.handleChange, onChange)}
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
