import React from 'react';
import { InputPicker, Button } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import DefaultPage from '@/components/Page';

import UserIcon from '@rsuite/icons/legacy/User';
import GroupIcon from '@rsuite/icons/legacy/Group';

export default function Page() {
  return <DefaultPage dependencies={{ InputPicker, Button, SpinnerIcon, UserIcon, GroupIcon }} />;
}
