<!--start-code-->

```js
import { Form, Button, Schema, Panel, Message, toaster, FlexboxGrid } from 'rsuite';
import JSONTree from 'react-json-tree';
import MaskedInput from 'react-text-mask';

const JSONView = ({ formValue, formError }) => (
  <div style={{ marginBottom: 10 }}>
    <Panel className="json-tree-wrapper" header={<p>formValue</p>}>
      <JSONTree data={formValue} />
    </Panel>

    <Panel className="json-tree-wrapper" header={<p>formError</p>}>
      <JSONTree data={formError} />
    </Panel>
  </div>
);

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group ref={ref} className={error ? 'has-error' : ''}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

const InputMask = React.forwardRef(({ onChange, ...rest }, ref) => (
  <MaskedInput
    {...rest}
    ref={ref}
    className="rs-input"
    onChange={event => {
      onChange(event.target.value);
    }}
  />
));

const { StringType } = Schema.Types;
const model = Schema.Model({
  phone: StringType().isRequired('This field is required.')
});

const mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const App = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    phone: ''
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      toaster.push(
        <Message showIcon type="error">
          Error
        </Message>
      );
      return;
    }
    toaster.push(
      <Message showIcon type="success">
        Success
      </Message>
    );
  };

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formDefaultValue={formValue}
          model={model}
        >
          <Field
            name="phone"
            label="Phone Number"
            mask={mask}
            accepter={InputMask}
            error={formError.phone}
          />

          <Form.Group>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={12}>
        <JSONView formValue={formValue} formError={formError} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
