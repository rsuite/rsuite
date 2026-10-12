import React, { Ref, forwardRef } from 'react';

export const SortDown = forwardRef(function SortDown(
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
      <path d="M8.5 14a.5.5 0 0 0 .394-.192l3.996-4.996a.5.5 0 1 0-.781-.625l-3.11 3.887V2.499a.5.5 0 0 0-1 0v9.575l-3.11-3.887a.5.5 0 1 0-.781.625l3.998 4.997.013.015a.5.5 0 0 0 .38.175z" />
    </svg>
  );
});
