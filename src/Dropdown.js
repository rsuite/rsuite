import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

import ButtonGroup from './ButtonGroup';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

import elementType from './prop-types/elementType';
import RootCloseWrapper from './fixtures/RootCloseWrapper';

const Dropdown = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        block: React.PropTypes.bool,
        dropup: React.PropTypes.bool,
        role: React.PropTypes.string,
        onClose: React.PropTypes.func,
        onOpen: React.PropTypes.func,
        onToggle: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        componentClass: elementType,
        /*
         * If 'select' is true , title will be updated after the 'onSelect' trigger .
         */
        select: React.PropTypes.bool,
        activeKey: React.PropTypes.any,
        bothEnds:React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            componentClass: ButtonGroup,
            active: false,
            disabled: false,
            block: false
        };
    },
    getInitialState: function () {
        return {
            title: null,
            activeKey: this.props.activeKey,
            open: false
        };
    },
    toggle(isOpen) {
        let open = isOpen || !this.state.open;
        let handleToggle = open ? this.props.onOpen : this.props.onClose;


        this.setState({
            open: open
        }, function () {
            handleToggle && handleToggle();
        });

        this.props.onToggle && this.props.onToggle();
    },
    handleClick() {

        if (this.props.disabled) {
            return;
        }
        this.toggle();
    },
    handleSelect(eventKey, props, event) {

        this.props.select && this.setState({
            title: props.children,
            activeKey: props.eventKey
        });

        this.props.onSelect && this.props.onSelect(eventKey, props, event);
    },
    componentWillMount(){

        let {children, select, activeKey} = this.props;
        let title;
        if(select){

            React.Children.map(children,(item, index) => {
                if(activeKey === item.props.eventKey){
                    title = item.props.children;
                }else if(item.props.active){
                    title = item.props.children;
                }
                title && this.setState({ title: title });
            });
        }
    },
    render() {

        let {
            items,
            title,
            children,
            className,
            activeKey,
            dropup,
            bothEnds,
            componentClass: Component,
            ...props
        } = this.props;


        let Toggle = (
            <DropdownToggle
                {...props}
                onClick = {this.handleClick}
                >
                {this.state.title || title }
            </DropdownToggle>
        );

        let Menu = (
            <DropdownMenu
                onClose={this.toggle}
                onSelect={this.handleSelect}
                activeKey={this.state.activeKey}
                ref='menu'
                >
                {children}
             </DropdownMenu>
        );

        if (this.state.open) {
            Menu = (
                <RootCloseWrapper onRootClose={this.toggle}>
                    {Menu}
                </RootCloseWrapper>
            );
        }

        const classes = classNames( {
            'dropdown': !dropup,
            'dropup': dropup ,
            'both-ends': bothEnds,
            'open': this.state.open
        }, className);

        return (
            <Component
                {...props}
                className = {classes}
                role = "dropdown"
                >
                {Toggle}
                {Menu}
            </Component>
        );
    }
});

Dropdown.Item = DropdownMenuItem;

export default Dropdown;
