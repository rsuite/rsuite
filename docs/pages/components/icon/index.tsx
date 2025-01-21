import React from 'react';
import DefaultPage from '@/components/Page';
import { IconButton, HStack } from 'rsuite';
import Icon from '@rsuite/icons/Icon';
import createIconFont from '@rsuite/icons/createIconFont';
import GearIcon from '@rsuite/icons/Gear';
import SpinnerIcon from '@rsuite/icons/Spinner';
import PieChartIcon from '@rsuite/icons/PieChart';

import * as faCamera from '@fortawesome/free-solid-svg-icons/faCamera';
import * as faReact from '@fortawesome/free-brands-svg-icons/faReact';
import * as faAddressBook from '@fortawesome/free-regular-svg-icons/faAddressBook';
import { FaCamera, FaReact, FaAddressBook, FaSpinner } from 'react-icons/fa';
import ImportGuide from '@/components/ImportGuide';
import InstallGuide from '@/components/InstallGuide';

const sandboxDependencies = {
  '@fortawesome/free-brands-svg-icons': '^5.15.1',
  '@fortawesome/free-regular-svg-icons': '^5.15.1',
  '@fortawesome/free-solid-svg-icons': '^5.15.1',
  'react-icons': '^4.2.0'
};

const installCommands = {
  npm: 'npm i @rsuite/icons',
  yarn: 'yarn add @rsuite/icons',
  pnpm: 'pnpm add @rsuite/icons',
  bun: 'bun add @rsuite/icons'
};

const inDocsComponents = {
  'import-guide': () => (
    <ImportGuide name="@rsuite/icons" components={['Gear', 'AddOutline']} hasCssComponents={[]} />
  ),
  'install-guide': () => <InstallGuide commands={installCommands} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        IconButton,
        HStack,
        Icon,
        createIconFont,
        GearIcon,
        SpinnerIcon,
        faCamera,
        faReact,
        faAddressBook,
        PieChartIcon,
        FaCamera,
        FaReact,
        FaAddressBook,
        FaSpinner
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
