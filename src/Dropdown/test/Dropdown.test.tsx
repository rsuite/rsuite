import React from 'react';
import Dropdown from '../Dropdown';

const ref = React.createRef<HTMLDivElement>();

// Infer `toggleAs` props (defaults to Button)
<Dropdown ref={ref} appearance="subtle" size="sm" />;

/* eslint-disable @typescript-eslint/no-unused-vars */
const CustomToggle = (_props: { myProp: string }) => null;
<Dropdown ref={ref} toggleAs={CustomToggle} myProp="myValue" />;
