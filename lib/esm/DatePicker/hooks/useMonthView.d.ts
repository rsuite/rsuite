/// <reference types="react" />
interface UseMonthViewProps {
    onToggleMonthDropdown?: (toggle: boolean) => void;
}
declare function useMonthView(props: UseMonthViewProps): {
    monthView: boolean;
    setMonthView: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    toggleMonthView: (...args: any[]) => any;
};
export default useMonthView;
