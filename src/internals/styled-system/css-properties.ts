/**
 * List of commonly used CSS properties in React components
 * Focused on layout, spacing, typography, and common UI patterns
 */
export const supportedCSSProperties = [
  // Layout & Box Model
  'display',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'zIndex',
  'boxSizing',
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'overflow',
  'overflowX',
  'overflowY',
  'aspectRatio',

  // Spacing
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',

  // Flexbox
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'alignSelf',
  'alignContent',
  'gap',
  'rowGap',
  'columnGap',
  'order',

  // Grid
  'grid',
  'gridTemplate',
  'gridTemplateAreas',
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridArea',
  'gridColumn',
  'gridRow',
  'gridAutoFlow',
  'gridAutoColumns',
  'gridAutoRows',

  // Typography
  'color',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'lineHeight',
  'textAlign',
  'textDecoration',
  'textTransform',
  'whiteSpace',
  'wordBreak',
  'wordWrap',
  'textOverflow',
  'letterSpacing',

  // Background & Borders
  'background',
  'backgroundColor',
  'backgroundImage',
  'backgroundPosition',
  'backgroundSize',
  'backgroundRepeat',
  'border',
  'borderColor',
  'borderStyle',
  'borderWidth',
  'borderRadius',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'boxShadow',
  'opacity',

  // Transforms & Transitions
  'transform',
  'transformOrigin',
  'transition',
  'transitionProperty',
  'transitionDuration',
  'transitionTimingFunction',
  'transitionDelay',

  // Interactivity
  'cursor',
  'pointerEvents',
  'userSelect',
  'visibility',

  // Scroll
  'scrollBehavior',
  'scrollbarWidth',
  'scrollbarColor',
  'overscrollBehavior',

  // Other
  'clipPath',
  'filter',
  'objectFit',
  'objectPosition',
  'resize'
] as const;

export type SupportedCSSProperty = (typeof supportedCSSProperties)[number];
