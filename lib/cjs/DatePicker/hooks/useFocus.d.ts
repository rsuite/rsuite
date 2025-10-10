import { RefObject } from 'react';
interface UseFocusProps {
    target: RefObject<HTMLElement>;
    showMonth: boolean;
    id: string;
    locale: any;
}
declare function useFocus(props: UseFocusProps): {
    focusInput: (...args: any[]) => any;
    focusSelectedDate: () => void;
    onKeyFocusEvent: (...args: any[]) => any;
};
export default useFocus;
