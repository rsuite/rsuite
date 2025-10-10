import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface GraduatedProps extends WithAsProps {
    step: number;
    min: number;
    max: number;
    count: number;
    value: number | number[];
    renderMark?: (mark: number) => React.ReactNode;
}
declare const Graduated: RsRefForwardingComponent<'div', GraduatedProps>;
export default Graduated;
