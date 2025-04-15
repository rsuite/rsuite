/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
// @ts-ignore
import { PasswordInput, PasswordStrengthMeter, VStack } from 'rsuite';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['PasswordInput', 'PasswordStrengthMeter']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ PasswordInput, PasswordStrengthMeter, VStack, FaEye, FaEyeSlash }}
    />
  );
}
