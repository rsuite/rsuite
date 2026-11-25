import React from 'react';
import { PinInput, type PinInputProps, CustomProvider } from 'rsuite';
import Standalone, { type PinInputProps as StandaloneProps } from 'rsuite/PinInput';
import type { Locale, PinInputLocale } from 'rsuite/locales';

export const translations: PinInputLocale = { characterLabel: 'Part {0} of {1}' };
export const providerLocale: Locale = { PinInput: { groupLabel: 'Verification code' } };
export function RootWrapper(props: PinInputProps) {
  return <PinInput {...props} />;
}
export function StandaloneWrapper(props: StandaloneProps) {
  return <Standalone {...props} />;
}
export const props: PinInputProps = {
  locale: translations,
  'aria-label': 'Verification code',
  'aria-describedby': 'help',
  'aria-invalid': true,
  'aria-errormessage': 'error'
};
export const root = <PinInput {...props} />;
export const standalone = <Standalone {...props} />;
export const provider = (
  <CustomProvider
    locale={providerLocale}
    components={{ PinInput: { defaultProps: { locale: { groupLabel: 'Code' } } } }}
  >
    {root}
  </CustomProvider>
);
// @ts-expect-error Character labels are strings.
export const invalidCharacter = <PinInput locale={{ characterLabel: 42 }} />;
// @ts-expect-error Provider group labels are strings.
export const invalidProvider: Locale = { PinInput: { groupLabel: 42 } };
// @ts-expect-error aria-invalid accepts booleanish values, grammar or spelling.
export const invalidState: PinInputProps = { 'aria-invalid': 'invalid' };
// @ts-expect-error Description references are strings.
export const invalidDescription: PinInputProps = { 'aria-describedby': 42 };
// @ts-expect-error Group labels are strings.
export const invalidGroup: PinInputLocale = { groupLabel: true };
// @ts-expect-error Unknown translations are rejected.
export const invalidTranslation: PinInputLocale = { textLabel: 'Code' };
