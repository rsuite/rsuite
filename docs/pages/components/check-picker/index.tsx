import React from 'react';
import { CheckPicker, Button, Checkbox, RadioGroup, Radio, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

export default function Page() {
  return (
    <DefaultPage
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
