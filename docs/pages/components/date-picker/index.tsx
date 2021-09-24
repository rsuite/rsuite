import React from 'react';
import * as dateFns from 'date-fns';
import { DatePicker, Button, InputGroup, Input } from 'rsuite';

import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ DatePicker, Button, InputGroup, dateFns, Input }} />;
}
