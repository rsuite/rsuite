import React from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Modal from '..';
import Drawer from '../../Drawer';
import '../styles/index.scss';
import '../../Drawer/styles/index.scss';

const root = createRoot(document.getElementById('root')!);
let entered = 0;
let renderKey = 0;
let events: KeyboardEvent[] = [];
window.addEventListener('keydown', event => events.push(event), true);

declare global {
  interface Window {
    __RSUITE_MODAL_DATE_TAB__: {
      runtime: { react: string; reactDOM: string };
      mount(component: 'Modal' | 'Drawer', enforceFocus: boolean): void;
      snapshot(): {
        entered: number;
        value: string;
        focused: boolean;
        events: { key: string; trusted: boolean; prevented: boolean }[];
      };
    };
  }
}

window.__RSUITE_MODAL_DATE_TAB__ = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(component, enforceFocus) {
    const Component = component === 'Modal' ? Modal : Drawer;
    entered = 0;
    events = [];
    flushSync(() => {
      root.render(
        <React.Fragment key={++renderKey}>
          <button>Outside before</button>
          <Component
            open
            enforceFocus={enforceFocus}
            animationTimeout={0}
            onEntered={() => entered++}
          >
            <input id="native-date" type="date" defaultValue="2024-01-15" />
          </Component>
          <button>Outside after</button>
        </React.Fragment>
      );
    });
  },
  snapshot() {
    const input = document.getElementById('native-date') as HTMLInputElement;
    return {
      entered,
      value: input.value,
      focused: document.activeElement === input,
      events: events.map(event => ({
        key: event.key,
        trusted: event.isTrusted,
        prevented: event.defaultPrevented
      }))
    };
  }
};
