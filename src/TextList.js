import classNames from 'classnames';
import React from 'react';
import FormControl from './FormControl';

const TextList = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    contextTypes: {
        formGroup: React.PropTypes.object
    },
    getFormGroup(){
        return this.context.formGroup || {};
    },
    handleChange(evt) {
        const value = evt.target.value.split('\n').filter((v) => v !== '');
        const { onChange } = this.props;
        const { onChangeValue } = this.getFormGroup();

        onChange && onChange(value);
        onChangeValue && onChangeValue(value);
    },
    render() {

        const { controlId, value = []} = this.getFormGroup();
        const {
            id = controlId,
            className
        } = this.props;
        const valueStr = value.join('\n');

        const classes = classNames('form-control', className);

        return (
            <textarea
                id={id}
                defaultValue={valueStr}
                className={classes}
                onChange={this.handleChange}
                />

        );
    }
});

export default TextList;
