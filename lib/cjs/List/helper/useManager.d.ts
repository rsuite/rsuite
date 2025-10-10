import type { EdgeOffset } from './utils';
export type Collection = string | number;
export interface ManagedItem {
    node: HTMLElement;
    edgeOffset: Partial<EdgeOffset> | null;
    info: {
        collection: Collection;
        index?: number;
        disabled?: boolean;
    };
}
declare const useManager: () => {
    listItemRegister: (item: ManagedItem) => {
        unregister: () => void;
    };
    getManagedItem: (node: HTMLElement) => ManagedItem | undefined;
    getOrderedItems: (collection: any) => ManagedItem[];
};
export default useManager;
