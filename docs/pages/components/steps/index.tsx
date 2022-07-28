import React from 'react';
import { Steps, ButtonGroup, Button, Panel, Placeholder } from 'rsuite';
import DefaultPage from '@/components/Page';
import PencilSquareIcon from '@rsuite/icons/legacy/PencilSquare';
import BookIcon from '@rsuite/icons/legacy/Book';
import WechatIcon from '@rsuite/icons/Wechat';
import SteamSquareIcon from '@rsuite/icons/legacy/SteamSquare';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Steps,
        ButtonGroup,
        Button,
        Panel,
        PencilSquareIcon,
        BookIcon,
        WechatIcon,
        SteamSquareIcon,
        Placeholder
      }}
    />
  );
}
