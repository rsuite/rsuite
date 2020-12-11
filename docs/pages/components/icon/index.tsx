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
        PieChartIcon
      }}
    />
  );
}
