import React from 'react';
import DateInputSubpath, { useDateInputState } from 'rsuite/DateInput';
import { Button, Fade, Animation, CustomProvider, DateInput } from 'rsuite';
import ButtonSubpath, { ButtonProps } from 'rsuite/Button';
import AnimationSubpath from 'rsuite/Animation';
import ProviderSubpath, { CustomProviderProps } from 'rsuite/CustomProvider';
import FadeSubpath from 'rsuite/Fade';

const providerProps: CustomProviderProps = {
  rtl: true,
  disableRipple: true,
  components: { Button: { defaultProps: { size: 'lg' } }, Fade: { defaultProps: { in: true } } },
  formatDate: (date, format) => `${date}:${format}`,
  parseDate: (_value, _format, referenceDate) => new Date(referenceDate || 0)
};
const buttonProps: ButtonProps = {
  size: 'sm',
  appearance: 'primary',
  onClick: event => event.preventDefault()
};
// @ts-expect-error Public Button size must retain its literal union.
const invalidButtonProps: ButtonProps = { size: 123 };
void invalidButtonProps;

declare const dateState: ReturnType<typeof useDateInputState>;
export const fieldFormat: string = dateState.dateField.format;
export const fieldYear: number | null = dateState.dateField.year;
export const fieldDay: number | null = dateState.dateField.day;
export const dateText: string = dateState.toDateString();
dateState.setDateField('y', 2024);
dateState.setDateOffset('M', 1);
dateState.setNewDate(null);
// @ts-expect-error Public named DateField day must reject strings in either strict mode.
dateState.dateField.day = 'invalid';

export const output = (
  <CustomProvider {...providerProps}>
    <ProviderSubpath {...providerProps}>
      <Button {...buttonProps}>Root</Button>
      <ButtonSubpath {...buttonProps}>Subpath</ButtonSubpath>
      <Fade in>
        <div>Root Fade</div>
      </Fade>
      <FadeSubpath in>
        <div>Subpath Fade</div>
      </FadeSubpath>
      <Animation.Fade in>
        <div>Namespace Fade</div>
      </Animation.Fade>
      <AnimationSubpath.Fade in>
        <div>Subpath namespace Fade</div>
      </AnimationSubpath.Fade>
      <DateInputSubpath value={new Date(2024, 1, 29)} format="dd/MM/yyyy" />
      <DateInput value={new Date(2024, 1, 29)} format="dd/MM/yyyy" />
    </ProviderSubpath>
  </CustomProvider>
);

// Consume the named public class, so its React-compatible instance ref is checked too.
import { Transition as TransitionSubpath } from 'rsuite/Animation';
const transitionRef = React.createRef<InstanceType<typeof TransitionSubpath>>();
export const transitionOutput = (
  <TransitionSubpath in ref={transitionRef}>
    <div>Transition</div>
  </TransitionSubpath>
);
declare const transitionInstance: InstanceType<typeof TransitionSubpath>;
export const transitionChildRef: React.RefObject<unknown> = transitionInstance.childRef;
