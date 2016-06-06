import React from 'react';
import classNames from 'classnames';

import Dropdown from './Dropdown';

const NavDropdown = React.createClass({

    render: function () {

        let clesses = classNames({
            'nav-dropdown': true
        });

        return (
            <Dropdown
                {...this.props}
                componentClass="li"
                useAnchor
                className={clesses}
            >
                {this.props.children}
            </Dropdown>
        );
    }
});

export default NavDropdown;
