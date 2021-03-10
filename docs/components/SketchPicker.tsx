import React from 'react';
import loadable from '@loadable/component';

const Sketch = loadable(() => import('react-color/lib/components/sketch/Sketch'));

interface SketchPickerProps {
  color: string;
  onChangeComplete: (color: any) => void;
}

export default function SketchPicker(props: SketchPickerProps) {
  const { color } = props;
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
  return (
    <div className="sketch-picker-wrapper">
      <div
        onClick={() => {
          setDisplayColorPicker(!displayColorPicker);
        }}
        className="sketch-color-review"
      >
        <div style={{ background: color }} className="sketch-color-value" />
      </div>
      {displayColorPicker ? (
        <div className="sketch-picker-overlay">
          <div
            className="sketch-picker-backdrop"
            onClick={() => {
              setDisplayColorPicker(false);
            }}
          />
          <Sketch {...props} />
        </div>
      ) : null}
    </div>
  );
}
