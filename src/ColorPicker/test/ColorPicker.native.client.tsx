import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import ColorPicker from '..';
import CustomProvider from '../../CustomProvider';
import '../../styles/index.scss';

const options = new URLSearchParams(location.hash.slice(1));

function Fixture() {
  const [value, setValue] = useState<string | null>('#ff0000');
  const [events, setEvents] = useState<
    { value: string | null; trusted: boolean; pointerType?: string }[]
  >([]);
  const [submits, setSubmits] = useState(0);
  return (
    <CustomProvider rtl={options.has('rtl')}>
      <div
        data-testid="runtime"
        data-react={React.version}
        data-react-dom={ReactDOM.version}
        data-options={options.toString()}
      />
      <button type="button">Before</button>
      <form
        onSubmit={event => {
          event.preventDefault();
          setSubmits(count => count + 1);
        }}
      >
        <ColorPicker
          label="Brand"
          name="brand"
          defaultValue="#ff0000"
          value={options.has('controlled') ? value : undefined}
          responsive={options.has('mobile')}
          disabled={options.has('disabled')}
          readOnly={options.has('readonly')}
          presets={[
            { value: '#00ff00', label: 'Success' },
            { value: '#0000ff', label: 'Info' }
          ]}
          onChange={(next, event) => {
            setValue(next);
            setEvents(previous => [
              ...previous,
              {
                value: next,
                trusted: event.nativeEvent.isTrusted,
                ...('pointerType' in event.nativeEvent
                  ? { pointerType: String(event.nativeEvent.pointerType) }
                  : {})
              }
            ]);
          }}
        />
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </form>
      <button type="button">After</button>
      <output data-testid="events">{JSON.stringify(events)}</output>
      <output data-testid="submits">{submits}</output>
    </CustomProvider>
  );
}

createRoot(document.getElementById('root')!).render(<Fixture />);
