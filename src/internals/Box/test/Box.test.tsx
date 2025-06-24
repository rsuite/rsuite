import React from 'react';
import Box from '../Box';

// Predefined properties
<Box p={2} pt={3} />;
<Box c="blue.500" />;

// Complete properties corresponding to predefined properties
// TODO: Add support for these properties
<Box {...({ padding: 2, paddingTop: 3 } as any)} />;
<Box {...({ color: 'blue.500' } as any)} />;

// Properties not predefined, but are CSS properties
// TODO: Add support for these properties
<Box {...({ flexBasis: '25%' } as any)} />;
<Box {...({ aspectRatio: '1.2' } as any)} />;
