import React, { useState, useCallback } from 'react';
import ImportGuide from '@/components/ImportGuide';
import DefaultPage from '@/components/layout/Page';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import { Button, Toggle, VStack, HStack, Divider, Text, Center, SelectPicker } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Toggle']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        useState,
        useCallback,
        Button,
        Toggle,
        CheckIcon,
        CloseIcon,
        VStack,
        HStack,
        Divider,
        Text,
        Center,
        SelectPicker
      }}
    />
  );
}
