import React from 'react';
import {
  Button,
  type ButtonProps,
  PinInput,
  type PinInputProps,
  Input,
  type InputProps,
  Stack,
  type StackProps,
  Divider,
  type DividerProps,
  Badge,
  type BadgeProps,
  Box,
  type BoxProps,
  TagInput,
  type TagInputProps,
  Checkbox,
  type CheckboxProps,
  Radio,
  type RadioProps,
  Toggle,
  type ToggleProps,
  Slider,
  type SliderProps
} from 'rsuite';
import ButtonSubpath, { type ButtonProps as ButtonSubpathProps } from 'rsuite/Button';
import PinInputSubpath, { type PinInputProps as PinInputSubpathProps } from 'rsuite/PinInput';
import InputSubpath, { type InputProps as InputSubpathProps } from 'rsuite/Input';
import StackSubpath, { type StackProps as StackSubpathProps } from 'rsuite/Stack';
import DividerSubpath, { type DividerProps as DividerSubpathProps } from 'rsuite/Divider';
import BadgeSubpath, { type BadgeProps as BadgeSubpathProps } from 'rsuite/Badge';
import BoxSubpath, { type BoxProps as BoxSubpathProps } from 'rsuite/Box';
import TagInputSubpath, { type TagInputProps as TagInputSubpathProps } from 'rsuite/TagInput';
import CheckboxSubpath, { type CheckboxProps as CheckboxSubpathProps } from 'rsuite/Checkbox';
import RadioSubpath, { type RadioProps as RadioSubpathProps } from 'rsuite/Radio';
import ToggleSubpath, { type ToggleProps as ToggleSubpathProps } from 'rsuite/Toggle';
import SliderSubpath, { type SliderProps as SliderSubpathProps } from 'rsuite/Slider';
import type { InternalRefForwardingComponent } from 'rsuite/esm/internals/types/shared';
export function ButtonWrapper(props: ButtonProps) {
  return <Button {...props} />;
}
export function ButtonSubpathWrapper(props: ButtonSubpathProps) {
  return <ButtonSubpath {...props} />;
}
export function PinInputWrapper(props: PinInputProps) {
  return <PinInput {...props} />;
}
export function PinInputSubpathWrapper(props: PinInputSubpathProps) {
  return <PinInputSubpath {...props} />;
}
export function InputWrapper(props: InputProps) {
  return <Input {...props} />;
}
export function InputSubpathWrapper(props: InputSubpathProps) {
  return <InputSubpath {...props} />;
}
export function StackWrapper(props: StackProps) {
  return <Stack {...props} />;
}
export function StackSubpathWrapper(props: StackSubpathProps) {
  return <StackSubpath {...props} />;
}
export function DividerWrapper(props: DividerProps) {
  return <Divider {...props} />;
}
export function DividerSubpathWrapper(props: DividerSubpathProps) {
  return <DividerSubpath {...props} />;
}
export function BadgeWrapper(props: BadgeProps) {
  return <Badge {...props} />;
}
export function BadgeSubpathWrapper(props: BadgeSubpathProps) {
  return <BadgeSubpath {...props} />;
}
export function BoxWrapper(props: BoxProps) {
  return <Box {...props} />;
}
export function BoxSubpathWrapper(props: BoxSubpathProps) {
  return <BoxSubpath {...props} />;
}
export function TagInputWrapper(props: TagInputProps) {
  return <TagInput {...props} />;
}
export function TagInputSubpathWrapper(props: TagInputSubpathProps) {
  return <TagInputSubpath {...props} />;
}
export function CheckboxWrapper(props: CheckboxProps) {
  return <Checkbox {...props} />;
}
export function CheckboxSubpathWrapper(props: CheckboxSubpathProps) {
  return <CheckboxSubpath {...props} />;
}
export function RadioWrapper(props: RadioProps) {
  return <Radio {...props} />;
}
export function RadioSubpathWrapper(props: RadioSubpathProps) {
  return <RadioSubpath {...props} />;
}
export function ToggleWrapper(props: ToggleProps) {
  return <Toggle {...props} />;
}
export function ToggleSubpathWrapper(props: ToggleSubpathProps) {
  return <ToggleSubpath {...props} />;
}
export function SliderWrapper(props: SliderProps) {
  return <Slider {...props} />;
}
export function SliderSubpathWrapper(props: SliderSubpathProps) {
  return <SliderSubpath {...props} />;
}

