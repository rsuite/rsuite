import React from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import CustomProvider from '../../CustomProvider';
import useDialog from '../useDialog';
import '../../Modal/styles/index.scss';
import '../../Button/styles/index.scss';
import '../../Input/styles/index.scss';

const record = {
  results: [] as { prompt: string; value: unknown }[],
  clicks: [] as boolean[],
  keys: [] as { key: string; trusted: boolean }[],
  errors: [] as string[],
  rejections: [] as string[]
};
document.addEventListener('click', event => record.clicks.push(event.isTrusted));
document.addEventListener('keydown', event =>
  record.keys.push({ key: event.key, trusted: event.isTrusted })
);
window.addEventListener('error', event => record.errors.push(String(event.error)));
window.addEventListener('unhandledrejection', event =>
  record.rejections.push(String(event.reason))
);

function Fixture() {
  const dialog = useDialog();
  const open = (stacked: boolean) => {
    for (const name of stacked ? ['First', 'Second'] : ['First']) {
      void dialog
        .prompt(`${name} name`, {
          title: `${name} prompt`,
          okText: `Save ${name.toLowerCase()}`,
          validate: value => [value.trim().length >= 3, `${name} name needs three characters`]
        })
        .then(value => {
          record.results.push({ prompt: name, value });
        });
    }
  };

  return (
    <>
      <button onClick={() => open(false)}>Open prompt</button>
      <button onClick={() => open(true)}>Open stacked prompts</button>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <CustomProvider reduceMotion>
    <Fixture />
  </CustomProvider>
);

const fixture = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ...record })
};

declare global {
  interface Window {
    __RSUITE_PROMPT_ACCESSIBILITY__: typeof fixture;
  }
}
window.__RSUITE_PROMPT_ACCESSIBILITY__ = fixture;
