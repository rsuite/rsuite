import React from 'react';
import { Sidebar, Navbar, Nav } from '../../src/index';
import { Link } from 'react-router';

const DocFooter = React.createClass({
    render() {

        return (
           <div className="footer">
                <div className="container">
                    <a href="https://github.com/rsuite/rsuite">GitHub</a>·
                    <a href="https://github.com/rsuite/rsuite/issues">Issues</a>·
                    <a href="https://github.com/rsuite/rsuite/releases">Releases</a>
                </div>
           </div>
        );
    }
});
export default DocFooter;
