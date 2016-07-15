import classNames from 'classnames';
import React from 'react';
import elementType from './prop-types/elementType';
import ClassNameMixin from './mixins/ClassNameMixin';
import FormControlMixin from './mixins/FormControlMixin';

const FormControl = React.createClass({
    mixins: [ClassNameMixin, FormControlMixin],
    propTypes: {
        componentClass: elementType,
        type: React.PropTypes.string,
        id: React.PropTypes.string
    },
    contextTypes: {
        formGroup: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            componentClass: 'input'
        };
    },
    handleChange(evt) {
        let value = evt.target.value;
        const { onChange } = this.props;
        onChange && onChange(value);
    },
    render() {

        const formGroup = this.context.formGroup;
        const controlId = formGroup && formGroup.controlId;

        const {
            componentClass: Component,
            type,
            id = controlId,
            className,
            onChange,
            isValid,
            errorMessage,
            onError,
            force,
            ...props,
        } = this.props;

        if(id === null ){
             throw new Error('`controlId` is ignored on `<FormControl>` when `id` is specified.');
        }

        let classes = classNames({
            // input[type="file"] should not have .form-control.
            'form-control': type !== 'file'
        }, className);


        return (
            <Component
                {...props}
                type={type}
                id={id}
                className={classes}
                onChange={this.handleChange}
            />
        );
    }
});

export default FormControl;
