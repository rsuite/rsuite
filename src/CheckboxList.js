import React from 'react';
import classNames from 'classnames';
import Checkbox  from './Checkbox';

const CheckboxList = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        inline: React.PropTypes.bool
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
