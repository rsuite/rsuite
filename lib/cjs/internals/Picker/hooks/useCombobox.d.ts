declare function useCombobox(): {
    id: string | undefined;
    popupType: "dialog" | "menu" | "listbox" | "grid" | "tree" | undefined;
    multiple: boolean | undefined;
    labelId: string | undefined;
};
export default useCombobox;
