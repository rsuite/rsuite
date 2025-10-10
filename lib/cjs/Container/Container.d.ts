import React from 'react';
import { WithAsProps } from '../internals/types';
export type ContainerProps = WithAsProps & React.HTMLAttributes<HTMLDivElement>;
export declare const ContainerContext: React.Context<ContainerContextValue>;
interface ContainerContextValue {
    setHasSidebar?: (value: boolean) => void;
}
/**
 * The Container component is used to wrap content in a themed container with a max-width.
 * @see https://rsuitejs.com/components/container
 */
declare const Container: React.ForwardRefExoticComponent<WithAsProps<React.ElementType<any>> & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export default Container;
