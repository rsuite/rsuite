import React from 'react';
import { TagPicker, Button, Tag, Checkbox } from 'rsuite';
import DefaultPage from '@/components/Page';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

import UserIcon from '@rsuite/icons/legacy/User';
import GroupIcon from '@rsuite/icons/legacy/Group';

export default function Page() {
  return (
    <DefaultPage
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
