'use client';

import React from 'react';
import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, Placeholder, Box } from 'rsuite';

const App = () => {
  const [size, setSize] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<any>('right');

  const handleOpen = value => {
    setSize(value);
    setOpen(true);
  };
  return (
    <Box p={20}>
      <RadioGroup
        inline
        appearance="picker"
        value={placement}
        onChange={(value: string) => {
          setPlacement(value);
        }}
      >
        <label>Placement: </label>
        <Radio value="left">left</Radio>
        <Radio value="right">right</Radio>
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
      </RadioGroup>
      <hr />

      <ButtonToolbar>
        <Button size="xs" onClick={() => handleOpen('xs')}>
          Xsmall
        </Button>
        <Button size="sm" onClick={() => handleOpen('sm')}>
          Small
        </Button>
        <Button size="md" onClick={() => handleOpen('md')}>
          Medium
        </Button>
        <Button size="lg" onClick={() => handleOpen('lg')}>
          Large
        </Button>
        <Button size="lg" onClick={() => handleOpen('full')}>
          Full page
        </Button>
      </ButtonToolbar>

      <Drawer size={size} placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={8} />
        </Drawer.Body>
      </Drawer>
    </Box>
  );
};

export default App;
