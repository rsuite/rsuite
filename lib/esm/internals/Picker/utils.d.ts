import React from 'react';
export interface NodeKeys {
    valueKey: string;
    childrenKey: string;
}
export declare function createConcatChildrenFunction<T = any>(node: any, nodeValue?: any, nodeKeys?: NodeKeys): (data: T[], children: T[]) => T[];
export declare function shouldDisplay(label: React.ReactNode, searchKeyword: string): boolean;
export interface KeyboardEvents {
    down?: React.KeyboardEventHandler;
    up?: React.KeyboardEventHandler;
    enter?: React.KeyboardEventHandler;
    del?: React.KeyboardEventHandler;
    esc?: React.KeyboardEventHandler;
    right?: React.KeyboardEventHandler;
    left?: React.KeyboardEventHandler;
}
/**
 * Handling keyboard events...
 * @param event Keyboard event object
 * @param events Event callback functions
 */
export declare function onMenuKeyDown(event: React.KeyboardEvent, events: KeyboardEvents): void;
