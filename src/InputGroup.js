import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';

const InputGroup = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        classPrefix: React.PropTypes.string,
        inside:React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            classPrefix: 'input-group'
        };
    },
    render() {
        const {
            className,
            children,
            classPrefix,
            inside,
            ...props
        } = this.props;

        const classes = classNames(
            classPrefix,
            ...this.getClassNames(),
            className,{
                [this.prefix('inside')]: inside,
            }
        );

        return (
            <span {...props} className={classes} >
                {children}
            </span>
        );
    }
});

InputGroup.Addon = InputGroupAddon;
InputGroup.Button = InputGroupButton;

export default InputGroup;
