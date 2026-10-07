<!--start-code-->

```js
import { Form, Button } from 'rsuite';
import { SchemaModel, StringType } from 'rsuite/Schema';

const fields = [
  { name: 'contact', label: 'Contact name' },
  { name: 'email', label: 'Contact email' },
  ...Array.from({ length: 6 }, (_, index) => ({
    name: `reference-${index + 1}`,
    label: `Supplier reference ${index + 1}`
  })),
  { name: 'taxId', label: 'Tax ID' },
  ...Array.from({ length: 6 }, (_, index) => ({
    name: `payment-note-${index + 1}`,
    label: `Payment note ${index + 1}`
  })),
  { name: 'account', label: 'Payment account' }
];

const model = SchemaModel({
  email: StringType().isEmail('Enter a valid email address.').isRequired('Enter a contact email.'),
  taxId: StringType().isRequired('Enter the supplier tax ID.'),
  account: StringType().isRequired('Enter the payment account.')
});

const App = () => {
  const formId = React.useId();
  const summaryRef = React.useRef(null);
  const [formValue, setFormValue] = React.useState(() =>
    Object.fromEntries(fields.map(field => [field.name, '']))
  );
  const [formError, setFormError] = React.useState({});
  const [failedAttempt, setFailedAttempt] = React.useState(0);
  const [saved, setSaved] = React.useState(false);
  const items = fields.flatMap(field =>
    typeof formError[field.name] === 'string' && formError[field.name]
      ? [{ ...field, controlId: `${formId}-${field.name}`, message: formError[field.name] }]
      : []
  );

  // onError runs before the new error summary is committed to the DOM.
  // Focus it after that commit, only for an explicit failed submission.
  React.useEffect(() => {
    if (failedAttempt) summaryRef.current?.focus();
  }, [failedAttempt]);

  return (
    <Form
      fluid
      style={{ maxWidth: 680 }}
      model={model}
      checkTrigger="none"
      formValue={formValue}
      onChange={setFormValue}
      onCheck={setFormError}
      onError={() => {
        setSaved(false);
        setFailedAttempt(previous => previous + 1);
      }}
      onSubmit={() => setSaved(true)}
    >
      <Form.ErrorSummary ref={summaryRef} header="Check the supplier information" items={items} />
      {fields.map(field => (
        <Form.Group key={field.name} controlId={`${formId}-${field.name}`}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control name={field.name} errorPlacement="static" />
        </Form.Group>
      ))}
      <Button type="submit" appearance="primary">
        Save supplier
      </Button>
      {saved && <p role="status">Supplier information saved.</p>}
    </Form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
