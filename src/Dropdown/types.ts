/**
 * @deprecated This interface is deprecated and will be removed in future versions.
 * Props for the DeprecatedDropdownMenu component.
 */
export interface DeprecatedDropdownMenuProps {
  /**
   * Determines the direction from which the submenu expands.
   * When set to `true`, the submenu expands from the left.
   * When `false` or not set, it expands from the right by default.
   * @deprecated Use `openDirection="start"` instead for RTL support.
   */
  pullLeft?: boolean;
}

/**
 * @deprecated This interface is deprecated and will be removed in future versions.
 * Props for the DeprecatedDropdownItem component.
 */
export interface DeprecatedDropdownItemProps {
  /**
   * Controls the appearance direction of the sub-level menu.
   * When `true`, the submenu appears from the left side.
   * When `false` or not set, it appears from the right side by default.
   * @deprecated Submenus now consistently point in the same direction as their parent menu.
   */
  pullLeft?: boolean;

  /**
   * Indicates whether the submenu is in an open state.
   * @deprecated This prop is no longer supported and will be removed in future versions.
   * @internal
   */
  open?: boolean;
}
