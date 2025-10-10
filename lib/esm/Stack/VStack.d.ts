import Stack, { StackProps } from './Stack';
import { RsRefForwardingComponent } from '../internals/types';
export interface VStackProps extends Omit<StackProps, 'direction'> {
    reverse?: boolean;
}
export interface StackComponent extends RsRefForwardingComponent<'div', VStackProps> {
    Item: typeof Stack.Item;
}
declare const VStack: StackComponent;
export default VStack;
