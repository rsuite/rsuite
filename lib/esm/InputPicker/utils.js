'use client';
export var convertSize = function convertSize(size) {
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