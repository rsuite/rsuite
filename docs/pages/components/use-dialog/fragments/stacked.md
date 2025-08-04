<!--start-code-->

```jsx
import { Button, Modal, Input, Textarea, VStack, useDialog } from 'rsuite';

const CustomDialog = ({ onClose }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const dialog = useDialog();

  const handleClose = () => {
    setIsOpen(false);
    // Delay closing to allow animation to complete
    setTimeout(() => {
      onClose('Custom result');
    }, 300);
  };

  const handleOpen = () => {
    dialog.open(CustomDialog);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Stacked Dialog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={handleOpen}>Open Another Dialog</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const App = () => {
  const dialog = useDialog();

  const handleClick = () => {
    dialog.open(CustomDialog);
  };

  return <Button onClick={handleClick}>Open</Button>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
