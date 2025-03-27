/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import NextLink from 'next/link';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
// @ts-ignore
import { Link, HStack, Text } from 'rsuite';
import { RiExternalLinkLine, RiLink } from 'react-icons/ri';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Link']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Link, HStack, Text, NextLink, RiExternalLinkLine, RiLink }}
    />
  );
}
