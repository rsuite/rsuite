import classNames from 'classnames';
import React from 'react';
import elementType from './prop-types/elementType';
import ClassNameMixin from './mixins/ClassNameMixin';


const Form = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        horizontal: React.PropTypes.bool,
        inline: React.PropTypes.bool,
        classPrefix: React.PropTypes.string,
        componentClass: elementType,
    },
    getDefaultProps(){
        return {
            classPrefix: 'form',
            horizontal: false,
            inline: false,
            componentClass: 'form',
        };
    },
    render() {
        const {
            horizontal,
            inline,
            componentClass: Component,
            className,
            ...props,
        } = this.props;

        const clesses = classNames({
            'form': true ,
            [this.prefix('horizontal')]:horizontal,
            [this.prefix('inline')]:inline
        }, className);

        return (
            <Component
                {...props}
                className={ clesses }
            />
        );
    }
});


export default Form;
