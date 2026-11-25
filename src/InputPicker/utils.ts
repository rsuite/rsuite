export const convertSize = (size?: string) => {
  switch (size) {
    case 'lg':
      return 'lg';
    case 'sm':
    case 'xs':
      return 'sm';
    default:
      return 'md';
  }
};
