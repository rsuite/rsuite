<!--start-code-->

```js
const App = () => {
  const cascaderData = data;
  const [formValue, setFormValue] = useState({
    input:
      "React Suite is a set of react component libraries for enterprise system products. Built by HYPERS front-end team and UX team, mainly serving company's big data products. After three major revisions, a large number of components and rich functionality have been accumulated.",
    checkbox: ['Node.js', 'CSS3', 'HTML5'],
    radio: 'HTML5',
    slider: 10,
    datePicker: new Date(),
    dateRangePicker: [new Date(), new Date()],
    checkPicker: [
      'Eugenia',
      'Kariane',
      'Louisa',
      'Marty',
      'Kenya',
      'Hal',
      'Julius',
      'Travon',
      'Vincenza',
      'Dominic',
      'Pearlie',
      'Tyrel',
      'Jaylen',
      'Rogelio'
    ],
    selectPicker: 'Louisa',
    tagPicker: [
      'Eugenia',
      'Kariane',
      'Louisa',
      'Marty',
      'Kenya',
      'Hal',
      'Julius',
      'Travon',
      'Vincenza',
      'Dominic',
      'Pearlie',
      'Tyrel',
      'Jaylen',
      'Rogelio'
    ],
    inputPicker: 'Rogelio',
    cascader: '1-1-5',
    multiCascader: ['1-1-4', '1-1-5']
  });
  const [mode, setMode] = useState('readonly');
  const disabled = mode === 'disabled';
  const readOnly = mode === 'readonly';
  const plaintext = mode === 'plaintext';

  return (
    <Form formValue={formValue} onChange={formValue => setFormValue(formValue)}>
      <Form.ControlLabel>Change show mode</Form.ControlLabel>
      <RadioGroup inline value={mode} onChange={value => setMode(value)}>
        <Radio value="normal">normal</Radio>
        <Radio value="readonly">readonly</Radio>
        <Radio value="disabled">disabled</Radio>
        <Radio value="plaintext">plaintext</Radio>
      </RadioGroup>

      <Form.Group controlId="input">
        <Form.ControlLabel>Input</Form.ControlLabel>
        <Form.Control name="input" disabled={disabled} readOnly={readOnly} plaintext={plaintext} />
        <Form.HelpText tooltip>This is a tooltip description.</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="checkbox">
        <Form.ControlLabel>Checkbox</Form.ControlLabel>
        <Form.Control
          name="checkbox"
          accepter={CheckboxGroup}
          inline
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        >
          <Checkbox disabled={disabled} value="Node.js">
            Node.js
          </Checkbox>
          <Checkbox disabled={disabled} value="Webpack">
            Webpack
          </Checkbox>
          <Checkbox disabled={disabled} value="CSS3">
            CSS3
          </Checkbox>
          <Checkbox disabled={disabled} value="Javascript">
            Javascript
          </Checkbox>
          <Checkbox disabled={disabled} value="HTML5">
            HTML5
          </Checkbox>
        </Form.Control>
        <Form.HelpText>This default description.</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="radio">
        <Form.ControlLabel>Radio</Form.ControlLabel>
        <Form.Control
          name="radio"
          accepter={RadioGroup}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        >
          <Radio disabled={disabled} value="Node.js">
            Node.js
          </Radio>
          <Radio disabled={disabled} value="Webpack">
            Webpack
          </Radio>
          <Radio disabled={disabled} value="CSS3">
            CSS3
          </Radio>
          <Radio disabled={disabled} value="Javascript">
            Javascript
          </Radio>
          <Radio disabled={disabled} value="HTML5">
            HTML5
          </Radio>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="slider">
        <Form.ControlLabel>Slider</Form.ControlLabel>
        <Form.Control
          accepter={Slider}
          min={0}
          max={20}
          name="slider"
          label="Level"
          style={{ width: 200, margin: '10px 0' }}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </Form.Group>

      <Form.Group controlId="datePicker">
        <Form.ControlLabel>DatePicker</Form.ControlLabel>
        <Form.Control
          name="datePicker"
          accepter={DatePicker}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </Form.Group>

      <Form.Group controlId="dateRangePicker">
        <Form.ControlLabel>DateRangePicker</Form.ControlLabel>
        <Form.Control
          name="dateRangePicker"
          accepter={DateRangePicker}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </Form.Group>

      <Form.Group controlId="checkPicker">
        <Form.ControlLabel>CheckPicker</Form.ControlLabel>
        <Form.Control
          name="checkPicker"
          accepter={CheckPicker}
          data={pickerData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </Form.Group>

      <Form.Group controlId="selectPicker">
        <Form.ControlLabel>SelectPicker</Form.ControlLabel>
        <Form.Control
          name="selectPicker"
          accepter={SelectPicker}
          data={pickerData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </Form.Group>

      <Form.Group controlId="tagPicker">
        <Form.ControlLabel>TagPicker</Form.ControlLabel>
        <Form.Control
          name="tagPicker"
          accepter={TagPicker}
          data={pickerData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </Form.Group>

      <Form.Group controlId="inputPicker">
        <Form.ControlLabel>InputPicker</Form.ControlLabel>
        <Form.Control
          name="inputPicker"
          accepter={InputPicker}
          data={pickerData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </Form.Group>

      <Form.Group controlId="cascader">
        <Form.ControlLabel>Cascader</Form.ControlLabel>
        <Form.Control
          name="cascader"
          accepter={Cascader}
          data={cascaderData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </Form.Group>

      <Form.Group controlId="multiCascader">
        <Form.ControlLabel>MultiCascader</Form.ControlLabel>
        <Form.Control
          name="multiCascader"
          accepter={MultiCascader}
          data={cascaderData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </Form.Group>
    </Form>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
