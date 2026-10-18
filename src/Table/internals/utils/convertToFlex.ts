export const verticalAlignMap = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end'
};

export const alignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
};

// Convert verticalAlign to alignItems.
export function verticalAlignToAlignItems(verticalAlign) {
  return verticalAlignMap[verticalAlign] || verticalAlign;
}

// Convert align to justifyContent.
export function alignToJustifyContent(align) {
  return alignMap[align] || align;
}

// Convert verticalAlign and align to flex styles.
export default function convertToFlex(props: {
  verticalAlign?: string;
  align?: string;
}): React.CSSProperties {
  const { verticalAlign, align } = props;

  if (!verticalAlign && !align) return {};

  return {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: verticalAlignToAlignItems(verticalAlign),
    justifyContent: alignToJustifyContent(align)
  };
}
