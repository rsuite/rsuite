import type React from 'react';
import type { ModalProps } from '../Modal';
import type { CommandPaletteLocale } from '../locales';

export interface CommandDataItem {
  value: string | number;
  label: string;
  keywords?: readonly string[];
  group?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  /** A visual shortcut hint. It does not register a keyboard shortcut. */
  shortcut?: React.ReactNode;
  disabled?: boolean;
}

/** Native input attributes that do not replace the palette's search or focus ownership. */
export type CommandPaletteInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'children'
  | 'size'
  | 'type'
  | 'role'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'autoFocus'
  | 'disabled'
  | 'readOnly'
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-autocomplete'
  | 'aria-activedescendant'
  | 'aria-busy'
>;

export interface CommandPaletteProps<T extends CommandDataItem = CommandDataItem>
  extends Omit<
      ModalProps,
      'as' | 'dialogAs' | 'isDrawer' | 'children' | 'closeButton' | 'role' | 'filter'
    >,
    React.AriaAttributes {
  /** The visible, accessible dialog title. */
  title: React.ReactNode;
  /** Commands are treated as immutable. Callbacks receive the original record. */
  data: readonly T[];
  /** Controlled search text. */
  searchValue?: string;
  defaultSearchValue?: string;
  /** Use caller-owned results instead of built-in locale-aware filtering. */
  filter?: boolean;
  /** Blocks selection while the caller loads results. */
  loading?: boolean;
  /** Locale for search matching; defaults to CustomProvider's locale. */
  searchLocale?: string | readonly string[];
  collatorOptions?: Intl.CollatorOptions;
  /** Request closing after selection unless onSelect prevents the event. @default true */
  closeOnSelect?: boolean;
  /** Show the header's close button. @default true */
  closeButton?: boolean;
  locale?: CommandPaletteLocale;
  inputProps?: CommandPaletteInputProps;
  inputRef?: React.Ref<HTMLInputElement>;
  footer?: React.ReactNode;
  /** Render noninteractive content inside an option. */
  renderItem?: (item: T) => React.ReactNode;
  renderEmpty?: (query: string) => React.ReactNode;
  renderError?: (error: Error, retry: () => void) => React.ReactNode;
  onSearch?: (query: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (value: T['value'], item: T, event: React.SyntheticEvent) => void;
}

export interface CommandPaletteComponent {
  <T extends CommandDataItem = CommandDataItem>(
    props: CommandPaletteProps<T> & React.RefAttributes<HTMLDivElement>
  ): React.ReactElement | null;
  displayName?: string;
}
