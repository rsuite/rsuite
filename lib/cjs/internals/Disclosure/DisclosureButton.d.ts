import React from 'react';
export interface DisclosureButtonRenderProps {
    open: boolean;
}
export interface DisclosureButtonProps {
    children: (props: React.HTMLAttributes<HTMLElement> & DisclosureButtonRenderProps, ref: React.Ref<HTMLElement>) => React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}
declare function DisclosureButton(props: DisclosureButtonProps): React.ReactElement<React.HTMLAttributes<HTMLElement>, string | React.JSXElementConstructor<any>>;
declare namespace DisclosureButton {
    var displayName: string;
}
export default DisclosureButton;
