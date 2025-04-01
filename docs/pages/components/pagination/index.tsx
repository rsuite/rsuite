import React from 'react';
import {
  Pagination,
  Button,
  Toggle,
  Divider,
  Slider,
  SelectPicker,
  TagPicker,
  InputNumber,
  HStack,
  Box
} from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Pagination']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Link,
        Pagination,
        Button,
        Toggle,
        Divider,
        Slider,
        SelectPicker,
        TagPicker,
        InputNumber,
        HStack,
        Box
      }}
    />
  );
}
