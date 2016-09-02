import React from 'react';
import SidebarMenu from './SidebarMenu';
import SidebarToggler from './SidebarToggler';

const PageSidebar = React.createClass({
    contextTypes: {
        menuItems: React.PropTypes.array
    },

    render: function () {
        return (
            <div className="page-sidebar-wrapper">
                <div className="page-sidebar">
                    <SidebarMenu
                        menuItems={this.context.menuItems}
                        />
                    <SidebarToggler />
                </div>
            </div>
        );
    }
});
export default PageSidebar;
