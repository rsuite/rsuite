import React from 'react';
import classNames from 'classnames';

import ClassNameMixin from './mixins/ClassNameMixin';
import elementType from './prop-types/elementType';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarHeader from './NavbarHeader';
import NavbarToggle from './NavbarToggle';


let Navbar = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        classPrefix: React.PropTypes.string,
        fixedTop: React.PropTypes.bool,
        fixedBottom: React.PropTypes.bool,
        inverse: React.PropTypes.bool,
        componentClass: elementType,
        onToggle: React.PropTypes.func
    },
    childContextTypes: {
        classPrefix: React.PropTypes.string,
        navbar: React.PropTypes.bool,
        expanded: React.PropTypes.bool,
        onToggle: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            classPrefix: 'navbar',
            componentClass: 'div',
            inverse: false
        };
    },
    getInitialState: function () {
        return {
            expanded: false
        };
    },
    getChildContext() {
        return {
            navbar: true,
            classPrefix: this.props.classPrefix,
            onToggle: this.handleToggle,
            expanded: this.state.expanded
        };
    },
    handleToggle() {

        let expanded = !this.state.expanded;

        this.setState({
            expanded: expanded
        });
        this.props.onToggle && this.props.onToggle();

    },
    render() {
        const {
            inverse,
            fixedTop,
            fixedBottom,
            componentClass: Component,
            children,
            className,
            ...props
        } = this.props;

        const classes = classNames(className, {
            'navbar': true,
            [this.prefix('default')]: !inverse,
            [this.prefix('inverse')]: inverse,
            [this.prefix('fixed-top')]: fixedTop,
            [this.prefix('fixed-Bottom')]: fixedBottom
        });

        return (
            <Component {...props} className={classes} role='navigation'>
                { children }
            </Component>
        );
    }
});

Navbar.Brand = NavbarBrand;
Navbar.Header = NavbarHeader;
Navbar.Collapse = NavbarCollapse;
Navbar.Toggle = NavbarToggle;

export default Navbar;
