export const tuple = <T extends string[]>(...args: T) => args;

export type Partial<T> = { [P in keyof T]?: T[P] };

export type Pick<T, K extends keyof T> = { [P in K]: T[P] };

export type Exclude<T, U> = T extends U ? never : T;

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
  React.ComponentPropsWithRef<Inner>,
  P
> &
  P;
