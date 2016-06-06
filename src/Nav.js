import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from'./mixins/ClassNameMixin';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';


const Nav = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        tabs: React.PropTypes.bool,
        pills: React.PropTypes.bool,
        justified: React.PropTypes.bool,
        stacked: React.PropTypes.bool,
        onSelect: React.PropTypes.func,
        pullRight: React.PropTypes.bool,
        activeKey: React.PropTypes.any
    },
    contextTypes : {
        navbar: React.PropTypes.bool
    },
    getDefaultProps: function () {
        return {
            classPrefix: 'nav',
            pullRight: false
        };
    },
    render: function () {

        const {
            tabs,
            pills,
            stacked,
            justified,
            pullRight,
            className,
            children,
            onSelect,
            activeKey,
            ...props
        } = this.props;


        const classes = classNames({
            'nav': true,
            'navbar-right': pullRight,
            'navbar-nav': this.context.navbar,
            [this.prefix('pills')]: pills,
            [this.prefix('tabs')]: tabs,
            [this.prefix('stacked')]: stacked,
            [this.prefix('justified')]: justified
        }, className);

        const items = React.Children.map(children,(item, index) => {

            return React.cloneElement(item, {
                key : index,
                onSelect : onSelect,
                active: (activeKey && activeKey === item.props.eventKey) || item.props.active
            }, item.props.children);

        });

        return (
            <ul {...props} className={ classes } >
                {items}
            </ul>
        );
    }
});

Nav.Item = NavItem;
Nav.Dropdown = NavDropdown;

export default Nav;
