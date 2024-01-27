import React from 'react';
import { CheckPicker, Button, Checkbox, RadioGroup, Radio, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['CheckPicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Stack,
        CheckPicker,
        Button,
        Checkbox,
        RadioGroup,
        Radio,
        SpinnerIcon
      }}
    />
  );
}
