import React from 'react';
import { SelectPicker, Button, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        SelectPicker,
        Button,
        SpinnerIcon,
        RadioGroup,
        Radio
      }}
    />
  );
}
