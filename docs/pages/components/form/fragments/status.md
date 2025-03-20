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
  input: '',
  checkbox: [],
  radio: '',
  slider: 0,
  datePicker: null,
  dateRangePicker: null,
  checkPicker: [],
  selectPicker: '',
  tagPicker: [],
  inputPicker: '',
  cascader: '',
  multiCascader: [],
  rate: 0,
  enable: false
};

const initFormValue = {
  input: 'A suite of React components, sensible UI design, and a friendly development experience.',
  checkbox: ['Node.js', 'CSS3', 'HTML5'],
  radio: 'HTML5',
  slider: 10,
  datePicker: new Date(),
  dateRangePicker: [new Date(), new Date()],
  checkPicker: ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'],
  selectPicker: 'Eugenia',
  tagPicker: ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'],
  inputPicker: 'Eugenia',
  cascader: '1-1-2',
  multiCascader: ['1-1-2', '1-1-3'],
  rate: 2
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
        <RadioGroup appearance="picker" inline value={status} onChange={setStatus}>
          <label>Change status</label>
          <Radio value="normal">normal</Radio>
          <Radio value="readonly">readonly</Radio>
          <Radio value="disabled">disabled</Radio>
          <Radio value="plaintext">plaintext</Radio>
        </RadioGroup>

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
          <FormField name="input" label="Input" text="This is a input" />
          <FormField name="checkbox" label="Checkbox" accepter={CheckboxGroup} inline>
            <Checkbox value="Node.js">Node.js</Checkbox>
            <Checkbox value="Webpack">Webpack</Checkbox>
            <Checkbox value="CSS3">CSS3</Checkbox>
            <Checkbox value="Javascript">Javascript</Checkbox>
            <Checkbox value="HTML5">HTML5</Checkbox>
          </FormField>
          <FormField name="radio" label="Radio" accepter={RadioGroup} inline>
            <Radio value="Node.js">Node.js</Radio>
            <Radio value="Webpack">Webpack</Radio>
            <Radio value="CSS3">CSS3</Radio>
            <Radio value="Javascript">Javascript</Radio>
            <Radio value="HTML5">HTML5</Radio>
          </FormField>
          <FormField name="slider" label="Slider" accepter={Slider} label="Level" />
          <FormField name="check" label="CheckPicker" accepter={CheckPicker} data={data} block />
          <FormField name="select" label="SelectPicker" accepter={SelectPicker} data={data} block />
          <FormField name="tag" label="TagPicker" accepter={TagPicker} data={data} block />
          <FormField name="input" label="InputPicker" accepter={InputPicker} data={data} block />
          <FormField name="cascader" label="Cascader" accepter={Cascader} data={tree} block />
          <FormField
            name="multi"
            label="MultiCascader"
            accepter={MultiCascader}
            data={tree}
            block
          />
          <FormField name="date" label="DatePicker" accepter={DatePicker} />
          <FormField name="date-range" label="DateRangePicker" accepter={DateRangePicker} />
          <FormField name="rate" label="Rate" accepter={Rate} />
        </Form.Stack>
      </Form>
    </Panel>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
