import React from 'react';
export interface DisclosureContentRenderProps {
    open: boolean;
}
export interface DisclosureContentProps {
    children: (props: React.HTMLAttributes<HTMLElement> & DisclosureContentRenderProps, ref: React.Ref<HTMLElement>) => React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}
declare function DisclosureContent(props: DisclosureContentProps): React.ReactElement<React.HTMLAttributes<HTMLElement>, string | React.JSXElementConstructor<any>>;
declare namespace DisclosureContent {
    var displayName: string;
}
export default DisclosureContent;
