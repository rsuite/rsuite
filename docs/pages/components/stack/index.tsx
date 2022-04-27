import React from 'react';
import { Stack, Panel, Button, Divider, Input, Radio, RadioGroup, Slider } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ Stack, Panel, Button, Divider, Input, Radio, RadioGroup, Slider }}
    />
  );
}
