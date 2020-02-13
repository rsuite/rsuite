import * as React from 'react';

interface ReactLogoProps {
  pathFillColor?: string;
  pathStrokeColor?: string;
  pathStrokeWidth?: string;
  running?: boolean;
}

export default function ReactLogo(props: ReactLogoProps) {
  const {
    pathFillColor = 'none',
    pathStrokeColor = '#555',
    pathStrokeWidth = 4,
    running,
    ...rest
  } = props;
  const runningClassName = running ? 'running' : '';
  return (
    <div {...rest} className="react-logo logo-animated zoomIn">
      <svg viewBox="100 100 200 200">
        <path
          className="bg"
          fill={pathFillColor}
          stroke={pathStrokeColor}
          strokeWidth={pathStrokeWidth}
          d={
            'M231.7,200c0,17.4-1.7,88-31.7,88s-31.7-70.6-31.7-88s1.7-88,31.7-88S231.7,182.6,231.7,200z'
          }
        />
        <path
          className="bg"
          fill={pathFillColor}
          stroke={pathStrokeColor}
          strokeWidth={pathStrokeWidth}
          d={
            'M216.1,227.7c-15,8.9-76.6,43.4-91.9,17.6s44.6-63.2,59.6-72.1s76.6-43.4,91.9-17.6S231.1,218.8,216.1,227.7z'
          }
        />
        <path
          className="bg"
          fill={pathFillColor}
          stroke={pathStrokeColor}
          strokeWidth={pathStrokeWidth}
          d={
            'M183.9,227.7c15,8.9,76.6,43.4,91.9,17.6s-44.6-63.2-59.6-72.1s-76.6-43.4-91.9-17.6S168.9,218.8,183.9,227.7z'
          }
        />
        <circle
          className={`react-logo-run ${runningClassName}`}
          fill="#638cc8"
          cx="0"
          cy="0"
          r="4"
        />
        <circle
          className={`react-logo-run-2 ${runningClassName}`}
          fill="#638cc8"
          cx="0"
          cy="0"
          r="4"
        />
      </svg>
    </div>
  );
}
