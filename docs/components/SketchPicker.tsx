import * as React from 'react';
import Loadable from 'react-loadable';

const Loader = () => <div>loading...</div>;
const Sketch = Loadable({
  loader: () => import('react-color/lib/components/sketch/Sketch'),
  loading: Loader
});

interface SketchPickerProps {
  color: string;
  onChangeComplete: (color: any) => void;
}

export default function SketchPicker(props: SketchPickerProps) {
  const { color } = props;
  const [displayColorPicker, setDisplayColorPicker] = React.useState();
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
