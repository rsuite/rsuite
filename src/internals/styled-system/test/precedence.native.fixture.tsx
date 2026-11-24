import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@/Button';
import CustomProvider from '@/CustomProvider';
import Box from '@/internals/Box';

const appearances = ['default', 'primary', 'subtle', 'ghost', 'link'] as const;

export default function Fixture({
  options,
  onUnmount
}: {
  options: URLSearchParams;
  onUnmount: () => void;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [changed, setChanged] = useState(false);
  const color = changed ? '#456789' : '#123456';
  const style = {
    color,
    background: '#234567',
    borderColor: '#345678',
    borderWidth: '3px',
    padding: '17px',
    fontSize: '19px',
    borderRadius: '7px'
  };
  const state = { disabled: options.has('disabled'), loading: options.has('loading') };
  const theme = options.get('theme') as 'light' | 'dark' | 'high-contrast' | null;
  return (
    <CustomProvider
      theme={theme || 'light'}
      rtl={options.has('rtl')}
      csp={{ nonce: 'style-props-test' }}
    >
      <div
        data-testid="runtime"
        data-ready={ready}
        data-options={options.toString()}
        data-react={React.version}
        data-react-dom={ReactDOM.version}
      />
      {appearances.map(appearance => (
        <div key={appearance}>
          <button data-testid={`before-${appearance}`}>Before</button>
          <Button
            data-testid={`actual-${appearance}`}
            appearance={appearance}
            size="lg"
            {...state}
            c={style.color}
            bg={style.background}
            bc={style.borderColor}
            bw={style.borderWidth}
            p={style.padding}
            fs={style.fontSize}
            rounded={style.borderRadius}
          >
            Styled
          </Button>
          {!options.has('hydrate') && (
            <Button
              data-testid={`reference-${appearance}`}
              appearance={appearance}
              size="lg"
              {...state}
              style={style}
            >
              Native style
            </Button>
          )}
          <Button data-testid={`control-${appearance}`} appearance={appearance} size="lg">
            Default
          </Button>
        </div>
      ))}
      <Box
        data-testid="responsive"
        c={{ xs: '#123456', md: '#456789' }}
        p={{ xs: '5px', md: '19px' }}
      />
      {!options.has('hydrate') && (
        <Box data-testid="inline" c="#123456" style={{ color: '#234567' }} />
      )}
      <Button data-testid="important" c="#123456" className="priority-important">
        Important
      </Button>
      <Box data-testid="hidden" display="block" hideFrom="md" />
      <button data-testid="update" onClick={() => setChanged(true)}>
        Update
      </button>
      <button data-testid="unmount" onClick={onUnmount}>
        Unmount
      </button>
    </CustomProvider>
  );
}
