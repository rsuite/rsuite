import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import elementType from './prop-types/elementType';


let DropdownMenuItem = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        href: React.PropTypes.string,
        divider: React.PropTypes.bool,
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        onSelect: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        eventKey: React.PropTypes.any,
        componentClass: elementType
    },
    getDefaultProps: function() {
        return {
            componentClass: 'a',
            active: false,
            disabled: false,
            divider:false
        };
    },
    handleClick(event){
        let { onSelect } = this.props;
        if(this.props.disabled){
            event.preventDefault();
            return;
        }
        onSelect && onSelect(this.props.eventKey, this.props, event);
    },
    render: function() {

        let {
            children,
            divider,
            onSelect,
            onKeyDown,
            componentClass: Component,
            ...props
        } = this.props;

        let classes = classNames({
            active : this.props.active ,
            disabled : this.props.disabled
        });

        if(divider){
            return <li role="separator" className="divider"></li>;
        }

        return (
            <li role="presentation" className = {classes} >
                <Component
                    {...props}
                    role="menu-item"
                    tabIndex="-1"
                    onClick={this.handleClick }
                  >
                  {children}
                </Component>
            </li>
        );
    }

});

export default DropdownMenuItem;
