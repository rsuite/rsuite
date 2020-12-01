import React from 'react';
import DefaultPage from '@/components/Page';
import { Icon, createIconFont } from '@rsuite/icons';
import GearIcon from '@rsuite/icons/Gear';
import HistoryIcon from '@rsuite/icons/History';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Icon,
        createIconFont,
        GearIcon,
        HistoryIcon,
        SpinnerIcon
      }}
    />
  );
}
