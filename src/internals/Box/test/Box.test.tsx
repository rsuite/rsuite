import React from 'react';
import Box from '../Box';

// Predefined properties
<Box p={2} pt={3} />;
<Box c="blue.500" />;

// Complete properties corresponding to predefined properties
// TODO: Add support for these properties
<Box padding={2} paddingTop={3} />;
<Box color="blue.500" />;

// Properties not predefined, but are CSS properties
// TODO: Add support for these properties
<Box flexBasis="25%" />;
<Box aspectRatio="1.2" />;
