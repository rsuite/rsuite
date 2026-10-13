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
  Whisper,
  useClipboard,
  useDialog
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
import DialogSubpath from 'rsuite/useDialog';
import SelectPickerSubpath from 'rsuite/SelectPicker';
import DatePickerSubpath from 'rsuite/DatePicker';
import CarouselSubpath, { CarouselProps } from 'rsuite/Carousel';
import WhisperSubpath from 'rsuite/Whisper';
import { enGB, type CarouselLocale, type Locale } from 'rsuite/locales';

export function externalPickerForms() {
  const data = [{ value: 0, label: 'Zero' }];
  // @ts-expect-error A form owner is an element ID, not an element.
  const elementOwner = <SelectPicker data={data} form={document.createElement('form')} />;
  // @ts-expect-error Editable pickers also require a string form ID.
  const numericOwner = <InputPicker data={data} form={42} />;
  // @ts-expect-error TagInput inherits the string form ID contract.
  const booleanOwner = <TagInput form={true} />;
  void [elementOwner, numericOwner, booleanOwner];
  return (
    <>
      <SelectPicker data={data} name="select" form="settings" />
      <SelectPickerSubpath data={data} name="subpath" form="settings" />
      <CheckPicker data={data} name="check" form="settings" />
      <TreePicker data={data} name="tree" form="settings" />
      <CheckTreePicker data={data} name="checkTree" form="settings" />
      <Cascader data={data} name="cascader" form="settings" />
      <MultiCascader data={data} name="multiCascader" form="settings" />
      <InputPicker data={data} name="input" form="settings" />
      <TagPicker data={data} name="tags" form="settings" />
      <TagInput name="tagInput" form="settings" />
      <AutoComplete data={[]} name="complete" form="settings" />
      <Form.Control name="field" accepter={SelectPicker} data={data} form="settings" />
    </>
  );
}

export function dialogCloseCallbacks(
  root: ReturnType<typeof useDialog>,
  subpath: ReturnType<typeof DialogSubpath>
) {
  root.confirm('Continue?', {
    onClose: result => {
      const confirmed: boolean = result;
      // @ts-expect-error Confirmation results are booleans.
      const invalid: number = result;
      void [confirmed, invalid];
    }
  });
  root.prompt('Name', {
    onClose: result => {
      const value: string | false = result;
      // @ts-expect-error Prompt results contain text or the cancellation sentinel.
      const invalid: number = result;
      void [value, invalid];
    }
  });
  subpath.confirm('Continue?', {
    onClose: result => {
      const confirmed: boolean = result;
      // @ts-expect-error Subpath confirmation results are booleans.
      const invalid: string = result;
      void [confirmed, invalid];
    }
  });
  subpath.prompt('Name', {
    onClose: result => {
      const value: string | false = result;
      // @ts-expect-error Subpath prompt results include cancellation.
      const invalid: string = result;
      void [value, invalid];
    }
  });
  root.alert('Notice', { onClose: () => {} });
  root.confirm('Continue?', { onClose: () => {} });
  subpath.prompt('Name', { onClose: () => {} });
}

export const customSpeakers = (
  <>
    <Whisper
      speaker={({ arrowOffsetLeft, arrowOffsetTop, left, top }, ref) => {
        const horizontal: string | undefined = arrowOffsetLeft;
        const vertical: string | undefined = arrowOffsetTop;
        // @ts-expect-error Arrow offsets are CSS percentages, not numeric coordinates.
        const numericLeft: number | undefined = arrowOffsetLeft;
        // @ts-expect-error Both arrow axes use the same percentage representation.
        const numericTop: number | undefined = arrowOffsetTop;
        void [numericLeft, numericTop];
        return (
          <div ref={ref} style={{ left, top }}>
            <span style={{ left: horizontal, top: vertical }} />
          </div>
        );
      }}
    >
      <button>Root import</button>
    </Whisper>
    <WhisperSubpath
      speaker={({ arrowOffsetLeft, arrowOffsetTop }, ref) => (
        <div ref={ref}>
          {arrowOffsetLeft?.endsWith('%')}
          {arrowOffsetTop?.endsWith('%')}
        </div>
      )}
    >
      <button>Subpath import</button>
    </WhisperSubpath>
  </>
);

