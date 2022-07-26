import React from 'react';
import DefaultPage from '@/components/Page';
import { IconButton } from 'rsuite';
import { Icon, createIconFont } from '@rsuite/icons';
import GearIcon from '@rsuite/icons/Gear';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import PieChartIcon from '@rsuite/icons/PieChart';

import * as faCamera from '@fortawesome/free-solid-svg-icons/faCamera';
import * as faReact from '@fortawesome/free-brands-svg-icons/faReact';
import * as faAddressBook from '@fortawesome/free-regular-svg-icons/faAddressBook';
import { FaCamera, FaReact, FaAddressBook, FaSpinner } from 'react-icons/fa';

const sandboxDependencies = {
  '@fortawesome/free-brands-svg-icons': '^5.15.1',
  '@fortawesome/free-regular-svg-icons': '^5.15.1',
  '@fortawesome/free-solid-svg-icons': '^5.15.1',
  'react-icons': '^4.2.0'
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        IconButton,
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
