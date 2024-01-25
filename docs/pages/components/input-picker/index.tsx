import React from 'react';
import { InputPicker, Button } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

import UserIcon from '@rsuite/icons/legacy/User';
import GroupIcon from '@rsuite/icons/legacy/Group';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['InputPicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ InputPicker, Button, SpinnerIcon, UserIcon, GroupIcon }}
    />
  );
}
