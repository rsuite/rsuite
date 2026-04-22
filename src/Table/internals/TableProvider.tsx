import React, { useMemo } from 'react';
import { setCssPosition, isRTL } from './utils';

/**
 * Callback function type for translating DOM position.
 * @param style - The CSSStyleDeclaration object to modify.
 * @param x - The x-coordinate (optional).
 * @param y - The y-coordinate (optional).
 */
type TranslateDOMPositionXYCallback = (style: CSSStyleDeclaration, x?: number, y?: number) => void;

export interface TableContextProps {
  /** Indicates if the table is in RTL mode. */
  rtl: boolean;

  /** Indicates if there's a custom tree column. */
  hasCustomTreeCol?: boolean;

  /** Indicates if the table is in tree mode. */
  isTree?: boolean;

  /** Function to translate DOM position. */
  setCssPosition: TranslateDOMPositionXYCallback;

  /** Prefix for CSS classes. */
  classPrefix?: string;
}

export const TableContext = React.createContext<TableContextProps>({} as TableContextProps);

export const TableProvider = (props: React.PropsWithChildren<Partial<TableContextProps>>) => {
  const { children, rtl = isRTL(), hasCustomTreeCol = false, isTree, classPrefix } = props;
  const value = useMemo(
    () => ({
      setCssPosition,
      rtl: rtl ?? isRTL(),
      hasCustomTreeCol,
      isTree,
      classPrefix
    }),
    [rtl, hasCustomTreeCol, isTree, classPrefix]
  );

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

export default TableProvider;
