import React from 'react';
import {
  ButtonToolbar,
  Button,
  Modal,
  Toggle,
  RadioGroup,
  Radio,
  Loader,
  Placeholder
} from 'rsuite';
import DefaultPage from '@/components/Page';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Modal']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Loader,
        ButtonToolbar,
        Button,
        Modal,
        Toggle,
        RadioGroup,
        Radio,
        RemindIcon,
        Placeholder
      }}
    />
  );
}
