import React from 'react';
import DateInputSubpath, { useDateInputState } from 'rsuite/DateInput';
import {
  Button,
  Carousel,
  Fade,
  Animation,
  CustomProvider,
  Modal,
  Drawer,
  DateInput,
  Form,
  FormErrorSummary,
  FormErrorSummaryItem,
  FormErrorSummaryProps,
  AutoComplete,
  InputPicker,
  TagPicker,
  SelectPicker,
  CheckPicker,
  Cascader,
  MultiCascader,
  TreePicker,
  CheckTreePicker,
  DatePicker,
  DateRangePicker,
  TimePicker,
  TimeRangePicker,
  TagInput,
  useClipboard
} from 'rsuite';
import ButtonSubpath, { ButtonProps } from 'rsuite/Button';
import AnimationSubpath from 'rsuite/Animation';
import ProviderSubpath, { CustomProviderProps } from 'rsuite/CustomProvider';
import FadeSubpath from 'rsuite/Fade';
import ModalSubpath, { ModalProps } from 'rsuite/Modal';
import DrawerSubpath from 'rsuite/Drawer';
import FormSubpath from 'rsuite/Form';
import SummarySubpath, {
  FormErrorSummary as NamedSummarySubpath,
  FormErrorSummaryItem as SummarySubpathItem,
  FormErrorSummaryProps as SummarySubpathProps
} from 'rsuite/FormErrorSummary';
import ClipboardSubpath, { useClipboard as NamedClipboardSubpath } from 'rsuite/useClipboard';
import SelectPickerSubpath from 'rsuite/SelectPicker';
import DatePickerSubpath from 'rsuite/DatePicker';
import CarouselSubpath, { CarouselProps } from 'rsuite/Carousel';
import type { CarouselLocale, Locale } from 'rsuite/locales';

const carouselLocale: CarouselLocale = { selectSlide: 'Stories', slideLabel: 'Story {0} of {1}' };
const carouselProps: CarouselProps = { locale: { slideLabel: 'Item {0}/{1}' } };
const providerLocale: Locale = { Carousel: { selectSlide: 'Slides', slideLabel: 'Slide {0}' } };
export const namedCarousels = (
  <CustomProvider locale={providerLocale}>
    <Carousel locale={carouselLocale}>
      <div>First</div>
      <div>Second</div>
    </Carousel>
    <CarouselSubpath {...carouselProps}>
      <div>First</div>
    </CarouselSubpath>
  </CustomProvider>
);
// @ts-expect-error Accessible label templates must remain strings.
const invalidCarouselLocale: CarouselLocale = { slideLabel: 123 };
void invalidCarouselLocale;

const responsiveData = [{ label: 'Alpha', value: 'a' }];
export const responsivePickers = (
  <CustomProvider
    components={{
      SelectPicker: { defaultProps: { responsive: 'mdDown' } },
      InputPicker: { defaultProps: { responsive: '(max-width: 1279px)' } },
      TimeRangePicker: { defaultProps: { responsive: 'mdDown' } }
    }}
  >
    <SelectPicker data={responsiveData} responsive="mdDown" />
    <CheckPicker data={responsiveData} responsive="mdDown" />
    <Cascader data={responsiveData} responsive="mdDown" />
    <MultiCascader data={responsiveData} responsive="mdDown" />
    <TreePicker data={responsiveData} responsive="mdDown" />
    <CheckTreePicker data={responsiveData} responsive="mdDown" />
    <InputPicker data={responsiveData} responsive="(max-width: 1279px)" />
    <TagPicker data={responsiveData} responsive="(max-width: 1279px)" />
    <DatePicker responsive="(max-width: 1279px)" />
    <DateRangePicker responsive="(max-width: 1279px)" />
    <TimePicker responsive="(max-width: 1279px)" />
    <TimeRangePicker responsive="(max-width: 1279px)" />
    <SelectPickerSubpath data={responsiveData} responsive="mdDown" />
    <DatePickerSubpath responsive="(max-width: 1279px)" />
    <SelectPicker data={responsiveData} responsive />
    <DatePicker responsive={false} />
  </CustomProvider>
);
// @ts-expect-error Responsive configuration accepts booleans or media query strings, not numbers.
export const invalidResponsive = <SelectPicker data={responsiveData} responsive={992} />;
// @ts-expect-error AutoComplete retains its positioned popup and has no responsive prop.
export const unsupportedResponsive = <AutoComplete data={[]} responsive="mdDown" />;

