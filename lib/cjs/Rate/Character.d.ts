import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
interface CharacterProps extends WithAsProps {
    vertical?: boolean;
    status?: 0 | 0.5 | 1;
    disabled?: boolean;
    onMouseMove?: (key: any, event: React.MouseEvent) => void;
    onClick?: (key: any, event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}
declare const Character: RsRefForwardingComponent<'li', CharacterProps>;
export default Character;
