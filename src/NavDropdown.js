import React from 'react';
import classNames from 'classnames';

import Dropdown from './Dropdown';

const NavDropdown = React.createClass({

    getMountNode() {
        return this.mountNode;
    },
    render: function () {

        let clesses = classNames({
            'nav-dropdown': true
        });

        return (
            <Dropdown

                {...this.props}
                ref={ref => this.mountNode = ref}
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