const anchorRef = React.createRef<HTMLAnchorElement>();
const divRef = React.createRef<HTMLDivElement>();
export const anchor = <Box as="a" href="/docs" ref={anchorRef} />;
export const buttonLink = (
  <Button as="a" href="/docs">
    Read
  </Button>
);
export const nativeButton = <Button type="submit" form="checkout" />;
export const anchorHandler = (
  <Box
    as="a"
    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
      void event;
    }}
  />
);
export const forwardedButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'as'>>(
  function ForwardedButton(props, ref) {
    return <Button {...props} ref={ref} />;
  }
);
// @ts-expect-error Default div attributes do not include href.
export const invalidDefaultHref = <Box href="/docs" />;
// @ts-expect-error Explicit div attributes do not include href.
export const invalidDivHref = <Box as="div" href="/docs" />;
// @ts-expect-error Ref must match the explicit anchor element.
export const invalidAnchorRef = <Box as="a" ref={divRef} />;
// @ts-expect-error Button appearance remains a string literal union.
export const invalidAppearance = <Button appearance={42} />;
// @ts-expect-error PIN values remain strings.
export const invalidPin = <PinInput value={42} />;
// @ts-expect-error A wrapped PIN still requires string values.
export const invalidWrappedPin = <PinInputWrapper value={42} />;
// @ts-expect-error A standalone wrapped PIN still requires string values.
export const invalidWrappedSubpathPin = <PinInputSubpathWrapper value={42} />;
// @ts-expect-error Native form IDs remain strings.
export const invalidButtonForm = <Button form={42} />;
const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  void event;
};
// @ts-expect-error Explicit anchor callbacks do not receive button events.
export const invalidAnchorHandler = <Box as="a" onClick={buttonHandler} />;
// @ts-expect-error Custom PIN callbacks still receive strings.
export const invalidPinHandler = <PinInput onChange={(value: number) => void value} />;
// @ts-expect-error Normalizing as must not admit arbitrary attributes.
export const invalidUnknownBoxProp = <Box thisPropIsNotPartOfBox={1} />;
declare const FixedElement: InternalRefForwardingComponent<'div', { label: string }, 'as'>;
export const fixed = <FixedElement label="fixed" />;
// @ts-expect-error Omitting as keeps the generic prop unavailable.
export const invalidFixed = <FixedElement label="fixed" as="a" />;
declare const Restricted: InternalRefForwardingComponent<'div', { as?: 'section'; label: string }>;
export const restricted = <Restricted as="section" label="fixed" />;
// @ts-expect-error Explicit as restrictions stay narrow.
export const invalidRestricted = <Restricted as="a" label="fixed" />;
declare const Required: InternalRefForwardingComponent<'section', { as: 'section'; label: string }>;
export const required = <Required as="section" label="required" />;
// @ts-expect-error Required as remains required.
export const missingRequired = <Required label="required" />;
// @ts-expect-error Required as retains its exact allowed element.
export const wrongRequired = <Required as="button" label="required" />;
declare const RequiredBroad: InternalRefForwardingComponent<
  'div',
  { as: React.ElementType; label: string }
>;
export const requiredBroad = <RequiredBroad<'section'> as="section" label="required" />;
// @ts-expect-error Required broad as remains required.
export const missingRequiredBroad = <RequiredBroad label="required" />;
// @ts-expect-error Required broad as still accepts only element types.
export const invalidRequiredBroad = <RequiredBroad as={42} label="required" />;
declare const OwnAs: InternalRefForwardingComponent<'div', { as?: 'section'; label: string }, 'as'>;
export const own = <OwnAs as="section" label="own" />;
// @ts-expect-error Omitting generic as does not erase a custom as constraint.
export const wrongOwn = <OwnAs as="a" label="own" />;
// @ts-expect-error Custom as does not change the default native element when generic as is omitted.
export const wrongOwnHref = <OwnAs as="section" label="own" href="/docs" />;
export const ownExplicit = <OwnAs<'a'> as="section" label="own" href="/docs" ref={anchorRef} />;