const datePickerOpeningLocale: Locale = {
  DatePicker: { ...enGB.DatePicker, openPicker: 'Open appointment' },
  DateRangePicker: { ...enGB.DateRangePicker, openPicker: 'Open date range' }
};
const { openPicker: _dateOpeningLabel, ...legacyDateTranslations } = enGB.DatePicker;
const { openPicker: _rangeOpeningLabel, ...legacyRangeTranslations } = enGB.DateRangePicker;
const legacyDatePickerLocale: Locale = {
  DatePicker: legacyDateTranslations,
  DateRangePicker: legacyRangeTranslations
};
const legacyBundledDateTranslations: typeof enGB.DatePicker = legacyDateTranslations;
const legacyBundledRangeTranslations: typeof enGB.DateRangePicker = legacyRangeTranslations;
const independentDatePickerOpening = (
  <CustomProvider
    locale={datePickerOpeningLocale}
    components={{
      DatePicker: { defaultProps: { openOnInputClick: false } },
      DateRangePicker: { defaultProps: { openOnInputClick: false } },
      TimePicker: { defaultProps: { openOnInputClick: false } },
      TimeRangePicker: { defaultProps: { openOnInputClick: false } }
    }}
  >
    <DatePicker openOnInputClick={false} locale={{ openPicker: 'Open date' }} />
    <DateRangePicker openOnInputClick={false} locale={{ openPicker: 'Open range' }} />
    <TimePicker openOnInputClick={false} locale={{ openPicker: 'Open time' }} />
    <TimeRangePicker openOnInputClick={false} locale={{ openPicker: 'Open time range' }} />
    <DatePickerSubpath openOnInputClick={false} />
  </CustomProvider>
);
// @ts-expect-error the input opening policy is a boolean.
const invalidDatePickerOpening = <DatePickerSubpath openOnInputClick="manual" />;
void [
  independentDatePickerOpening,
  invalidDatePickerOpening,
  legacyDatePickerLocale,
  legacyBundledDateTranslations,
  legacyBundledRangeTranslations,
  _dateOpeningLabel,
  _rangeOpeningLabel
];

const automaticButtonProps: ButtonProps = {
  autoLoading: true,
  loading: false,
  onClick: async event => {
    const target: HTMLElement = event.currentTarget;
    return target.id;
  },
  onClickError: (error, event) => {
    const cause: unknown = error;
    const target: HTMLElement = event.currentTarget;
    void [cause, target];
  }
};
export const automaticButtons = (
  <>
    <Button {...automaticButtonProps}>Save</Button>
    <ButtonSubpath {...automaticButtonProps}>Save</ButtonSubpath>
    <Button autoLoading onClick={() => 42}>
      Synchronous result
    </Button>
  </>
);
// @ts-expect-error Automatic loading is an explicit boolean option.
const invalidAutomaticButton: ButtonProps = { autoLoading: 'auto' };
const invalidButtonErrorHandler: ButtonProps = {
  // @ts-expect-error Error handlers receive a click event, not a keyboard event.
  onClickError: (error, event: React.KeyboardEvent) => {
    void [error, event];
  }
};
void [invalidAutomaticButton, invalidButtonErrorHandler];

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

import {
  ColorPicker,
  type ColorPickerProps,
  type ColorPickerPreset,
  type ColorFormat,
  type PickerHandle
} from 'rsuite';
import ColorPickerSubpath, { ColorPicker as NamedColorPickerSubpath } from 'rsuite/ColorPicker';
import type { ColorPickerLocale } from 'rsuite/locales';

const colorComponents: (typeof ColorPicker)[] = [ColorPickerSubpath, NamedColorPickerSubpath];
const colorRef = React.createRef<PickerHandle>();
const colorPresets: readonly ColorPickerPreset[] = [{ value: '#1234', label: 'Brand' }];
const colorLocale: ColorPickerLocale = { hue: 'Hue', dialogTitle: 'Brand color' };
const colorProps: ColorPickerProps = {
  value: null,
  defaultValue: 'hsl(120 100% 50% / 50%)',
  format: 'rgb',
  defaultFormat: 'hex',
  presets: colorPresets,
  form: 'profile',
  responsive: 'mdDown',
  locale: colorLocale,
  onChange: (value, event) => {
    const selected: string | null = value;
    const source: React.SyntheticEvent = event;
    void [selected, source];
  },
  onFormatChange: (format, event) => {
    const selected: ColorFormat = format;
    const source: React.SyntheticEvent = event;
    void [selected, source];
  }
};
export const colorPickerOutput = (
  <CustomProvider
    locale={{ ColorPicker: colorLocale }}
    components={{ ColorPicker: { defaultProps: { disableAlpha: true, defaultFormat: 'hsl' } } }}
  >
    <ColorPickerSubpath {...colorProps} ref={colorRef} name="brand" />
    <ColorPicker presets={['transparent', '#fff']} />
  </CustomProvider>
);
colorRef.current?.open?.();
colorRef.current?.close?.();
// @ts-expect-error Color values must be strings or null.
const invalidColorValue = <ColorPicker value={42} />;
// @ts-expect-error Initial colors use the same value contract.
const invalidColorDefault = <ColorPicker defaultValue={42} />;
// @ts-expect-error Output formats are restricted to the public sRGB formats.
const invalidColorFormat = <ColorPicker format="lab" />;
// @ts-expect-error Preset values must be color strings.
const invalidColorPreset = <ColorPicker presets={[{ value: 42 }]} />;
// @ts-expect-error Changes provide a color string or null, not a numeric channel.
const invalidColorChange = <ColorPicker onChange={(value: number) => void value} />;
// @ts-expect-error ColorPicker exposes the picker handle, not a native input ref.
const invalidColorRef = <ColorPicker ref={React.createRef<HTMLInputElement>()} />;
void [
  colorComponents,
  invalidColorValue,
  invalidColorDefault,
  invalidColorFormat,
  invalidColorPreset,
  invalidColorChange,
  invalidColorRef
];
