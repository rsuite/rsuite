<!--start-code-->

```jsx
import { Button, Modal, Input, Textarea, VStack, useDialog } from 'rsuite';

const CustomDialog = ({ payload, onClose }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [email, setEmail] = React.useState(payload);
  const [message, setMessage] = React.useState('');

  const handleClose = () => {
    setIsOpen(false);
    // Delay closing to allow animation to complete
    setTimeout(() => {
      onClose({ email, message });
    }, 300);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VStack>
          <Input type="email" placeholder="Enter your email" value={email} onChange={setEmail} />
          <Textarea placeholder="Enter your message" value={message} onChange={setMessage} />
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="primary">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const App = () => {
  const dialog = useDialog();

  const handleClick = async () => {
    const result = await dialog.open(CustomDialog, 'user@example.com');
    console.log(result);
  };

  return <Button onClick={handleClick}>Open</Button>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
