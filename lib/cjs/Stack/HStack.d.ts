import Stack, { StackProps } from './Stack';
import { RsRefForwardingComponent } from '../internals/types';
export interface HStackProps extends Omit<StackProps, 'direction'> {
    /**
     * Reverse the order of the children in the stack
     */
    reverse?: boolean;
}
export interface StackComponent extends RsRefForwardingComponent<'div', HStackProps> {
    Item: typeof Stack.Item;
}
declare const HStack: StackComponent;
export default HStack;
