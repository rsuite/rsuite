import React from 'react';
export interface NavContextProps {
    activeKey: string | number | undefined;
    onSelect?: (eventKey: string | number | undefined, event: React.SyntheticEvent) => void;
}
declare const NavContext: React.Context<NavContextProps | null>;
export default NavContext;
