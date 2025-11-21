'use client';
// This example demonstrates responsive modal sizes and centered positioning

import React from 'react';
import { Modal, ButtonToolbar, Button, Placeholder, Divider } from 'rsuite';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const [centered, setCentered] = React.useState(false);

  const handleOpen = (value, centered = false) => {
    setSize(value);
    setCentered(centered);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        padding: 20
      }}
    >
      <ButtonToolbar>
        <Button onClick={() => handleOpen('xs')}>Xsmall</Button>
        <Button onClick={() => handleOpen('sm')}>Small</Button>
        <Button onClick={() => handleOpen('md')}>Medium</Button>
        <Button onClick={() => handleOpen('lg')}>Large</Button>
        <Button onClick={() => handleOpen('full')}>Full page</Button>
      </ButtonToolbar>

      <Divider>
        <Button onClick={() => handleOpen('xs', true)}>Centered</Button>
      </Divider>

      <Modal size={size} open={open} centered={centered} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph rows={size === 'full' ? 100 : 3} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
