import React from 'react';
import { ButtonToolbar, Button, IconButton, Drawer, RadioGroup, Radio, Placeholder } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Drawer']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Drawer,
        Placeholder,
        ButtonToolbar,
        Button,
        IconButton,
        RadioGroup,
        Radio,
        AngleRightIcon,
        AngleLeftIcon,
        AngleDownIcon,
        AngleUpIcon
      }}
    />
  );
}
