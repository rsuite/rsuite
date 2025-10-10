import React from 'react';
import { WithAsProps } from '../internals/types';
interface PanelHeaderProps extends WithAsProps, React.HTMLAttributes<HTMLHeadingElement> {
    caretAs?: React.ElementType;
    collapsible?: boolean;
    disabled?: boolean;
    expanded?: boolean;
    role?: string;
    bodyId?: string;
    buttonId?: string;
    onClickButton?: (event: React.MouseEvent) => void;
}
declare const PanelHeader: (props: PanelHeaderProps) => React.JSX.Element;
export default PanelHeader;
