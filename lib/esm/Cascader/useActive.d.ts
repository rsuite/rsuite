/// <reference types="react" />
interface UseActiveProps {
    target: React.RefObject<HTMLElement>;
    onOpen?: () => void;
    onClose?: () => void;
    onEntered?: (node: HTMLElement) => void;
    onExited?: (node: HTMLElement) => void;
    setSearchKeyword: (keyword: string) => void;
}
declare const useActive: (props: UseActiveProps) => {
    active: boolean;
    handleEntered: (...args: any[]) => any;
    handleExited: (...args: any[]) => any;
};
export default useActive;
