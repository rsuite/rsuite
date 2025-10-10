/// <reference types="react" />
interface KeyboardEventOptions {
    onSegmentChange?: (kevent: React.KeyboardEvent<HTMLInputElement>) => void;
    onSegmentValueChange?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onSegmentValueChangeWithNumericKeys?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onSegmentValueRemove?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
export declare function useKeyboardInputEvent({ onSegmentChange, onSegmentValueChange, onSegmentValueChangeWithNumericKeys, onSegmentValueRemove, onKeyDown }: KeyboardEventOptions): (event: React.KeyboardEvent<HTMLInputElement>) => void;
export default useKeyboardInputEvent;
