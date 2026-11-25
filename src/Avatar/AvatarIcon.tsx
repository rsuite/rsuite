import React from 'react';

const AvatarIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    role="img"
    aria-label="Avatar"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="60%"
    width="60%"
    {...props}
  >
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
  </svg>
);

export default AvatarIcon;
