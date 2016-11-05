import React from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import DropdownMenuItem from './DropdownMenuItem';
import ClassNameMixin from './mixins/ClassNameMixin';
import createChainedFunction from './utils/createChainedFunction';



let DorpdownMenu = React.createClass({
    mixins:[ClassNameMixin],
    propTypes: {
        pullRight: React.PropTypes.bool,
        onClose: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        activeKey: React.PropTypes.any
    },
    getDefaultProps() {
        return {
            classPrefix: 'dropdown',
            pullRight: false
        };
    },
    getFocusableMenuItems() {
        let menuNode = ReactDOM.findDOMNode(this);
        if (menuNode === undefined) {
            return [];
        }
        return Array.from(menuNode.querySelectorAll('[role="menu-item"]'));
    },
    getItemsAndActiveIndex() {
        let items = this.getFocusableMenuItems();
        let activeItemIndex = items.indexOf(document.activeElement);

        return {
            items,
            activeItemIndex
        };
    },
    handleSelect(event){
        let { onClose } = this.props;
        onClose && onClose();
    },
    render(){

        let { pullRight, children, className, activeKey, ...props} = this.props;

        const items = React.Children.map(children,(item, index) => {
            let childProps = {
                key : index,
                ref : 'menu_item_' + index,
                onSelect: createChainedFunction(this.handleSelect, this.props.onSelect)
            };

            if(activeKey){
               childProps.active = (activeKey === item.props.eventKey);
            }

            if (React.isValidElement(item)) {
                return React.cloneElement(item, childProps, item.props.children);
            }

            return item;
        });


        let classes = {
            [this.prefix('menu')] : true,
            [this.prefix('menu-right')]: pullRight
        };

        return (
            <ul
                {...props}
                className = {classNames(className, classes)}
                role = "menu"
            >
                {items}
            </ul>
        );


    }

});

export default DorpdownMenu;
