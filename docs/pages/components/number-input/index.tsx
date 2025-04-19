/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
// @ts-ignore
import { NumberInput, InputGroup, VStack, HStack, Text } from 'rsuite';
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['NumberInput']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        NumberInput,
        InputGroup,
        VStack,
        HStack,
        Text,
        FaCaretUp,
        FaCaretDown,
        FaPlus,
        FaMinus
      }}
    />
  );
}
