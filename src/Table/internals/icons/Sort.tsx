import React, { Ref, forwardRef } from 'react';

export const Sort = forwardRef(function Sort(
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
      <path d="M7.616 3.18a.5.5 0 0 1 .696-.071l.072.071 2.5 3a.5.5 0 0 1-.704.704l-.064-.064L8 4.281 5.884 6.82a.5.5 0 0 1-.63.115l-.074-.051a.5.5 0 0 1-.115-.63l.051-.074zM7.616 12.82a.5.5 0 0 0 .696.071l.072-.071 2.5-3a.5.5 0 0 0-.704-.704l-.064.064L8 11.719 5.884 9.18a.5.5 0 0 0-.63-.115l-.074.051a.5.5 0 0 0-.115.63l.051.074z" />
    </svg>
  );
});
