<!--start-code-->

```js
import { Form, Button, Schema, useFormControl } from 'rsuite';

const { StringType } = Schema.Types;

// Custom styles for the form field
const fieldStyles = {
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 500,
    color: '#575757'
  },
  inputWrapper: {
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #e5e5ea',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease-in-out',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#f44336'
  },
  errorMessage: {
    color: '#f44336',
    fontSize: '12px',
    marginTop: '4px'
  }
};

// Custom form field component using useFormControl
const CustomField = ({ name, label }) => {
  const { value, error, onChange, onBlur } = useFormControl({ name });

  return (
    <div style={fieldStyles.formGroup}>
      <label style={fieldStyles.label}>{label}</label>
      <div style={fieldStyles.inputWrapper}>
        <input
          style={{
            ...fieldStyles.input,
            ...(error ? fieldStyles.inputError : {})
          }}
          value={value || ''}
          onChange={e => onChange(e.target.value, e)}
          onBlur={onBlur}
        />
        {error && <div style={fieldStyles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
};

function App() {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: ''
  });

  const model = Schema.Model({
    name: StringType().isRequired('This field is required.'),
    email: StringType().isEmail('Please enter a valid email address.')
  });

  const handleSubmit = () => {
    if (formRef.current.check()) {
      alert(JSON.stringify(formValue, null, 2));
    }
  };

  return (
    <Form ref={formRef} model={model} formValue={formValue} onChange={setFormValue}>
      <CustomField name="name" label="Username" />
      <CustomField name="email" label="Email" />

      <Button appearance="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
