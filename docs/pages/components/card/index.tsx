/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

import {
  // @ts-ignore
  Card,
  // @ts-ignore
  CardGroup,
  Text,
  Heading,
  Avatar,
  HStack,
  VStack,
  Button,
  TagGroup,
  Tag,
  SelectPicker,
  Form,
  Placeholder
} from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Card', 'CardGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      examples={['basic', 'bordered', 'shaded']}
      dependencies={{
        Card,
        CardGroup,
        Text,
        Heading,
        Avatar,
        HStack,
        VStack,
        TagGroup,
        Tag,
        Button,
        SelectPicker,
        Form,
        Placeholder
      }}
    />
  );
}
