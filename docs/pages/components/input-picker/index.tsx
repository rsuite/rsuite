import React from 'react';
import { InputPicker, Button } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ InputPicker, Button, SpinnerIcon }} />;
}
