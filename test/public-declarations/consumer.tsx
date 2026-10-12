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

// Asynchronous search is available through both root and natural subpath exports.
import {
  useAsyncSearch,
  type AsyncSearchContext,
  type UseAsyncSearchOptions,
  type UseAsyncSearchReturn
} from 'rsuite';
import AsyncSearchSubpath, {
  useAsyncSearch as NamedAsyncSearchSubpath
} from 'rsuite/useAsyncSearch';
const searchFactories: (typeof useAsyncSearch)[] = [AsyncSearchSubpath, NamedAsyncSearchSubpath];
const searchOptions: UseAsyncSearchOptions<{ id: string }> = {
  query: 'item',
  dependencies: ['en-GB'],
  search: async ({ query, signal }: AsyncSearchContext) => [{ id: signal.aborted ? '' : query }]
};
const searchResult: UseAsyncSearchReturn<{ id: string }> = useAsyncSearch(searchOptions);
const searchId: string = searchResult.items[0].id;
const inferredSearch = useAsyncSearch({ query: '', search: () => [{ value: 42 }] as const });
const inferredValue: number = inferredSearch.items[0].value;
const pickerSearchData = <SelectPicker data={inferredSearch.items} />;
if (searchResult.status === 'error') {
  const error: Error = searchResult.error;
  void error;
} else {
  const error: null = searchResult.error;
  void error;
}
// @ts-expect-error Query must be a string.
useAsyncSearch({ query: 42, search: () => [] });
// @ts-expect-error The search function must return an array or a promise of an array.
useAsyncSearch({ query: '', search: () => 'invalid' });
// @ts-expect-error Dependencies must be an array.
useAsyncSearch({ query: '', search: () => [], dependencies: 'en-GB' });
// @ts-expect-error Result inference preserves the item type.
const wrongSearchItems: string[] = inferredSearch.items;
// @ts-expect-error The enabled option must be a boolean.
useAsyncSearch({ query: '', search: () => [], enabled: 'yes' });
void [searchFactories, searchId, inferredValue, pickerSearchData, wrongSearchItems];

// Locale search preserves record inference through root and natural subpath exports.
import {
  useLocaleSearch,
  type LocaleSearchMatch,
  type UseLocaleSearchOptions,
  type UseLocaleSearchReturn
} from 'rsuite';
import LocaleSearchSubpath, {
  useLocaleSearch as NamedLocaleSearchSubpath
} from 'rsuite/useLocaleSearch';
const localeSearchFactories: (typeof useLocaleSearch)[] = [
  LocaleSearchSubpath,
  NamedLocaleSearchSubpath
];
const localeSearchItems = [{ label: 'Café', value: 42 }] as const;
const localeSearchMatch: LocaleSearchMatch = 'endsWith';
const localeSearchOptions: UseLocaleSearchOptions<{ label: string; value: number }> = {
  items: localeSearchItems,
  query: 'cafe',
  getText: item => item.label,
  match: localeSearchMatch,
  locale: ['fr-FR', 'en-GB'] as const,
  collatorOptions: { sensitivity: 'base', numeric: true },
  dependencies: ['label'],
  enabled: true
};
const localeSearchResult: UseLocaleSearchReturn<{ label: string; value: number }> =
  useLocaleSearch(localeSearchOptions);
const inferredLocaleSearch = useLocaleSearch({
  items: localeSearchItems,
  query: 'cafe',
  getText: item => item.label
});
const inferredLocaleValue: 42 = inferredLocaleSearch.items[0].value;
const localePickerSearchData = <SelectPicker data={inferredLocaleSearch.items} />;
if (localeSearchResult.status === 'error') {
  const error: Error = localeSearchResult.error;
  void error;
} else {
  const error: null = localeSearchResult.error;
  void error;
}
// @ts-expect-error Records require an explicit text selector.
useLocaleSearch({ items: localeSearchItems, query: 'cafe' });
// @ts-expect-error Query must be a string.
useLocaleSearch({ ...localeSearchOptions, query: 42 });
// @ts-expect-error Selectors must return text.
useLocaleSearch({ ...localeSearchOptions, getText: item => item.value });
// @ts-expect-error Match must be a supported mode.
useLocaleSearch({ ...localeSearchOptions, match: 'fuzzy' });
// @ts-expect-error Dependencies must be an array.
useLocaleSearch({ ...localeSearchOptions, dependencies: 'label' });
// @ts-expect-error Enabled must be a boolean.
useLocaleSearch({ ...localeSearchOptions, enabled: 'yes' });
// @ts-expect-error Result inference preserves the record type.
const wrongLocaleItems: string[] = inferredLocaleSearch.items;
void [localeSearchFactories, inferredLocaleValue, localePickerSearchData, wrongLocaleItems];
