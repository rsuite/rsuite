import React from 'react';
import {
  Card,
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
