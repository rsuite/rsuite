### Disabled and read only

<!--start-code-->

```js
const Example = () => {
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
      <FormControlLabel>Change show mode</FormControlLabel>
      <RadioGroup inline value={mode} onChange={value => setMode(value)}>
        <Radio value="normal">normal</Radio>
        <Radio value="readonly">readonly</Radio>
        <Radio value="disabled">disabled</Radio>
        <Radio value="plaintext">plaintext</Radio>
      </RadioGroup>

      <FormGroup>
        <FormControlLabel>Input</FormControlLabel>
        <FormControl name="input" disabled={disabled} readOnly={readOnly} plaintext={plaintext} />
        <HelpBlock tooltip>This is a tooltip description.</HelpBlock>
      </FormGroup>

      <FormGroup>
        <FormControlLabel>Checkbox</FormControlLabel>
        <FormControl
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
        </FormControl>
        <HelpBlock>This default description.</HelpBlock>
      </FormGroup>

      <FormGroup>
        <FormControlLabel>Radio</FormControlLabel>
        <FormControl
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
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControlLabel>Slider</FormControlLabel>
        <FormControl
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
      </FormGroup>

      <FormGroup>
        <FormControlLabel>DatePicker</FormControlLabel>
        <FormControl
          name="datePicker"
          accepter={DatePicker}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel>DateRangePicker</FormControlLabel>
        <FormControl
          name="dateRangePicker"
          accepter={DateRangePicker}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel>CheckPicker</FormControlLabel>
        <FormControl
          name="checkPicker"
          accepter={CheckPicker}
          data={pickerData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel>SelectPicker</FormControlLabel>
        <FormControl
          name="selectPicker"
          accepter={SelectPicker}
          data={pickerData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel>TagPicker</FormControlLabel>
        <FormControl
          name="tagPicker"
          accepter={TagPicker}
          data={pickerData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel>InputPicker</FormControlLabel>
        <FormControl
          name="inputPicker"
          accepter={InputPicker}
          data={pickerData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel>Cascader</FormControlLabel>
        <FormControl
          name="cascader"
          accepter={Cascader}
          data={cascaderData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel>MultiCascader</FormControlLabel>
        <FormControl
          name="multiCascader"
          accepter={MultiCascader}
          data={cascaderData}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
        />
      </FormGroup>
    </Form>
  );
};

ReactDOM.render(<Example />);
```

<!--end-code-->
