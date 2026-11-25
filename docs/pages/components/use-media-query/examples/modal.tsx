'use client';

import React from 'react';
import { useMediaQuery, Modal, Button, ButtonToolbar, Placeholder, Center } from 'rsuite';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isMobile] = useMediaQuery('(max-width: 700px)');

  return (
    <Center h={200}>
      <ButtonToolbar>
        <Button onClick={handleOpen}> Open</Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose} size={isMobile ? 'full' : 'md'}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Center>
  );
};

export default App;
