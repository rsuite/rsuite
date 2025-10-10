/// <reference types="react" />
interface DragProps {
    tooltip?: boolean;
    disabled?: boolean;
    onDragStart?: (event: React.MouseEvent) => void;
    onDragMove?: (event: React.DragEvent, dataset?: DOMStringMap) => void;
    onDragEnd?: (event: React.MouseEvent, dataset?: DOMStringMap) => void;
    keepTooltipOpen?: boolean;
}
declare const useDrag: (props: DragProps) => {
    active: boolean;
    rootRef: import("react").RefObject<HTMLDivElement>;
    tooltipRef: import("react").RefObject<HTMLDivElement>;
    onMoveStart: (...args: any[]) => any;
    onMouseEnter: (...args: any[]) => any;
};
export default useDrag;
