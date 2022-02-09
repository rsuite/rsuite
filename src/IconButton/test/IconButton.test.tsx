import React from 'react';
import IconButton from '../IconButton';

const Link = ({ to }: { to: string }) => <a href={to} />;

const ref = React.createRef<HTMLButtonElement>();

// Infer `as` component props
<IconButton ref={ref} as={Link} to="/home" />;
