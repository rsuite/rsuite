<!--start-code-->

```js
import {
  Form,
  InputGroup,
  Input,
  Toggle,
  SelectPicker,
  HStack,
  VStack,
  Box,
  Divider
} from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';

const errorPlacementData = [
  { label: 'Static', value: 'static' },
  { label: 'Bottom Start', value: 'bottomStart' },
  { label: 'Bottom End', value: 'bottomEnd' },
  { label: 'Top Start', value: 'topStart' },
  { label: 'Top End', value: 'topEnd' },
  { label: 'Left Start', value: 'leftStart' },
  { label: 'Right Start', value: 'rightStart' },
  { label: 'Left End', value: 'leftEnd' },
  { label: 'Right End', value: 'rightEnd' }
];

const App = () => {
  const [errorVisible, setErrorVisible] = React.useState(true);
  const [errorPlacement, setErrorPlacement] = React.useState('static');
  const errorMessage = errorVisible ? 'This field is required' : null;

  return (
    <HStack divider={<Divider vertical />} h={368} spacing={40} align="flex-start">
      <Box>
        <Form layout="vertical">
          <Form.Group controlId={'input-2'}>
            <Form.Label>Input</Form.Label>
            <Form.Control
              name="input-2"
              placeholder="Form.Control"
              errorMessage={errorMessage}
              errorPlacement={errorPlacement}
            />
          </Form.Group>
          <Form.Group controlId={'input-1'}>
            <Form.Label>InputGroup</Form.Label>
            <Form.Control
              name="input-1"
              accepter={InputGroupField}
              errorMessage={errorMessage}
              errorPlacement={errorPlacement}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Custom error messages</Form.Label>
            <Form.Control name="input-3" />
            <CustomErrorMessage show={errorVisible}>{errorMessage}</CustomErrorMessage>
          </Form.Group>

          <Box
            w={300}
            style={{
              position: 'relative'
            }}
          >
            <Input placeholder="Use Form.ErrorMessage" />
            <Form.ErrorMessage show={errorVisible} placement={errorPlacement}>
              {errorMessage}
            </Form.ErrorMessage>
          </Box>
        </Form>
      </Box>

      <VStack spacing={20} h="100%" justify="center">
        <Toggle onChange={setErrorVisible} checked={errorVisible} label="Show Error" />
        <SelectPicker
          label="Error Placement"
          value={errorPlacement}
          placeholder="errorPlacement"
          data={errorPlacementData}
          cleanable={false}
          onChange={setErrorPlacement}
        />
      </VStack>
    </HStack>
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
  return (
    <div
      style={{
        display: show ? 'block' : 'none',
        color: 'var(--rs-color-red)',
        marginTop: 'var(--rs-spacing)'
      }}
    >
      {children}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
