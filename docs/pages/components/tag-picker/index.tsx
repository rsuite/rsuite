import React from 'react';
import { TagPicker, Button, Tag, Checkbox } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

import UserIcon from '@rsuite/icons/legacy/User';
import GroupIcon from '@rsuite/icons/legacy/Group';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['TagPicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Checkbox,
        Tag,
        TagPicker,
        Button,
        SpinnerIcon,
        UserIcon,
        GroupIcon
      }}
    />
  );
}
