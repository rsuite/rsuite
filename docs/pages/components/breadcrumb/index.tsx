import React from 'react';
import Link from 'next/link';
import DefaultPage from '@/components/layout/Page';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import ImportGuide from '@/components/ImportGuide';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import { Breadcrumb, VStack, Box, Dropdown, HStack } from 'rsuite';
import { MdHome, MdArrowRightAlt } from 'react-icons/md';
import { GoHomeFill } from 'react-icons/go';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Breadcrumb']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Breadcrumb,
        VStack,
        Link,
        ArrowRightLineIcon,
        Box,
        Dropdown,
        HStack,
        ArrowDownLineIcon,
        GoHomeFill,
        MdHome,
        MdArrowRightAlt
      }}
    />
  );
}
