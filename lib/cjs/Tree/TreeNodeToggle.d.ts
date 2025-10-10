import React from 'react';
interface TreeNodeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
    data: any;
    loading?: boolean;
    expanded?: boolean;
    hasChildren?: boolean;
}
declare function TreeNodeToggle(props: TreeNodeToggleProps): React.JSX.Element;
export default TreeNodeToggle;
