import React from 'react';
import { CommandPalette, CustomProvider, type CommandDataItem } from 'rsuite';
import Standalone from 'rsuite/CommandPalette';
import type { CommandPaletteLocale, Locale } from 'rsuite/locales';

const data = [
  { value: 'projects', label: 'Projects', metadata: { route: '/projects' } },
  { value: 0, label: 'Settings', metadata: { route: '/settings' } }
] as const;
const divRef = React.createRef<HTMLDivElement>();
const anchorRef = React.createRef<HTMLAnchorElement>();
const inputRef = React.createRef<HTMLInputElement>();
const locale: CommandPaletteLocale = { retryText: '重试', searchPlaceholder: '搜索命令' };
const partialLocale: Locale = { code: 'zh-CN', CommandPalette: { errorText: '搜索失败' } };
export const palette = (
  <CommandPalette
    title="Commands"
    data={data}
    ref={divRef}
    inputRef={inputRef}
    locale={locale}
    inputProps={{ 'aria-label': 'Search commands', onKeyDown: event => event.preventDefault() }}
    onSelect={(value, item) => {
      const inferredValue: 'projects' | 0 = value;
      const route: string = item.metadata.route;
      // @ts-expect-error Value inference retains the literal string/number union.
      const invalid: boolean = value;
      // @ts-expect-error The original readonly record is not widened to mutable metadata.
      item.metadata.route = '/changed';
      void [inferredValue, route, invalid];
    }}
    renderItem={item => <strong>{item.metadata.route}</strong>}
  />
);
export const standalone = (
  <Standalone
    title="Commands"
    data={data}
    onSelect={(_value, item) => {
      const route: string = item.metadata.route;
      void route;
    }}
  />
);
export const provider = (
  <CustomProvider
    locale={partialLocale}
    components={{
      CommandPalette: {
        defaultProps: { data, title: 'Commands', filter: false, locale }
      }
    }}
  />
);
const broad: readonly CommandDataItem[] = data;
void broad;

const C = CommandPalette;
const booleanSelect = (value: boolean) => value;
// @ts-expect-error A visible dialog title is required.
<C data={data} />;
// @ts-expect-error Command records are required.
<C title="X" />;
// @ts-expect-error Command values retain string/number semantics.
<C title="X" data={[{ value: false, label: 'X' }]} />;
// @ts-expect-error Labels provide plain searchable/accessibility text.
<C title="X" data={[{ value: 0, label: <span>X</span> }]} />;
// @ts-expect-error Search text is a string.
<C title="X" data={data} searchValue={123} />;
// @ts-expect-error filter controls search; it is not the inherited CSS filter prop.
<C title="X" data={data} filter="blur(2px)" />;
// @ts-expect-error The palette does not expose a polymorphic modal wrapper.
<C title="X" data={data} as="a" />;
// @ts-expect-error The component ref follows Modal's wrapper div.
<C title="X" data={data} ref={anchorRef} />;
// @ts-expect-error inputRef refers to the HTML input.
<C title="X" data={data} inputRef={divRef} />;
// @ts-expect-error Search value is owned by searchValue/defaultSearchValue.
<C title="X" data={data} inputProps={{ value: 'x' }} />;
// @ts-expect-error Search changes are exposed by onSearch.
<C title="X" data={data} inputProps={{ onChange: () => {} }} />;
// @ts-expect-error Custom option content uses renderItem rather than children.
<C title="X" data={data}>
  Invalid
</C>;
// @ts-expect-error Callback values must agree with the inferred command data.
<C title="X" data={data} onSelect={booleanSelect} />;
// @ts-expect-error Partial locale fields retain their translated string types.
<C title="X" data={data} locale={{ retryText: 123 }} />;
