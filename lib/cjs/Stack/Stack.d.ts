import React from 'react';
import StackItem from './StackItem';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
export interface StackProps extends WithAsProps {
    /**
     * The direction of the children in the stack.
     */
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    /**
     * Define the alignment of the children in the stack on the cross axis
     */
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    /**
     *  Define the alignment of the children in the stack on the inline axis
     */
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    /**
     * Define the spacing between immediate children
     */
    spacing?: number | string | (number | string)[];
    /**
     * Add an element between each child
     */
    divider?: React.ReactNode;
    /**
     * Define whether the children in the stack are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
    /**
     * The render mode of the children.
     */
    childrenRenderMode?: 'clone' | 'wrap';
}
export interface StackComponent extends RsRefForwardingComponent<'div', StackProps> {
    Item: typeof StackItem;
}
/**
 * The `Stack` component is a quick layout component through Flexbox,
 * supporting vertical and horizontal stacking, custom spacing and line wrapping.
 *
 * @see https://rsuitejs.com/components/stack
 */
declare const Stack: StackComponent;
export default Stack;
