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

const treeData = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });
const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
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
  input:
    "React Suite is a set of react component libraries for enterprise system products. Built by HYPERS front-end team and UX team, mainly serving company's big data products. After three major revisions, a large number of components and rich functionality have been accumulated.",
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
          <Form.Group controlId="input">
            <Form.Label>Input</Form.Label>
            <HStack>
              <Form.Control name="input" />
              <Form.Text tooltip>This is a tooltip description.</Form.Text>
            </HStack>
          </Form.Group>

          <Form.Group controlId="checkbox">
            <Form.Label>Checkbox</Form.Label>
            <Form.Control name="checkbox" accepter={CheckboxGroup} inline>
              <Checkbox value="Node.js">Node.js</Checkbox>
              <Checkbox value="Webpack">Webpack</Checkbox>
              <Checkbox value="CSS3">CSS3</Checkbox>
              <Checkbox value="Javascript">Javascript</Checkbox>
              <Checkbox value="HTML5">HTML5</Checkbox>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="radio">
            <Form.Label>Radio</Form.Label>
            <Form.Control name="radio" accepter={RadioGroup} inline>
              <Radio value="Node.js">Node.js</Radio>
              <Radio value="Webpack">Webpack</Radio>
              <Radio value="CSS3">CSS3</Radio>
              <Radio value="Javascript">Javascript</Radio>
              <Radio value="HTML5">HTML5</Radio>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="slider">
            <Form.Label>Slider</Form.Label>
            <Form.Control accepter={Slider} name="slider" label="Level" />
          </Form.Group>

          <Form.Group controlId="checkPicker">
            <Form.Label>CheckPicker</Form.Label>
            <Form.Control name="checkPicker" accepter={CheckPicker} data={selectData} block />
          </Form.Group>

          <Form.Group controlId="selectPicker">
            <Form.Label>SelectPicker</Form.Label>
            <Form.Control name="selectPicker" accepter={SelectPicker} data={selectData} block />
          </Form.Group>

          <Form.Group controlId="tagPicker">
            <Form.Label>TagPicker</Form.Label>
            <Form.Control name="tagPicker" accepter={TagPicker} data={selectData} block />
          </Form.Group>

          <Form.Group controlId="inputPicker">
            <Form.Label>InputPicker</Form.Label>
            <Form.Control name="inputPicker" accepter={InputPicker} data={selectData} block />
          </Form.Group>

          <Form.Group controlId="cascader">
            <Form.Label>Cascader</Form.Label>
            <Form.Control name="cascader" accepter={Cascader} data={treeData} block />
          </Form.Group>

          <Form.Group controlId="multiCascader">
            <Form.Label>MultiCascader</Form.Label>
            <Form.Control name="multiCascader" accepter={MultiCascader} data={treeData} block />
          </Form.Group>

          <Form.Group controlId="datePicker">
            <Form.Label>DatePicker</Form.Label>
            <Form.Control name="datePicker" accepter={DatePicker} />
          </Form.Group>

          <Form.Group controlId="dateRangePicker">
            <Form.Label>DateRangePicker</Form.Label>
            <Form.Control name="dateRangePicker" accepter={DateRangePicker} />
          </Form.Group>

          <Form.Group controlId="rate">
            <Form.Label>Rate</Form.Label>
            <Form.Control name="rate" accepter={Rate} />
          </Form.Group>
        </Form.Stack>
      </Form>
    </Panel>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
