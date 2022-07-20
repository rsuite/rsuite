import React, { useState } from 'react';
import { CheckTree, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';

import PageIcon from '@rsuite/icons/Page';

export default function Page() {
  return <DefaultPage dependencies={{ CheckTree, Toggle, useState, PageIcon }} />;
}
