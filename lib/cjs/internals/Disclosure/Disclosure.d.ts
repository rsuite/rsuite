import React from 'react';
import DisclosureButton from './DisclosureButton';
import DisclosureContent from './DisclosureContent';
export type DisclosureTrigger = 'click' | 'hover';
export interface DisclosureRenderProps extends Pick<React.HTMLAttributes<HTMLElement>, 'onMouseEnter' | 'onMouseLeave'> {
    open: boolean;
}
export interface DisclosureProps {
    children: (props: DisclosureRenderProps, ref: React.Ref<HTMLElement>) => React.ReactNode;
    /** Controlled open state */
    open?: boolean;
    /** Whether disclosure is initially expanded */
    defaultOpen?: boolean;
    hideOnClickOutside?: boolean;
    /** Callback when disclosure button is being activated to update the open state */
    onToggle?: (open: boolean, event: React.SyntheticEvent) => void;
    /** What mouse events should disclosure reacts to */
    trigger?: readonly DisclosureTrigger[];
}
export interface DisclosureComponent extends React.FC<DisclosureProps> {
    Button: typeof DisclosureButton;
    Content: typeof DisclosureContent;
}
declare const Disclosure: DisclosureComponent;
export default Disclosure;
