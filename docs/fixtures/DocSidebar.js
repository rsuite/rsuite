import React from 'react';
import { Sidebar, Navbar, Nav } from '../../src/index';
import { Link } from 'react-router';
import * as data from './data';


const DocSidebar = React.createClass({
    render() {
        const menu = [];
        data.default.map((item,key) => {
            menu.push(
                <li  key={key} className="nav-header" >
                    {item.title}
                    <span className="nav-en">{item.category}</span>
                </li>
            );


            item.components.map((child, index) => {

                menu.push(
                    <Nav.Item key={index} activeClassName="active" componentClass={Link} to={`/components/${child.id}`} >
                        {child.title}
                        <span className="nav-en">{child.name}</span>
                    </Nav.Item>
                );

            });
        });

        return (
            <Sidebar >
                <Nav className="nav-docs">
                    {menu}
                </Nav>
            </Sidebar>
        );
    }
});
export default DocSidebar;
