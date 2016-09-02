import React from 'react';
import { Header, Navbar, Nav } from 'rsuite';
import { Link } from 'react-router';
import {FormattedMessage} from 'react-intl';

const PageHeader = React.createClass({
    propTypes: {
        //Logo
        brand: React.PropTypes.node,
        //顶部菜单
        menuItems: React.PropTypes.array,
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    renderActiveItem(activeKey) {
        const { activeItem } = this.props;
        return activeItem === activeKey ? 'active' : null;
    },
    render() {

        return (
            <Header inverse >
                <div className="page-container">
                    <Navbar.Header>
                        <Navbar.Brand className="logo">
                            <Link  to="/">
                                <span className="prefix">R</span>Suite
                            </Link>
                            <span className="sub-title">An example   ( react + react-router + redux )</span>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>

                        <Nav pullRight>
                            <Nav.Item href="https://github.com/rsuite/rsuite/tree/master/examples/webpack-rudux-router" >Github</Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Header>
        );
    }
});

export default PageHeader;
