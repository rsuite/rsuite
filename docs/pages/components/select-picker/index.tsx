import React from 'react';
import { SelectPicker, Button, RadioGroup, Radio, Loader, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['SelectPicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Loader,
        SelectPicker,
        Button,
        SpinnerIcon,
        RadioGroup,
        Radio,
        Stack
      }}
    />
  );
}
