import * as React from 'react';
import { SliderProps } from '../Slider/Slider.d';

export type ValueType = [number, number];
export type RangeSliderProps = SliderProps<ValueType>;

declare const RangeSlider: React.ComponentType<RangeSliderProps>;

export default RangeSlider;
