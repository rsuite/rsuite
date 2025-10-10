import React from 'react';
import { SliderProps } from '../Slider';
export type Range = [number, number];
export type RangeSliderProps = SliderProps<Range> & {
    /**
     * Add constraint to validate before onChange is dispatched
     */
    constraint?: (range: Range) => boolean;
};
/**
 * The `RangeSlider` component is used to select a range from a given numerical range.
 * @see https://rsuitejs.com/components/slider/
 */
declare const RangeSlider: React.ForwardRefExoticComponent<SliderProps<Range> & {
    /**
     * Add constraint to validate before onChange is dispatched
     */
    constraint?: ((range: Range) => boolean) | undefined;
} & React.RefAttributes<unknown>>;
export default RangeSlider;
