interface DropdownItemState {
    /**
     * Internal ID
     */
    id: string;
    /**
     *
     */
    props: {
        selected: boolean;
    };
}
interface DropdownState {
    items: DropdownItemState[];
}
export declare const initialState: DropdownState;
export declare enum DropdownActionType {
    RegisterItem = 0,
    UnregisterItem = 1,
    UpdateItem = 2
}
export type DropdownAction = {
    type: DropdownActionType.RegisterItem;
    payload: {
        id: string;
        props: {
            selected: boolean;
        };
    };
} | {
    type: DropdownActionType.UnregisterItem;
    payload: {
        id: string;
    };
};
export declare function reducer(state: DropdownState | undefined, action: DropdownAction): DropdownState;
export {};
