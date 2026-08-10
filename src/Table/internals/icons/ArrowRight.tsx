import React, { Ref, forwardRef } from 'react';

export const ArrowRight = forwardRef(function ArrowRight(
  props: React.SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      ref={ref}
      {...props}
    >
      <path d="m6 12 4-4-4-4z" />
    </svg>
  );
});
