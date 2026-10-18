import React from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Button from '../../Button';
import CustomProvider from '../../CustomProvider';
import EmptyState from '../EmptyState';
import '../../styles/index.scss';

type Options = {
  theme: 'light' | 'dark' | 'high-contrast';
  size: 'sm' | 'md' | 'lg';
  align: 'start' | 'center';
  dir: 'ltr' | 'rtl';
};
const root = createRoot(document.getElementById('root')!);
let calls: boolean[] = [];
window.__RSUITE_EMPTY_STATE__ = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount({ theme, ...props }: Options) {
    calls = [];
    document.body.className = `rs-theme-${theme}`;
    flushSync(() =>
      root.render(
        <CustomProvider theme={theme}>
          <button type="button" data-before="">
            Before
          </button>
          <div style={{ width: 240 }}>
            <EmptyState
              {...props}
              as="section"
              aria-label="Projects"
              headingLevel={2}
              title="No projects found"
              description={`Try another search. ${'LongSearchTerm'.repeat(8)}`}
              icon={
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" />
                  <path d="m15 15 6 6" stroke="currentColor" />
                </svg>
              }
            >
              <Button
                appearance="primary"
                style={{ minWidth: 120 }}
                onClick={event => calls.push(event.isTrusted)}
              >
                Create project
              </Button>
              <Button href="#help" style={{ minWidth: 120 }}>
                Learn more
              </Button>
            </EmptyState>
          </div>
          <button type="button" data-after="">
            After
          </button>
        </CustomProvider>
      )
    );
  },
  snapshot: () => [...calls]
};
declare global {
  interface Window {
    __RSUITE_EMPTY_STATE__: {
      runtime: { react: string; reactDOM: string };
      mount: (options: Options) => void;
      snapshot: () => boolean[];
    };
  }
}
