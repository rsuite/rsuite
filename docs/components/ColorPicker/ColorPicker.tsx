import React, { useState } from 'react';
import { Input, InputGroup } from 'rsuite';
import loadable from '@loadable/component';

const Sketch = loadable(() => import('react-color/lib/components/sketch/Sketch'));

interface ColorPickerProps {
  color: string;
  presetColors?: string[];
  onChangeComplete: (color: any) => void;
}

const defaultColors = [
  '#34C3FF',
  '#3498FF',
  '#2575FC',
  '#0052CC',
  '#1361AA',
  '#3F51B5',
  '#2487C2',
  '#F5A623',
  '#F44336',
  '#e54304',
  '#e91e63',
  '#9c27b0',
  '#429321',
  '#4A148C',
  '#673AB7',
  '#880061',
  '#607d8b',
  '#59afff',
  '#fa8900',
  '#ffb300',
  '#4caf50',
  '#00bcd4',
  '#673ab7',
  '#111111'
];

function ColorPicker(props: ColorPickerProps) {
  const { color, presetColors = defaultColors } = props;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  return (
    <div className="rs-color-picker">
      <InputGroup
        inside
        onClick={() => {
          setDisplayColorPicker(!displayColorPicker);
        }}
      >
        <InputGroup.Addon>
          <div className="sketch-color-review">
            <div style={{ background: color }} className="sketch-color-value" />
          </div>
        </InputGroup.Addon>
        <Input value={color} readOnly />
      </InputGroup>
      {displayColorPicker ? (
        <div className="sketch-picker-overlay">
          <div
            className="sketch-picker-backdrop"
            onClick={() => {
              setDisplayColorPicker(false);
            }}
          />
          <Sketch presetColors={presetColors} {...props} />
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker;
