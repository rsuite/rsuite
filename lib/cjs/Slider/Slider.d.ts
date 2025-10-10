import React from 'react';
import PropTypes from 'prop-types';
import type { WithAsProps, FormControlBaseProps } from '../internals/types';
export interface LocaleType {
    placeholder?: string;
    searchPlaceholder?: string;
    noResultsText?: string;
    loading?: string;
}
export interface SliderProps<T = number> extends WithAsProps, FormControlBaseProps<T> {
    /**
     * The label of the slider.
     */
    'aria-label'?: string;
    /**
     * The id of the element containing a label for the slider.
     */
    'aria-labelledby'?: string;
    /**
     * A string value that provides a user-friendly name for the current value of the slider.
     */
    'aria-valuetext'?: string;
    /** Minimum value of sliding range */
    min?: number;
    /** Maximum sliding range */
    max?: number;
    /** Slide the value of one step */
    step?: number;
    /** A css class to apply to the Handle node. */
    handleClassName?: string;
    /** Customizing what is displayed inside a handle */
    handleTitle?: React.ReactNode;
    /** 	A css class to apply to the Bar DOM node */
    barClassName?: string;
    /** custom style */
    handleStyle?: React.CSSProperties;
    /** Show Ticks */
    graduated?: boolean;
    /** Whether to show Tooltip when sliding */
    tooltip?: boolean;
    /** Show sliding progress bar */
    progress?: boolean;
    /** Placeholder text */
    placeholder?: React.ReactNode;
    /** Vertical Slide */
    vertical?: boolean;
    /** Customize labels on the render ruler */
    renderMark?: (mark: number) => React.ReactNode;
    /** Customize the content of the rendered Tooltip. */
    renderTooltip?: (value: number | undefined) => React.ReactNode;
    /** Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider. */
    getAriaValueText?: (value: number, eventKey?: 'start' | 'end') => string;
    /** Callback function that is fired when the mouseup is triggered. */
    onChangeCommitted?: (value: T, event: React.MouseEvent) => void;
    /** If true, tooltip will always be visible  even without hover */
    keepTooltipOpen?: boolean;
}
export declare const sliderPropTypes: {
    min: PropTypes.Requireable<number>;
    max: PropTypes.Requireable<number>;
    step: PropTypes.Requireable<number>;
    value: PropTypes.Requireable<number>;
    defaultValue: PropTypes.Requireable<number>;
    className: PropTypes.Requireable<string>;
    classPrefix: PropTypes.Requireable<string>;
    handleClassName: PropTypes.Requireable<string>;
    handleTitle: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    barClassName: PropTypes.Requireable<string>;
    handleStyle: PropTypes.Requireable<object>;
    disabled: PropTypes.Requireable<boolean>;
    plaintext: PropTypes.Requireable<boolean>;
    readOnly: PropTypes.Requireable<boolean>;
    graduated: PropTypes.Requireable<boolean>;
    tooltip: PropTypes.Requireable<boolean>;
    progress: PropTypes.Requireable<boolean>;
    vertical: PropTypes.Requireable<boolean>;
    onChange: PropTypes.Requireable<(...args: any[]) => any>;
    onChangeCommitted: PropTypes.Requireable<(...args: any[]) => any>;
    renderMark: PropTypes.Requireable<(...args: any[]) => any>;
    renderTooltip: PropTypes.Requireable<(...args: any[]) => any>;
    getAriaValueText: PropTypes.Requireable<(...args: any[]) => any>;
};
/**
 * A Slider is an interface for users to adjust a value in a specific range.
 *
 * @see https://rsuitejs.com/components/slider
 */
declare const Slider: React.ForwardRefExoticComponent<SliderProps<number> & React.RefAttributes<unknown>>;
export default Slider;
