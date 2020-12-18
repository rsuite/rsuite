import React from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar, Panel } from 'rsuite';
import DefaultPage from '@/components/Page';
import * as SvgIcons from '@/components/SvgIcons';
import { Icon } from '@rsuite/icons';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import GooglePlusCircleIcon from '@rsuite/icons/legacy/GooglePlusCircle';
import TwitterIcon from '@rsuite/icons/legacy/Twitter';
import LinkedinIcon from '@rsuite/icons/legacy/Linkedin';
import WechatIcon from '@rsuite/icons/legacy/Wechat';
import WeiboIcon from '@rsuite/icons/legacy/Weibo';
import StarIcon from '@rsuite/icons/legacy/Star';
import AlignLeftIcon from '@rsuite/icons/legacy/AlignLeft';
import AlignCenterIcon from '@rsuite/icons/legacy/AlignCenter';
import AlignRightIcon from '@rsuite/icons/legacy/AlignRight';
import AlignJustifyIcon from '@rsuite/icons/legacy/AlignJustify';
import PauseIcon from '@rsuite/icons/legacy/Pause';
import PlayIcon from '@rsuite/icons/legacy/Play';
import SearchIcon from '@rsuite/icons/Search';
import FileTextIcon from '@rsuite/icons/legacy/FileText';
import SaveIcon from '@rsuite/icons/legacy/Save';
import BoldIcon from '@rsuite/icons/legacy/Bold';
import ItalicIcon from '@rsuite/icons/legacy/Italic';
import UnderlineIcon from '@rsuite/icons/legacy/Underline';
import StrikethroughIcon from '@rsuite/icons/legacy/Strikethrough';
import LinkIcon from '@rsuite/icons/legacy/Link';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import PlusIcon from '@rsuite/icons/Plus';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Button,
        IconButton,
        ButtonGroup,
        ButtonToolbar,
        Icon,
        Panel,
        SvgIcons,
        FacebookOfficialIcon,
        GooglePlusCircleIcon,
        TwitterIcon,
        LinkedinIcon,
        WechatIcon,
        WeiboIcon,
        StarIcon,
        AlignLeftIcon,
        AlignCenterIcon,
        AlignRightIcon,
        AlignJustifyIcon,
        PauseIcon,
        PlayIcon,
        SearchIcon,
        FileTextIcon,
        SaveIcon,
        BoldIcon,
        ItalicIcon,
        UnderlineIcon,
        StrikethroughIcon,
        LinkIcon,
        AddOutlineIcon,
        PlusIcon
      }}
    />
  );
}
