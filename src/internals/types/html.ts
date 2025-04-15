import React from 'react';

/** React element with optional props and HTML attributes. */
export type ReactElement<P = any> = React.ReactElement<P & React.HTMLAttributes<any>>;

/** Removes 'onSelect' property from the given type. */
export type PropsWithoutSelect<T> = Omit<T, 'onSelect'>;

/** Removes 'onChange' property from the given type. */
export type PropsWithoutChange<T> = Omit<T, 'onChange'>;

export type PropsWithout<T, K extends keyof T> = Omit<T, K>;

/** HTML props excluding 'onSelect' attribute. */
export type HTMLPropsWithoutSelect<
  T extends HTMLElement = HTMLElement,
  P extends Record<string, any> = React.HTMLAttributes<T>
> = PropsWithoutSelect<P>;

/** HTML props excluding 'onChange' attribute. */
export type HTMLPropsWithoutChange<
  T extends HTMLElement = HTMLElement,
  P extends Record<string, any> = React.HTMLAttributes<T>
> = PropsWithoutChange<P>;

/** Input props with 'onChange' and 'size' attributes removed. */
export type SanitizedInputProps = PropsWithout<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'size'
>;

/** Textarea props with 'onChange' attribute removed. */
export type SanitizedTextareaProps = PropsWithout<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
>;

/** HTML props excluding 'title', 'onToggle', and 'onSelect' attributes. */
export type SanitizedHTMListProps<
  T extends HTMLElement = HTMLElement,
  P extends Record<string, any> = React.HTMLAttributes<T>
> = PropsWithout<P, 'title' | 'onToggle' | 'onSelect'>;

export type WithoutChildren<T> = Omit<T, 'children'>;

export type CSSVariables = Partial<Record<`--${string}`, string | number | undefined>>;
export type StyleProperties = React.CSSProperties | CSSVariables;
