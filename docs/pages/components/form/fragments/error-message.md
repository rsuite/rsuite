<!--start-code-->

```js
import { Form, InputGroup, Input, Toggle, SelectPicker, HStack } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';

const errorPlacementData = [
  { label: 'bottomStart', value: 'bottomStart' },
  { label: 'bottomEnd', value: 'bottomEnd' },
  { label: 'topStart', value: 'topStart' },
  { label: 'topEnd', value: 'topEnd' },
  { label: 'leftStart', value: 'leftStart' },
  { label: 'rightStart', value: 'rightStart' },
  { label: 'leftEnd', value: 'leftEnd' },
  { label: 'rightEnd', value: 'rightEnd' }
];

const App = () => {
  const [errorVisible, setErrorVisible] = React.useState(false);
  const [errorPlacement, setErrorPlacement] = React.useState('bottomStart');
  const errorMessage = errorVisible ? 'This field is required' : null;

  return (
    <>
      <Form>
        <Form.Group controlId={'input-2'}>
          <Form.ControlLabel>Input</Form.ControlLabel>
          <Form.Control
            name="input-2"
            placeholder="Form.Control"
            errorMessage={errorMessage}
            errorPlacement={errorPlacement}
          />
        </Form.Group>
        <Form.Group controlId={'input-1'}>
          <Form.ControlLabel>InputGroup</Form.ControlLabel>
          <Form.Control
            name="input-1"
            accepter={InputGroupField}
            errorMessage={errorMessage}
            errorPlacement={errorPlacement}
          />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Custom error messages</Form.ControlLabel>
          <Form.Control name="input-3" />
          <CustomErrorMessage show={errorVisible}>{errorMessage}</CustomErrorMessage>
        </Form.Group>
      </Form>
      <hr />

      <div className="rs-form-control-wrapper" style={{ width: 300 }}>
        <Input placeholder="Use Form.ErrorMessage" />
        <Form.ErrorMessage show={errorVisible} placement={errorPlacement}>
          {errorMessage}
        </Form.ErrorMessage>
      </div>

      <hr />
      <HStack spacing={20}>
        <SelectPicker
          label="Error Placement"
          value={errorPlacement}
          placeholder="errorPlacement"
          data={errorPlacementData}
          cleanable={false}
          onChange={setErrorPlacement}
        />
        <Toggle onChange={setErrorVisible} checked={errorVisible}>
          Show Error
        </Toggle>
      </HStack>
    </>
  );
};

const InputGroupField = React.forwardRef((props, ref) => (
  <InputGroup inside>
    <Input {...props} ref={ref} />
    <InputGroup.Addon>
      <AvatarIcon />
    </InputGroup.Addon>
  </InputGroup>
));

const CustomErrorMessage = ({ show, children }) => {
  const styles = {
    display: show ? 'block' : 'none',
    color: 'red',
    marginTop: 6
  };
  return <div style={styles}>{children}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
