import React from 'react';
import { Steps, ButtonGroup, Button, Panel } from 'rsuite';
import DefaultPage from '@/components/Page';
import PencilSquare from '@rsuite/icons/legacy/PencilSquare';
import Book from '@rsuite/icons/legacy/Book';
import Wechat from '@rsuite/icons/Wechat';
import SteamSquare from '@rsuite/icons/legacy/SteamSquare';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Steps,
        ButtonGroup,
        Button,
        Panel,
        PencilSquare,
        Book,
        Wechat,
        SteamSquare
      }}
    />
  );
}
