import React from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Button from '../../Button';
import IconButton from '../../IconButton';
import CustomProvider from '../../CustomProvider';
import Uploader from '../Uploader';
import '../../styles/index.scss';

type Options = {
  shape: 'default' | 'button' | 'div' | 'primary' | 'ghost';
  theme: 'light' | 'dark' | 'high-contrast';
  readOnly?: boolean;
  disabled?: boolean;
  clipped?: boolean;
  size?: 'xs';
  loading?: boolean;
  circle?: boolean;
  listType?: 'picture';
  draggable?: boolean;
};
const container = document.getElementById('root')!;
let root = createRoot(container);
let changes: string[][] = [];
let submissions = 0;
const shadow = 'rgb(123, 45, 67) 0px 3px 6px';

const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount({ shape, theme, clipped, circle, ...props }: Options) {
    flushSync(() => root.unmount());
    root = createRoot(container);
    changes = [];
    submissions = 0;
    document.body.className = `rs-theme-${theme}`;
    const custom = shape === 'button' || shape === 'div';
    const child = custom ? (
      React.createElement(
        shape,
        { className: 'consumer-trigger', style: { boxShadow: shadow } },
        'Choose files'
      )
    ) : shape !== 'default' ? (
      circle ? (
        <IconButton
          appearance={shape}
          color="yellow"
          circle
          icon={<span>+</span>}
          aria-label="Choose files"
          style={{ boxShadow: shadow }}
        />
      ) : (
        <Button appearance={shape} color="yellow" style={{ boxShadow: shadow }}>
          Choose files
        </Button>
      )
    ) : undefined;
    flushSync(() =>
      root.render(
        <CustomProvider theme={theme}>
          <style>{'.consumer-trigger::after { content: "consumer badge"; }'}</style>
          <form
            onSubmit={event => {
              event.preventDefault();
              submissions++;
            }}
            style={{ padding: 16 }}
          >
            <button type="button" data-before="">
              Before
            </button>
            <div style={{ display: 'inline-flex', overflow: clipped ? 'hidden' : undefined }}>
              <Uploader
                action="/unused"
                autoUpload={false}
                name="attachments"
                {...props}
                onChange={files => changes.push(files.map(file => file.name!))}
              >
                {child}
              </Uploader>
            </div>
            <button type="button" data-after="">
              After
            </button>
          </form>
        </CustomProvider>
      )
    );
  },
  snapshot() {
    const input = container.querySelector<HTMLInputElement>('input[type=file]')!;
    return {
      changes: changes.map(files => [...files]),
      submissions,
      files: Array.from(input.files!, file => file.name),
      formFiles: new FormData(input.form!).getAll('attachments').map(file => (file as File).name)
    };
  }
};
window.__RSUITE_UPLOAD_NATIVE_FOCUS__ = fixture;
declare global {
  interface Window {
    __RSUITE_UPLOAD_NATIVE_FOCUS__: typeof fixture;
  }
}
