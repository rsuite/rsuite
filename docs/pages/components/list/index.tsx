import React from 'react';
import { List, Tag, Button, FlexboxGrid, Panel } from 'rsuite';
import DefaultPage from '@/components/Page';
import UserCircleO from '@rsuite/icons/legacy/UserCircleO';
import Image from '@rsuite/icons/legacy/Image';
import Film from '@rsuite/icons/legacy/Film';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ Panel, List, Tag, Button, FlexboxGrid, UserCircleO, Image, Film }}
    />
  );
}
