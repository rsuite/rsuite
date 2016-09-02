import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { toggleClass } from 'dom-lib';

const SidebarMenu = React.createClass({
    propTypes: {
        open: React.PropTypes.bool,
        menuItems: React.PropTypes.array,
    },
    getDefaultProps() {
        return {
            open: true,
            menuItems: []
        };
    },
    handleMenuHeaderClick(key) {
        toggleClass(ReactDOM.findDOMNode(this.refs[key]), 'open');
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    renderItems() {
        const { menuItems } = this.props;
        const className = this.props.open ? 'open' : '';



        return menuItems.map((item, index) => {
            return (
                <li
                    className={className}
                    key={index}
                    ref={item.localeKey + index}
                    >
                    <a onClick={ () => {
                        this.handleMenuHeaderClick(item.localeKey + index);
                    } }
                        >
                        <i className={item.icon}></i>
                        <span className="title"><FormattedMessage id={item.localeKey} /></span>
                        <span className="arrow"></span>
                    </a>
                    {this.renderSubItems(item.children) }
                </li>
            );
        });
    },
    renderSubItems(subItems = []) {

        if (!subItems.length) {
            return null;
        }
        return (
            <ul className="sub-menu">
                {
                    subItems.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={this.context.router.isActive(item.link) ? 'active' : null}
                                >
                                <Link to={item.link}><FormattedMessage id={item.localeKey} /></Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    },
    render: function () {
        return (
            <ul className="page-sidebar-menu">
                {this.renderItems() }
            </ul>
        );
    }
});

export default SidebarMenu;
