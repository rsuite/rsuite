import React from 'react';
import Page from '@/components/Page';
import InstallGuide from '@/components/InstallGuide';

const craCommands = {
  npm: `npx create-react-app my-app
cd my-app
npm start`,
  yarn: `yarn create react-app my-app
cd my-app
npm start`,
  pnpm: `pnpm create react-app my-app
cd my-app
npm start`,
  bun: `bun create react-app my-app
cd my-app
npm start`
};

const craJsCommands = {
  npm: 'npx create-react-app my-app --template @rsuite',
  yarn: 'yarn create react-app my-app --template @rsuite',
  pnpm: 'pnpm create react-app my-app --template @rsuite',
  bun: 'bun create react-app my-app --template @rsuite'
};

const craTsCommands = {
  npm: 'npx create-react-app my-app --template @rsuite/typescript',
  yarn: 'yarn create react-app my-app --template @rsuite/typescript',
  pnpm: 'pnpm create react-app my-app --template @rsuite/typescript',
  bun: 'bun create react-app my-app --template @rsuite/typescript'
};

const cracoCommands = {
  npm: 'npm i -D @craco/craco craco-less',
  yarn: 'yarn add -D @craco/craco craco-less',
  pnpm: 'pnpm add -D @craco/craco craco-less',
  bun: 'bun add -D @craco/craco craco-less'
};

const inDocsComponents = {
  'install-guide': () => <InstallGuide />,
  'install-cra': () => <InstallGuide commands={craCommands} />,
  'install-cra-js': () => <InstallGuide commands={craJsCommands} />,
  'install-cra-ts': () => <InstallGuide commands={craTsCommands} />,
  'install-craco': () => <InstallGuide commands={cracoCommands} />
};

const PageComponent = () => {
  return <Page inDocsComponents={inDocsComponents} />;
};

PageComponent.displayName = 'CreateReactAppGuidePage';

export default PageComponent;
