<!--start-code-->

```js
import { Form, Button, Schema, Panel, Message, toaster, FlexboxGrid } from 'rsuite';
import JSONTree from 'react-json-tree';
import Select from 'react-select';

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

const { StringType } = Schema.Types;
const model = Schema.Model({
  foods: StringType().isRequired('This field is required.')
});

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const CustomSelect = React.forwardRef((props, ref) => {
  const { value, onChange, ...rest } = props;
  return (
    <Select
      isClearable
      width={200}
      ref={ref}
      {...rest}
      onChange={option => {
        onChange(option?.value || null);
      }}
    />
  );
});

const App = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    foods: ''
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
            name="foods"
            label="Food"
            accepter={CustomSelect}
            options={options}
            error={formError.foods}
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
