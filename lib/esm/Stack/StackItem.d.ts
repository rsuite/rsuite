import React from 'react';
import PropTypes from 'prop-types';
import { WithAsProps } from '../internals/types';
export interface StackItemProps extends WithAsProps {
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    flex?: React.CSSProperties['flex'];
    grow?: React.CSSProperties['flexGrow'];
    shrink?: React.CSSProperties['flexShrink'];
    basis?: React.CSSProperties['flexBasis'];
    order?: React.CSSProperties['order'];
}
/**
 * The `Stack.Item` component is used to set the layout of the child element in the `Stack` component.
 *
 * @see https://rsuitejs.com/components/stack
 */
declare function StackItem(props: StackItemProps): React.JSX.Element;
declare namespace StackItem {
    var displayName: string;
    var propTypes: {
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        alignSelf: PropTypes.Requireable<string>;
        flex: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        grow: PropTypes.Requireable<number>;
        shrink: PropTypes.Requireable<number>;
        order: PropTypes.Requireable<number>;
        basis: PropTypes.Requireable<string>;
    };
}
export default StackItem;
