import React from 'react';
export interface MenubarProps {
    /** Whether menubar is arranged in vertical form, defaults to false */
    vertical?: boolean;
    /** Render prop */
    children: (menubar: React.HTMLAttributes<HTMLUListElement>, ref: React.Ref<HTMLUListElement>) => React.ReactElement;
    /** Callback triggered when an item is being activated */
    onActivateItem?: (event: React.SyntheticEvent) => void;
}
/**
 * @private
 */
export default function Menubar({ vertical, children, onActivateItem }: MenubarProps): React.JSX.Element;
