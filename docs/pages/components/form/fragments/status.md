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
  Uploader,
  Panel,
  Toggle
} from 'rsuite';

import { mockTreeData } from './mock';

const treeData = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });
const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
  label: item,
  value: item
}));

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

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
      <Form
        disabled={disabled}
        readOnly={readOnly}
        plaintext={plaintext}
        formValue={formValue}
        onChange={formValue => setFormValue(formValue)}
      >
        <RadioGroup appearance="picker" inline value={status} onChange={setStatus}>
          <RadioLabel>Change status: </RadioLabel>
          <Radio value="normal">normal</Radio>
          <Radio value="readonly">readonly</Radio>
          <Radio value="disabled">disabled</Radio>
          <Radio value="plaintext">plaintext</Radio>
        </RadioGroup>
        <hr />
        <ButtonToolbar>
          <Button onClick={() => setFormValue(defaultFormValue)}>Clear form data</Button>
          <Button onClick={() => setFormValue(initFormValue)}>Reset</Button>
        </ButtonToolbar>
        <hr />
        <Form.Group controlId="input">
          <Form.ControlLabel>Input:</Form.ControlLabel>
          <Form.Control name="input" />
          <Form.HelpText tooltip>This is a tooltip description.</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="checkbox">
          <Form.ControlLabel>Checkbox:</Form.ControlLabel>
          <Form.Control name="checkbox" accepter={CheckboxGroup} inline>
            <Checkbox value="Node.js">Node.js</Checkbox>
            <Checkbox value="Webpack">Webpack</Checkbox>
            <Checkbox value="CSS3">CSS3</Checkbox>
            <Checkbox value="Javascript">Javascript</Checkbox>
            <Checkbox value="HTML5">HTML5</Checkbox>
          </Form.Control>
          <Form.HelpText>This default description.</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="radio">
          <Form.ControlLabel>Radio:</Form.ControlLabel>
          <Form.Control name="radio" accepter={RadioGroup}>
            <Radio value="Node.js">Node.js</Radio>
            <Radio value="Webpack">Webpack</Radio>
            <Radio value="CSS3">CSS3</Radio>
            <Radio value="Javascript">Javascript</Radio>
            <Radio value="HTML5">HTML5</Radio>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="slider">
          <Form.ControlLabel>Slider:</Form.ControlLabel>
          <Form.Control
            accepter={Slider}
            name="slider"
            label="Level"
            style={{ width: 200, margin: '10px 0' }}
          />
        </Form.Group>

        <Form.Group controlId="checkPicker">
          <Form.ControlLabel>CheckPicker:</Form.ControlLabel>
          <Form.Control name="checkPicker" accepter={CheckPicker} data={selectData} />
        </Form.Group>

        <Form.Group controlId="selectPicker">
          <Form.ControlLabel>SelectPicker:</Form.ControlLabel>
          <Form.Control name="selectPicker" accepter={SelectPicker} data={selectData} />
        </Form.Group>

        <Form.Group controlId="tagPicker">
          <Form.ControlLabel>TagPicker:</Form.ControlLabel>
          <Form.Control name="tagPicker" accepter={TagPicker} data={selectData} />
        </Form.Group>

        <Form.Group controlId="datePicker">
          <Form.ControlLabel>DatePicker:</Form.ControlLabel>
          <Form.Control name="datePicker" accepter={DatePicker} />
        </Form.Group>

        <Form.Group controlId="dateRangePicker">
          <Form.ControlLabel>DateRangePicker:</Form.ControlLabel>
          <Form.Control name="dateRangePicker" accepter={DateRangePicker} />
        </Form.Group>

        <Form.Group controlId="inputPicker">
          <Form.ControlLabel>InputPicker:</Form.ControlLabel>
          <Form.Control name="inputPicker" accepter={InputPicker} data={selectData} />
        </Form.Group>

        <Form.Group controlId="cascader">
          <Form.ControlLabel>Cascader:</Form.ControlLabel>
          <Form.Control name="cascader" accepter={Cascader} data={treeData} />
        </Form.Group>

        <Form.Group controlId="multiCascader">
          <Form.ControlLabel>MultiCascader:</Form.ControlLabel>
          <Form.Control name="multiCascader" accepter={MultiCascader} data={treeData} />
        </Form.Group>

        <Form.Group controlId="rate">
          <Form.ControlLabel>Rate:</Form.ControlLabel>
          <Form.Control name="rate" accepter={Rate} />
        </Form.Group>

        <Form.Group controlId="uploader">
          <Form.ControlLabel>Uploader:</Form.ControlLabel>
          <Form.Control name="uploader" accepter={Uploader} action="#" />
        </Form.Group>

        <Form.Group controlId="toggle">
          <Form.ControlLabel>Toggle:</Form.ControlLabel>
          <Form.Control
            name="enable"
            accepter={Toggle}
            unCheckedChildren="Disabled"
            checkedChildren="Enabled"
          />
        </Form.Group>
      </Form>
    </Panel>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
