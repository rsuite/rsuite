<!--start-code-->

```js
import {
  Form,
  Button,
  ButtonToolbar,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  SegmentedControl,
  Slider,
  DatePicker,
  DateRangePicker,
  CheckPicker,
  SelectPicker,
  TagPicker,
  InputPicker,
  Cascader,
  MultiCascader,
  Rate,
  Panel,
  Toggle,
  HStack
} from 'rsuite';

import { mockTreeData } from './mock';

const tree = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });
const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
  label: item,
  value: item
}));

const defaultFormValue = {
  'field-input': '',
  'field-checkbox': [],
  'field-radio': '',
  'field-slider': 0,
  'field-check-picker': [],
  'field-select-picker': '',
  'field-tag-picker': [],
  'field-input-picker': '',
  'field-cascader-picker': '',
  'field-multi-picker': [],
  'field-date-picker': null,
  'field-date-range-picker': null,
  'field-rating': 0
};

const initFormValue = {
  'field-input': 'A suite of React components, sensible UI design, and a friendly development experience.',
  'field-checkbox': ['Node.js', 'CSS3', 'HTML5'],
  'field-radio': 'HTML5',
  'field-slider': 10,
  'field-check-picker': ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'],
  'field-select-picker': 'Eugenia',
  'field-tag-picker': ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'],
  'field-input-picker': 'Eugenia',
  'field-cascader-picker': '1-1-2',
  'field-multi-picker': ['1-1-2', '1-1-3'],
  'field-date-picker': new Date(),
  'field-date-range-picker': [new Date(), new Date()],
  'field-rating': 2
};

const FormField = ({ name, label, text, ...props }) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control name={name} {...props} />
    {text && <Form.Text>{text}</Form.Text>}
  </Form.Group>
);

const App = () => {
  const [formValue, setFormValue] = React.useState(initFormValue);
  const [status, setStatus] = React.useState('disabled');
  const disabled = status === 'disabled';
  const readOnly = status === 'readonly';
  const plaintext = status === 'plaintext';

  return (
    <Panel>
      <HStack spacing={20}>
        <SegmentedControl
          data={[
            { value: 'normal', label: 'normal' },
            { value: 'readonly', label: 'readonly' },
            { value: 'disabled', label: 'disabled' },
            { value: 'plaintext', label: 'plaintext' }
          ]}
          value={status}
          onChange={setStatus}
        />
        <ButtonToolbar>
          <Button onClick={() => setFormValue(defaultFormValue)}>Clear form data</Button>
          <Button onClick={() => setFormValue(initFormValue)}>Reset</Button>
        </ButtonToolbar>
      </HStack>
      <hr />
      <Form
        disabled={disabled}
        readOnly={readOnly}
        plaintext={plaintext}
        formValue={formValue}
        onChange={formValue => setFormValue(formValue)}
      >
        <Form.Stack fluid spacing={20}>
          <FormField name="field-input" label="Input" text="This is a input" />
          <FormField name="field-checkbox" label="Checkbox" accepter={CheckboxGroup} inline>
            <Checkbox value="Node.js">Node.js</Checkbox>
            <Checkbox value="Webpack">Webpack</Checkbox>
            <Checkbox value="CSS3">CSS3</Checkbox>
            <Checkbox value="Javascript">Javascript</Checkbox>
            <Checkbox value="HTML5">HTML5</Checkbox>
          </FormField>
          <FormField name="field-radio" label="Radio" accepter={RadioGroup} inline>
            <Radio value="Node.js">Node.js</Radio>
            <Radio value="Webpack">Webpack</Radio>
            <Radio value="CSS3">CSS3</Radio>
            <Radio value="Javascript">Javascript</Radio>
            <Radio value="HTML5">HTML5</Radio>
          </FormField>
          <FormField name="field-slider" label="Slider" accepter={Slider} label="Level" />
          <FormField
            name="field-check-picker"
            label="CheckPicker"
            accepter={CheckPicker}
            data={data}
            block
          />
          <FormField
            name="field-select-picker"
            label="SelectPicker"
            accepter={SelectPicker}
            data={data}
            block
          />
          <FormField name="field-tag-picker" label="TagPicker" accepter={TagPicker} data={data} block />
          <FormField
            name="field-input-picker"
            label="InputPicker"
            accepter={InputPicker}
            data={data}
            block
          />
          <FormField
            name="field-cascader-picker"
            label="Cascader"
            accepter={Cascader}
            data={tree}
            block
          />
          <FormField
            name="field-multi-picker"
            label="MultiCascader"
            accepter={MultiCascader}
            data={tree}
            block
          />
          <FormField name="field-date-picker" label="DatePicker" accepter={DatePicker} />
          <FormField name="field-date-range-picker" label="DateRangePicker" accepter={DateRangePicker} />
          <FormField name="field-rating" label="Rate" accepter={Rate} size="xs" />
        </Form.Stack>
      </Form>
    </Panel>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
