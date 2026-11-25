import React from 'react';

export default function Logo({ width, height, className = '' }) {
  const style = { width, height, display: 'inline-block' };
  return (
    <div
      style={style}
      className={`rsuite-logo logo-animated logo-animated-delay-half-seconds bounce-in ${className} `}
    >
      <svg
        viewBox="0 0 120 138"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMin slice"
      >
        <title>React Suite Logo</title>
        <defs>
          <linearGradient
            x1="71.5906675%"
            y1="12.5658792%"
            x2="45.577567%"
            y2="114.749969%"
            id="linearGradient-1"
          >
            <stop stopColor="#6594ED" offset="0%" />
            <stop stopColor="#316BD9" offset="100%" />
          </linearGradient>
          <linearGradient x1="67.6269531%" y1="0%" x2="50%" y2="78.0639648%" id="linearGradient-2">
            <stop stopColor="#EC5060" offset="0%" />
            <stop stopColor="#EA7480" offset="100%" />
          </linearGradient>
          <linearGradient x1="67.6269531%" y1="0%" x2="50%" y2="79.2449951%" id="linearGradient-3">
            <stop stopColor="#EC5060" offset="0%" />
            <stop stopColor="#EA7480" offset="100%" />
          </linearGradient>
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(3.000000, 6.000000)">
            <polyline
              className="polyline-axis"
              stroke="url(#linearGradient-1)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="111 31 57 0 19 22 95 104 57 126 3 95"
            />
            <polyline
              className="polyline-limb"
              stroke="url(#linearGradient-2)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(22.000000, 63.000000) scale(-1, -1) translate(-22.000000, -63.000000) "
              points="41 31 3 54 41 95 41 52"
            />
            <polyline
              className="polyline-limb"
              stroke="url(#linearGradient-3)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="111 31 73 54 111 95 111 52"
            />
            <circle className="circle" fill="#6594ED" cx="3" cy="95" r="3" />
            <circle fill="#6594ED" cx="111" cy="31" r="3" />
          </g>
        </g>
      </svg>
    </div>
  );
}
