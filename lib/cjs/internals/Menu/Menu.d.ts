import React from 'react';
import PropTypes from 'prop-types';
import { MenuContextProps } from './MenuContext';
export interface MenuProps {
    /**
     * Whether dropdown is initially open
     */
    defaultOpen?: boolean;
    /**
     * Controlled open state
     */
    open?: boolean;
    disabled?: boolean;
    children: (props: React.HTMLAttributes<HTMLDivElement> & MenuRenderProps, ref: React.Ref<HTMLDivElement>) => React.ReactElement<React.HTMLAttributes<HTMLDivElement>>;
    menuButtonText?: React.ReactNode;
    renderMenuButton?: (props: React.ButtonHTMLAttributes<HTMLButtonElement> & MenuButtonRenderProps, ref: React.Ref<HTMLButtonElement>) => React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
    renderMenuPopup?: (props: React.HTMLAttributes<HTMLUListElement> & MenuPopupRenderProps, ref: React.Ref<HTMLUListElement>) => React.ReactElement<React.HTMLAttributes<HTMLUListElement>>;
    openMenuOn?: readonly MenuButtonTrigger[];
    onToggleMenu?: (open: boolean, event: React.SyntheticEvent) => void;
}
export type MenuButtonTrigger = 'mouseover' | 'click' | 'contextmenu';
export interface MenuRenderProps {
    open: boolean;
}
export interface MenuButtonRenderProps {
    open: boolean;
}
export interface MenuPopupRenderProps {
    open: boolean;
}
export interface MenuHandle {
    dispatch: MenuContextProps[1];
}
/**
 * Headless ARIA `menu`
 * @private
 */
declare function Menu({ disabled, children, openMenuOn, defaultOpen, open: openProp, menuButtonText, renderMenuButton, renderMenuPopup, onToggleMenu }: MenuProps & React.HTMLAttributes<HTMLUListElement>): React.ReactElement<React.HTMLAttributes<HTMLDivElement>, string | React.JSXElementConstructor<any>>;
declare namespace Menu {
    var displayName: string;
    var propTypes: {
        children: PropTypes.Validator<(...args: any[]) => any>;
    };
}
export default Menu;
