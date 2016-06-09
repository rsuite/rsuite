import React from 'react';
import classNames from 'classnames';
import { Header, Navbar, Nav } from '../../src/index';
import { Router, Route, Link } from 'react-router';
import eventListener from '../../src/utils/eventListener';
import {scrollTop} from '../../src/utils/dom';

const NAV_LINKS = [{
        link: '/getting-started',
        title: '开始使用'
    }, {
        link: '/components',
        title: '组件'
    }];

const DocHeader = React.createClass({
    propTypes: {
        activePage: React.PropTypes.string
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            overflow: false
        };
    },
    componentDidMount() {
        this._onWindowScrollListener = eventListener.on(window, 'scroll', this.handleWindowScroll);
    },
    componentWillUnmount() {
        if (this._onWindowScrollListener) {
            this._onWindowScrollListener.off();
        }
    },
    handleWindowScroll() {

        if (scrollTop(window) > 30) {
            this.setState({
                overflow: true
            });
            return;
        }

        this.setState({
            overflow: false
        });
    },
    render() {

        let links = NAV_LINKS.map((nav, index) => {
            return (
                <li className={this.context.router.isActive(nav.link) ? 'active' : null} key={index} >
                    <Link to={nav.link}>{nav.title}</Link>
                </li>
            );
        });

        let classes = classNames({
            'doc-header': true,
            'overflow' : this.state.overflow
        });

        return (
            <Header className={classes} inverse>
                <div className="container">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Suite</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            {links}
                        </Nav>
                        <Nav pullRight>
                            <Nav.Item  href="https://github.com/suitejs/suite">GitHub</Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Header>
        );
    }
});

export default DocHeader;
