import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface MarkProps extends WithAsProps {
    mark: number;
    last?: boolean;
    renderMark?: (mark: number) => React.ReactNode;
}
declare const Mark: RsRefForwardingComponent<'span', MarkProps>;
export default Mark;
