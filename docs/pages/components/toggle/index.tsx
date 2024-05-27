import React, { useState, useCallback } from 'react';
import { Button, Toggle, Radio, RadioGroup, Checkbox, Form, Stack } from 'rsuite';
import ImportGuide from '@/components/ImportGuide';
import DefaultPage from '@/components/Page';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

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
        Radio,
        RadioGroup,
        Checkbox,
        Form,
        Stack
      }}
    />
  );
}
