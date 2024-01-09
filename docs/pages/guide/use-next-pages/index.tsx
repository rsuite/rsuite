import React from 'react';
import Page from '@/components/Page';
import InstallGuide from '@/components/InstallGuide';

const nwlCommands = {
  npm: 'npm i next-with-less',
  yarn: 'yarn add next-with-less',
  pnpm: 'pnpm add next-with-less'
};

const inDocsComponents = {
  'install-guide': () => <InstallGuide />,
  'install-next-with-less': () => <InstallGuide commands={nwlCommands} />
};

export default () => {
  return <Page inDocsComponents={inDocsComponents} />;
};
