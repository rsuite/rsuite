import React from 'react';
import PropTypes from 'prop-types';
export interface MenuItemProps {
    /** Active the current option */
    selected?: boolean;
    /** Disable the current option */
    disabled?: boolean;
    /** Render prop */
    children: (menuitem: React.LiHTMLAttributes<HTMLLIElement> & MenuitemRenderProps, ref: React.Ref<HTMLLIElement>) => React.ReactElement;
    /** Callback when menuitem is being activated */
    onActivate?: React.MouseEventHandler;
}
export interface MenuitemRenderProps {
    selected: boolean;
    active: boolean;
}
/**
 * Headless ARIA `menuitem`
 * @private
 */
declare function MenuItem(props: MenuItemProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
declare namespace MenuItem {
    var displayName: string;
    var propTypes: {
        selected: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        children: PropTypes.Validator<(...args: any[]) => any>;
        onActivate: PropTypes.Requireable<(...args: any[]) => any>;
    };
}
export default MenuItem;