const providerProps: CustomProviderProps = {
  rtl: true,
  disableRipple: true,
  reduceMotion: true,
  components: {
    Button: { defaultProps: { size: 'lg' } },
    Fade: { defaultProps: { in: true, reduceMotion: false } },
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
      <Fade in reduceMotion>
        <div>Root Fade</div>
      </Fade>
      <FadeSubpath in reduceMotion={false}>
        <div>Subpath Fade</div>
      </FadeSubpath>
      <Animation.Fade in reduceMotion>
        <div>Namespace Fade</div>
      </Animation.Fade>
      <AnimationSubpath.Fade in reduceMotion={false}>
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
  <TransitionSubpath in reduceMotion ref={transitionRef}>
    <div>Transition</div>
  </TransitionSubpath>
);
declare const transitionInstance: InstanceType<typeof TransitionSubpath>;
export const transitionChildRef: React.RefObject<unknown> = transitionInstance.childRef;

const motionProps: Pick<ModalProps, 'reduceMotion'> = { reduceMotion: true };
// @ts-expect-error Motion policy remains boolean across all public declarations.
const invalidMotionProps: Pick<ModalProps, 'reduceMotion'> = { reduceMotion: 'always' };
void invalidMotionProps;
export const motionOutput = (
  <>
    <Animation.Bounce in reduceMotion>
      <div />
    </Animation.Bounce>
    <AnimationSubpath.Slide in reduceMotion={false}>
      <div />
    </AnimationSubpath.Slide>
    <Animation.Collapse in reduceMotion>
      <div />
    </Animation.Collapse>
    <Modal {...motionProps} />
    <ModalSubpath reduceMotion={false} />
    <Drawer {...motionProps} />
    <DrawerSubpath reduceMotion={false} />
  </>
);

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

// Public root/subpath Clipboard contracts share the same factory and result shapes.
const clipboardFactories: (typeof useClipboard)[] = [ClipboardSubpath, NamedClipboardSubpath];
declare const clipboardResult: ReturnType<typeof useClipboard>;
const clipboardWrite: Promise<boolean> = clipboardResult.copy('');
const clipboardReset: void = clipboardResult.reset();
const clipboardFeedback: boolean = clipboardResult.copied;
const clipboardError: Error | null = clipboardResult.error;
// @ts-expect-error Clipboard timeouts remain numeric.
useClipboard({ timeout: '2000' });
// @ts-expect-error Clipboard writes accept text.
clipboardResult.copy(123);
// @ts-expect-error Reset has no arguments.
clipboardResult.reset(1);
void [clipboardFactories, clipboardWrite, clipboardReset, clipboardFeedback, clipboardError];

export const editingHintOutput = (
  <CustomProvider
    components={{
      AutoComplete: { defaultProps: { inputMode: 'email', enterKeyHint: 'next' } },
      InputPicker: { defaultProps: { inputMode: 'decimal', enterKeyHint: 'done' } },
      TagPicker: { defaultProps: { inputMode: 'text', enterKeyHint: 'search' } },
      TagInput: { defaultProps: { inputMode: 'tel', enterKeyHint: 'enter' } }
    }}
  >
    <AutoComplete data={[]} inputMode="text" enterKeyHint="search" />
    <InputPicker data={[]} inputMode="decimal" enterKeyHint="done" />
    <TagPicker data={[]} inputMode="text" enterKeyHint="next" />
    <TagInput inputMode="email" enterKeyHint="enter" />
  </CustomProvider>
);
