```js
import { HStack } from 'rsuite';
import { Icon } from '@rsuite/icons';

const SvgIcon = <svg>...</svg>;

return () => {
  return <Icon as={SvgIcon} />;
};
```

<!--start-code-->

```js
import { IconButton } from 'rsuite';
import { Icon } from '@rsuite/icons';

const App = () => (
  <HStack spacing={10}>
    <Icon as={HeartSvg} style={{ color: 'hotpink' }} />
    <Icon as={PeopleFoldSvg} style={{ fontSize: 30 }} />
    <Icon as={RSuiteLogoSvg} />
    <IconButton circle icon={<Icon as={HeartSvg} style={{ color: 'hotpink' }} />} />
    <IconButton circle icon={<Icon as={PeopleFoldSvg} />} />
    <IconButton circle icon={<Icon as={RSuiteLogoSvg} />} />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));

const HeartSvg = React.forwardRef((props, ref) => (
  <svg {...props} width="2em" height="2em" fill="currentColor" viewBox="0 0 1024 1024" ref={ref}>
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
));

const PeopleFoldSvg = React.forwardRef((props, ref) => (
  <svg {...props} width="1em" height="1em" viewBox="0 0 40 40" ref={ref}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#34C3FF"
        d="M10 36H4a4 4 0 01-4-4V6a4 4 0 014-4h11.394a3 3 0 012.497 1.336L21 9h14a4 4 0 014 4v23H10z"
        opacity={0.2}
      />
      <circle cx={27} cy={23} r={3} fill="#34C3FF" stroke="#34C3FF" strokeWidth={2} />
      <path
        fill="#80DDFF"
        d="M15 38a1 1 0 01-1-1v-3.5c0-1.607 1.02-3.214 2.696-4.001a3.5 3.5 0 113.608.001c1.676.786 2.696 2.393 2.696 4V37a1 1 0 01-1 1zm17 0a1 1 0 01-1-1v-3.5c0-1.607 1.02-3.214 2.696-4.001a3.5 3.5 0 113.608.001c1.676.786 2.696 2.393 2.696 4V37a1 1 0 01-1 1z"
      />
      <path
        fill="#34C3FF"
        stroke="#34C3FF"
        strokeWidth={2}
        d="M27 27l.257.007c1.279.064 2.43.61 3.279 1.457A4.984 4.984 0 0132 32h0v6H22v-6c0-1.38.56-2.63 1.464-3.536A4.984 4.984 0 0127 27h0z"
      />
    </g>
  </svg>
));

const RSuiteLogoSvg = React.forwardRef((props, ref) => (
  <svg
    {...props}
    viewBox="0 0 120 138"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    ref={ref}
  >
    <title>React Suite</title>
    <defs>
      <linearGradient
        x1="71.5906675%"
        y1="12.5658792%"
        x2="45.577567%"
        y2="114.749969%"
        id="linearGradient-1"
      >
        <stop stopColor="#6594ED" offset="0%"></stop>
        <stop stopColor="#316BD9" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="67.6269531%" y1="0%" x2="50%" y2="78.0639648%" id="linearGradient-2">
        <stop stopColor="#EC5060" offset="0%"></stop>
        <stop stopColor="#EA7480" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="67.6269531%" y1="0%" x2="50%" y2="79.2449951%" id="linearGradient-3">
        <stop stopColor="#EC5060" offset="0%"></stop>
        <stop stopColor="#EA7480" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Group-22" transform="translate(3.000000, 6.000000)">
        <polyline
          className="polyline-axis"
          stroke="url(#linearGradient-1)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="111 31 57 0 19 22 95 104 57 126 3 95"
        ></polyline>
        <polyline
          className="polyline-limb"
          id="Path-5-Copy-7"
          stroke="url(#linearGradient-2)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(22.000000, 63.000000) scale(-1, -1) translate(-22.000000, -63.000000) "
          points="41 31 3 54 41 95 41 52"
        ></polyline>
        <polyline
          className="polyline-limb"
          stroke="url(#linearGradient-3)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="111 31 73 54 111 95 111 52"
        ></polyline>
        <circle className="circle" fill="#6594ED" cx="3" cy="95" r="3"></circle>
        <circle fill="#6594ED" cx="111" cy="31" r="3"></circle>
      </g>
    </g>
  </svg>
));
```

<!--end-code-->
