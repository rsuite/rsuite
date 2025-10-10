import React from 'react';
export interface ChildrenProps {
    size?: 'lg' | 'md' | 'sm' | 'xs';
    disabled?: boolean;
    placeholder?: string;
    plaintext?: boolean;
    value: any;
    onChange: (value: any, event: React.SyntheticEvent) => void;
    onBlur?: (event?: React.FocusEvent) => void;
}
export declare function defaultRenderInput(props: ChildrenProps, ref: React.Ref<any>): React.JSX.Element;
export declare function renderChildren(children: ((props: ChildrenProps, ref: React.Ref<any>) => React.ReactElement) | React.ReactElement, props: ChildrenProps, ref: React.Ref<any>): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
