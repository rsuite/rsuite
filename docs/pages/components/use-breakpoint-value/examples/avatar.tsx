'use client';

import React from 'react';
import { Box, useBreakpointValue, Avatar, AvatarProps } from 'rsuite';

const App = () => {
  const size = useBreakpointValue(
    {
      xs: { key: 'xs', value: '5rem' },
      sm: { key: 'sm', value: '6rem' },
      md: { key: 'md', value: '7rem' },
      lg: { key: 'lg', value: '8rem' },
      xl: { key: 'xl', value: '9rem' },
      xxl: { key: 'xxl', value: '10rem' }
    },
    { defaultValue: { key: 'md', value: '7rem' } }
  );

  return (
    <Box p={20}>
      <p>
        Resize your window to see avatar size change. Current size:
        <b>
          {size?.key}({size?.value} )
        </b>
      </p>
      <hr />

      <Avatar
        size={size?.value as AvatarProps['size']}
        circle
        src="https://i.pravatar.cc/150?u=1"
      />
    </Box>
  );
};

export default App;
