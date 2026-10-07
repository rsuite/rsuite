import React from 'react';
import DateInputSubpath, { useDateInputState } from 'rsuite/DateInput';
import {
  Button,
  Fade,
  Animation,
  CustomProvider,
  DateInput,
  Form,
  FormErrorSummary,
  FormErrorSummaryItem,
  FormErrorSummaryProps
} from 'rsuite';
import ButtonSubpath, { ButtonProps } from 'rsuite/Button';
import AnimationSubpath from 'rsuite/Animation';
import ProviderSubpath, { CustomProviderProps } from 'rsuite/CustomProvider';
import FadeSubpath from 'rsuite/Fade';
import FormSubpath from 'rsuite/Form';
import SummarySubpath, {
  FormErrorSummary as NamedSummarySubpath,
  FormErrorSummaryItem as SummarySubpathItem,
  FormErrorSummaryProps as SummarySubpathProps
} from 'rsuite/FormErrorSummary';

const providerProps: CustomProviderProps = {
  rtl: true,
  disableRipple: true,
  components: {
    Button: { defaultProps: { size: 'lg' } },
    Fade: { defaultProps: { in: true } },
    FormErrorSummary: { defaultProps: { header: 'Form errors', tabIndex: -1 } }
  },
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

const summaryItems: readonly FormErrorSummaryItem[] = [
  { name: 'email', label: 'Email', message: <span>Enter a valid email.</span>, controlId: 'email' },
  { name: 'other', label: 'Other details', message: 'Check your details.' }
];
const summaryRef = React.createRef<HTMLDivElement>();
const summaryProps: FormErrorSummaryProps = {
  header: <span>Correct these fields</span>,
  items: summaryItems,
  tabIndex: -1,
  onSelect: (item, event) => {
    const fieldName: string = item.name;
    const controlId: string | undefined = item.controlId;
    const selectedItem: SummarySubpathItem = item;
    const link: HTMLAnchorElement = event.currentTarget;
    const mouseEvent: React.MouseEvent<HTMLAnchorElement> = event;
    void [fieldName, controlId, selectedItem, link, mouseEvent];
    event.preventDefault();
  }
};
const subpathSummaryProps: SummarySubpathProps = summaryProps;
export const summaryElement: HTMLDivElement | null = summaryRef.current;
export const summaries = (
  <>
    <FormErrorSummary {...summaryProps} ref={summaryRef} aria-label="Form errors" />
    <Form.ErrorSummary
      {...summaryProps}
      ref={summaryRef}
      onSelect={(item, event) => {
        const selectedItem: FormErrorSummaryItem = item;
        const link: HTMLAnchorElement = event.currentTarget;
        void [selectedItem, link];
        // @ts-expect-error Namespace selection must preserve the summary item shape.
        void item.nonexistentField;
        // @ts-expect-error Namespace selection originates from an anchor, not a button.
        void event.currentTarget.disabled;
        event.preventDefault();
      }}
    />
    <SummarySubpath {...subpathSummaryProps} ref={summaryRef} />
    <NamedSummarySubpath {...subpathSummaryProps} ref={summaryRef} />
    <FormSubpath.ErrorSummary {...subpathSummaryProps} ref={summaryRef} />
  </>
);
// @ts-expect-error Applications must provide the summary heading.
const missingSummaryHeader: SummarySubpathProps = { items: summaryItems };
// @ts-expect-error Applications must provide the ordered summary items.
const missingSummaryItems: FormErrorSummaryProps = { header: 'Form errors' };
void [missingSummaryHeader, missingSummaryItems];
declare const summaryItem: SummarySubpathItem;
// @ts-expect-error Control IDs retain their optional string contract.
summaryItem.controlId = 123;
// @ts-expect-error Summary field identities retain their string contract.
summaryItem.name = 123;
// @ts-expect-error Consumers may pass readonly items without a mutable array requirement.
summaryProps.items.push(summaryItem);

const summaryButtonRef = React.createRef<HTMLButtonElement>();
export const summaryButton = (
  <SummarySubpath {...summaryProps} as="button" ref={summaryButtonRef} />
);
const defaultSummaryProps = { header: 'Form errors', items: summaryItems };
const svgRef = React.createRef<SVGSVGElement>();
const anchorRef = React.createRef<HTMLAnchorElement>();
// @ts-expect-error The default summary renders a div and must reject an SVG ref.
const invalidSummaryRef = <SummarySubpath {...defaultSummaryProps} ref={svgRef} />;
// @ts-expect-error A polymorphic button summary must reject an anchor ref.
const invalidAsRef = <SummarySubpath {...summaryProps} as="button" ref={anchorRef} />;
void [invalidSummaryRef, invalidAsRef];
