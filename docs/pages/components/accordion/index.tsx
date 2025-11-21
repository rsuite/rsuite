import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import { Accordion, Button, ButtonGroup, Placeholder, Stack, Avatar } from 'rsuite';
import { FaAngleDoubleDown, FaArrowAltCircleDown, FaArrowDown } from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Accordion']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Button,
        ButtonGroup,
        Accordion,
        Placeholder,
        Stack,
        Avatar,
        FaAngleDoubleDown,
        FaArrowAltCircleDown,
        FaArrowDown
      }}
    />
  );
}
