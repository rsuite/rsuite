import React from 'react';
import ButtonToolbar from '../ButtonToolbar';

<ButtonToolbar spacing={20} alignItems="flex-end" />;

<ButtonToolbar as="div" />;

// @ts-expect-error should not have a spacing prop
<ButtonToolbar as="div" spacing={20} alignItems="flex-end" />;

// @ts-expect-error should not have a alignItems prop
<ButtonToolbar as="div" alignItems="flex-end" />;
