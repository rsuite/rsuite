import React from 'react';
import { SelectPicker, Button, RadioGroup, Radio, Loader } from 'rsuite';
import DefaultPage from '@/components/Page';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Loader,
        SelectPicker,
        Button,
        SpinnerIcon,
        RadioGroup,
        Radio
      }}
    />
  );
}
