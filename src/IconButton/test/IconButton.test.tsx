import React from 'react';
import IconButton from '../IconButton';

const Link = ({ to }: { to: string }) => <a href={to} />;

const ref = React.createRef<HTMLButtonElement>();
const anchorRef = React.createRef<HTMLAnchorElement>();
const ForwardedLink = React.forwardRef<HTMLAnchorElement, { to: string }>(({ to }, ref) => (
  <a href={to} ref={ref} />
));

// Infer `as` component props
<IconButton as={Link} to="/home" />;
<IconButton ref={anchorRef} as={ForwardedLink} to="/home" />;
// @ts-expect-error A plain custom component does not declare ref support.
<IconButton ref={ref} as={Link} to="/home" />;
// @ts-expect-error The forwarded anchor cannot receive a button ref.
<IconButton ref={ref} as={ForwardedLink} to="/home" />;
