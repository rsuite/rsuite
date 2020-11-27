import React from 'react';
import DefaultPage from '@/components/Page';
import { Icon, createIconFont } from '@rsuite/icons';
import Gear from '@rsuite/icons/Gear';
import History from '@rsuite/icons/History';
import Spinner from '@rsuite/icons/legacy/Spinner';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Icon,
        createIconFont,
        Gear,
        History,
        Spinner,
      }}
    />
  );
}
