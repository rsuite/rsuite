import React from 'react';
import { Sidebar, Navbar, Nav } from '../../src/index';
import { Link } from 'react-router';

const DocFooter = React.createClass({
    render() {

        return (
           <div className="footer">
                <div className="container">
                    当前版本 v0.1.0 ·
                    <a href="https://github.com/suitejs/suite">GitHub</a>·
                    <a href="https://github.com/suitejs/suite/issues">Issues</a>·
                    <a href="https://github.com/suitejs/suite/releases">Releases</a>
                </div>
           </div>
        );
    }
});
export default DocFooter;
