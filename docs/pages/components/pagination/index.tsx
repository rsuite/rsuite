import React from 'react';
import {
  Pagination,
  Button,
  Toggle,
  Divider,
  Slider,
  SelectPicker,
  TagPicker,
  InputNumber
} from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Link,
        Pagination,
        Button,
        Toggle,
        Divider,
        Slider,
        SelectPicker,
        TagPicker,
        InputNumber
      }}
    />
  );
}
