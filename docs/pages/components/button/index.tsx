import React from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar, Panel } from 'rsuite';
import DefaultPage from '@/components/Page';
import * as SvgIcons from '@/components/SvgIcons';
import { Icon } from '@rsuite/icons';
import FacebookOfficial from '@rsuite/icons/legacy/FacebookOfficial';
import GooglePlusCircle from '@rsuite/icons/legacy/GooglePlusCircle';
import Twitter from '@rsuite/icons/legacy/Twitter';
import Linkedin from '@rsuite/icons/legacy/Linkedin';
import Wechat from '@rsuite/icons/legacy/Wechat';
import Weibo from '@rsuite/icons/legacy/Weibo';
import Star from '@rsuite/icons/legacy/Star';
import AlignLeft from '@rsuite/icons/legacy/AlignLeft';
import AlignCenter from '@rsuite/icons/legacy/AlignCenter';
import AlignRight from '@rsuite/icons/legacy/AlignRight';
import AlignJustify from '@rsuite/icons/legacy/AlignJustify';
import Pause from '@rsuite/icons/legacy/Pause';
import ArrowRight from '@rsuite/icons/ArrowRight';
import Search from '@rsuite/icons/Search';
import { FileText } from '@rsuite/icons/lib/icons/legacy';
import Save from '@rsuite/icons/legacy/Save';
import Bold from '@rsuite/icons/legacy/Bold';
import Italic from '@rsuite/icons/legacy/Italic';
import Underline from '@rsuite/icons/legacy/Underline';
import Strikethrough from '@rsuite/icons/legacy/Strikethrough';
import Link from '@rsuite/icons/legacy/Link';

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
        FacebookOfficial,
        GooglePlusCircle,
        Twitter,
        Linkedin,
        Wechat,
        Weibo,
        Star,
        AlignLeft,
        AlignCenter,
        AlignRight,
        AlignJustify,
        Pause,
        ArrowRight,
        Search,
        FileText,
        Save,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        Link,
      }}
    />
  );
}
