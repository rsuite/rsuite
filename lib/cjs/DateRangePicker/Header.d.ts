import React from 'react';
interface HeaderProps {
    formatStr: string;
    character: string;
    value: Date[] | null;
    activeKey?: 'start' | 'end';
    onSelect?: (eventKey: 'start' | 'end') => void;
    clickable?: boolean;
}
declare function Header(props: HeaderProps): React.JSX.Element;
export default Header;
