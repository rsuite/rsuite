import React from 'react';
import { Steps, ButtonGroup, Button, Panel, Placeholder } from 'rsuite';
import DefaultPage from '@/components/Page';
import PencilSquareIcon from '@rsuite/icons/legacy/PencilSquare';
import BookIcon from '@rsuite/icons/legacy/Book';
import WechatIcon from '@rsuite/icons/Wechat';
import SteamSquareIcon from '@rsuite/icons/legacy/SteamSquare';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Steps']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
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
