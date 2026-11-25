import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  CheckboxGroup,
  Input,
  Panel,
  Radio,
  RadioGroup,
  Slider,
  Toggle,
} from 'rsuite';

const themeColors = {
  default: 'Default',
  green: 'Green',
  red: 'Red',
  yellow: 'Yellow',
  purple: 'Purple',
};

export default function App() {
  const [themeColor, setThemeColor] = useState('default');

  useEffect(() => {
    const { dataset } = document.documentElement;
    dataset.accent = themeColor;
    return () => {
      delete dataset.accent;
    };
  }, [themeColor]);

  return (
    <main className="theme-example">
      <fieldset className="theme-example-picker">
        <legend>Theme color</legend>
        <div>
          {Object.entries(themeColors).map(([key, label]) => (
            <label key={key}>
              <input
                type="radio"
                name="theme-color"
                value={key}
                checked={themeColor === key}
                onChange={() => setThemeColor(key)}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <hr />
      <Panel header={<h1>Preview</h1>} bordered>
        <ButtonToolbar>
          <Button appearance="default">Default</Button>
          <Button appearance="primary">Primary</Button>
          <Button appearance="link">Link</Button>
          <Button appearance="ghost">Ghost</Button>
        </ButtonToolbar>
        <hr />
        <CheckboxGroup name="languages" defaultValue={['javascript', 'css']} inline>
          <Checkbox value="javascript">JavaScript</Checkbox>
          <Checkbox value="css">CSS</Checkbox>
          <Checkbox value="html">HTML</Checkbox>
        </CheckboxGroup>
        <hr />
        <RadioGroup name="development" defaultValue="frontend" inline>
          <Radio value="frontend">Front End</Radio>
          <Radio value="backend">Back End</Radio>
        </RadioGroup>
        <hr />
        <Input aria-label="Example text" />
        <hr />
        <Toggle label="Example toggle" defaultChecked />
        <hr />
        <Slider aria-label="Example slider" progress defaultValue={50} />
      </Panel>
    </main>
  );
}
