<!--start-code-->

```js
import RemindFillIcon from '@rsuite/icons/RemindFill';
import { Modal, ButtonToolbar, Button, Text, HStack } from 'rsuite';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen}>Disable</Button>
      </ButtonToolbar>

      <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
        <Modal.Body>
          <HStack spacing={16}>
            <RemindFillIcon
              style={{
                color: '#ffb300',
                fontSize: 24,
                width: 24
              }}
            />
            <Text
              style={{
                flex: 1
              }}
            >
              After disabling the project, project reports will no longer be updated, and project
              members will only be able to access historical data. This action is irreversible. Are
              you sure you want to continue?
            </Text>
          </HStack>
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
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
